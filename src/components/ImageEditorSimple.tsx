import React, { useState, useRef, useEffect } from 'react';
import { 
  RotateCw, 
  Save, 
  X, 
  Palette,
  RefreshCw,
  Crop as CropIcon,
  Check,
  XCircle
} from 'lucide-react';

interface ImageEditorProps {
  imageUrl: string;
  onSave: (editedImageUrl: string) => void;
  onCancel: () => void;
}

const ImageEditorSimple: React.FC<ImageEditorProps> = ({ imageUrl, onSave, onCancel }) => {
  const [rotation, setRotation] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawEnabled, setDrawEnabled] = useState(false);
  const [drawColor, setDrawColor] = useState('#ff0000');
  const [drawSize, setDrawSize] = useState(3);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [cropMode, setCropMode] = useState(false);
  const [cropStart, setCropStart] = useState<{ x: number; y: number } | null>(null);
  const [cropEnd, setCropEnd] = useState<{ x: number; y: number } | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
  const cropCanvasRef = useRef<HTMLCanvasElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      if (canvasRef.current && drawingCanvasRef.current && cropCanvasRef.current) {
        const canvas = canvasRef.current;
        const drawCanvas = drawingCanvasRef.current;
        const cropCanvas = cropCanvasRef.current;
        
        canvas.width = img.width;
        canvas.height = img.height;
        drawCanvas.width = img.width;
        drawCanvas.height = img.height;
        cropCanvas.width = img.width;
        cropCanvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
        }
      }
    };
    img.src = croppedImageUrl || imageUrl;
    if (imageRef.current) {
      imageRef.current.src = croppedImageUrl || imageUrl;
    }
  }, [imageUrl, croppedImageUrl]);

  const handleRotate = () => {
    const newRotation = (rotation + 90) % 360;
    setRotation(newRotation);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = cropMode ? cropCanvasRef.current : drawingCanvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    
    if (cropMode) {
      setIsCropping(true);
      setCropStart({ x, y });
      setCropEnd({ x, y });
    } else if (drawEnabled) {
      setIsDrawing(true);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      ctx.strokeStyle = drawColor;
      ctx.lineWidth = drawSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = cropMode ? cropCanvasRef.current : drawingCanvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    
    if (cropMode && isCropping) {
      setCropEnd({ x, y });
      
      // Dibujar rectángulo de selección
      const ctx = canvas.getContext('2d');
      if (ctx && cropStart) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#0066ff';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(
          cropStart.x,
          cropStart.y,
          x - cropStart.x,
          y - cropStart.y
        );
        // Área semitransparente fuera de la selección
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.clearRect(
          Math.min(cropStart.x, x),
          Math.min(cropStart.y, y),
          Math.abs(x - cropStart.x),
          Math.abs(y - cropStart.y)
        );
      }
    } else if (isDrawing && drawEnabled) {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setIsCropping(false);
  };

  const applyCrop = () => {
    if (!cropStart || !cropEnd || !imageRef.current) return;
    
    const img = imageRef.current;
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    
    if (!tempCtx) return;
    
    // Calcular dimensiones del recorte
    const x = Math.min(cropStart.x, cropEnd.x);
    const y = Math.min(cropStart.y, cropEnd.y);
    const width = Math.abs(cropEnd.x - cropStart.x);
    const height = Math.abs(cropEnd.y - cropStart.y);
    
    if (width < 10 || height < 10) {
      alert('El área de recorte es demasiado pequeña');
      return;
    }
    
    tempCanvas.width = width;
    tempCanvas.height = height;
    
    // Dibujar la porción recortada
    tempCtx.drawImage(
      img,
      x, y, width, height,
      0, 0, width, height
    );
    
    const croppedDataUrl = tempCanvas.toDataURL('image/jpeg', 0.95);
    setCroppedImageUrl(croppedDataUrl);
    
    // Limpiar selección
    setCropMode(false);
    setCropStart(null);
    setCropEnd(null);
    
    // Limpiar canvas de recorte
    if (cropCanvasRef.current) {
      const ctx = cropCanvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, cropCanvasRef.current.width, cropCanvasRef.current.height);
    }
  };

  const cancelCrop = () => {
    setCropMode(false);
    setCropStart(null);
    setCropEnd(null);
    
    // Limpiar canvas de recorte
    if (cropCanvasRef.current) {
      const ctx = cropCanvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, cropCanvasRef.current.width, cropCanvasRef.current.height);
    }
  };

  const handleSave = () => {
    const finalCanvas = document.createElement('canvas');
    const finalCtx = finalCanvas.getContext('2d');
    
    if (!finalCtx || !imageRef.current) return;
    
    const img = imageRef.current;
    
    // Calcular dimensiones según rotación
    if (rotation % 180 === 0) {
      finalCanvas.width = img.naturalWidth;
      finalCanvas.height = img.naturalHeight;
    } else {
      finalCanvas.width = img.naturalHeight;
      finalCanvas.height = img.naturalWidth;
    }
    
    // Aplicar rotación
    finalCtx.save();
    finalCtx.translate(finalCanvas.width / 2, finalCanvas.height / 2);
    finalCtx.rotate((rotation * Math.PI) / 180);
    
    // Aplicar filtros
    finalCtx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;
    
    // Dibujar imagen
    if (rotation % 180 === 0) {
      finalCtx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
    } else {
      finalCtx.drawImage(img, -img.naturalHeight / 2, -img.naturalWidth / 2);
    }
    
    finalCtx.restore();
    
    // Aplicar dibujos si existen
    if (drawingCanvasRef.current) {
      finalCtx.save();
      finalCtx.translate(finalCanvas.width / 2, finalCanvas.height / 2);
      finalCtx.rotate((rotation * Math.PI) / 180);
      
      if (rotation % 180 === 0) {
        finalCtx.drawImage(
          drawingCanvasRef.current,
          -drawingCanvasRef.current.width / 2,
          -drawingCanvasRef.current.height / 2
        );
      } else {
        finalCtx.drawImage(
          drawingCanvasRef.current,
          -drawingCanvasRef.current.height / 2,
          -drawingCanvasRef.current.width / 2
        );
      }
      finalCtx.restore();
    }
    
    const editedImage = finalCanvas.toDataURL('image/jpeg', 0.95);
    onSave(editedImage);
  };

  const resetImage = () => {
    setRotation(0);
    setBrightness(100);
    setContrast(100);
    setDrawEnabled(false);
    setCropMode(false);
    setCropStart(null);
    setCropEnd(null);
    setCroppedImageUrl(null);
    
    // Limpiar canvas de dibujo
    if (drawingCanvasRef.current) {
      const ctx = drawingCanvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, drawingCanvasRef.current.width, drawingCanvasRef.current.height);
    }
    
    // Limpiar canvas de recorte
    if (cropCanvasRef.current) {
      const ctx = cropCanvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, cropCanvasRef.current.width, cropCanvasRef.current.height);
    }
    
    // Recargar imagen original
    if (imageRef.current) {
      imageRef.current.style.filter = 'none';
      imageRef.current.src = imageUrl;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-2 md:p-4">
      <div className="bg-white rounded-lg w-full max-w-full md:max-w-5xl h-full md:h-auto md:max-h-[90vh] overflow-auto">
        <div className="p-3 md:p-4 border-b flex justify-between items-center bg-gray-50">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800">Editor de Imagen</h3>
          <button onClick={onCancel} className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-3 md:p-6">
          {/* Barra de herramientas */}
          <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6 p-3 md:p-4 bg-gray-100 rounded-lg">
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              <button
                onClick={() => {
                  setDrawEnabled(!drawEnabled);
                  if (cropMode) setCropMode(false);
                }}
                className={`px-3 py-2 text-sm md:text-base md:px-4 rounded-lg font-medium transition-colors ${
                  drawEnabled 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'bg-white hover:bg-gray-200'
                }`}
                title="Dibujar"
              >
                <Palette className="w-4 h-4 md:w-5 md:h-5 inline mr-1 md:mr-2" />
                Dibujar
              </button>
              
              <button
                onClick={() => {
                  setCropMode(!cropMode);
                  if (drawEnabled) setDrawEnabled(false);
                  if (!cropMode) {
                    setCropStart(null);
                    setCropEnd(null);
                  }
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  cropMode 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-white hover:bg-gray-200'
                }`}
                title="Recortar"
              >
                <CropIcon className="w-4 h-4 md:w-5 md:h-5 inline mr-1 md:mr-2" />
                Recortar
              </button>
              
              {cropMode && cropStart && cropEnd && (
                <>
                  <button
                    onClick={applyCrop}
                    className="px-3 py-2 text-sm md:text-base md:px-4 bg-green-600 text-white hover:bg-green-700 rounded-lg font-medium transition-colors"
                    title="Aplicar recorte"
                  >
                    <Check className="w-4 h-4 inline mr-2" />
                    Aplicar
                  </button>
                  <button
                    onClick={cancelCrop}
                    className="px-3 py-2 text-sm md:text-base md:px-4 bg-red-500 text-white hover:bg-red-600 rounded-lg font-medium transition-colors"
                    title="Cancelar recorte"
                  >
                    <XCircle className="w-4 h-4 inline mr-2" />
                    Cancelar
                  </button>
                </>
              )}
              
              <button
                onClick={handleRotate}
                className="px-3 py-2 text-sm md:text-base md:px-4 bg-white hover:bg-gray-200 rounded-lg font-medium transition-colors"
                title="Rotar 90°"
              >
                <RotateCw className="w-4 h-4 md:w-5 md:h-5 inline mr-1 md:mr-2" />
                Rotar
              </button>
              
              <button
                onClick={resetImage}
                className="px-3 py-2 text-sm md:text-base md:px-4 bg-white hover:bg-gray-200 rounded-lg font-medium transition-colors"
                title="Resetear cambios"
              >
                <RefreshCw className="w-4 h-4 md:w-5 md:h-5 inline mr-1 md:mr-2" />
                Resetear
              </button>
            </div>
            
            {drawEnabled && (
              <div className="flex items-center gap-4 ml-auto">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Color:</label>
                  <input
                    type="color"
                    value={drawColor}
                    onChange={(e) => setDrawColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Tamaño:</label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={drawSize}
                    onChange={(e) => setDrawSize(Number(e.target.value))}
                    className="w-24"
                  />
                  <span className="text-sm font-medium w-8">{drawSize}</span>
                </div>
              </div>
            )}
            
            {cropMode && (
              <div className="ml-auto text-sm text-gray-600">
                <span className="font-medium">Modo recorte activado:</span> Arrastra para seleccionar el área
              </div>
            )}
          </div>
          
          {/* Controles de ajuste */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4 md:mb-6 p-3 md:p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Brillo: {brightness}%</label>
              <input
                type="range"
                min="50"
                max="150"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Contraste: {contrast}%</label>
              <input
                type="range"
                min="50"
                max="150"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          
          {/* Área de edición */}
          <div className="relative flex justify-center bg-gray-100 rounded-lg p-2 md:p-4" style={{ minHeight: '300px', maxHeight: '50vh' }}>
            <div className="relative">
              <img
                ref={imageRef}
                src={croppedImageUrl || imageUrl}
                alt="Editar"
                className="max-w-full max-h-[40vh] md:max-h-[500px] object-contain"
                style={{ 
                  transform: `rotate(${rotation}deg)`,
                  filter: `brightness(${brightness}%) contrast(${contrast}%)`,
                  display: imageLoaded ? 'block' : 'none'
                }}
              />
              <canvas
                ref={drawingCanvasRef}
                className="absolute top-0 left-0"
                style={{ 
                  width: imageRef.current?.width,
                  height: imageRef.current?.height,
                  transform: `rotate(${rotation}deg)`,
                  pointerEvents: drawEnabled ? 'auto' : 'none',
                  cursor: drawEnabled ? 'crosshair' : 'default',
                  opacity: drawEnabled ? 1 : 0
                }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
              <canvas
                ref={cropCanvasRef}
                className="absolute top-0 left-0"
                style={{ 
                  width: imageRef.current?.width,
                  height: imageRef.current?.height,
                  transform: `rotate(${rotation}deg)`,
                  pointerEvents: cropMode ? 'auto' : 'none',
                  cursor: cropMode ? 'crosshair' : 'default',
                  opacity: cropMode ? 1 : 0
                }}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
            </div>
            <canvas ref={canvasRef} className="hidden" />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-500">Cargando imagen...</div>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 border-t flex justify-end gap-3 bg-gray-50">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditorSimple;
