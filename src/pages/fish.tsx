import React, { useState } from 'react';

type Fish = {
    id: number;
    name: string;
    ph: string;
    kh: string;
    gh: string;
    temperature: string;
    img: string;
    mediumSize?: number;
    maxSize?: number;
    longevity?: number;
    diet?: string;
    sociability?: string;
    territoriality?: string;
    wayOfLife?: string;
    wayOfBreeding?: string;
    stream?: string;
    minimumVolume?: number;
};

const fishList: Fish[] = [
    {
        id: 1,
        name: 'Neon Tetra',
        ph: '6.0-7.2',
        kh: '3-10 dKH',
        gh: '4-10 dGH',
        temperature: '20-26°C',
        img: 'https://www.fishipedia.es/wp-content/uploads/2013/07/Paracheirodon_innesi_1.jpg',
        mediumSize: 3,
        maxSize: 4,
        longevity: 5,
        diet: 'Carnívoro',
        sociability: 'Banco',
        territoriality: 'No',
        wayOfLife: 'Diurno',
        wayOfBreeding: 'Ovíparo',
        stream: 'Lenta',
        minimumVolume: 60
    },
    {
        id: 2,
        name: 'Betta Splendens',
        ph: '6.5-7.5',
        kh: '4-20 dKH',
        gh: '5-20 dGH',
        temperature: '24-28°C',
        img: 'https://www.fishipedia.es/wp-content/uploads/2017/11/Betta-splendens_8087_2-725x483.jpg',
        mediumSize: 4,
        maxSize: 4,
        longevity: 5,
        diet: 'Carnívoro',
        sociability: 'Solitario',
        territoriality: 'Sí',
        wayOfLife: 'Diurno',
        wayOfBreeding: 'Ovíparo',
        stream: 'Lenta',
        minimumVolume: 60
    },
    {
        id: 3,
        name: 'Guppy',
        ph: '5.5-8.0',
        kh: '5-15 dKH',
        gh: '6-15 dGH',
        temperature: '18-28°C',
        img: 'https://acuarioland.com/wp-content/uploads/2020/04/pez-guppy-acuarioland.jpg',
        mediumSize: 3,
        maxSize: 5,
        longevity: 3,
        diet: 'Omnívoro',
        sociability: 'Pequeño grupo',
        territoriality: 'No',
        wayOfLife: 'Diurno',
        wayOfBreeding: 'Ovovivíparo',
        stream: 'Lenta y estancada',
        minimumVolume: 60
    },
    {
        id: 4,
        name: 'Escalar',
        ph: '6-7.2',
        kh: '5-9 dKH',
        gh: '6-9 dGH',
        temperature: '24-26°C',
        img: 'https://www.acuariosrtules.top/wp-content/uploads/2020/11/Pterophyllum-scalare-escalar.jpg.webp',
        mediumSize: 15,
        maxSize: 20,
        longevity: 9,
        diet: 'Carnívoro',
        sociability: 'Banco',
        territoriality: 'Sí',
        wayOfLife: 'Diurno',
        wayOfBreeding: 'Ovíparo',
        stream: 'Lenta y estancada',
        minimumVolume: 300
    },
    {
        id: 5,
        name: 'Corydoras',
        ph: '6.0-7.5',
        kh: '4-19 dKH',
        gh: '5-19 dGH',
        temperature: '25-28°C',
        img: 'https://www.fishipedia.es/wp-content/uploads/2016/11/Corydoras-panda.jpg',
        mediumSize: 6,
        maxSize: 7,
        longevity: 8,
        diet: 'Omnívoro',
        sociability: 'Banco',
        territoriality: 'No',
        wayOfLife: 'Diurno',
        wayOfBreeding: 'Ovíparo',
        stream: 'Lenta y estancada',
        minimumVolume: 80
    },
    {
        id: 6,
        name: 'Tetra Fantasma',
        ph: '5.5-7',
        kh: '10-20 dKH',
        gh: '10-20 dGH',
        temperature: '22-26°C',
        img: 'https://www.fishi-pedia.com/wp-content/uploads/2013/05/Hyphessobrycon_eques_5-725x483.jpg',
        mediumSize: 3,
        maxSize: 4,
        longevity: 5,
        diet: 'Carnívoro',
        sociability: 'Vive en pequeños grupos',
        territoriality: 'No',
        wayOfLife: 'Diurno',
        wayOfBreeding: 'Ovíparo',
        stream: 'Normal',
        minimumVolume: 100
    },
    {
        id: 7,
        name: 'Ramirezi',
        ph: '6-7',
        kh: '1-6 dKH',
        gh: '1-6 dGH',
        temperature: '23-30°C',
        img: 'https://www.fishipedia.es/wp-content/uploads/2014/03/Microgeophagus-Ramirezi-725x483.jpg',
        mediumSize: 3,
        maxSize: 4,
        longevity: 4,
        diet: 'Ommnivoro',
        sociability: 'Pareja o grupo',
        territoriality: 'Sí',
        wayOfLife: 'Diurno',
        wayOfBreeding: 'Ovíparo',
        stream: 'Normal',
        minimumVolume: 60
    },
    {
        id: 8,
        name: 'Ciclido púrpura',
        ph: '6-8',
        kh: '5-14 dKH',
        gh: '5-14 dGH',
        temperature: '24-27°C',
        img: 'https://www.fishipedia.es/wp-content/uploads/2013/09/Pelvicachromis_Pulcher_1-725x483.jpg',
        mediumSize: 9,
        maxSize: 10,
        longevity: 5,
        diet: 'Ommnivoro',
        sociability: 'Pareja',
        territoriality: 'Sí',
        wayOfLife: 'Diurno',
        wayOfBreeding: 'Ovíparo',
        stream: 'Normal',
        minimumVolume: 100
    },
    {
        id: 9,
        name: 'Neocaridina davidi',
        ph: '6-8',
        kh: '5-15 dKH',
        gh: '5-15 dGH',
        temperature: '4-28°C',
        img: 'https://www.fishipedia.es/wp-content/uploads/2017/10/Neocaridina-davidi-Sakura--725x483.jpg',
        mediumSize: 2,
        maxSize: 3,
        longevity: 2,
        diet: 'Ommnivoro',
        sociability: 'Grupos',
        territoriality: 'No',
        wayOfLife: 'Diurno',
        wayOfBreeding: 'Ovíparo',
        stream: 'Tranquilo',
        minimumVolume: 20
    },
    {
        id: 10,
        name: 'Goldfish',
        ph: '6.5-8',
        kh: '5-25 dKH',
        gh: '5-25 dGH',
        temperature: '10-25°C',
        img: 'https://www.fishi-pedia.com/wp-content/uploads/2016/01/poisson_rouge-2-725x483.jpg',
        mediumSize: 20,
        maxSize: 36,
        longevity: 35,
        diet: 'Ommnivoro',
        sociability: 'Grupos',
        territoriality: 'No',
        wayOfLife: 'Diurno',
        wayOfBreeding: 'Ovíparo',
        stream: 'Normal',
        minimumVolume: 200
    },
    {
        id: 11,
        name: 'Ojo de linterna',
        ph: '6.5-7.2',
        kh: '3-15 dKH',
        gh: '3-15 dGH',
        temperature: '22-26°C',
        img: 'https://www.fishipedia.es/wp-content/uploads/2020/09/Poropanchax-normani.jpg',
        mediumSize: 3,
        maxSize: 4,
        longevity: 4,
        diet: 'Carnívoro',
        sociability: 'Grupos',
        territoriality: 'No',
        wayOfLife: 'Diurno',
        wayOfBreeding: 'Ovíparo',
        stream: 'Tranquilo',
        minimumVolume: 50
    },
    {
        id: 12,
        name: 'Botia payaso',
        ph: '5-7',
        kh: '5-12 dKH',
        gh: '5-12 dGH',
        temperature: '22-30°C',
        img: 'https://www.fishipedia.es/wp-content/uploads/2024/12/Chromobotia_macracanthus_BCH_FISHI_3018_241206_0-725x483.jpg',
        mediumSize: 15,
        maxSize: 30,
        longevity: 20,
        diet: 'Ommnivoro',
        sociability: 'Grupos',
        territoriality: 'No',
        wayOfLife: 'Diurno',
        wayOfBreeding: 'Ovíparo',
        stream: 'Normal',
        minimumVolume: 150
    },
    {
        id: 13,
        name: 'Ancistrus',
        ph: '5.5-7.5',
        kh: '2-20 dKH',
        gh: '2-20 dGH',
        temperature: '22-26°C',
        img: 'https://www.fishipedia.es/wp-content/uploads/2014/07/Ancistrus-aff.-hoplogenys-725x483.jpg',
        mediumSize: 12,
        maxSize: 15,
        longevity: 8,
        diet: 'Ommnivoro',
        sociability: 'Solitario',
        territoriality: 'Sí',
        wayOfLife: 'Diurno',
        wayOfBreeding: 'Ovíparo',
        stream: 'Alto',
        minimumVolume: 150
    },
    {
        id: 14,
        name: 'Molly',
        ph: '7-8.2',
        kh: '7-20 dKH',
        gh: '7-20 dGH',
        temperature: '18-28°C',
        img: 'https://www.fishipedia.es/wp-content/uploads/2019/07/poecilia-sphenops-slaboch-725x483.jpg',
        mediumSize: 4,
        maxSize: 7,
        longevity: 3,
        diet: 'Ommnivoro',
        sociability: 'Grupos',
        territoriality: 'No',
        wayOfLife: 'Diurno',
        wayOfBreeding: 'Ovovivíparo',
        stream: 'Lento y estancada',
        minimumVolume: 100
    },
    {
        id: 15,
        name: 'Platy',
        ph: '7-8',
        kh: '7-20 dKH',
        gh: '7-20 dGH',
        temperature: '18-28°C',
        img: 'https://www.fishi-pedia.com/wp-content/uploads/2015/11/Platy-Wagtail-Rouge-725x483.jpg',
        mediumSize: 4,
        maxSize: 7,
        longevity: 5,
        diet: 'Ommnivoro',
        sociability: 'Grupos',
        territoriality: 'No',
        wayOfLife: 'Diurno',
        wayOfBreeding: 'Ovovivíparo',
        stream: 'Lento y estancada',
        minimumVolume: 100
    }
];

const FishCard: React.FC<{
    fish: Fish;
    selected: boolean;
    onSelect: (id: number) => void;
}> = ({ fish, selected, onSelect }) => (
    <div
        onClick={() => onSelect(fish.id)}
        className={`
            relative overflow-hidden
            border-2 rounded-xl p-4 m-2 w-64 cursor-pointer
            transition-all duration-300 flex flex-col items-center
            ${selected ?
                'border-teal-400 shadow-lg shadow-teal-100/50 bg-gradient-to-b from-teal-50 to-white' :
                'border-gray-200 shadow-md hover:shadow-lg hover:border-teal-200 bg-white'}
            hover:scale-[1.02] transform-gpu
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

        <div className="w-full space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
                <span className="font-medium">pH:</span>
                <span className="text-gray-700">{fish.ph}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-medium">KH:</span>
                <span className="text-gray-700">{fish.kh}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-medium">GH:</span>
                <span className="text-gray-700">{fish.gh}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-medium">Temp:</span>
                <span className="text-gray-700">{fish.temperature}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-medium">Tamaño medio:</span>
                <span className="text-gray-700">{fish.mediumSize}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-medium">Tamaño máximo:</span>
                <span className="text-gray-700">{fish.maxSize}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-medium">Longevidad:</span>
                <span className="text-gray-700">{fish.longevity}</span>
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
                <span className="text-gray-700">{fish.minimumVolume}</span>
            </div>
        </div>
    </div>
);

const ParameterRange: React.FC<{
    values: string[],
    ranges: { min: number, max: number },
    unit?: string,
    fishNames: string[]
}> = ({ values, ranges, unit, fishNames }) => {
    // Colores para cada pez (puedes ajustar estos colores)
    const fishColors = [
        'bg-teal-500',
        'bg-amber-500',
        'bg-rose-500',
        'bg-indigo-500',
        'bg-emerald-500'
    ];

    // Extract numeric ranges from values
    const numericRanges = values.map(v => {
        const nums = v.replace(/[^\d.-]/g, '').split('-').map(Number);
        return { min: nums[0], max: nums[1] || nums[0] };
    });

    return (
        <div>
            {/* Leyenda de colores */}
            <div className="flex flex-wrap gap-3 mb-2">
                {fishNames.map((name, idx) => (
                    <div key={idx} className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-1 ${fishColors[idx]}`}></div>
                        <span className="text-xs font-medium text-gray-600">{name}</span>
                    </div>
                ))}
            </div>

            {/* Gráfico de rangos */}
            <div className="relative h-12 w-full my-2">
                <div className="absolute h-1 bg-gray-200 w-full top-1/2 transform -translate-y-1/2 rounded-full"></div>

                {numericRanges.map((range, idx) => (
                    <div
                        key={idx}
                        className={`
                            absolute h-3 rounded-full top-1/2 transform -translate-y-1/2
                            ${fishColors[idx]}
                        `}
                        style={{
                            left: `${((range.min - ranges.min) / (ranges.max - ranges.min)) * 100}%`,
                            width: `${((range.max - range.min) / (ranges.max - ranges.min)) * 100}%`,
                        }}
                    >
                        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
                            {values[idx]}
                        </div>
                    </div>
                ))}

                <div className="absolute -top-3 left-0 text-xs text-gray-500">{ranges.min}{unit}</div>
                <div className="absolute -top-3 right-0 text-xs text-gray-500">{ranges.max}{unit}</div>
            </div>
        </div>
    );
};

const CompareSection: React.FC<{ selectedFish: Fish[] }> = ({ selectedFish }) => {
    if (selectedFish.length < 2) return null;

    // Define the ranges for each parameter for visualization
    const parameterRanges = {
        ph: { min: 5, max: 8.5 },
        kh: { min: 0, max: 25 },
        gh: { min: 0, max: 25 },
        temperature: { min: 10, max: 32 }
    };

    return (
        <div className="mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Comparatiba de compatibilidad
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
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
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                                    {selectedFish.map(fish => (
                                        <th key={fish.id} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            {fish.name}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">pH</td>
                                    {selectedFish.map(fish => (
                                        <td key={fish.id} className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{fish.ph}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">KH</td>
                                    {selectedFish.map(fish => (
                                        <td key={fish.id} className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{fish.kh}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">GH</td>
                                    {selectedFish.map(fish => (
                                        <td key={fish.id} className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{fish.gh}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-700">Temperatura</td>
                                    {selectedFish.map(fish => (
                                        <td key={fish.id} className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{fish.temperature}</td>
                                    ))}
                                </tr>
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
                                <>
                                    Estos peces {selectedFish.some(f => f.name === 'Betta') ? 'pueden requerir consideraciones especiales ' : 'están en rango compatible'}
                                    para la mayoría de los parámetros. Presta especial atención a los rangos de temperatura y niveles de pH para una convivencia óptima.
                                </>
                            ) : ''}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const FishPage: React.FC = () => {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const handleSelect = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const selectedFish = fishList.filter(fish => selectedIds.includes(fish.id));

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <h1 className="text-3xl font-bold text-gray-800">Comparador de peces ornamentales</h1>
                </div>

                <p className="text-gray-600 mb-8 max-w-3xl">
                    Selecciona dos o más especies de peces para comparar sus parámetros de agua ideales y verificar su compatibilidad para tu acuario.
                </p>

                <div className="mb-6 flex items-center">
                    <h2 className="text-xl font-semibold text-gray-700 mr-4">Especies disponible</h2>
                    {selectedIds.length > 0 && (
                        <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm font-medium rounded-full">
                            {selectedIds.length} seleccionado
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-10">
                    {fishList.map(fish => (
                        <FishCard
                            key={fish.id}
                            fish={fish}
                            selected={selectedIds.includes(fish.id)}
                            onSelect={handleSelect}
                        />
                    ))}
                </div>

                <CompareSection selectedFish={selectedFish} />
            </div>
        </div>
    );
};

export default FishPage;