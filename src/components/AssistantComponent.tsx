import React, { useState, useRef } from 'react';
import {
    Camera,
    Upload,
    Loader2,
    AlertCircle,
    CheckCircle,
    Eye,
    Lightbulb,
    Info,
    X,
    MessageCircle,
    Bot
} from 'lucide-react';
import { callVisionAPI } from '../service/gemini';
import { algaeList, type Alga, families } from '../data/algaeData';

type AssistantStep = 'welcome' | 'upload' | 'description' | 'analyzing' | 'results';

const AlgaeAssistant: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<AssistantStep>('welcome');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [result, setResult] = useState<Alga | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const resetAssistant = () => {
        setCurrentStep('welcome');
        setImageFile(null);
        setImagePreview(null);
        setDescription('');
        setResult(null);
        setLoading(false);
        setError(null);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
                setCurrentStep('description');
            };
            reader.readAsDataURL(file);
            setError(null);
        }
    };

    const handleAnalyze = async () => {
        if (!imageFile || description.trim() === '') {
            setError('Por favor carga una imagen y proporciona una descripción.');
            return;
        }

        setCurrentStep('analyzing');
        setLoading(true);
        setError(null);

        try {
            // Create a detailed prompt for the AI
            const prompt = `Analiza esta imagen de algas en un acuario y ayuda a identificar el tipo de alga basándote en la descripción del usuario: "${description}". 
            
            Por favor, compara con la siguiente lista de algas conocidas y devuelve ÚNICAMENTE el número ID de la alga más parecida:
            ${JSON.stringify(algaeList.map(alga => ({
                id: alga.id,
                name: alga.name,
                family: alga.family,
                visualDescription: alga.visualDescription,
                scientificName: alga.scientificName
            })), null, 2)}
            
            Responde ÚNICAMENTE con el número ID de la alga más cercana, sin explicaciones adicionales.`;

            const response = await callVisionAPI(prompt, imageFile);
            
            // Extract ID from response
            let algaeId: number;
            if (typeof response === 'object' && response.parts) {
                const content = response.parts;
                algaeId = parseInt(content.match(/\d+/)?.[0] || '1');
            } else {
                algaeId = parseInt(response.toString().match(/\d+/)?.[0] || '1');
            }
            
            const identifiedAlga = algaeList.find(alga => alga.id === algaeId);
            
            if (identifiedAlga) {
                setResult(identifiedAlga);
                setCurrentStep('results');
            } else {
                setError('No se pudo identificar el alga. Por favor, intenta con otra imagen.');
                setCurrentStep('description');
            }
        } catch (error) {
            console.error('Error al analizar la imagen:', error);
            setError('Error al procesar la imagen. Por favor, inténtalo de nuevo.');
            setCurrentStep('description');
        }
        
        setLoading(false);
    };

    const getDifficultyColor = (difficulty: Alga['difficulty']): string => {
        switch (difficulty) {
            case 'Fácil': return 'text-green-700 bg-green-100';
            case 'Moderado': return 'text-yellow-700 bg-yellow-100';
            case 'Difícil': return 'text-orange-700 bg-orange-100';
            case 'Muy Difícil': return 'text-red-700 bg-red-100';
            default: return 'text-gray-700 bg-gray-100';
        }
    };

    const getDangerColor = (level: Alga['dangerLevel']): string => {
        switch (level) {
            case 'Muy Bajo': return 'text-green-700 bg-green-100';
            case 'Bajo': return 'text-blue-700 bg-blue-100';
            case 'Medio': return 'text-yellow-700 bg-yellow-100';
            case 'Alto': return 'text-orange-700 bg-orange-100';
            case 'Muy Alto': return 'text-red-700 bg-red-100';
            default: return 'text-gray-700 bg-gray-100';
        }
    };

    const getFamilyColor = (family: string): string => {
        const familyData = families.find(f => f.id === family);
        switch (familyData?.color) {
            case 'green': return 'bg-green-100 text-green-700';
            case 'yellow': return 'bg-yellow-100 text-yellow-700';
            case 'blue': return 'bg-blue-100 text-blue-700';
            case 'red': return 'bg-red-100 text-red-700';
            case 'emerald': return 'bg-emerald-100 text-emerald-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const renderWelcome = () => (
        <div className="text-center p-8">
            <div className="mb-6">
                <Bot className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Asistente de Análisis de Algas</h2>
                <p className="text-gray-600 max-w-md mx-auto">
                    Sube una foto de las algas en tu acuario y te ayudaré a identificar el tipo y te daré recomendaciones específicas.
                </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-800 mb-2">¿Cómo funciona?</h3>
                <ol className="text-sm text-blue-700 text-left max-w-sm mx-auto">
                    <li className="mb-1">📸 Sube una foto clara de las algas</li>
                    <li className="mb-1">📝 Describe lo que ves</li>
                    <li className="mb-1">🤖 La IA analizará la imagen</li>
                    <li>💡 Recibirás identificación y soluciones</li>
                </ol>
            </div>

            <button
                onClick={() => setCurrentStep('upload')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
            >
                <Camera className="w-5 h-5" />
                Empezar Análisis
            </button>
        </div>
    );

    const renderUpload = () => (
        <div className="p-6">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Sube una foto de las algas</h3>
                <p className="text-gray-600">Toma una foto clara donde se puedan ver bien las algas en tu acuario.</p>
            </div>

            <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200"
                onClick={() => fileInputRef.current?.click()}
            >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Haz clic para subir una imagen</p>
                <p className="text-sm text-gray-400">PNG, JPG, JPEG - Máximo 10MB</p>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
            />

            {error && (
                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            <div className="mt-6 flex justify-between">
                <button
                    onClick={resetAssistant}
                    className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                    Volver
                </button>
            </div>
        </div>
    );

    const renderDescription = () => (
        <div className="p-6">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Describe lo que observas</h3>
                <p className="text-gray-600">Proporciona detalles sobre el color, textura, ubicación y cualquier característica que notes.</p>
            </div>

            {imagePreview && (
                <div className="mb-6">
                    <img 
                        src={imagePreview} 
                        alt="Vista previa" 
                        className="w-full max-w-md mx-auto rounded-lg shadow-md" 
                    />
                </div>
            )}

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción de las algas
                </label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Ejemplo: Veo filamentos verdes largos que salen de las plantas, son suaves al tacto y forman como telarañas..."
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">{description.length}/500 caracteres</p>
            </div>

            {error && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            <div className="flex justify-between gap-4">
                <button
                    onClick={() => setCurrentStep('upload')}
                    className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                    Cambiar imagen
                </button>
                <button
                    onClick={handleAnalyze}
                    disabled={!description.trim() || description.trim().length < 10}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
                >
                    <MessageCircle className="w-4 h-4" />
                    Analizar Algas
                </button>
            </div>
        </div>
    );

    const renderAnalyzing = () => (
        <div className="p-8 text-center">
            <div className="mb-6">
                <Loader2 className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Analizando imagen...</h3>
                <p className="text-gray-600">La IA está procesando tu imagen y comparándola con nuestra base de datos de algas.</p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700">Esto puede tomar unos segundos...</p>
            </div>
        </div>
    );

    const renderResults = () => {
        if (!result) return null;

        const familyData = families.find(f => f.id === result.family);

        return (
            <div className="p-6">
                <div className="mb-6 text-center">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <h3 className="text-2xl font-bold text-gray-800">¡Alga Identificada!</h3>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
                    <div className="relative h-48 overflow-hidden">
                        <img 
                            src={result.image} 
                            alt={result.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    
                    <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getFamilyColor(result.family)}`}>
                                {familyData?.name}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(result.difficulty)}`}>
                                {result.difficulty}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDangerColor(result.dangerLevel)}`}>
                                Peligro: {result.dangerLevel}
                            </span>
                        </div>
                        
                        <h4 className="text-xl font-bold text-gray-800 mb-2">{result.name}</h4>
                        <p className="text-sm text-gray-500 mb-3 italic">{result.scientificName}</p>
                        <p className="text-gray-700 mb-4">{result.description}</p>
                        
                        {result.visualDescription && (
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Eye className="w-4 h-4 text-blue-600" />
                                    <h5 className="font-semibold text-gray-800">Descripción Visual</h5>
                                </div>
                                <p className="text-sm text-gray-700 pl-6">{result.visualDescription}</p>
                            </div>
                        )}
                        
                        {result.impact && (
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Info className="w-4 h-4 text-blue-600" />
                                    <h5 className="font-semibold text-gray-800">Impacto</h5>
                                </div>
                                <p className="text-sm text-gray-700 pl-6">{result.impact}</p>
                            </div>
                        )}
                        
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertCircle className="w-4 h-4 text-orange-600" />
                                <h5 className="font-semibold text-gray-800">Causas Principales</h5>
                            </div>
                            <ul className="text-sm text-gray-700 pl-6 space-y-1">
                                {result.causes.map((cause, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                                        {cause}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Lightbulb className="w-4 h-4 text-green-600" />
                                <h5 className="font-semibold text-gray-800">Soluciones</h5>
                            </div>
                            <ul className="text-sm text-gray-700 pl-6 space-y-1">
                                {result.solutions.map((solution, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                        {solution}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="mb-4">
                            <h5 className="font-semibold text-gray-800 mb-2">Prevención</h5>
                            <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">{result.prevention}</p>
                        </div>
                        
                        {result.warnings && result.warnings.length > 0 && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <h5 className="font-semibold text-yellow-800 mb-2">⚠️ Advertencias</h5>
                                <ul className="text-sm text-yellow-700 space-y-1">
                                    {result.warnings.map((warning, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></span>
                                            {warning}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={resetAssistant}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
                    >
                        <Camera className="w-4 h-4" />
                        Analizar Otra Alga
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Bot className="w-6 h-6" />
                        <h1 className="text-xl font-bold">Asistente de Algas IA</h1>
                    </div>
                    {currentStep !== 'welcome' && (
                        <button
                            onClick={resetAssistant}
                            className="p-2 hover:bg-blue-800 rounded-lg transition-colors duration-200"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>
                
                {/* Progress indicator */}
                {currentStep !== 'welcome' && (
                    <div className="mt-4">
                        <div className="flex items-center gap-2 text-sm">
                            <div className={`w-2 h-2 rounded-full ${currentStep === 'upload' ? 'bg-white' : 'bg-blue-400'}`}></div>
                            <span>Subir</span>
                            <div className="flex-1 h-0.5 bg-blue-400"></div>
                            <div className={`w-2 h-2 rounded-full ${currentStep === 'description' ? 'bg-white' : currentStep === 'analyzing' || currentStep === 'results' ? 'bg-blue-400' : 'bg-blue-500'}`}></div>
                            <span>Describir</span>
                            <div className="flex-1 h-0.5 bg-blue-400"></div>
                            <div className={`w-2 h-2 rounded-full ${currentStep === 'analyzing' ? 'bg-white animate-pulse' : currentStep === 'results' ? 'bg-white' : 'bg-blue-500'}`}></div>
                            <span>Analizar</span>
                            <div className="flex-1 h-0.5 bg-blue-400"></div>
                            <div className={`w-2 h-2 rounded-full ${currentStep === 'results' ? 'bg-white' : 'bg-blue-500'}`}></div>
                            <span>Resultados</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="min-h-96">
                {currentStep === 'welcome' && renderWelcome()}
                {currentStep === 'upload' && renderUpload()}
                {currentStep === 'description' && renderDescription()}
                {currentStep === 'analyzing' && renderAnalyzing()}
                {currentStep === 'results' && renderResults()}
            </div>
        </div>
    );
};

export default AlgaeAssistant;
