import React, { useState, useRef, useEffect } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Download,
  Edit,
  Save,
  X,
  FileImage,
  Eye,
  Camera,
  Image as ImageIcon,
  Edit2,
} from 'lucide-react';
import jsPDF from 'jspdf';
import ImageEditorSimple from '../components/ImageEditorSimple';

// Definición de la interfaz
interface ModuloInforme {
  id: string;
  titulo: string;
  descripcion: string;
  imagenes: string[]; // Cambiado de imagen opcional a array de imágenes
  fechaCreacion: Date;
}

const InformesPage: React.FC = () => {
  const [modulos, setModulos] = useState<ModuloInforme[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [nombreTienda, setNombreTienda] = useState('tienda');
  const [editingImage, setEditingImage] = useState<{ url: string, index: number, moduleId?: string } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [lastGenerationTime, setLastGenerationTime] = useState<number>(0);

  const [nuevoModulo, setNuevoModulo] = useState({
    titulo: '',
    descripcion: '',
    imagenes: [] as string[],
  });

  const cameraInputRef = useRef<HTMLInputElement>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfContentRef = useRef<HTMLDivElement>(null);

  // Cargar datos desde localStorage al montar el componente
  useEffect(() => {
    try {
      const savedData = localStorage.getItem('informes-data');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        if (parsedData.modulos && Array.isArray(parsedData.modulos)) {
          const modulosConFecha = parsedData.modulos.map((m: any) => {
            // Migración de datos antiguos: convertir imagen única a array
            let imagenes = m.imagenes;
            if (!imagenes) {
              if (m.imagen) {
                imagenes = [m.imagen]; // Convertir imagen única a array
              } else {
                imagenes = [];
              }
            }
            return {
              ...m,
              imagenes,
              fechaCreacion: m.fechaCreacion ? new Date(m.fechaCreacion) : new Date(),
              id: m.id || Date.now().toString() + Math.random(),
            };
          });
          setModulos(modulosConFecha);
        }
        if (parsedData.nombreTienda) {
          setNombreTienda(parsedData.nombreTienda);
        }
      }
    } catch (error) {
      console.error('Error al cargar datos del localStorage:', error);
      // Si hay error, limpiar localStorage corrupto
      localStorage.removeItem('informes-data');
    }
  }, []);

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    try {
      const dataToSave = {
        modulos: modulos.map(m => ({
          ...m,
          fechaCreacion: m.fechaCreacion.toISOString(), // Convertir a string para almacenamiento
        })),
        nombreTienda,
      };
      localStorage.setItem('informes-data', JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  }, [modulos, nombreTienda]);

  // Función para generar ID único
  const generateUniqueId = () => {
    return Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9);
  };

  // Funciones de optimización de imágenes
  const compressImage = async (dataUrl: string, maxWidth: number = 1200, quality: number = 0.85): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        
        // Calcular nuevas dimensiones manteniendo la relación de aspecto
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (maxWidth / width) * height;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Dibujar imagen redimensionada
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convertir a dataURL con compresión
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.src = dataUrl;
    });
  };

  // Optimizar imagen para PDF (más agresiva)
  const optimizeImageForPDF = async (dataUrl: string): Promise<string> => {
    return compressImage(dataUrl, 800, 0.7);
  };

  // Funciones de manejo
  const handleCrearModulo = () => {
    try {
      if (nuevoModulo.titulo.trim() === '') {
        alert('Por favor, completa al menos el título');
        return;
      }

      const modulo: ModuloInforme = {
        id: generateUniqueId(),
        titulo: nuevoModulo.titulo.trim(),
        descripcion: nuevoModulo.descripcion.trim(),
        imagenes: nuevoModulo.imagenes,
        fechaCreacion: new Date(),
      };

      console.log('Creando módulo:', modulo);
      const nuevosModulos = [...modulos, modulo];
      setModulos(nuevosModulos);
      setNuevoModulo({ titulo: '', descripcion: '', imagenes: [] });
      setIsCreating(false);
      console.log('Módulo creado exitosamente. Total módulos:', nuevosModulos.length);
    } catch (error) {
      console.error('Error al crear módulo:', error);
      alert('Error al crear el módulo. Por favor, intenta de nuevo.');
    }
  };

  const handleEliminarModulo = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este módulo?')) {
      setModulos(modulos.filter((m) => m.id !== id));
    }
  };

  const handleImagenUpload = async (event: React.ChangeEvent<HTMLInputElement>, isEditing: boolean = false, moduleId?: string) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImages: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        const imageDataUrl = await new Promise<string>((resolve) => {
          reader.onload = (e) => {
            resolve(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        });
        
        // Comprimir imagen para almacenamiento
        const compressedImage = await compressImage(imageDataUrl);
        newImages.push(compressedImage);
      }
      
      if (isEditing && moduleId) {
        setModulos(modulos.map((m) => 
          m.id === moduleId 
            ? { ...m, imagenes: [...m.imagenes, ...newImages] }
            : m
        ));
      } else {
        setNuevoModulo({ ...nuevoModulo, imagenes: [...nuevoModulo.imagenes, ...newImages] });
      }
    }
  };

  const handleEliminarImagen = (index: number, isEditing: boolean = false, moduleId?: string) => {
    if (isEditing && moduleId) {
      setModulos(modulos.map((m) => 
        m.id === moduleId 
          ? { ...m, imagenes: m.imagenes.filter((_, i) => i !== index) }
          : m
      ));
    } else {
      setNuevoModulo({ 
        ...nuevoModulo, 
        imagenes: nuevoModulo.imagenes.filter((_, i) => i !== index) 
      });
    }
  };

  const handleEditImage = (url: string, index: number, moduleId?: string) => {
    setEditingImage({ url, index, moduleId });
  };

  const handleSaveEditedImage = (editedImageUrl: string) => {
    if (editingImage) {
      if (editingImage.moduleId) {
        setModulos(modulos.map((m) => {
          if (m.id === editingImage.moduleId) {
            const newImagenes = [...m.imagenes];
            newImagenes[editingImage.index] = editedImageUrl;
            return { ...m, imagenes: newImagenes };
          }
          return m;
        }));
      } else {
        const newImagenes = [...nuevoModulo.imagenes];
        newImagenes[editingImage.index] = editedImageUrl;
        setNuevoModulo({ ...nuevoModulo, imagenes: newImagenes });
      }
      setEditingImage(null);
    }
  };

  const handleEditarModulo = (id: string) => {
    setEditingId(id);
  };

  const handleGuardarEdicion = (id: string, titulo: string, descripcion: string) => {
    setModulos(modulos.map((m) => (m.id === id ? { ...m, titulo, descripcion } : m)));
    setEditingId(null);
  };

  // Generar PDF con throttling
  const handleGenerarPDF = async () => {
    if (modulos.length === 0) {
      alert('No hay módulos para generar el PDF');
      return;
    }

    // Throttling: prevenir generación múltiple (5 segundos entre generaciones)
    const now = Date.now();
    if (now - lastGenerationTime < 5000) {
      alert('Por favor, espera unos segundos antes de generar otro PDF');
      return;
    }

    setIsGeneratingPDF(true);
    setLastGenerationTime(now);

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = margin;

      // Título del informe
      pdf.setFontSize(26); // Aumentado 2px
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Informe ${nombreTienda}`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      // Fecha de generación
      pdf.setFontSize(14); // Aumentado 2px
      pdf.setFont('helvetica', 'normal');
      const fechaGeneracion = new Date().toLocaleDateString('es-ES');
      pdf.text(`Generado el: ${fechaGeneracion}`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 20;

      // Procesar cada módulo
      for (let i = 0; i < modulos.length; i++) {
        const modulo = modulos[i];

        // Verificar si necesitamos una nueva página
        if (yPosition > pageHeight - 60) {
          pdf.addPage();
          yPosition = margin;
        }

        // Título del módulo
        pdf.setFontSize(20); // Aumentado 2px
        pdf.setFont('helvetica', 'bold');
        pdf.text(modulo.titulo, margin, yPosition);
        yPosition += 12;

        // Fecha de creación
        pdf.setFontSize(12); // Aumentado 2px
        pdf.setFont('helvetica', 'italic');
        pdf.text(`Creado: ${modulo.fechaCreacion.toLocaleDateString('es-ES')}`, margin, yPosition);
        yPosition += 15;

        // Imágenes si existen
        if (modulo.imagenes && modulo.imagenes.length > 0) {
          const maxImagesPerRow = 2;
          const imgMargin = 10; // Espacio entre imágenes
          const availableWidth = pageWidth - (margin * 2);
          const imgMaxWidth = (availableWidth - imgMargin * (maxImagesPerRow - 1)) / maxImagesPerRow;
          const imgMaxHeight = 120; // Aumentado para imágenes más grandes
          
          // Agrupar imágenes por filas
          let currentRowImages: { image: string, width: number, height: number }[] = [];
          let maxRowHeight = 0;
          
          for (let j = 0; j < modulo.imagenes.length; j++) {
            try {
              // Optimizar imagen para PDF
              const optimizedImage = await optimizeImageForPDF(modulo.imagenes[j]);
              
              // Obtener dimensiones de la imagen
              const img = new Image();
              await new Promise((resolve) => {
                img.onload = resolve;
                img.src = optimizedImage;
              });
              
              // Calcular dimensiones respetando límites
              const aspectRatio = img.height / img.width;
              let imgWidth = imgMaxWidth;
              let imgHeight = imgWidth * aspectRatio;
              
              // Si la imagen es muy alta, ajustar basándose en la altura máxima
              if (imgHeight > imgMaxHeight) {
                imgHeight = imgMaxHeight;
                imgWidth = imgHeight / aspectRatio;
              }
              
              // Añadir a la fila actual
              currentRowImages.push({ image: optimizedImage, width: imgWidth, height: imgHeight });
              maxRowHeight = Math.max(maxRowHeight, imgHeight);
              
              // Procesar fila cuando está completa o es la última imagen
              if (currentRowImages.length === maxImagesPerRow || j === modulo.imagenes.length - 1) {
                // Verificar si hay espacio para esta fila de imágenes
                if (yPosition + maxRowHeight > pageHeight - margin) {
                  pdf.addPage();
                  yPosition = margin;
                }
                
                // Dibujar todas las imágenes de la fila actual
                for (let k = 0; k < currentRowImages.length; k++) {
                  const imgData = currentRowImages[k];
                  const xPosition = margin + (k * (imgMaxWidth + imgMargin));
                  
                  // Centrar verticalmente si las imágenes tienen diferentes alturas
                  const yOffset = (maxRowHeight - imgData.height) / 2;
                  
                  pdf.addImage(imgData.image, 'JPEG', xPosition, yPosition + yOffset, imgData.width, imgData.height);
                }
                
                // Actualizar posición Y con espacio adicional
                yPosition += maxRowHeight + 15; // Más espacio después de las imágenes
                
                // Resetear para la siguiente fila
                currentRowImages = [];
                maxRowHeight = 0;
              }
            } catch (error) {
              console.error('Error agregando imagen al PDF:', error);
            }
          }
        }

        // Descripción (si existe)
        if (modulo.descripcion && modulo.descripcion.trim() !== '') {
          // Añadir un pequeño espacio antes del texto si hay imágenes
          if (modulo.imagenes && modulo.imagenes.length > 0) {
            yPosition += 5;
          }
          
          pdf.setFontSize(13); // Aumentado 2px
          pdf.setFont('helvetica', 'normal');

          const descripcionLines = pdf.splitTextToSize(modulo.descripcion, pageWidth - margin * 2);

          // Verificar si hay espacio para la descripción
          const lineHeight = 6;
          const descripcionHeight = descripcionLines.length * lineHeight;
          if (yPosition + descripcionHeight > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
          }

          pdf.text(descripcionLines, margin, yPosition);
          yPosition += descripcionHeight + 20; // Más espacio después del texto
        } else if (modulo.imagenes && modulo.imagenes.length > 0) {
          // Si solo hay imágenes, añadir espacio después
          yPosition += 10;
        }

        // Línea separadora (excepto para el último módulo)
        if (i < modulos.length - 1) {
          // Asegurar espacio mínimo antes de la línea
          yPosition += 5;
          
          if (yPosition > pageHeight - 30) {
            pdf.addPage();
            yPosition = margin;
          }
          
          pdf.setLineWidth(0.3);
          pdf.setDrawColor(200, 200, 200); // Línea más suave
          pdf.line(margin, yPosition, pageWidth - margin, yPosition);
          yPosition += 15; // Más espacio después de la línea
        }
      }

      // Guardar PDF
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const fileName = `informe-${nombreTienda}-${fechaGeneracion}.pdf`;
      
      // Descargar el archivo
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = fileName;
      link.click();
      
      // Intentar abrir automáticamente en una nueva pestaña (puede ser bloqueado por el navegador)
      setTimeout(() => {
        window.open(pdfUrl, '_blank');
      }, 500);
    } catch (error) {
      console.error('Error generando PDF:', error);
      alert('Error al generar el PDF. Por favor, intenta de nuevo.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="container mx-auto p-4 md:p-8">
        {/* Encabezado optimizado para móviles */}
        <div className="text-center mb-4 md:mb-10">
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-800 mb-2">Informes de Tienda</h1>
          <p className="text-xs sm:text-sm md:text-lg text-gray-600 px-2">
            Crea y gestiona informes de manera rápida y sencilla
          </p>
        </div>

        {/* Panel de control y estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 md:gap-6 md:mb-10">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 flex items-center gap-3 sm:gap-4 border border-blue-100">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-bold text-gray-800">{modulos.length}</p>
              <p className="text-xs sm:text-sm text-gray-600">Módulos</p>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 flex items-center gap-3 sm:gap-4 border border-green-100">
            <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-lg">
              <FileImage className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-bold text-gray-800">
                {modulos.reduce((total, m) => total + m.imagenes.length, 0)}
              </p>
              <p className="text-xs sm:text-sm text-gray-600">Imágenes</p>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 border border-purple-100">
            <button
              onClick={handleGenerarPDF}
              disabled={modulos.length === 0 || isGeneratingPDF}
              className="w-full flex items-center justify-center px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold shadow hover:from-purple-700 hover:to-purple-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPDF ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generando...
                </div>
              ) : (
                <>
                  <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                  Generar PDF
                </>
              )}
            </button>
          </div>
        </div>

        {/* Input para nombre de tienda */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 md:mb-8 border border-gray-100">
          <div className="flex items-center flex-wrap gap-2">
            <label htmlFor="nombreTienda" className="text-sm font-semibold text-gray-700">
              Nombre de la tienda:
            </label>
            <input
              id="nombreTienda"
              type="text"
              value={nombreTienda}
              onChange={(e) => setNombreTienda(e.target.value)}
              className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-800"
              placeholder="Ingresa el nombre de tu tienda"
            />
          </div>
          {/* Botón para eliminar todos los datos - más visible */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Limpiar Todos los Datos
            </button>
          </div>
        </div>

        {/* Botón para crear nuevo módulo */}
        {!isCreating && (
          <div className="mb-4 md:mb-8 text-center">
            <button
              onClick={() => setIsCreating(true)}
              className="w-full inline-flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl sm:rounded-2xl text-sm sm:text-base font-semibold shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform md:w-auto md:px-8 md:py-4"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              Crear Nuevo Módulo
            </button>
          </div>
        )}

        {/* Formulario de creación */}
        {isCreating && (
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 mb-6 md:mb-8 border border-blue-100">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Nuevo Módulo</h2>

            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Título *</label>
                <input
                  type="text"
                  value={nuevoModulo.titulo}
                  onChange={(e) => setNuevoModulo({ ...nuevoModulo, titulo: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-800"
                  placeholder="Ingresa el título del módulo"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción (Opcional)</label>
                <textarea
                  value={nuevoModulo.descripcion}
                  onChange={(e) => setNuevoModulo({ ...nuevoModulo, descripcion: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-800 resize-none"
                  placeholder="Describe el contenido del módulo (opcional)..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Imágenes (Opcional) - {nuevoModulo.imagenes.length} añadidas
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-blue-400 transition-colors duration-200">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImagenUpload(e)}
                    className="hidden"
                  />
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => handleImagenUpload(e)}
                    className="hidden"
                  />

                  {/* Galería de imágenes añadidas */}
                  {nuevoModulo.imagenes.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                      {nuevoModulo.imagenes.map((imagen, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={imagen}
                            alt={`Imagen ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg shadow"
                          />
                          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleEditImage(imagen, index)}
                              className="p-1.5 sm:p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                              title="Editar imagen"
                            >
                              <Edit2 className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                            <button
                              onClick={() => handleEliminarImagen(index)}
                              className="p-1.5 sm:p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                              title="Eliminar imagen"
                            >
                              <X className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Botones de acción */}
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <Camera className="w-12 h-12 text-gray-400" />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() => cameraInputRef.current?.click()}
                        className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
                      >
                        <Camera className="w-5 h-5 mr-2" />
                        Tomar Foto
                      </button>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center justify-center px-6 py-3 text-blue-600 hover:text-blue-700 font-medium border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        <ImageIcon className="w-5 h-5 mr-2" />
                        Galería
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      Puedes añadir múltiples imágenes. Selecciona varias a la vez o una por una.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-6 md:mt-8">
              <button
                onClick={handleCrearModulo}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors"
              >
                <Save className="w-5 h-5 inline mr-2" />
                Guardar Módulo
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setNuevoModulo({ titulo: '', descripcion: '', imagenes: [] });
                }}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
              >
                <X className="w-5 h-5 inline mr-2" />
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Lista de módulos */}
        <div className="space-y-4">
          {modulos.map((modulo) => (
            <ModuloCard
              key={modulo.id}
              modulo={modulo}
              isEditing={editingId === modulo.id}
              isPreview={previewId === modulo.id}
              onEdit={() => handleEditarModulo(modulo.id)}
              onDelete={() => handleEliminarModulo(modulo.id)}
              onSave={(titulo, descripcion) => handleGuardarEdicion(modulo.id, titulo, descripcion)}
              onCancelEdit={() => setEditingId(null)}
              onTogglePreview={() => setPreviewId(previewId === modulo.id ? null : modulo.id)}
              onImageUpload={(e) => handleImagenUpload(e, true, modulo.id)}
              onDeleteImage={(index) => handleEliminarImagen(index, true, modulo.id)}
              onEditImage={(url, index) => handleEditImage(url, index, modulo.id)}
            />
          ))}
        </div>

        {modulos.length === 0 && !isCreating && (
          <div className="text-center py-8">
            <FileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No hay módulos creados</h3>
            <p className="text-gray-400 mb-6">Comienza creando tu primer módulo para el informe.</p>
            <button
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-semibold shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              Crear Primer Módulo
            </button>
          </div>
        )}

        {/* Contenido oculto para PDF (sin cambios, ya que no se visualiza) */}
        <div ref={pdfContentRef} style={{ position: 'absolute', left: '-9999px' }}>
          {/* ... (el contenido para generar el PDF permanece igual) */}
        </div>
      </div>
      
      {/* Editor de imágenes */}
      {editingImage && (
        <ImageEditorSimple
          imageUrl={editingImage.url}
          onSave={handleSaveEditedImage}
          onCancel={() => setEditingImage(null)}
        />
      )}
      
      {/* Modal de confirmación para eliminar todos los datos */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">¿Eliminar todos los datos?</h3>
                <p className="text-sm text-gray-500">Esta acción no se puede deshacer</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600">
                Estás a punto de eliminar permanentemente:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">•</span>
                  {modulos.length} módulo(s) creado(s)
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">•</span>
                  {modulos.reduce((total, m) => total + m.imagenes.length, 0)} imagen(es)
                </li>
                <li className="flex items-center">
                  <span className="text-red-500 mr-2">•</span>
                  Toda la información de la tienda
                </li>
              </ul>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('informes-data');
                  setModulos([]);
                  setNombreTienda('tienda');
                  setIsCreating(false);
                  setEditingId(null);
                  setPreviewId(null);
                  setShowDeleteModal(false);
                  alert('Todos los datos han sido eliminados exitosamente');
                }}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Sí, eliminar todo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente para cada módulo
interface ModuloCardProps {
  modulo: ModuloInforme;
  isEditing: boolean;
  isPreview: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSave: (titulo: string, descripcion: string) => void;
  onCancelEdit: () => void;
  onTogglePreview: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteImage: (index: number) => void;
  onEditImage: (url: string, index: number) => void;
}

const ModuloCard: React.FC<ModuloCardProps> = ({
  modulo,
  isEditing,
  isPreview,
  onEdit,
  onDelete,
  onSave,
  onCancelEdit,
  onTogglePreview,
  onImageUpload,
  onDeleteImage,
  onEditImage,
}) => {
  const [editTitulo, setEditTitulo] = useState(modulo.titulo);
  const [editDescripcion, setEditDescripcion] = useState(modulo.descripcion);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-4 md:p-6">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={editTitulo}
              onChange={(e) => setEditTitulo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              value={editDescripcion}
              onChange={(e) => setEditDescripcion(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
            />

            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={onImageUpload}
                className="hidden"
              />
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Imágenes ({modulo.imagenes.length})
              </label>
              
              {/* Mostrar imágenes existentes - MÁS GRANDES en edición */}
              {modulo.imagenes.length > 0 && (
                <div className="space-y-3 mb-4">
                  <label className="text-sm font-medium text-gray-700">Imágenes actuales:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {modulo.imagenes.map((imagen, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imagen}
                          alt={`Imagen ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg shadow-md"
                        />
                        {/* Botones grandes y visibles */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-4">
                          <button
                            onClick={() => onEditImage(imagen, index)}
                            className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transform hover:scale-110 transition-all shadow-xl"
                            title="Editar imagen"
                          >
                            <Edit2 className="w-6 h-6" />
                          </button>
                          <button
                            onClick={() => onDeleteImage(index)}
                            className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transform hover:scale-110 transition-all shadow-xl"
                            title="Eliminar imagen"
                          >
                            <Trash2 className="w-6 h-6" />
                          </button>
                        </div>
                        {/* Siempre visible en móviles */}
                        <div className="sm:hidden absolute bottom-2 right-2 flex gap-2">
                          <button
                            onClick={() => onEditImage(imagen, index)}
                            className="p-2 bg-blue-500 text-white rounded-full shadow-lg"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteImage(index)}
                            className="p-2 bg-red-500 text-white rounded-full shadow-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
                          Imagen {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Añadir más imágenes
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              <button
                onClick={() => onSave(editTitulo, editDescripcion)}
                className="w-full md:w-auto bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4 inline mr-2" />
                Guardar
              </button>
              <button
                onClick={onCancelEdit}
                className="w-full md:w-auto bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">{modulo.titulo}</h3>
                <p className="text-xs text-gray-500 md:text-sm">
                  Creado el {modulo.fechaCreacion.toLocaleDateString('es-ES')}
                </p>
              </div>

              <div className="flex gap-1 md:gap-2 ml-4">
                <button
                  onClick={onTogglePreview}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Vista previa"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={onEdit}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Editar"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={onDelete}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Eliminar"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {isPreview && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Vista previa completa:</h4>
                {modulo.imagenes.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {modulo.imagenes.map((imagen, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imagen}
                          alt={`${modulo.titulo} - Imagen ${index + 1}`}
                          className="w-full h-48 sm:h-64 md:h-72 object-cover rounded-lg shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 rounded-lg flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
                            <button
                              onClick={() => onEditImage(imagen, index)}
                              className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transform hover:scale-110 transition-all shadow-lg"
                              title="Editar imagen"
                            >
                              <Edit2 className="w-6 h-6" />
                            </button>
                            <button
                              onClick={() => onDeleteImage(index)}
                              className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transform hover:scale-110 transition-all shadow-lg"
                              title="Eliminar imagen"
                            >
                              <Trash2 className="w-6 h-6" />
                            </button>
                          </div>
                        </div>
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                          Imagen {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {modulo.descripcion && (
                  <div className="border-t pt-3">
                    <p className="text-sm text-gray-600 leading-relaxed">{modulo.descripcion}</p>
                  </div>
                )}
              </div>
            )}

            {!isPreview && (
              <>
                {modulo.imagenes.length > 0 && (
                  <div className="mb-4">
                    {/* Vista de miniaturas con botones más visibles */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {modulo.imagenes.map((imagen, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={imagen}
                            alt={`${modulo.titulo} - Imagen ${index + 1}`}
                            className="w-full h-32 sm:h-40 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow"
                          />
                          {/* Overlay con botones siempre visibles en móvil */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-2 right-2 flex gap-2">
                              <button
                                onClick={() => onEditImage(imagen, index)}
                                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-lg transform hover:scale-110 transition-all"
                                title="Editar"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => onDeleteImage(index)}
                                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg transform hover:scale-110 transition-all"
                                title="Eliminar"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          {/* Número de imagen */}
                          <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                            {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                    {modulo.imagenes.length > 0 && (
                      <p className="text-xs text-gray-500 mt-2">
                        {modulo.imagenes.length} {modulo.imagenes.length === 1 ? 'imagen' : 'imágenes'} • Haz clic en el ojo para ver más grande
                      </p>
                    )}
                  </div>
                )}

                <p className="text-gray-600 leading-relaxed line-clamp-3 text-sm">
                  {modulo.descripcion.length > 200
                    ? `${modulo.descripcion.substring(0, 200)}...`
                    : modulo.descripcion}
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InformesPage;
