import React, { useState } from 'react';
import { Info, HelpCircle } from 'lucide-react';

interface InfoTooltipProps {
  content: string;
  advanced?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children?: React.ReactNode;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ 
  content, 
  advanced = false, 
  position = 'top',
  children 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionStyles = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  const arrowStyles = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-800',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-800',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-l-gray-800',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-r-gray-800'
  };

  return (
    <span 
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children || (
        <button
          type="button"
          className={`ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full transition-colors ${
            advanced 
              ? 'bg-purple-100 text-purple-600 hover:bg-purple-200' 
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
          }`}
        >
          {advanced ? <HelpCircle className="w-3 h-3" /> : <Info className="w-3 h-3" />}
        </button>
      )}
      
      {isVisible && (
        <div className={`absolute z-50 ${positionStyles[position]} pointer-events-none`}>
          <div className="relative">
            <div className={`px-3 py-2 text-sm text-white bg-gray-800 rounded-lg shadow-lg max-w-xs whitespace-normal ${
              advanced ? 'border border-purple-400' : ''
            }`}>
              {advanced && (
                <div className="text-purple-300 text-xs font-semibold mb-1">
                  💡 Info Avanzada
                </div>
              )}
              {content}
            </div>
            <div 
              className={`absolute w-2 h-2 bg-gray-800 transform rotate-45 ${arrowStyles[position]}`}
            />
          </div>
        </div>
      )}
    </span>
  );
};

export default InfoTooltip;
