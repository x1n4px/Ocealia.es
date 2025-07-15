import React, { useState } from 'react';

import { fishList } from '../data/fishData'; // Importa la lista de peces
import type { Fish } from '../types/fish';
import { COMMUNITY_WATER_PARAMETERS } from '../data/communityParameters'; // Importamos los nuevos datos
 
const FishCard: React.FC<{
    fish: Fish;
    selected: boolean;
    onSelect: (id: number) => void;
    compatibilityMessage?: string; // Nuevo prop para el mensaje de compatibilidad
    isCompatibleOverall?: boolean; // Nuevo prop para saber si es compatible o no
}> = ({ fish, selected, onSelect, compatibilityMessage, isCompatibleOverall = true }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    return (
        <div
            onClick={() => onSelect(fish.id)}
            className={`
                relative overflow-hidden
                border-2 rounded-xl p-4 m-2 w-64 mx-auto md:w-auto
                transition-all duration-300 flex flex-col items-center
                ${selected ?
                    'border-teal-400 shadow-lg shadow-teal-100/50 bg-gradient-to-b from-teal-50 to-white' :
                    'border-gray-200 shadow-md hover:shadow-lg hover:border-teal-200 bg-white'}
                hover:scale-[1.02] transform-gpu
                ${isExpanded ? 'h-auto pb-12' : 'h-80'}
                ${!isCompatibleOverall ? 'opacity-40 grayscale pointer-events-none' : ''} // Efecto de desvanecimiento
            `}
        >
            {selected && (
                <div className="absolute top-2 right-2 bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
            )}

            <div className="relative w-full h-32 overflow-hidden rounded-lg mb-3">
                <img
                    src={fish.img}
                    alt={fish.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-white font-medium text-sm">Click to {selected ? 'deselect' : 'select'}</span>
                </div>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-2">{fish.name}</h3>

            {/* Mensaje de compatibilidad solo si no es compatible */}
            {!isCompatibleOverall && compatibilityMessage && (
                <div className="absolute inset-x-0 bottom-16 bg-red-100 text-red-700 text-xs p-2 rounded-b-md text-center">
                    {compatibilityMessage}
                </div>
            )}


            <div className="w-full space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                    <span className="font-medium">pH:</span>
                    <span className="text-gray-700">{fish.ph}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Temp:</span>
                    <span className="text-gray-700">{fish.temperature}</span>
                </div>
            </div>

            <div className={`w-full space-y-2 text-sm text-gray-600 overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="flex justify-between">
                    <span className="font-medium">KH:</span>
                    <span className="text-gray-700">{fish.kh}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">GH:</span>
                    <span className="text-gray-700">{fish.gh}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Tamaño medio:</span>
                    <span className="text-gray-700">{fish.mediumSize} cm</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Tamaño máximo:</span>
                    <span className="text-gray-700">{fish.maxSize} cm</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Longevidad:</span>
                    <span className="text-gray-700">{fish.longevity} años</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Dieta:</span>
                    <span className="text-gray-700">{fish.diet}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Sociabilidad:</span>
                    <span className="text-gray-700">{fish.sociability}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Territorial:</span>
                    <span className="text-gray-700">{fish.territoriality}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Modo de vida:</span>
                    <span className="text-gray-700">{fish.wayOfLife}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="font-medium">Modo de reproducción:</span>
                    <span className="text-gray-700">{fish.wayOfBreeding}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="font-medium">Volumen mínimo:</span>
                    <span className="text-gray-700">{fish.minimumVolume} L</span>
                </div>
            </div>

            <div
                className="absolute bottom-0 left-0 w-full h-8 bg-gray-100 flex items-center justify-center
                           text-gray-500 hover:text-teal-600 cursor-pointer transition-colors duration-200"
                onClick={toggleExpand}
            >
                <span className="text-sm font-medium">
                    {isExpanded ? 'Ver menos' : 'Ver más'}
                </span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 ml-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
};

const ParameterRange: React.FC<{
    values: string[],
    ranges: { min: number, max: number },
    unit?: string,
    fishNames: string[]
}> = ({ values, ranges, unit, fishNames }) => {
    const fishColors = [
        'bg-teal-500',
        'bg-amber-500',
        'bg-rose-500',
        'bg-indigo-500',
        'bg-emerald-500',
        'bg-purple-500',
        'bg-pink-500',
        'bg-cyan-500',
    ];

    const numericRanges = values.map(v => {
        const nums = v.replace(/[^\d.-]/g, '').split('-').map(Number);
        return { min: nums[0], max: nums[1] || nums[0] };
    });

    const chartHeight = 24 + (numericRanges.length - 1) * 20;

    return (
        <div className="flex flex-col">
            <div className="flex flex-wrap gap-3 mb-4 mt-2">
                {fishNames.map((name, idx) => (
                    <div key={idx} className="flex items-center text-sm">
                        <div className={`w-3 h-3 rounded-full mr-1 ${fishColors[idx % fishColors.length]}`}></div>
                        <span className="font-medium text-gray-600">{name}</span>
                    </div>
                ))}
            </div>

            <div className="relative w-full my-2" style={{ height: `${chartHeight}px` }}>
                <div className="absolute h-1 bg-gray-200 w-full top-1/2 transform -translate-y-1/2 rounded-full"></div>

                {numericRanges.map((range, idx) => {
                    const leftPosition = ((range.min - ranges.min) / (ranges.max - ranges.min)) * 100;
                    const widthPercentage = ((range.max - range.min) / (ranges.max - ranges.min)) * 100;
                    const topPosition = (chartHeight / 2) - (numericRanges.length * 10) + (idx * 20);

                    return (
                        <div
                            key={idx}
                            className={`
                                absolute h-4 rounded-full
                                ${fishColors[idx % fishColors.length]}
                            `}
                            style={{
                                left: `${leftPosition}%`,
                                width: `${widthPercentage}%`,
                                top: `${topPosition}px`,
                            }}
                        ></div>
                    );
                })}

                <div className="absolute top-0 left-0 text-xs text-gray-500">{ranges.min}{unit}</div>
                <div className="absolute top-0 right-0 text-xs text-gray-500">{ranges.max}{unit}</div>
            </div>
        </div>
    );
};


const CompareSection: React.FC<{ selectedFish: Fish[] }> = ({ selectedFish }) => {
    if (selectedFish.length < 2) return null;

    const parameterRanges = {
        ph: { min: 5, max: 8.5 },
        kh: { min: 0, max: 25 },
        gh: { min: 0, max: 25 },
        temperature: { min: 10, max: 32 }
    };

    // Obtenemos todas las claves de los parámetros que queremos mostrar en la tabla
    const allFishParameters = [
        { key: 'ph', name: 'pH' },
        { key: 'kh', name: 'KH' },
        { key: 'gh', name: 'GH' },
        { key: 'temperature', name: 'Temperatura' },
        { key: 'mediumSize', name: 'Tamaño medio (cm)' },
        { key: 'maxSize', name: 'Tamaño máximo (cm)' },
        { key: 'longevity', name: 'Longevidad (años)' },
        { key: 'diet', name: 'Dieta' },
        { key: 'sociability', name: 'Sociabilidad' },
        { key: 'territoriality', name: 'Territorialidad' },
        { key: 'wayOfLife', name: 'Modo de vida' },
        { key: 'wayOfBreeding', name: 'Modo de reproducción' },
        { key: 'minimumVolume', name: 'Volumen mínimo (L)' },
    ];


    return (
        <div className="mt-10 p-4 md:p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Comparativa de compatibilidad
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-700 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                        </svg>
                        Rango de parámetros visuales
                    </h3>

                    <div>
                        <h4 className="font-medium text-gray-700 mb-2">pH Level</h4>
                        <ParameterRange
                            values={selectedFish.map(fish => fish.ph)}
                            ranges={parameterRanges.ph}
                            fishNames={selectedFish.map(fish => fish.name)}
                        />
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-700 mb-2">Dureza temporal (KH)</h4>
                        <ParameterRange
                            values={selectedFish.map(fish => fish.kh)}
                            ranges={parameterRanges.kh}
                            unit=" dKH"
                            fishNames={selectedFish.map(fish => fish.name)}
                        />
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-700 mb-2">Dureza general (GH)</h4>
                        <ParameterRange
                            values={selectedFish.map(fish => fish.gh)}
                            ranges={parameterRanges.gh}
                            unit=" dGH"
                            fishNames={selectedFish.map(fish => fish.name)}
                        />
                    </div>

                    <div>
                        <h4 className="font-medium text-gray-700 mb-2">Temperatura</h4>
                        <ParameterRange
                            values={selectedFish.map(fish => fish.temperature)}
                            ranges={parameterRanges.temperature}
                            unit="°C"
                            fishNames={selectedFish.map(fish => fish.name)}
                        />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 4a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1H5zm4 0a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1H9zm4 0a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1h-1zm-8 6a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1v-1a1 1 0 00-1-1H5zm4 0a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1v-1a1 1 0 00-1-1H9zm4 0a1 1 0 00-1 1v1a1 1 0 001 1h1a1 1 0 001-1v-1a1 1 0 00-1-1h-1z" clipRule="evenodd" />
                        </svg>
                        Tabla de comparación detallada
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parámetro</th>
                                    {selectedFish.map(fish => (
                                        <th key={fish.id} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {fish.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {allFishParameters.map(param => (
                                    <tr key={param.key}>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">{param.name}</td>
                                        {selectedFish.map(fish => {
                                            let value = fish[param.key as keyof Fish];
                                            // Añadir unidades si el parámetro lo necesita
                                            if (param.key === 'temperature') value = `${value}°C`;
                                            if (param.key === 'kh') value = `${value} dKH`;
                                            if (param.key === 'gh') value = `${value} dGH`;
                                            if (param.key === 'minimumVolume') value = `${value} L`;
                                            if (param.key === 'mediumSize' || param.key === 'maxSize') value = `${value} cm`;
                                            if (param.key === 'longevity') value = `${value} años`;

                                            return (
                                                <td key={`${fish.id}-${param.key}`} className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                                                    {value}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                            </svg>
                            Análisis de compatibilidad
                        </h4>
                        <p className="text-sm text-blue-700">
                            {selectedFish.length >= 2 ? (
                                selectedFish.some(f => f.name.toLowerCase().includes('betta')) ?
                                    'Considera la sociabilidad de los peces seleccionados, especialmente si incluyes especies como el Betta Splendens, que pueden ser territoriales. Consulta guías de compatibilidad específicas para asegurar una convivencia pacífica.'
                                    :
                                    'Los peces seleccionados muestran rangos de parámetros de agua compatibles. No obstante, siempre es recomendable investigar sus temperamentos individuales y requisitos de espacio para asegurar una buena convivencia en tu acuario.'
                            ) : 'Selecciona al menos dos peces para ver el análisis de compatibilidad.'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};


const FishPage: React.FC = () => {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [displayedFish, setDisplayedFish] = useState<Fish[]>(fishList); // Cambiado a displayedFish
    const [phInput, setPhInput] = useState<string>('');
    const [khInput, setKhInput] = useState<string>('');
    const [ghInput, setGhInput] = useState<string>('');
    const [filterActive, setFilterActive] = useState<boolean>(false);
    const [selectedCommunity, setSelectedCommunity] = useState<string>(''); // Nuevo estado para la comunidad seleccionada
    const [fishCompatibilityMessages, setFishCompatibilityMessages] = useState<Record<number, string | undefined>>({}); // Para mensajes por pez
    const [fishOverallCompatibility, setFishOverallCompatibility] = useState<Record<number, boolean>>({}); // Para el estado de fade


    const handleSelect = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const parseRange = (rangeString: string): { min: number, max: number } => {
        const parts = rangeString.replace(/[^\d.-]/g, '').split('-').map(Number);
        return {
            min: parts[0],
            max: parts.length > 1 ? parts[1] : parts[0]
        };
    };

    // Modificamos isCompatible para devolver también un mensaje de ajuste
    const getCompatibilityFeedback = (fishValue: string, input: number, paramName: string): { isCompatible: boolean, message?: string } => {
        const { min, max } = parseRange(fishValue);
        let message: string | undefined;
        let compatible = false;

        if (input >= min && input <= max) {
            compatible = true;
        } else if (input < min) {
            message = `Necesita ${paramName} más ${paramName === 'pH' ? 'ácido' : 'blando'} (aumentar ${paramName} del pez)`;
            if (paramName === 'pH') message = `Necesita pH más bajo (peces de pH ${min}-${max}, agua ${input})`;
            else if (paramName === 'KH' || paramName === 'GH') message = `Necesita agua más dura (peces de ${paramName} ${min}-${max}, agua ${input})`;
        } else { // input > max
            message = `Necesita ${paramName} más ${paramName === 'pH' ? 'básico' : 'duro'} (disminuir ${paramName} del pez)`;
            if (paramName === 'pH') message = `Necesita pH más alto (peces de pH ${min}-${max}, agua ${input})`;
            else if (paramName === 'KH' || paramName === 'GH') message = `Necesita agua más blanda (peces de ${paramName} ${min}-${max}, agua ${input})`;
        }

        // Ajuste en el mensaje para el caso de incompatibilidad con el agua
        if (!compatible) {
            message = `¡Cuidado! El pez requiere ${paramName} entre ${min}-${max}, y tu agua tiene ${input}. Debes ${input < min ? 'aumentar' : 'disminuir'} los parámetros para este pez.`;
        }


        return { isCompatible: compatible, message };
    };

    const applyFilter = (phVal: number | string, khVal: number | string, ghVal: number | string) => {
        const ph = typeof phVal === 'string' ? parseFloat(phVal) : phVal;
        const kh = typeof khVal === 'string' ? parseFloat(khVal) : khVal;
        const gh = typeof ghVal === 'string' ? parseFloat(ghVal) : ghVal;

        const newMessages: Record<number, string | undefined> = {};
        const newOverallCompatibility: Record<number, boolean> = {};

        const newFilteredFish = fishList.map(fish => {
            let fishIsCompatible = true;
            let messageParts: string[] = [];

            if (!isNaN(ph)) {
                const { isCompatible, message } = getCompatibilityFeedback(fish.ph, ph, 'pH');
                if (!isCompatible) {
                    fishIsCompatible = false;
                    messageParts.push(`pH: ${message}`);
                }
            }
            if (!isNaN(kh)) {
                const { isCompatible, message } = getCompatibilityFeedback(fish.kh, kh, 'KH');
                if (!isCompatible) {
                    fishIsCompatible = false;
                    messageParts.push(`KH: ${message}`);
                }
            }
            if (!isNaN(gh)) {
                const { isCompatible, message } = getCompatibilityFeedback(fish.gh, gh, 'GH');
                if (!isCompatible) {
                    fishIsCompatible = false;
                    messageParts.push(`GH: ${message}`);
                }
            }

            newOverallCompatibility[fish.id] = fishIsCompatible;
            if (!fishIsCompatible) {
                newMessages[fish.id] = `No es compatible con tu agua. ${messageParts.join('; ')}.`;
            }

            return fish; // Devolvemos todos los peces, la visibilidad la controla la card
        });

        setDisplayedFish(newFilteredFish); // Ahora siempre mostramos todos, pero se desvanecen
        setFishCompatibilityMessages(newMessages);
        setFishOverallCompatibility(newOverallCompatibility);
        setSelectedIds([]); // Clear selections when filter changes
        setFilterActive(true);
    };

    const handleManualFilterApply = () => {
        if (isNaN(parseFloat(phInput)) && isNaN(parseFloat(khInput)) && isNaN(parseFloat(ghInput))) {
            alert('Por favor, introduce al menos un valor numérico para filtrar.');
            return;
        }
        setSelectedCommunity(''); // Deseleccionar comunidad si se usa el filtro manual
        applyFilter(phInput, khInput, ghInput);
    };

    const handleCommunityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const communityName = event.target.value;
        setSelectedCommunity(communityName);

        if (communityName) {
            const communityData = COMMUNITY_WATER_PARAMETERS.find(c => c.name === communityName);
            if (communityData) {
                setPhInput(communityData.parameters.ph.toString());
                setKhInput(communityData.parameters.kh.toString());
                setGhInput(communityData.parameters.gh.toString());
                applyFilter(
                    communityData.parameters.ph,
                    communityData.parameters.kh,
                    communityData.parameters.gh
                );
            }
        } else {
            clearFilter(); // Si se selecciona la opción "Selecciona tu comunidad", limpia el filtro
        }
    };


    const clearFilter = () => {
        setDisplayedFish(fishList);
        setSelectedIds([]);
        setPhInput('');
        setKhInput('');
        setGhInput('');
        setFilterActive(false);
        setSelectedCommunity(''); // Limpiar la comunidad seleccionada
        setFishCompatibilityMessages({});
        setFishOverallCompatibility({});
    };

    const selectedFish = fishList.filter(fish => selectedIds.includes(fish.id));

    return (
    <>
        <div className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-green-600 via-blue-600 to-green-800 bg-clip-text text-transparent">
                    Comparador de peces ornamentales
                    </span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Selecciona dos o más especies de peces para comparar sus parámetros de agua ideales y verificar su compatibilidad para tu acuario.

                </p>

            </div>

            <div className="flex justify-center items-center col-span-full mt-4">
                <button
                    onClick={() => window.location.href = "/"}
                    className="inline-flex items-center px-6 py-3 bg-white-600 text-black rounded-xl font-semibold shadow hover:bg-gray-200 transition-all duration-200 text-lg"
                >
                    Volver al menú principal

                </button>
            </div>
        </div>
    </div>
        <div className="min-h-screen bg-gray-50 p-4 md:p-10">

            <div className="max-w-7xl mx-auto">


                {/* New Filter Section */}
                <div className="mb-8 p-4 md:p-6 bg-white rounded-xl shadow-md border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 00-2 2v10a2 2 0 002 2m0-16a2 2 0 012 2v10a2 2 0 01-2 2m0-16V4m0 0a2 2 0 012 2v10a2 2 0 01-2 2m0 0H9m7 0h-4M9 3h4m-4 18h4" />
                        </svg>
                        Filtrar por parámetros de agua
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label htmlFor="ph" className="block text-sm font-medium text-gray-700 mb-1">pH</label>
                            <input
                                type="number"
                                id="ph"
                                value={phInput}
                                onChange={(e) => setPhInput(e.target.value)}
                                placeholder="Ej: 7.0"
                                step="0.1"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <label htmlFor="kh" className="block text-sm font-medium text-gray-700 mb-1">KH</label>
                            <input
                                type="number"
                                id="kh"
                                value={khInput}
                                onChange={(e) => setKhInput(e.target.value)}
                                placeholder="Ej: 5"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                            />
                        </div>
                        <div>
                            <label htmlFor="gh" className="block text-sm font-medium text-gray-700 mb-1">GH</label>
                            <input
                                type="number"
                                id="gh"
                                value={ghInput}
                                onChange={(e) => setGhInput(e.target.value)}
                                placeholder="Ej: 8"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                        <button
                            onClick={handleManualFilterApply}
                            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-200 flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                            </svg>
                            Aplicar filtro manual
                        </button>

                        <div className="w-full sm:w-auto">
                            <label htmlFor="community-select" className="sr-only">Selecciona tu comunidad autónoma</label>
                            <select
                                id="community-select"
                                value={selectedCommunity}
                                onChange={handleCommunityChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-full py-2 px-3 text-gray-700"
                            >
                                <option value="">-- Selecciona tu comunidad autónoma --</option>
                                {COMMUNITY_WATER_PARAMETERS.map((community) => (
                                    <option key={community.name} value={community.name}>
                                        {community.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {filterActive && (
                        <button
                            onClick={clearFilter}
                            className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg shadow-md transition duration-200 flex items-center justify-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 000-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 112 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                            </svg>
                            Limpiar filtro
                        </button>
                    )}
                </div>

                <div className="mb-6 flex items-center">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-700 mr-4">Especies disponibles</h2>
                    {selectedIds.length > 0 && (
                        <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm font-medium rounded-full">
                            {selectedIds.length} seleccionado{selectedIds.length !== 1 ? 's' : ''}
                        </span>
                    )}
                </div>

                {displayedFish.length === 0 && filterActive ? (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.542 2.705-1.542 3.47 0l5.58 11.25c.38.766-.112 1.65-.948 1.65H3.596c-.836 0-1.328-.884-.949-1.65l5.58-11.25zM10 11a1 1 0 100-2 1 1 0 000 2zm1-2a1 1 0 10-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-yellow-700">
                                    No se encontraron peces que coincidan con los parámetros de agua especificados. Intenta ajustar los valores.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-10">
                        {displayedFish.map(fish => (
                            <FishCard
                                key={fish.id}
                                fish={fish}
                                selected={selectedIds.includes(fish.id)}
                                onSelect={handleSelect}
                                compatibilityMessage={fishCompatibilityMessages[fish.id]}
                                isCompatibleOverall={fishOverallCompatibility[fish.id]}
                            />
                        ))}
                    </div>
                )}

                <CompareSection selectedFish={selectedFish} />
            </div>
        </div>
        </>
    );
};
export default FishPage;
