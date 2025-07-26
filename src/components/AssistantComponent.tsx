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
    Image as ImageIcon,
    Fish as FishIcon,
    Home
} from 'lucide-react';
import { callVisionAPI, callTextAPI } from '../service/gemini';
import { algaeList, type Alga, families } from '../data/algaeData';
import { fishList, type Fish } from '../data/fishData';
import { COMMUNITY_WATER_PARAMETERS } from '../data/communityParameters';
import { fishDiseaseList, type FishDisease } from '../data/fishDiseaseData'

type AssistantStep = 'welcome' | 'topic-selection' | 'upload' | 'description' | 'fish-selection' | 'analyzing' | 'results';

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
    const [fishDiseaseResult, setFishDiseaseResult] = useState<FishDisease | null>(null);
    const [textResponse, setTextResponse] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fish selection states
    const [selectedFish, setSelectedFish] = useState<Fish[]>([]);
    // const [selectedCommunity, setSelectedCommunity] = useState<any>(null);
    const [customPh, setCustomPh] = useState('');
    const [customKh, setCustomKh] = useState('');
    const [customGh, setCustomGh] = useState('');
    const [tankVolume, setTankVolume] = useState('');

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
            id: 'diseases',
            title: 'Enfermedades de Peces',
            description: 'Consulta sobre enfermedades comunes y sus tratamientos',
            icon: Home,
            color: 'from-red-500 to-pink-600',
            requiresImage: true
        },
        {
            id: 'fish-selection',
            title: 'Selección de Peces',
            description: 'Recibe recomendaciones de combinaciones de peces para tu acuario',
            icon: FishIcon,
            color: 'from-teal-500 to-cyan-600'
        },
        {
            id: 'general',
            title: 'Duda General',
            description: 'Preguntas generales sobre acuarismo y cuidado de peces',
            icon: HelpCircle,
            color: 'from-blue-500 to-blue-400'
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
        setFishDiseaseResult(null);
        setTextResponse(null);
        setError(null);
        // Reset fish selection states
        setSelectedFish([]);
        // setSelectedCommunity(null);
        setCustomPh('');
        setCustomKh('');
        setCustomGh('');
        setTankVolume('');
    };

    const handleTopicSelection = (topic: TopicOption) => {
        setSelectedTopic(topic);
        if (topic.requiresImage) {
            setCurrentStep('upload');
        } else if (topic.id === 'fish-selection') {
            setCurrentStep('fish-selection');
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

    const handleFishSelection = (fish: Fish) => {
        setSelectedFish(prev => {
            const isSelected = prev.some(f => f.id === fish.id);
            if (isSelected) {
                return prev.filter(f => f.id !== fish.id);
            } else {
                return [...prev, fish];
            }
        });
    };

    const handleCommunityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (event.target.value === '') {
            //setSelectedCommunity(null);
            return;
        }
        const community = COMMUNITY_WATER_PARAMETERS.find(c => c.name === event.target.value);
        if (community) {
            //setSelectedCommunity(community);
            setCustomPh(community.parameters.ph.toString());
            setCustomKh(community.parameters.kh.toString());
            setCustomGh(community.parameters.gh.toString());
        }
    };

    const generatePrompt = (topic: TopicOption, userDescription: string): string => {
        const baseContext = `Eres un experto en acuarismo. Responde de forma concisa y directa.`;

        switch (topic.id) {
            case 'algae':
                return `${baseContext}
                
                Identifica el tipo de alga en esta imagen basándote en: "${userDescription}". 
                
                Lista de algas:
                ${JSON.stringify(algaeList.map(alga => ({
                    id: alga.id,
                    name: alga.name,
                    family: alga.family,
                    visualDescription: alga.visualDescription
                })), null, 2)}
                
                Responde SOLO con el número ID del alga más parecida.`;
            case 'diseases':
                return `${baseContext}
                
                Identifica el tipo de enfermedad en esta imagen basándote en: "${userDescription}". 
                
                Lista de enfermedades:
                ${JSON.stringify(fishDiseaseList.map(disease => ({
                    id: disease.id,
                    name: disease.name,
                    scientificName: disease.scientificName,
                    category: disease.category,
                    visualDescription: disease.visualSymptoms
                })), null, 2)}
                
                Responde SOLO con el número ID de la enfermedad más parecida.`;

            case 'general':
                return `${baseContext}
                
                Pregunta: "${userDescription}"
                
                Responde de forma clara y práctica. Incluye:
                - Respuesta directa
                - 2-3 consejos específicos
                - Una advertencia importante si aplica
                
                Máximo 150 palabras.`;

            case 'help':
                return `${baseContext}
                
                Situación de emergencia: "${userDescription}"
                
                Responde con:
                - **Diagnóstico**: Qué está pasando
                - **Acción urgente**: Qué hacer AHORA (máximo 3 pasos)
                - **Causa probable**: Por qué pasó esto
                
                Máximo 120 palabras. Sé directo y práctico.`;

            case 'fish-selection':
                return `${baseContext}
                
                El usuario ha seleccionado estos peces: ${selectedFish.map(f => f.name).join(', ')}
                Parámetros del agua: pH ${customPh}, KH ${customKh}, GH ${customGh}
                Volumen del acuario: ${tankVolume || 'No especificado'} litros
                
                Analiza la compatibilidad y responde con:
                - **Compatibilidad**: Si los peces seleccionados son compatibles
                - **Recomendaciones**: Si hay problemas, sugiere alternativas adecuadas para el volumen
                - **Consejos**: Tips importantes para esta combinación
                
                Si el volumen es 'No especificado', sugiere 3 combinaciones: <50L, 50-100L, >100L, en caso contrario, sugiere 3 combinaciones basadas en el volumen del acuario.
                Máximo 200 palabras.`;

            case 'filtration':
                return `${baseContext}
                
                Consulta sobre filtración: "${userDescription}"
                
                Responde con:
                - **Análisis**: Qué está pasando
                - **Solución**: Qué hacer (máximo 3 recomendaciones)
                - **Tip clave**: Un consejo importante
                
                Máximo 130 palabras. Sé específico y técnico pero claro.`;

            default:
                return `${baseContext} Pregunta: "${userDescription}". Responde de forma útil y concisa.`;
        }
    };

    const handleAnalyze = async () => {
        if (!selectedTopic) {
            setError('Por favor selecciona un tema.');
            return;
        }

        // For fish-selection, validate fish selection
        if (selectedTopic.id === 'fish-selection') {
            if (selectedFish.length === 0) {
                setError('Por favor selecciona al menos un pez.');
                return;
            }
        } else if (description.trim() === '') {
            setError('Por favor proporciona una descripción.');
            return;
        }

        // For topics that require image
        if ((selectedTopic.id === 'algae' || selectedTopic.id === 'diseases') && !imageFile) {
            setError(`Para ${selectedTopic.id === 'algae' ? 'problemas con algas' : 'identificación de enfermedades'}, necesitas subir una imagen.`);
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
            } else if (selectedTopic.id === 'diseases' && imageFile) {
                let diseaseId: number;
                if (typeof response === 'object' && response.parts) {
                    const content = response.parts;
                    diseaseId = parseInt(content.match(/\d+/)?.[0] || '1');
                } else {
                    diseaseId = parseInt(response.toString().match(/\d+/)?.[0] || '1');
                }

                const identifiedDisease = fishDiseaseList.find(disease => disease.id === diseaseId);

                if (identifiedDisease) {
                    setFishDiseaseResult(identifiedDisease);
                } else {
                    setError('No se pudo identificar la enfermedad. Por favor, intenta con otra imagen.');
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
            case 'Bajo': return 'text-ocealia-blue bg-blue-100';
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
            case 'blue': return 'bg-blue-100 text-ocealia-blue';
            case 'red': return 'bg-red-100 text-red-700';
            case 'emerald': return 'bg-emerald-100 text-emerald-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const renderWelcome = () => (
        <div className="text-center p-8">
            <div className="mb-8">
                <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-ocealia-blue/20 to-cyan-400/20 rounded-full blur-xl scale-110"></div>
                    <Bot className="relative w-20 h-20 text-ocealia-blue mx-auto drop-shadow-lg" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-ocealia-blue to-cyan-600 bg-clip-text text-transparent mb-4">
                    Nemo: Asistente IA para Acuarios
                </h2>
                <p className="text-gray-700 max-w-lg mx-auto text-lg leading-relaxed">
                    Tu compañero inteligente para el mundo acuático. Te ayudo con consultas sobre algas, filtración,
                    enfermedades y mucho más. ¡Sumergámonos juntos en la solución!
                </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50/80 to-cyan-50/80 backdrop-blur-sm border border-blue-200/50 rounded-xl p-6 mb-8 shadow-lg">
                <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-ocealia-blue to-cyan-500 rounded-full flex items-center justify-center">
                        <Droplets className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="font-bold text-ocealia-blue text-xl">¿Qué tipo de consulta tienes?</h3>
                </div>
                <p className="text-ocealia-blue/80 max-w-md mx-auto leading-relaxed">
                    Selecciona una de las opciones para obtener análisis personalizado con IA.
                    Cada consulta está optimizada para brindarte la mejor experiencia acuática.
                </p>
            </div>

            <button
                onClick={() => setCurrentStep('topic-selection')}
                className="bg-gradient-to-r from-ocealia-blue to-cyan-500 hover:from-ocealia-blue-dark hover:to-cyan-600 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
                <ChevronRight className="w-5 h-5" />
                Comenzar Exploración
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
            case 'diseases':
                return {
                    title: 'Describe los síntomas de tus peces',
                    placeholder: 'Ejemplo: Mis peces tienen manchas blancas, nadan erráticamente y algunos están en el fondo sin moverse.',
                    buttonText: 'Identificar Enfermedad'
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
                                {selectedTopic && <selectedTopic.icon className="w-5 h-5" />}
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
                        className="bg-blue-400 hover:bg-ocealia-blue disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
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
                case 'diseases':
                    return {
                        title: 'Identificando enfermedad...',
                        description: 'La IA está analizando la imagen y comparándola con nuestra base de datos de enfermedades de peces.'
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
                    <Loader2 className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-spin" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{analyzingText.title}</h3>
                    <p className="text-gray-600">{analyzingText.description}</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-ocealia-blue">Esto puede tomar unos segundos...</p>
                </div>
            </div>
        );
    };

    const renderFishSelection = () => (
        <div className="p-6">
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${selectedTopic?.color} text-white`}>
                        {selectedTopic && <selectedTopic.icon className="w-5 h-5" />}
                    </div>
                    <span className="text-sm font-medium text-gray-600">{selectedTopic?.title}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Selecciona tus peces favoritos</h3>
                <p className="text-gray-600">Elige los peces que te interesan y te ayudaremos con la mejor combinación para tu acuario.</p>
            </div>

            {/* Fish Grid */}
            <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-4">Catálogo de Peces</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto border rounded-lg p-4">
                    {fishList.map(fish => (
                        <div
                            key={fish.id}
                            onClick={() => handleFishSelection(fish)}
                            className={`cursor-pointer transition-all duration-200 rounded-lg border-2 p-3 ${selectedFish.some(f => f.id === fish.id)
                                ? 'border-teal-500 bg-teal-50 shadow-md'
                                : 'border-gray-200 bg-white hover:border-teal-300 hover:shadow-sm'
                                }`}
                        >
                            <div className="relative">
                                <img
                                    src={fish.img}
                                    alt={fish.name}
                                    className="w-full h-20 object-cover rounded mb-2"
                                />
                                {selectedFish.some(f => f.id === fish.id) && (
                                    <div className="absolute top-1 right-1 w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs">
                                        ✓
                                    </div>
                                )}
                            </div>
                            <p className="text-xs font-medium text-gray-800 text-center">{fish.name}</p>
                            <p className="text-xs text-gray-500 text-center">{fish.minimumVolume}L mín.</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Selected Fish Display */}
            {selectedFish.length > 0 && (
                <div className="mb-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
                    <h5 className="font-semibold text-teal-800 mb-2">Peces Seleccionados ({selectedFish.length})</h5>
                    <div className="flex flex-wrap gap-2">
                        {selectedFish.map(fish => (
                            <span key={fish.id} className="inline-flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                                {fish.name}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleFishSelection(fish); }}
                                    className="ml-1 text-teal-600 hover:text-teal-800"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Water Parameters */}
            <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-4">Parámetros del Agua</h4>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Seleccionar por Comunidad</label>
                        <select
                            onChange={handleCommunityChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        >
                            <option value="">Selecciona tu comunidad</option>
                            {COMMUNITY_WATER_PARAMETERS.map(com => (
                                <option key={com.name} value={com.name}>{com.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">pH</label>
                            <input
                                type="number"
                                step="0.1"
                                value={customPh}
                                onChange={e => setCustomPh(e.target.value)}
                                placeholder="7.0"
                                className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">KH</label>
                            <input
                                type="number"
                                value={customKh}
                                onChange={e => setCustomKh(e.target.value)}
                                placeholder="8"
                                className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">GH</label>
                            <input
                                type="number"
                                value={customGh}
                                onChange={e => setCustomGh(e.target.value)}
                                placeholder="12"
                                className="w-full px-2 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tank Volume */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Volumen del Acuario (Litros)</label>
                <input
                    type="number"
                    value={tankVolume}
                    onChange={e => setTankVolume(e.target.value)}
                    placeholder="Ej: 100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Opcional: si no lo especificas, recibirás recomendaciones para diferentes tamaños</p>
            </div>

            {error && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700">{error}</p>
                </div>
            )}

            <div className="flex justify-between gap-4">
                <button
                    onClick={() => setCurrentStep('topic-selection')}
                    className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg transition-colors duration-200"
                >
                    Cambiar tema
                </button>
                <button
                    onClick={handleAnalyze}
                    disabled={selectedFish.length === 0}
                    className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
                >
                    <MessageCircle className="w-4 h-4" />
                    Obtener Recomendaciones
                </button>
            </div>
        </div>
    );
    /*
        const renderUpload2 = () => (
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
    */
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
                                        <Eye className="w-4 h-4 text-blue-400" />
                                        <h5 className="font-semibold text-gray-800">Descripción Visual</h5>
                                    </div>
                                    <p className="text-sm text-gray-700 pl-6">{result.visualDescription}</p>
                                </div>
                            )}

                            {result.impact && (
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Info className="w-4 h-4 text-blue-400" />
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
                            className="bg-blue-400 hover:bg-ocealia-blue text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
                        >
                            <Bot className="w-4 h-4" />
                            Nueva Consulta
                        </button>
                    </div>
                </div>
            );
        }

        // Handle fish disease identification results
        if (fishDiseaseResult && selectedTopic?.id === 'diseases') {
            //const categoryData = diseaseCategories.find(c => c.id === fishDiseaseResult.category);

            return (
                <div className="p-6">
                    <div className="mb-6 text-center">
                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                        <h3 className="text-2xl font-bold text-gray-800">¡Enfermedad Identificada!</h3>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={fishDiseaseResult.image}
                                alt={fishDiseaseResult.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="p-6">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {/* Categoría */}
                                {/* <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${categoryData?.color}-100 text-${categoryData?.color}-800`}>
                                    {categoryData?.name}
                                </span> */}
                                {/* Gravedad */}
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                    Peligro: {fishDiseaseResult.severity}
                                </span>
                                {/* Nivel de contagio */}
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-ocealia-blue-dark">
                                    {fishDiseaseResult.contagiousLevel}
                                </span>
                            </div>

                            <h4 className="text-xl font-bold text-gray-800 mb-2">{fishDiseaseResult.name}</h4>
                            {fishDiseaseResult.scientificName && (
                                <p className="text-sm text-gray-500 mb-3 italic">{fishDiseaseResult.scientificName}</p>
                            )}
                            <p className="text-gray-700 mb-4">{fishDiseaseResult.description}</p>

                            {/* Síntomas visuales */}
                            {fishDiseaseResult.visualSymptoms && (
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Eye className="w-4 h-4 text-blue-400" />
                                        <h5 className="font-semibold text-gray-800">Síntomas Visuales</h5>
                                    </div>
                                    <p className="text-sm text-gray-700 pl-6">{fishDiseaseResult.visualSymptoms}</p>
                                </div>
                            )}

                            {/* Síntomas conductuales */}
                            {fishDiseaseResult.behavioralSymptoms && (
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Info className="w-4 h-4 text-blue-400" />
                                        <h5 className="font-semibold text-gray-800">Síntomas Conductuales</h5>
                                    </div>
                                    <p className="text-sm text-gray-700 pl-6">{fishDiseaseResult.behavioralSymptoms}</p>
                                </div>
                            )}

                            {/* Causas */}
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertCircle className="w-4 h-4 text-orange-600" />
                                    <h5 className="font-semibold text-gray-800">Causas Principales</h5>
                                </div>
                                <ul className="text-sm text-gray-700 pl-6 space-y-1">
                                    {fishDiseaseResult.causes.map((cause, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                                            {cause}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Tratamientos */}
                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <Lightbulb className="w-4 h-4 text-green-600" />
                                    <h5 className="font-semibold text-gray-800">Tratamientos</h5>
                                </div>
                                <ul className="text-sm text-gray-700 pl-6 space-y-1">
                                    {fishDiseaseResult.treatments.map((treatment, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                                            {treatment}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Prevención */}
                            <div className="mb-4">
                                <h5 className="font-semibold text-gray-800 mb-2">Prevención</h5>
                                <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded-lg">{fishDiseaseResult.prevention}</p>
                            </div>

                            {/* Advertencias */}
                            {fishDiseaseResult.warnings && fishDiseaseResult.warnings.length > 0 && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <h5 className="font-semibold text-yellow-800 mb-2">⚠️ Advertencias</h5>
                                    <ul className="text-sm text-yellow-700 space-y-1">
                                        {fishDiseaseResult.warnings.map((warning, index) => (
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
                            className="bg-blue-400 hover:bg-ocealia-blue text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
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
                        <div className="flex items-start gap-4 mb-4 p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg border border-blue-100">
                            <div className={`p-3 rounded-xl bg-gradient-to-r ${selectedTopic.color} text-white shadow-md`}>
                                <selectedTopic.icon className="w-7 h-7" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-800 mb-1">{getResultTitle()}</h3>
                                <p className="text-sm text-gray-600 mb-2">{selectedTopic.title}</p>
                                <div className="flex items-center gap-2 text-xs text-blue-400">
                                    <Bot className="w-3 h-3" />
                                    <span>Respuesta personalizada de Nemo</span>
                                </div>
                            </div>
                            <div className="text-right text-xs text-gray-400">
                                <p>Generado ahora</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
                        <div className="p-6">
                            <div className="prose-custom max-w-none">
                                <ReactMarkdown
                                    components={{
                                        h1: ({ children }) => <h1 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">{children}</h1>,
                                        h2: ({ children }) => <h2 className="text-xl font-bold text-gray-800 mb-3 mt-6">{children}</h2>,
                                        h3: ({ children }) => <h3 className="text-lg font-semibold text-gray-700 mb-2 mt-4">{children}</h3>,
                                        p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-3">{children}</p>,
                                        ul: ({ children }) => <ul className="space-y-2 mb-4">{children}</ul>,
                                        ol: ({ children }) => <ol className="space-y-2 mb-4 pl-4">{children}</ol>,
                                        li: ({ children }) => (
                                            <li className="flex items-start gap-3 text-gray-700">
                                                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                                <span>{children}</span>
                                            </li>
                                        ),
                                        strong: ({ children }) => <strong className="font-semibold text-gray-800">{children}</strong>,
                                        em: ({ children }) => <em className="italic text-gray-600">{children}</em>,
                                        blockquote: ({ children }) => (
                                            <blockquote className="border-l-4 border-blue-500 bg-blue-50 pl-4 py-2 mb-4 italic text-gray-700">
                                                {children}
                                            </blockquote>
                                        ),
                                        code: ({ children }) => (
                                            <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
                                                {children}
                                            </code>
                                        )
                                    }}
                                >
                                    {textResponse}
                                </ReactMarkdown>
                            </div>
                        </div>

                        {/* Secciones de destaque basadas en el contenido */}
                        <div className="border-t border-gray-200">
                            {/* Consejos importantes */}
                            {textResponse.includes('⚠️') && (
                                <div className="bg-yellow-50 border-b border-yellow-200 p-4">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-yellow-800 mb-1">Advertencia Importante</p>
                                            <p className="text-xs text-yellow-700">
                                                Revisa los puntos marcados con ⚠️ - requieren atención inmediata
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Información de emergencia */}
                            {(selectedTopic?.id === 'help' || textResponse.toLowerCase().includes('urgente') || textResponse.toLowerCase().includes('inmediato')) && (
                                <div className="bg-red-50 border-b border-red-200 p-4">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-red-800 mb-1">Situación de Emergencia</p>
                                            <p className="text-xs text-red-700">
                                                Sigue las acciones urgentes lo antes posible para proteger tu acuario
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Tips técnicos */}
                            {selectedTopic?.id === 'filtration' && (
                                <div className="bg-blue-50 border-b border-blue-200 p-4">
                                    <div className="flex items-start gap-3">
                                        <Filter className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-ocealia-blue-dark mb-1">Consejo Técnico</p>
                                            <p className="text-xs text-ocealia-blue">
                                                La filtración es clave para la salud del acuario - implementá gradualmente los cambios
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Footer con tiempo estimado */}
                            <div className="bg-gray-50 px-4 py-3">
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>Respuesta generada por IA • Verifica la información crítica</span>
                                    <span className="flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" />
                                        Consejo personalizado
                                    </span>
                                </div>
                            </div>
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
                            className="text-blue-400 hover:text-ocealia-blue-dark px-6 py-2 rounded-lg transition-colors duration-200 inline-flex items-center gap-2"
                        >
                            <ChevronRight className="w-4 h-4 transform rotate-180" />
                            Cambiar Tema
                        </button>
                        <button
                            onClick={resetAssistant}
                            className="bg-blue-400 hover:bg-ocealia-blue text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
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
        <div className="relative min-h-screen">
            {/* Aquatic Background */}
            <div className="fixed inset-0 bg-gradient-to-b from-sky-100 via-blue-50 to-cyan-100 opacity-60 z-0" />

            {/* Animated Water Waves */}
            <div className="fixed inset-0 z-10 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-transparent to-cyan-400/20 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-l from-teal-300/15 via-transparent to-blue-300/15 animate-pulse" style={{ animationDelay: '1s', animationDuration: '4s' }} />
            </div>

            {/* Floating Bubbles */}
            <div className="fixed inset-0 z-20 pointer-events-none overflow-hidden">
                {/* Large bubbles */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={`large-${i}`}
                        className="absolute w-6 h-6 bg-white/20 rounded-full animate-bounce"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 4}s`,
                            animationDuration: `${4 + Math.random() * 2}s`
                        }}
                    />
                ))}
                {/* Medium bubbles */}
                {[...Array(15)].map((_, i) => (
                    <div
                        key={`medium-${i}`}
                        className="absolute w-4 h-4 bg-blue-200/30 rounded-full animate-bounce"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    />
                ))}
                {/* Small bubbles */}
                {[...Array(25)].map((_, i) => (
                    <div
                        key={`small-${i}`}
                        className="absolute w-2 h-2 bg-cyan-300/40 rounded-full animate-pulse"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 6}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Main Content Container */}
            <div className="relative z-30 max-w-4xl mx-auto">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 overflow-hidden m-4">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-ocealia-blue via-blue-500 to-cyan-500 text-white p-6 relative overflow-hidden">
                        {/* Header bubbles */}
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-3 h-3 bg-white/20 rounded-full animate-pulse"
                                    style={{
                                        left: `${10 + Math.random() * 80}%`,
                                        top: `${10 + Math.random() * 80}%`,
                                        animationDelay: `${Math.random() * 3}s`
                                    }}
                                />
                            ))}
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Bot className="w-6 h-6" />
                                <h1 className="text-xl font-bold">{selectedTopic ? `${selectedTopic.title} - Nemo` : 'Asistente IA para Acuarios'}</h1>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* Botón Home */}
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="flex items-center gap-2 px-3 py-2 bg-ocealia-blue-dark hover:bg-blue-900 rounded-lg transition-colors duration-200 text-sm font-medium"
                                    title="Volver al inicio"
                                >
                                    <Home className="w-4 h-4" />
                                    <span className="hidden sm:inline">Inicio</span>
                                </button>
                                {currentStep !== 'welcome' && (
                                    <button
                                        onClick={resetAssistant}
                                        className="p-2 hover:bg-ocealia-blue-dark rounded-lg transition-colors duration-200"
                                        title="Reiniciar asistente"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
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
                        {currentStep === 'fish-selection' && renderFishSelection()}
                        {currentStep === 'analyzing' && renderAnalyzing()}
                        {currentStep === 'results' && renderResults()}
                    </div>
                </div>
            </div>
        </div>
    );
}
    export default AlgaeAssistant;