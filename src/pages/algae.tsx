import React, { useState, useEffect } from 'react';
import {
    Droplets,
    Search,
    AlertTriangle,
    CheckCircle,
    Eye,
    Lightbulb,
    X,
} from 'lucide-react';

// Interfaces y tipos
interface Family {
    id: string;
    name: string;
    color: string;
}

interface Alga {
    id: number;
    name: string;
    family: string;
    scientificName: string;
    image: string;
    difficulty: 'Fácil' | 'Moderado' | 'Difícil' | 'Muy Difícil';
    description: string;
    causes: string[];
    solutions: string[];
    prevention: string;
    dangerLevel: 'Muy Bajo' | 'Bajo' | 'Medio' | 'Alto' | 'Muy Alto';
}

type DifficultyLevel = 'Fácil' | 'Moderado' | 'Difícil' | 'Muy Difícil';
type DangerLevel = 'Muy Bajo' | 'Bajo' | 'Medio' | 'Alto' | 'Muy Alto';

const AlgasGuide: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedFamily, setSelectedFamily] = useState<string>('todas');
    const [selectedAlga, setSelectedAlga] = useState<Alga | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const families: Family[] = [
        { id: 'todas', name: 'Todas las Familias', color: 'gray' },
        { id: 'verdes', name: 'Algas Verdes', color: 'green' },
        { id: 'marrones', name: 'Algas Marrones', color: 'yellow' },
        { id: 'azules', name: 'Cianobacterias', color: 'blue' },
        { id: 'rojas', name: 'Algas Rojas', color: 'red' },
        { id: 'filamentosas', name: 'Algas Filamentosas', color: 'emerald' }
    ];

    const algas: Alga[] = [
        {
            id: 1,
            name: 'Algas Verdes en Cristal',
            family: 'verdes',
            scientificName: 'Chlorophyta spp.',
            image: 'https://www.nascapers.es/wp-content/uploads/2023/02/alga-punto-verde-acuarios-nascapers.webp',
            difficulty: 'Fácil',
            description: 'Película verde que se forma en cristales y decoraciones. Es la más común y generalmente indica un acuario saludable en pequeñas cantidades.',
            causes: [
                'Exceso de luz directa o muy intensa',
                'Niveles altos de fosfatos y nitratos',
                'Falta de plantas competidoras',
                'Desequilibrio en la fertilización'
            ],
            solutions: [
                'Reducir las horas de iluminación (6-8 horas)',
                'Limpiar cristales semanalmente con rasqueta',
                'Aumentar plantas de crecimiento rápido',
                'Realizar cambios de agua más frecuentes',
                'Revisar sobrealimentación'
            ],
            prevention: 'Mantener equilibrio entre luz, nutrientes y CO₂',
            dangerLevel: 'Bajo'
        },
        {
            id: 2,
            name: 'Algas Marrones (Diatomeas)',
            family: 'marrones',
            scientificName: 'Bacillariophyta',
            image: 'https://pezverde.es/tienda/img/cms/Captura%20de%20pantalla%202020-03-19%20a%20las%203-49-42.png',
            difficulty: 'Fácil',
            description: 'Capa marrón polvorienta que cubre plantas, sustrato y decoraciones. Común en acuarios nuevos durante las primeras semanas.',
            causes: [
                'Acuario en proceso de maduración',
                'Acuarios viejos',
                'Iluminación insuficiente o antigua',
                'Falta de CO2',
                'Exceso de silicatos en el agua',
                'Falta de competencia de plantas'
            ],
            solutions: [
                'Aspirar el sustrato regularmente',
                'Mejorar la iluminación (LED de calidad)',
                'Usar filtro de silicatos si es necesario'
            ],
            prevention: 'Limpieza regular y mantenimiento adecuado del acuario',
            dangerLevel: 'Muy Bajo'
        },
        {
            id: 3,
            name: 'Cianobacterias (Algas Azul-Verdes)',
            family: 'azules',
            scientificName: 'Cyanobacteria',
            image: 'https://pezverde.es/tienda/img/cms/Captura%20de%20pantalla%202020-03-19%20a%20las%203-45-41.png',
            difficulty: 'Difícil',
            description: 'Manta gelatinosa azul-verdosa con olor desagradable. Son bacterias, no algas verdaderas. Muy persistentes y tóxicas.',
            causes: [
                'Mala circulación del agua',
                'Exceso de materia orgánica',
                'Iluminación excesiva',
                'Desequilibrio de nutrientes',
                'pH demasiado alto',
                'exceso de fósforo en relación con el nitrógeno'
            ],
            solutions: [
                'Mejorar la circulación con bombas adicionales',
                'Sifonear las áreas afectadas',
                'Tratamiento con antibióticos específicos',
                'Blackout de 3-4 días (cubrir acuario)',
                'Revisión completa de parámetros',
                'Python Git Plus o Sol'
            ],
            prevention: 'Excelente circulación y limpieza rigurosa',
            dangerLevel: 'Muy Alto'
        },
        {
            id: 4,
            name: 'Algas Filamentosas Verdes',
            family: 'filamentosas',
            scientificName: 'Spirogyra, Cladophora',
            image: 'https://pezverde.es/tienda/img/cms/Captura%20de%20pantalla%202020-03-19%20a%20las%203-30-20.png',
            difficulty: 'Moderado',
            description: 'Parece una bola de musgo pero es un alga que se ve en muchos sitios a la venta.',
            causes: [
                'Introducirlas al acuario'
            ],
            solutions: [
                'Resetear el acuario',
            ],
            prevention: 'No introducirlas al acuario',
            dangerLevel: 'Medio'
        },
        {
            id: 5,
            name: 'Algas Negras (Barba Negra)',
            family: 'rojas',
            scientificName: 'Audouinella, Compsopogon',
            image: 'https://pezverde.es/tienda/img/cms/Captura%20de%20pantalla%202020-03-19%20a%20las%203-34-16.png',
            difficulty: 'Muy Difícil',
            description: 'Mechones negros o gris oscuro que se adhieren fuertemente a plantas y decoraciones. Muy difíciles de eliminar.',
            causes: [
                'Exceso de hierro o fosfatos',
                'Ausencia de CO₂',
                'Altos valores de KH',
                'Corriente excesiva',
                'Desequilibrio de nutrientes',
            ],
            solutions: [
                'Estabilizar inyección de CO₂',
                'Podar plantas afectadas',
                'Tratamiento con Excel',
                'Tratamiento externo (si las piezas se pueden extraer)'
            ],
            prevention: 'CO₂ estable, corrientes moderadas y equilibrar parámetros',
            dangerLevel: 'Muy Alto'
        },
        {
            id: 6,
            name: 'Algas Punto Verde',
            family: 'verdes',
            scientificName: 'Choleochaete',
            image: 'https://pezverde.es/tienda/img/cms/Captura%20de%20pantalla%202020-03-19%20a%20las%203-14-15.png',
            difficulty: 'Moderado',
            description: 'Pequeños puntos verdes duros que se adhieren fuertemente a cristales y hojas de plantas. Resistentes al raspado.',
            causes: [
                'Exceso de luz intensa',
                'Niveles de fosfato y/o CO2 bajos',
                'Niveles altos de nitratos'
            ],
            solutions: [
                'Reducir intensidad lumínica',
                'Rasqueta de metal para cristales',
                'Valorar agregar fosfatos',
                'Ajustar niveles de CO₂',
                'Caracol cebra',
            ],
            prevention: 'Luz moderada y nutrientes equilibrados',
            dangerLevel: 'Bajo'
        },
        {
            id: 7,
            name: 'Algas Pelusa verde',
            family: 'verdes',
            scientificName: 'Oedogonium',
            image: 'https://pezverde.es/tienda/img/cms/Captura%20de%20pantalla%202020-03-19%20a%20las%203-23-52.png',
            difficulty: 'Moderado',
            description: 'El Alga pelusa son hilos de algas delgados de solo un par de milímetros situados principalmente en las hojas de las plantas.',
            causes: [
                'Exceso de luz intensa',
                'niveles de CO2 bajos'
            ],
            solutions: [
                'Reducir intensidad lumínica',
                'Ajustar niveles de CO₂',
                'Excel (Seachem)',
                'Azoo Algae Away'
            ],
            prevention: 'Luz moderada y nutrientes equilibrados',
            dangerLevel: 'Bajo'
        },
        {
            id: 8,
            name: 'Alga barba verde',
            family: 'verdes',
            scientificName: 'Oedogonium',
            image: 'https://pezverde.es/tienda/img/cms/Captura%20de%20pantalla%202020-03-19%20a%20las%203-30-20.png',
            difficulty: 'Moderado',
            description: 'El alga barba verde o filamentosa no es más que una forma más agresiva de alga pelusa verde. Los delgados hilos de la misma son bastante más largos y más viscosos que en la primera . Puede crecer y formar una capa verde densa en su superficie.',
            causes: [
                'niveles de CO2 bajos',
            ],
            solutions: [
                'Reducir intensidad lumínica',
                'Ajustar niveles de CO₂',
                'Excel (Seachem)',
                'Azoo Algae Away',
                'Zorro Volador (Valorar según acuario)'
            ],
            prevention: 'Luz moderada y nutrientes equilibrados',
            dangerLevel: 'Medio'
        },
        {
            id: 9,
            name: 'Alga asta de ciervo ',
            family: 'Rojas',
            scientificName: 'Compsopogon',
            image: 'https://pezverde.es/tienda/img/cms/Captura%20de%20pantalla%202020-03-19%20a%20las%203-40-43.png',
            difficulty: 'Moderado',
            description: 'Son de color gris claro y tienen forma de coral o asta de ciervo. Suelen aparecer en los bordes de las hojas. Le gustan las áreas más cercanas a la superficie. Se adhiere con fuerza pero si adquiere cierto tamaño se pueden arrancar con relativa facilidad.',
            causes: [
                'altos niveles de amoníaco',
                'bajo flujo de agua',
                'dessequilibrio de nutrientes',
            ],
            solutions: [
                'Corte las hojas infectadas',
                'Excel (Seachem)'
            ],
            prevention: 'Luz moderada y nutrientes equilibrados',
            dangerLevel: 'Medio'
        },
        {
            id: 10,
            name: 'Unicelular',
            family: 'verde',
            scientificName: 'Unicelular',
            image: 'https://pezverde.es/tienda/img/cms/Captura%20de%20pantalla%202020-03-19%20a%20las%203-57-07.png',
            difficulty: 'Difícil',
            description: 'El agua verde es causada por algas flotantes. Puede estar compuesto de múltiples tipos de organismos, desde algas verdes reales como Chlorella hasta flagelados. Cuando aparece, su expansión es muy rápida.',
            causes: [
                'altos niveles de amoníaco',
                'bajo flujo de agua',
                'dessequilibrio de nutrientes',
                'bajo nivel de CO2'
            ],
            solutions: [
                'Mejorar la calidad del agua',
                'Apagón de luz durante 3-4 días',
                'Aumentar aireación',
                'Grreen water remover de Azoo'
            ],
            prevention: 'Luz moderada y nutrientes equilibrados',
            dangerLevel: 'Medio'
        }
    ];

    const filteredAlgas: Alga[] = algas.filter(alga => {
        const matchesSearch = alga.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alga.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFamily = selectedFamily === 'todas' || alga.family === selectedFamily;
        return matchesSearch && matchesFamily;
    });

    const openModal = (alga: Alga): void => {
        setSelectedAlga(alga);
        setIsModalOpen(true);
    };

    const closeModal = (): void => {
        setIsModalOpen(false);
        setSelectedAlga(null);
    };

    const getDifficultyColor = (difficulty: DifficultyLevel): string => {
        switch (difficulty) {
            case 'Fácil': return 'text-green-600 bg-green-100';
            case 'Moderado': return 'text-yellow-600 bg-yellow-100';
            case 'Difícil': return 'text-orange-600 bg-orange-100';
            case 'Muy Difícil': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getDangerColor = (level: DangerLevel): string => {
        switch (level) {
            case 'Muy Bajo': return 'text-green-600 bg-green-100';
            case 'Bajo': return 'text-blue-600 bg-blue-100';
            case 'Medio': return 'text-yellow-600 bg-yellow-100';
            case 'Alto': return 'text-orange-600 bg-orange-100';
            case 'Muy Alto': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    const getFamilyColor = (family: string): string => {
        const familyData = families.find(f => f.id === family);
        return familyData ? familyData.color : 'gray';
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            {/* Header */}
            <div className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-blue-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-green-800 bg-clip-text text-transparent">
                                Guía de Algas en Acuarios
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Identifica, comprende y controla las algas en tu acuario. Aprende sobre cada tipo,
                            sus causas y las mejores soluciones para mantener el equilibrio perfecto.
                        </p>
                        {/* Attribution */}
                        <p className="text-xs text-gray-400 mt-4">
                            Datos obtenidos de: <a href="https://pezverde.es/tienda/content/7-como-eliminar-las-algas-del-acuario" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">pezverde.es</a>
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

            {/* Search and Filter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-100 p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Search Bar */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Buscar algas por nombre o nombre científico..."
                                    value={searchTerm}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Family Filter */}
                        <div className="lg:w-64">
                            <select
                                value={selectedFamily}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedFamily(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 appearance-none bg-white"
                            >
                                {families.map((family: Family) => (
                                    <option key={family.id} value={family.id}>
                                        {family.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Family Pills */}
                    <div className="flex flex-wrap gap-2 mt-6">
                        {families.map((family: Family) => (
                            <button
                                key={family.id}
                                onClick={() => setSelectedFamily(family.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selectedFamily === family.id
                                    ? `bg-${family.color}-100 text-${family.color}-700 ring-2 ring-${family.color}-300`
                                    : `bg-gray-100 text-gray-600 hover:bg-${family.color}-50 hover:text-${family.color}-600`
                                    }`}
                            >
                                {family.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Mostrando <span className="font-semibold text-blue-600">{filteredAlgas.length}</span> tipos de algas
                    </p>
                </div>

                {/* Algas Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAlgas.map((alga: Alga) => (
                        <div
                            key={alga.id}
                            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                            onClick={() => openModal(alga)}
                        >
                            <div className="p-6 bg-gradient-to-br from-blue-50 to-green-50">
                                <div className="flex items-center justify-between mb-4">
                                    <img src={alga.image} alt={alga.name} style={{ width: '80%' }} />
                                    <div className="flex flex-col gap-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(alga.difficulty)}`}>
                                            {alga.difficulty}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDangerColor(alga.dangerLevel)}`}>
                                            {alga.dangerLevel}
                                        </span>
                                    </div>

                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                                    {alga.name}
                                </h3>
                                <p className="text-sm text-gray-500 italic mb-4">{alga.scientificName}</p>

                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${getFamilyColor(alga.family)}-100 text-${getFamilyColor(alga.family)}-700`}>
                                    <Droplets className="w-3 h-3 mr-1" />
                                    {families.find((f: Family) => f.id === alga.family)?.name}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6">
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {alga.description}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                                        <div className="flex items-center">
                                            <AlertTriangle className="w-3 h-3 mr-1" />
                                            {alga.causes.length} causas
                                        </div>
                                        <div className="flex items-center">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            {alga.solutions.length} soluciones
                                        </div>
                                    </div>

                                    <button className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium group-hover:translate-x-1 transition-all duration-200">
                                        <Eye className="w-4 h-4 mr-1" />
                                        Ver más
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No results */}
                {filteredAlgas.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Search className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron algas</h3>
                        <p className="text-gray-500">Intenta con otros términos de búsqueda o cambia el filtro de familia.</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && selectedAlga && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-start justify-between z-10">

                            {/* Contenedor para la imagen y el texto, dispuestos en columna */}
                            <div className="flex flex-col items-center flex-grow-0 sm:flex-grow">
                                <img
                                    src={selectedAlga.image}
                                    alt={selectedAlga.name}
                                    // CLASES MODIFICADAS AQUÍ para un tamaño más grande
                                    className="w-32 h-32 lg:w-128 lg:h-64 object-cover  mb-2 sm:mb-0 sm:mr-4"
                                />
                                <div className="text-center sm:text-left mt-2"> {/* Añadido mt-2 para más espacio vertical */}
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{selectedAlga.name}</h2>
                                    <p className="text-gray-500 italic text-sm sm:text-base">{selectedAlga.scientificName}</p>
                                    <div className="flex flex-wrap justify-center sm:justify-start items-center space-x-2 mt-2">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedAlga.difficulty)}`}>
                                            {selectedAlga.difficulty}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDangerColor(selectedAlga.dangerLevel)}`}>
                                            Peligro: {selectedAlga.dangerLevel}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Botón de cerrar a la derecha */}
                            <button
                                onClick={closeModal}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors self-start ml-4"
                            >
                                {/* Asegúrate de que el componente X esté importado o definido */}
                                <X className="w-6 h-6" /> {/* Using Lucide React X component */}
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-8">
                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                    <Eye className="w-5 h-5 mr-2 text-blue-600" />
                                    Descripción
                                </h3>
                                <p className="text-gray-600 leading-relaxed">{selectedAlga.description}</p>
                            </div>

                            {/* Causes */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                                    Principales Causas
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {selectedAlga.causes.map((cause: string, index: number) => (
                                        <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
                                            <div className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-orange-700 font-bold text-xs">{index + 1}</span>
                                            </div>
                                            <p className="text-gray-700 text-sm">{cause}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Solutions */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                                    Soluciones Efectivas
                                </h3>
                                <div className="space-y-3">
                                    {selectedAlga.solutions.map((solution: string, index: number) => (
                                        <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-100">
                                            <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle className="w-4 h-4 text-green-700" />
                                            </div>
                                            <p className="text-gray-700">{solution}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Prevention */}
                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                                    <Lightbulb className="w-5 h-5 mr-2 text-blue-600" />
                                    Prevención
                                </h3>
                                <p className="text-gray-700 font-medium">{selectedAlga.prevention}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AlgasGuide;