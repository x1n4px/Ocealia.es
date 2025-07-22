import React from 'react';
import AlgaeAssistant from '../components/AssistantComponent';

const FishSelectorPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-8 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    🐠 Selector de Peces Inteligente
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Utiliza inteligencia artificial para encontrar las mejores combinaciones de peces para tu acuario
                    </p>
                </div>
                
                <AlgaeAssistant />
                
                <div className="mt-12 text-center">
                    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">¿Cómo funciona?</h2>
                        <div className="grid md:grid-cols-3 gap-6 text-left">
                            <div className="bg-teal-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-teal-800 mb-2">🐟 Selecciona peces</h3>
                                <p className="text-teal-700 text-sm">
                                    Elige los peces que te interesan de nuestro catálogo con información detallada.
                                </p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-blue-800 mb-2">⚗️ Define parámetros</h3>
                                <p className="text-blue-700 text-sm">
                                    Especifica los parámetros de tu agua o selecciona tu comunidad autónoma.
                                </p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-green-800 mb-2">🤖 Obtén recomendaciones</h3>
                                <p className="text-green-700 text-sm">
                                    Recibe análisis de compatibilidad y sugerencias personalizadas de IA.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FishSelectorPage;
