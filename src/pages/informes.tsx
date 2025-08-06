import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Download, 
  Upload, 
  Edit, 
  Save,
  X,
  FileImage,
  Eye
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ModuloInforme {
  id: string;
  titulo: string;
  descripcion: string;
  imagen?: string;
  fechaCreacion: Date;
}

const InformesPage: React.FC = () => {
  const [modulos, setModulos] = useState<ModuloInforme[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [nombreTienda, setNombreTienda] = useState('tienda');
  
  const [nuevoModulo, setNuevoModulo] = useState({
    titulo: '',
    descripcion: '',
    imagen: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfContentRef = useRef<HTMLDivElement>(null);

  // Crear nuevo módulo
  const handleCrearModulo = () => {
    if (nuevoModulo.titulo.trim() === '' || nuevoModulo.descripcion.trim() === '') {
      alert('Por favor, completa el título y la descripción');
      return;
    }

    const modulo: ModuloInforme = {
      id: Date.now().toString(),
      titulo: nuevoModulo.titulo,
      descripcion: nuevoModulo.descripcion,
      imagen: nuevoModulo.imagen,
      fechaCreacion: new Date()
    };

    setModulos([...modulos, modulo]);
    setNuevoModulo({ titulo: '', descripcion: '', imagen: '' });
    setIsCreating(false);
  };

  // Eliminar módulo
  const handleEliminarModulo = (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este módulo?')) {
      setModulos(modulos.filter(m => m.id !== id));
    }
  };

  // Manejar carga de imagen
  const handleImagenUpload = (event: React.ChangeEvent<HTMLInputElement>, isEditing: boolean = false) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        if (isEditing && editingId) {
          setModulos(modulos.map(m => 
            m.id === editingId ? { ...m, imagen: imageDataUrl } : m
          ));
        } else {
          setNuevoModulo({ ...nuevoModulo, imagen: imageDataUrl });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Editar módulo
  const handleEditarModulo = (id: string) => {
    setEditingId(id);
  };

  const handleGuardarEdicion = (id: string, titulo: string, descripcion: string) => {
    setModulos(modulos.map(m => 
      m.id === id ? { ...m, titulo, descripcion } : m
    ));
    setEditingId(null);
  };

  // Generar PDF
  const handleGenerarPDF = async () => {
    if (modulos.length === 0) {
      alert('No hay módulos para generar el PDF');
      return;
    }

    setIsGeneratingPDF(true);
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = margin;

      // Título del informe
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`Informe ${nombreTienda}`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      // Fecha de generación
      pdf.setFontSize(12);
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
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text(modulo.titulo, margin, yPosition);
        yPosition += 10;

        // Fecha de creación
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'italic');
        yPosition += 15;

        // Imagen si existe
        if (modulo.imagen) {
          try {
            const imgWidth = 60;
            const imgHeight = 45;
            
            // Verificar si hay espacio para la imagen
            if (yPosition + imgHeight > pageHeight - margin) {
              pdf.addPage();
              yPosition = margin;
            }
            
            pdf.addImage(modulo.imagen, 'JPEG', margin, yPosition, imgWidth, imgHeight);
            yPosition += imgHeight + 10;
          } catch (error) {
            console.error('Error agregando imagen al PDF:', error);
          }
        }

        // Descripción
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        
        const descripcionLines = pdf.splitTextToSize(modulo.descripcion, pageWidth - (margin * 2));
        
        // Verificar si hay espacio para la descripción
        const lineHeight = 6;
        const descripcionHeight = descripcionLines.length * lineHeight;
        if (yPosition + descripcionHeight > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        
        pdf.text(descripcionLines, margin, yPosition);
        yPosition += descripcionHeight + 15;

        // Línea separadora (excepto para el último módulo)
        if (i < modulos.length - 1) {
          if (yPosition > pageHeight - 30) {
            pdf.addPage();
            yPosition = margin;
          }
          pdf.setLineWidth(0.5);
          pdf.line(margin, yPosition, pageWidth - margin, yPosition);
          yPosition += 10;
        }
      }

      // Guardar PDF
      pdf.save(`informe-${nombreTienda}-${fechaGeneracion}.pdf`);
    } catch (error) {
      console.error('Error generando PDF:', error);
      alert('Error al generar el PDF. Por favor, intenta de nuevo.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Generador de Informes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Crea módulos informativos con título, descripción e imágenes, y genera un PDF profesional
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{modulos.length}</p>
                <p className="text-sm text-gray-600">Módulos Creados</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <FileImage className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {modulos.filter(m => m.imagen).length}
                </p>
                <p className="text-sm text-gray-600">Con Imágenes</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
            <button
              onClick={handleGenerarPDF}
              disabled={modulos.length === 0 || isGeneratingPDF}
              className="w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold shadow hover:from-purple-700 hover:to-purple-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGeneratingPDF ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generando...
                </div>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Generar PDF
                </>
              )}
            </button>
          </div>
        </div>

        {/* Botón para crear nuevo módulo */}
        {!isCreating && (
          <div className="mb-8 text-center">
            <button
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-semibold shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-6 h-6 mr-3" />
              Crear Nuevo Módulo
            </button>
          </div>
        )}

        {/* Input para nombre de tienda */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-4">
            <label htmlFor="nombreTienda" className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              Nombre de la tienda:
            </label>
            <input
              id="nombreTienda"
              type="text"
              value={nombreTienda}
              onChange={(e) => setNombreTienda(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
              placeholder="Ingresa el nombre de tu tienda"
            />
          </div>
        </div>

        {/* Formulario de creación */}
        {isCreating && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Nuevo Módulo</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={nuevoModulo.titulo}
                  onChange={(e) => setNuevoModulo({...nuevoModulo, titulo: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                  placeholder="Ingresa el título del módulo"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  value={nuevoModulo.descripcion}
                  onChange={(e) => setNuevoModulo({...nuevoModulo, descripcion: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 resize-none"
                  placeholder="Describe el contenido del módulo..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Imagen (Opcional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors duration-200">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImagenUpload(e)}
                    className="hidden"
                  />
                  
                  {nuevoModulo.imagen ? (
                    <div className="space-y-4">
                      <img
                        src={nuevoModulo.imagen}
                        alt="Vista previa"
                        className="max-w-xs mx-auto rounded-lg shadow"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Cambiar imagen
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Subir imagen
                      </button>
                      <p className="text-sm text-gray-500 mt-2">
                        JPG, PNG o GIF (máx. 5MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleCrearModulo}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200"
              >
                <Save className="w-5 h-5 inline mr-2" />
                Guardar Módulo
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setNuevoModulo({ titulo: '', descripcion: '', imagen: '' });
                }}
                className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-600 transition-colors duration-200"
              >
                <X className="w-5 h-5 inline mr-2" />
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Lista de módulos */}
        <div className="space-y-6">
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
              onImageUpload={(e) => handleImagenUpload(e, true)}
            />
          ))}
        </div>

        {modulos.length === 0 && !isCreating && (
          <div className="text-center py-16">
            <FileText className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-500 mb-4">
              No hay módulos creados
            </h3>
            <p className="text-gray-400 mb-8">
              Comienza creando tu primer módulo para el informe
            </p>
            <button
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-semibold shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
            >
              <Plus className="w-6 h-6 mr-3" />
              Crear Primer Módulo
            </button>
          </div>
        )}

        {/* Contenido oculto para PDF */}
        <div ref={pdfContentRef} style={{ position: 'absolute', left: '-9999px' }}>
          <div style={{ width: '794px', padding: '40px', backgroundColor: 'white', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px', color: '#1f2937' }}>
              Informe Acuariofilia
            </h1>
            <p style={{ textAlign: 'center', fontSize: '12px', marginBottom: '30px', color: '#6b7280' }}>
              Generado el: {new Date().toLocaleDateString('es-ES')}
            </p>
            
            {modulos.map((modulo, index) => (
              <div key={modulo.id} style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#1f2937' }}>
                  {modulo.titulo}
                </h2>
                <p style={{ fontSize: '10px', fontStyle: 'italic', marginBottom: '15px', color: '#6b7280' }}>
                  Creado: {modulo.fechaCreacion.toLocaleDateString('es-ES')}
                </p>
                {modulo.imagen && (
                  <div style={{ marginBottom: '15px' }}>
                    <img 
                      src={modulo.imagen} 
                      alt={modulo.titulo}
                      style={{ maxWidth: '300px', height: 'auto', borderRadius: '8px' }}
                    />
                  </div>
                )}
                <p style={{ fontSize: '11px', lineHeight: '1.6', color: '#374151' }}>
                  {modulo.descripcion}
                </p>
                {index < modulos.length - 1 && (
                  <hr style={{ margin: '30px 0', border: 'none', borderTop: '1px solid #e5e7eb' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
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
  onImageUpload
}) => {
  const [editTitulo, setEditTitulo] = useState(modulo.titulo);
  const [editDescripcion, setEditDescripcion] = useState(modulo.descripcion);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={editTitulo}
              onChange={(e) => setEditTitulo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <textarea
              value={editDescripcion}
              onChange={(e) => setEditDescripcion(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Cambiar imagen
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onSave(editTitulo, editDescripcion)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <Save className="w-4 h-4 inline mr-2" />
                Guardar
              </button>
              <button
                onClick={onCancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{modulo.titulo}</h3>
                <p className="text-sm text-gray-500">
                  Creado el {modulo.fechaCreacion.toLocaleDateString('es-ES')} a las {modulo.fechaCreacion.toLocaleTimeString('es-ES')}
                </p>
              </div>
              
              <div className="flex gap-2 ml-4">
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
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Vista previa:</h4>
                {modulo.imagen && (
                  <div className="mb-3">
                    <img
                      src={modulo.imagen}
                      alt={modulo.titulo}
                      className="max-w-xs rounded-lg shadow"
                    />
                  </div>
                )}
                <p className="text-sm text-gray-600 leading-relaxed">
                  {modulo.descripcion}
                </p>
              </div>
            )}

            {!isPreview && (
              <>
                {modulo.imagen && (
                  <div className="mb-4">
                    <img
                      src={modulo.imagen}
                      alt={modulo.titulo}
                      className="w-32 h-24 object-cover rounded-lg shadow"
                    />
                  </div>
                )}
                
                <p className="text-gray-600 leading-relaxed line-clamp-3">
                  {modulo.descripcion.length > 200 
                    ? `${modulo.descripcion.substring(0, 200)}...` 
                    : modulo.descripcion
                  }
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
