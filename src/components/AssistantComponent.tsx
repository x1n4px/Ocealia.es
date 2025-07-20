import React, { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

import {
    Upload,
    Loader2,
    AlertCircle,
    CheckCircle,
    Eye,
    Lightbulb,
    Info,
    X,
    MessageCircle,
    Bot,
    HelpCircle,
    Droplets,
    Filter,
    ChevronRight,
    Image as ImageIcon
} from 'lucide-react';
import { callVisionAPI, callTextAPI } from '../service/gemini';
import { algaeList, type Alga, families } from '../data/algaeData';

type AssistantStep = 'welcome' | 'topic-selection' | 'upload' | 'description' | 'analyzing' | 'results';

type TopicOption = {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    requiresImage?: boolean;
};

const AlgaeAssistant: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<AssistantStep>('welcome');
    const [selectedTopic, setSelectedTopic] = useState<TopicOption | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [result, setResult] = useState<Alga | null>(null);
    const [textResponse, setTextResponse] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Topic options configuration
    const topicOptions: TopicOption[] = [
        {
            id: 'algae',
            title: 'Problemas con Algas',
            description: 'Identifica tipos de algas y obtén soluciones específicas',
            icon: Droplets,
            color: 'from-green-500 to-emerald-600',
            requiresImage: true
        },
        {
            id: 'general',
            title: 'Duda General',
            description: 'Preguntas generales sobre acuarismo y cuidado de peces',
            icon: HelpCircle,
            color: 'from-blue-500 to-blue-600'
        },
        {
            id: 'help',
            title: 'No sé qué hacer',
            description: 'Te ayudo a diagnosticar problemas en tu acuario',
            icon: AlertCircle,
            color: 'from-orange-500 to-red-500'
        },
        {
            id: 'filtration',
            title: 'Filtración',
            description: 'Dudas sobre sistemas de filtrado y mantenimiento',
            icon: Filter,
            color: 'from-purple-500 to-indigo-600'
        }
    ];

    const resetAssistant = () => {
        setCurrentStep('welcome');
        setSelectedTopic(null);
        setImageFile(null);
        setImagePreview(null);
        setDescription('');
        setResult(null);
        setTextResponse(null);
        setError(null);
    };

    const handleTopicSelection = (topic: TopicOption) => {
        setSelectedTopic(topic);
        if (topic.requiresImage) {
            setCurrentStep('upload');
        } else {
            setCurrentStep('description');
        }
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

    const generatePrompt = (topic: TopicOption, userDescription: string): string => {
        const baseContext = `Eres un experto en acuarismo y ayudas a usuarios con sus acuarios. Responde de forma útil, detallada y amigable.`;

        switch (topic.id) {
            case 'algae':
                return `${baseContext}
                
                Analiza esta imagen de algas en un acuario y ayuda a identificar el tipo de alga basándote en la descripción del usuario: "${userDescription}". 
                
                Por favor, compara con la siguiente lista de algas conocidas y devuelve ÚNICAMENTE el número ID de la alga más parecida:
                ${JSON.stringify(algaeList.map(alga => ({
                    id: alga.id,
                    name: alga.name,
                    family: alga.family,
                    visualDescription: alga.visualDescription,
                    scientificName: alga.scientificName
                })), null, 2)}
                
                Responde ÚNICAMENTE con el número ID de la alga más cercana, sin explicaciones adicionales.`;

            case 'general':
                return `${baseContext}
                
                El usuario tiene la siguiente consulta general sobre acuarismo: "${userDescription}"
                
                Por favor proporciona una respuesta completa y útil, incluyendo consejos prácticos, recomendaciones específicas y cualquier información relevante que pueda ayudar al usuario.`;

            case 'help':
                return `${baseContext}
                
                El usuario está confundido y no sabe qué hacer con su acuario. Describe su situación: "${userDescription}"
                
                Por favor:
                1. Haz un diagnóstico probable de la situación
                2. Sugiere pasos específicos a seguir
                3. Proporciona una lista de acciones prioritarias
                4. Menciona qué síntomas observar
                5. Incluye consejos preventivos para el futuro
                
                Sé muy específico y práctico en tus recomendaciones.`;

            case 'filtration':
                return `${baseContext}
                
                El usuario tiene consultas sobre filtración en su acuario: "${userDescription}"
                
                Por favor proporciona información detallada sobre:
                1. Tipos de filtración recomendados
                2. Mantenimiento adecuado
                3. Problemas comunes y soluciones
                4. Recomendaciones de productos si es relevante
                5. Frecuencia de limpieza y cambios
                6. Muy importanto mantener un filtro maduro, con 10 veces el caudal del acuario por hora y entre el 2% y el 5% de material biológico en relación al volumen del acuario..
                
                Incluye consejos prácticos y específicos para su situación.`;

            default:
                return `${baseContext} El usuario pregunta: "${userDescription}". Por favor responde de forma útil y detallada.`;
        }
    };

    const handleAnalyze = async () => {
        if (!selectedTopic) {
            setError('Por favor selecciona un tema.');
            return;
        }

        if (description.trim() === '') {
            setError('Por favor proporciona una descripción.');
            return;
        }

        // For algae topic, require image
        if (selectedTopic.id === 'algae' && !imageFile) {
            setError('Para problemas con algas, necesitas subir una imagen.');
            return;
        }

        setCurrentStep('analyzing');
        setError(null);

        try {
            const prompt = generatePrompt(selectedTopic, description);
            let response;

            // Use vision API if image is present, otherwise use text API
            if (imageFile) {
                response = await callVisionAPI(prompt, imageFile);
            } else {
                response = await callTextAPI(prompt);
            }

            // Handle algae identification specifically
            if (selectedTopic.id === 'algae' && imageFile) {
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
                } else {
                    setError('No se pudo identificar el alga. Por favor, intenta con otra imagen.');
                    setCurrentStep('description');
                    return;
                }
            } else {
                // Handle text-based responses
                let textContent = '';
                if (typeof response === 'object' && response.parts) {
                    textContent = response.parts;
                } else if (typeof response === 'string') {
                    textContent = response;
                } else {
                    textContent = 'Lo siento, no pude procesar tu consulta adecuadamente.';
                }
                setTextResponse(textContent);
            }

            setCurrentStep('results');
        } catch (error) {
            console.error('Error al procesar la consulta:', error);
            setError('Error al procesar tu consulta. Por favor, inténtalo de nuevo.');
            setCurrentStep('description');
        }

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
                <h2 className="text-3xl font-bold text-gray-800 mb-3">Nemo: Asistente IA para Acuarios</h2>
                <p className="text-gray-600 max-w-md mx-auto">
                    Te ayudo con consultas sobre algas, filtración, problemas generales y más. ¡Selecciona tu tipo de consulta!
                </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-800 mb-2">¿Qué tipo de consulta tienes?</h3>
                <p className="text-sm text-blue-700 max-w-sm mx-auto">
                    Selecciona una de las opciones para obtener análisis personalizado con IA.
                </p>
            </div>

            <button
                onClick={() => setCurrentStep('topic-selection')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
            >
                <ChevronRight className="w-5 h-5" />
                Continuar
            </button>
        </div>
    );

    const renderTopicSelection = () => (
        <div className="p-6">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Selecciona el tema de tu consulta
                </h3>
                <p className="text-gray-600">Elige la categoría que mejor describa tu problema o duda</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {topicOptions.map(option => {
                    const IconComponent = option.icon;
                    return (
                        <div
                            key={option.id}
                            onClick={() => handleTopicSelection(option)}
                            className={`cursor-pointer transition-all duration-300 hover:scale-105 bg-gradient-to-r ${option.color} text-white rounded-xl p-6 shadow-md hover:shadow-xl`}
                        >
                            <div className="flex items-start gap-4">
                                <div className="bg-transparent bg-opacity-20 p-3 rounded-lg">
                                    <IconComponent className="w-8 h-8" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-lg mb-2">{option.title}</h4>
                                    <p className="text-sm opacity-90 leading-relaxed">{option.description}</p>
                                    {option.requiresImage && (
                                        <div className="mt-2 flex items-center gap-1 text-xs opacity-80">
                                            <ImageIcon className="w-3 h-3" />
                                            <span>Requiere imagen</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 text-center">
                <button
                    onClick={resetAssistant}
                    className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                    Volver al inicio
                </button>
            </div>
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

    const getTopicInfo = () => {
        if (!selectedTopic) return { title: 'Describe tu consulta', placeholder: 'Describe tu problema o duda...', buttonText: 'Analizar' };

        switch (selectedTopic.id) {
            case 'algae':
                return {
                    title: 'Describe las algas que observas',
                    placeholder: 'Ejemplo: Veo filamentos verdes largos que salen de las plantas, son suaves al tacto y forman como telarañas...',
                    buttonText: 'Identificar Algas'
                };
            case 'general':
                return {
                    title: 'Cuéntanos tu duda',
                    placeholder: 'Ejemplo: ¿Qué peces son compatibles con los goldfish? ¿Cómo puedo bajar el pH de mi acuario?',
                    buttonText: 'Obtener Respuesta'
                };
            case 'help':
                return {
                    title: 'Describe la situación de tu acuario',
                    placeholder: 'Ejemplo: Mis peces están en el fondo sin moverse, el agua se ve turbia y huele mal. No sé qué está pasando...',
                    buttonText: 'Ayudarme a Diagnosticar'
                };
            case 'filtration':
                return {
                    title: 'Describe tu problema con la filtración',
                    placeholder: 'Ejemplo: Mi filtro hace mucho ruido, ¿cada cuánto debo cambiar los materiales filtrantes? ¿Qué tipo de filtro necesito para 200L?',
                    buttonText: 'Obtener Consejos'
                };
            default:
                return { title: 'Describe tu consulta', placeholder: 'Describe tu problema o duda...', buttonText: 'Analizar' };
        }
    };

    const renderDescription = () => {
        const topicInfo = getTopicInfo();

        return (
            <div className="p-6">
                {/* Topic header */}
                {selectedTopic && (
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${selectedTopic.color} text-white`}>
                                <selectedTopic.icon className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-medium text-gray-600">{selectedTopic.title}</span>
                        </div>
                    </div>
                )}

                <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{topicInfo.title}</h3>
                    <p className="text-gray-600">
                        {selectedTopic?.requiresImage
                            ? 'Proporciona detalles sobre lo que observas en la imagen.'
                            : 'Sé lo más detallado posible para obtener una mejor respuesta.'}
                    </p>
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
                        {selectedTopic?.requiresImage ? 'Descripción de lo que observas' : 'Tu consulta'}
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={topicInfo.placeholder}
                        className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        maxLength={500}
                    />
                    <p className="text-xs text-gray-500 mt-1">{description.length}/500 caracteres</p>
                </div>

                {/* Optional image upload for non-required topics */}
                {selectedTopic && !selectedTopic.requiresImage && (
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Imagen opcional
                        </label>
                        <div
                            className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:border-blue-300 transition-colors duration-200"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Sube una imagen si ayuda a explicar tu problema</p>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                )}

                {error && (
                    <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                <div className="flex justify-between gap-4">
                    <button
                        onClick={() => {
                            if (selectedTopic?.requiresImage) {
                                setCurrentStep('upload');
                            } else {
                                setCurrentStep('topic-selection');
                            }
                        }}
                        className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                        {selectedTopic?.requiresImage ? 'Cambiar imagen' : 'Cambiar tema'}
                    </button>
                    <button
                        onClick={handleAnalyze}
                        disabled={!description.trim() || description.trim().length < 10}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
                    >
                        <MessageCircle className="w-4 h-4" />
                        {topicInfo.buttonText}
                    </button>
                </div>
            </div>
        );
    };

    const renderAnalyzing = () => {
        const getAnalyzingText = () => {
            if (!selectedTopic) return { title: 'Procesando...', description: 'Analizando tu consulta...' };

            switch (selectedTopic.id) {
                case 'algae':
                    return {
                        title: 'Identificando algas...',
                        description: 'La IA está analizando la imagen y comparándola con nuestra base de datos de algas.'
                    };
                case 'general':
                    return {
                        title: 'Procesando consulta...',
                        description: 'La IA está analizando tu pregunta para proporcionarte la mejor respuesta.'
                    };
                case 'help':
                    return {
                        title: 'Diagnosticando problema...',
                        description: 'La IA está evaluando tu situación para ofrecerte un diagnóstico y solución.'
                    };
                case 'filtration':
                    return {
                        title: 'Analizando filtración...',
                        description: 'La IA está procesando tu consulta sobre sistemas de filtrado.'
                    };
                default:
                    return { title: 'Procesando...', description: 'Analizando tu consulta...' };
            }
        };

        const analyzingText = getAnalyzingText();

        return (
            <div className="p-8 text-center">
                <div className="mb-6">
                    <Loader2 className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{analyzingText.title}</h3>
                    <p className="text-gray-600">{analyzingText.description}</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-700">Esto puede tomar unos segundos...</p>
                </div>
            </div>
        );
    };

    const renderResults = () => {
        // Handle algae identification results
        if (result && selectedTopic?.id === 'algae') {
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
                            <Bot className="w-4 h-4" />
                            Nueva Consulta
                        </button>
                    </div>
                </div>
            );
        }

        // Handle text-based responses
        if (textResponse && selectedTopic) {
            const getResultTitle = () => {
                switch (selectedTopic.id) {
                    case 'general': return 'Respuesta del Experto';
                    case 'help': return 'Diagnóstico y Solución';
                    case 'filtration': return 'Consejos de Filtración';
                    default: return 'Respuesta';
                }
            };

            return (
                <div className="p-6">
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`p-3 rounded-lg bg-gradient-to-r ${selectedTopic.color} text-white`}>
                                <selectedTopic.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800">{getResultTitle()}</h3>
                                <p className="text-sm text-gray-600">{selectedTopic.title}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
                        <div className="prose max-w-none">
                            {/* Aquí es donde usas ReactMarkdown */}
                            <ReactMarkdown >
                                {textResponse}
                            </ReactMarkdown>
                        </div>
                    </div>


                    {imagePreview && (
                        <div className="mb-6">
                            <h5 className="font-semibold text-gray-800 mb-3">Imagen de referencia</h5>
                            <img
                                src={imagePreview}
                                alt="Imagen de consulta"
                                className="w-full max-w-md mx-auto rounded-lg shadow-md"
                            />
                        </div>
                    )}

                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => setCurrentStep('topic-selection')}
                            className="text-blue-600 hover:text-blue-800 px-6 py-2 rounded-lg transition-colors duration-200 inline-flex items-center gap-2"
                        >
                            <ChevronRight className="w-4 h-4 transform rotate-180" />
                            Cambiar Tema
                        </button>
                        <button
                            onClick={resetAssistant}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
                        >
                            <Bot className="w-4 h-4" />
                            Nueva Consulta
                        </button>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Bot className="w-6 h-6" />
                        <h1 className="text-xl font-bold">{selectedTopic ? `${selectedTopic.title} - Nemo` : 'Asistente IA para Acuarios'}</h1>
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
                {currentStep !== 'welcome' && currentStep !== 'topic-selection' && (
                    <div className="mt-4">
                        <div className="flex items-center gap-2 text-sm">
                            {selectedTopic?.requiresImage && (
                                <>
                                    <div className={`w-2 h-2 rounded-full ${currentStep === 'upload' ? 'bg-white' : 'bg-blue-400'}`}></div>
                                    <span>Subir</span>
                                    <div className="flex-1 h-0.5 bg-blue-400"></div>
                                </>
                            )}
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
                {currentStep === 'topic-selection' && renderTopicSelection()}
                {currentStep === 'upload' && renderUpload()}
                {currentStep === 'description' && renderDescription()}
                {currentStep === 'analyzing' && renderAnalyzing()}
                {currentStep === 'results' && renderResults()}
            </div>
        </div>
    );
};

export default AlgaeAssistant;
