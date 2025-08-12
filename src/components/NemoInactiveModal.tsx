import React from 'react';
import { Fish } from 'lucide-react';

const NemoInactiveModal: React.FC = () => {
  return (

    <div className="fixed bottom-4 right-4 z-[100] max-w-sm">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-blue-200/50 overflow-hidden">
        <div className="bg-gradient-to-r from-ocealia-blue/90 to-ocealia-blue-light/90 p-4 text-white relative">
          <div className="flex items-center space-x-3">
            {/* Anémona con Nemo */}
            <div className="relative flex-shrink-0">
              {/* Anémona base */}
              <div className="w-10 h-10 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full animate-pulse"></div>
                {/* Tentáculos de anémona */}
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-300 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.9s' }}></div>

                {/* Nemo dentro de la anémona */}
                <div className="absolute inset-1 bg-orange-400 rounded-full flex items-center justify-center">
                  <Fish className="w-4 h-4 text-white animate-pulse" />
                </div>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-sm font-bold">¡Nemo descansando!</h3>
              <p className="text-xs opacity-90">En su anémona favorita</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <p className="text-gray-700 text-sm mb-3">
            Nemo IA está tomando un descanso en su anémona
          </p>

          <p className="text-gray-600 text-xs mb-4">
            Mientras tanto, explora nuestras guías de acuariofilia
          </p>

          {/* Botón compacto */}
          <button
            onClick={() => document.getElementById('ciclado')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full bg-gradient-to-r from-ocealia-blue-dark to-ocealia-blue text-white py-2 px-4 rounded-lg text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Ver Guías
          </button>
        </div>
      </div>
    </div>
  );
};

export default NemoInactiveModal;