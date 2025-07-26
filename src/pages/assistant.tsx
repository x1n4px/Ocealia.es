import React from 'react';
import AlgaeAssistant from '../components/AssistantComponent';

const AssistantPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-8 px-4">
            <div className="container mx-auto">
                {/* <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    🐟 Nemo: Asitente IA para Acuarios
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Utiliza inteligencia artificial avanzada para identificar y solucionar problemas de algas en tu acuario
                    </p>
                </div> */}
                
                <AlgaeAssistant />
                
                <div className="mt-12 text-center">
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Consejos para mejores resultados</h2>
                        <div className="grid md:grid-cols-3 gap-6 text-left">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-800 mb-2">📸 Foto de calidad</h3>
                                <p className="text-blue-700 text-sm">
                                    Toma fotos con buena iluminación, enfoque nítido y donde se puedan ver claramente las algas.
                                </p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-green-800 mb-2">📝 Descripción detallada</h3>
                                <p className="text-green-700 text-sm">
                                    Describe color, textura, ubicación, tamaño y cualquier comportamiento que hayas observado.
                                </p>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-purple-800 mb-2">🔍 Sé específico</h3>
                                <p className="text-purple-700 text-sm">
                                    Menciona si las algas están en plantas, cristal, sustrato, decoraciones, etc.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssistantPage;
