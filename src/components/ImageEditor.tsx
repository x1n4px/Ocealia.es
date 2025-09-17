import React, { useState, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import type { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { 
  Crop as CropIcon, 
  RotateCw, 
  Save, 
  X, 
  Palette,
  RefreshCw
} from 'lucide-react';

interface ImageEditorProps {
  imageUrl: string;
  onSave: (editedImageUrl: string) => void;
  onCancel: () => void;
}

const ImageEditor: React.FC<ImageEditorProps> = ({ imageUrl, onSave, onCancel }) => {
  const [crop, setCrop] = useState<any>();
  const [completedCrop, setCompletedCrop] = useState<any>();
  const [rotation, setRotation] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawMode, setDrawMode] = useState<'pen' | null>(null);
  const [drawColor, setDrawColor] = useState('#ff0000');
  const [drawSize, setDrawSize] = useState(3);
  const [currentImage, setCurrentImage] = useState(imageUrl);
  
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Cargar imagen inicial en el canvas
    if (imgRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = imgRef.current;
      
      img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx?.drawImage(img, 0, 0);
      };
    }
  }, [currentImage]);

  const handleRotate = () => {
    const newRotation = (rotation + 90) % 360;
    setRotation(newRotation);
    
    if (canvasRef.current && imgRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = imgRef.current;
      
      // Ajustar dimensiones del canvas según la rotación
      if (newRotation % 180 === 90) {
        canvas.width = img.naturalHeight;
        canvas.height = img.naturalWidth;
      } else {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }
      
      ctx?.save();
      ctx?.translate(canvas.width / 2, canvas.height / 2);
      ctx?.rotate((newRotation * Math.PI) / 180);
      ctx?.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
      ctx?.restore();
      
      setCurrentImage(canvas.toDataURL('image/jpeg', 0.95));
    }
  };

  const handleCrop = () => {
    if (completedCrop && canvasRef.current && imgRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = imgRef.current;
      
      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;
      
      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;
      
      ctx?.drawImage(
        img,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );
      
      const croppedImage = canvas.toDataURL('image/jpeg', 0.95);
      setCurrentImage(croppedImage);
      setCrop(undefined);
      setCompletedCrop(undefined);
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawMode) return;
    setIsDrawing(true);
    
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.strokeStyle = drawColor;
    ctx.lineWidth = drawSize;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !drawMode) return;
    
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (drawMode === 'pen') {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleSave = () => {
    if (canvasRef.current) {
      const finalCanvas = document.createElement('canvas');
      const finalCtx = finalCanvas.getContext('2d');
      
      if (imgRef.current && finalCtx) {
        finalCanvas.width = imgRef.current.naturalWidth;
        finalCanvas.height = imgRef.current.naturalHeight;
        
        // Dibujar imagen base
        finalCtx.drawImage(imgRef.current, 0, 0);
        
        // Dibujar capa de dibujo si existe
        if (drawCanvasRef.current) {
          finalCtx.drawImage(drawCanvasRef.current, 0, 0);
        }
        
        const editedImage = finalCanvas.toDataURL('image/jpeg', 0.95);
        onSave(editedImage);
      }
    }
  };

  const resetImage = () => {
    setCurrentImage(imageUrl);
    setRotation(0);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setDrawMode(null);
    
    // Limpiar canvas de dibujo
    if (drawCanvasRef.current) {
      const ctx = drawCanvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, drawCanvasRef.current.width, drawCanvasRef.current.height);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Editor de Imagen</h3>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4">
          {/* Barra de herramientas */}
          <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-100 rounded-lg">
            <button
              onClick={() => setDrawMode(drawMode === 'pen' ? null : 'pen')}
              className={`p-2 rounded ${drawMode === 'pen' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'}`}
              title="Dibujar"
            >
              <Palette className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleRotate}
              className="p-2 bg-white hover:bg-gray-200 rounded"
              title="Rotar"
            >
              <RotateCw className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setCrop(crop ? undefined : { unit: '%', width: 50, height: 50, x: 25, y: 25 })}
              className={`p-2 rounded ${crop ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'}`}
              title="Recortar"
            >
              <CropIcon className="w-5 h-5" />
            </button>
            
            {crop && (
              <button
                onClick={handleCrop}
                className="p-2 bg-green-500 text-white hover:bg-green-600 rounded"
                title="Aplicar recorte"
              >
                Aplicar Recorte
              </button>
            )}
            
            <button
              onClick={resetImage}
              className="p-2 bg-white hover:bg-gray-200 rounded"
              title="Resetear"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            
            {drawMode && (
              <>
                <input
                  type="color"
                  value={drawColor}
                  onChange={(e) => setDrawColor(e.target.value)}
                  className="ml-4"
                  title="Color"
                />
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={drawSize}
                  onChange={(e) => setDrawSize(Number(e.target.value))}
                  className="w-24"
                  title="Tamaño"
                />
              </>
            )}
          </div>
          
          {/* Área de edición */}
          <div className="relative flex justify-center">
            {crop ? (
              <ReactCrop
                crop={crop}
                onChange={(c: Crop) => setCrop(c)}
                onComplete={(c: Crop) => setCompletedCrop(c)}
              >
                <img
                  ref={imgRef}
                  src={currentImage}
                  alt="Editar"
                  className="max-w-full max-h-[500px]"
                  style={{ transform: `rotate(${rotation}deg)` }}
                />
              </ReactCrop>
            ) : (
              <div className="relative">
                <img
                  ref={imgRef}
                  src={currentImage}
                  alt="Editar"
                  className="max-w-full max-h-[500px]"
                  style={{ transform: `rotate(${rotation}deg)` }}
                />
                {drawMode && (
                  <canvas
                    ref={drawCanvasRef}
                    className="absolute top-0 left-0 cursor-crosshair"
                    style={{ 
                      width: imgRef.current?.width,
                      height: imgRef.current?.height,
                      pointerEvents: 'auto'
                    }}
                    width={imgRef.current?.naturalWidth}
                    height={imgRef.current?.naturalHeight}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                  />
                )}
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
        
        <div className="p-4 border-t flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
