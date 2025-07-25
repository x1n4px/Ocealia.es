import React, { useState, useEffect } from 'react';
import {
    Heart,
    Search,
    AlertTriangle,
    CheckCircle,
    Eye,
    X,
    Info,
    Activity,
    Clock,
    Stethoscope,
    ShieldCheck,
    AlertCircleIcon,
} from 'lucide-react';

// Importar los datos desde fishDiseaseData
import { fishDiseaseList, diseaseCategories, type FishDisease, type DiseaseCategory } from '../data/fishDiseaseData';

type SeverityLevel = 'Leve' | 'Moderada' | 'Grave' | 'Crítica';
type ContagiousLevel = 'No contagiosa' | 'Poco contagiosa' | 'Moderadamente contagiosa' | 'Altamente contagiosa';

const FishDiseasesGuide: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('todas');
    const [selectedDisease, setSelectedDisease] = useState<FishDisease | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const filteredDiseases: FishDisease[] = fishDiseaseList.filter(disease => {
        const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (disease.scientificName && disease.scientificName.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'todas' || disease.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const openModal = (disease: FishDisease): void => {
        setSelectedDisease(disease);
        setIsModalOpen(true);
    };

    const closeModal = (): void => {
        setIsModalOpen(false);
        setSelectedDisease(null);
    };

    const getSeverityColor = (severity: SeverityLevel): string => {
        switch (severity) {
            case 'Leve': return 'text-green-700 bg-green-100';
            case 'Moderada': return 'text-yellow-700 bg-yellow-100';
            case 'Grave': return 'text-orange-700 bg-orange-100';
            case 'Crítica': return 'text-red-700 bg-red-100';
            default: return 'text-gray-700 bg-gray-100';
        }
    };

    const getContagiousColor = (level: ContagiousLevel): string => {
        switch (level) {
            case 'No contagiosa': return 'text-green-700 bg-green-100';
            case 'Poco contagiosa': return 'text-blue-700 bg-blue-100';
            case 'Moderadamente contagiosa': return 'text-yellow-700 bg-yellow-100';
            case 'Altamente contagiosa': return 'text-red-700 bg-red-100';
            default: return 'text-gray-700 bg-gray-100';
        }
    };

    const getPrognosisColor = (prognosis?: string): string => {
        switch (prognosis) {
            case 'Excelente': return 'text-green-700 bg-green-100';
            case 'Bueno': return 'text-blue-700 bg-blue-100';
            case 'Regular': return 'text-yellow-700 bg-yellow-100';
            case 'Reservado': return 'text-orange-700 bg-orange-100';
            case 'Malo': return 'text-red-700 bg-red-100';
            default: return 'text-gray-700 bg-gray-100';
        }
    };

    const getCategoryColorClass = (category: string): string => {
        const categoryData = diseaseCategories.find(c => c.id === category);
        if (!categoryData) return 'bg-gray-100 text-gray-700';
        
        switch (categoryData.color) {
            case 'red': return 'bg-red-100 text-red-700 hover:bg-red-200';
            case 'yellow': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
            case 'purple': return 'bg-purple-100 text-purple-700 hover:bg-purple-200';
            case 'blue': return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
            case 'green': return 'bg-green-100 text-green-700 hover:bg-green-200';
            case 'orange': return 'bg-orange-100 text-orange-700 hover:bg-orange-200';
            default: return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
        }
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
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 font-sans">
            {/* Header */}
            <div className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-red-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                            <span className="bg-gradient-to-r from-red-600 via-pink-600 to-red-800 bg-clip-text text-transparent">
                                Guía Completa de Enfermedades de Peces de Agua Dulce
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Identifica, comprende y trata las enfermedades más comunes en peces de acuario.
                            Aprende sobre síntomas, causas, tratamientos y prevención para mantener a tus peces saludables.
                        </p>
                    </div>

                    <div className="flex justify-center items-center col-span-full mt-6">
                        <button
                            onClick={() => window.history.back()}
                            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-800 rounded-xl font-semibold shadow-md hover:bg-gray-200 transition-all duration-200 text-lg"
                        >
                            Volver al menú principal
                        </button>
                    </div>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-red-100 p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-6 mb-6">
                        {/* Search Bar */}
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Buscar enfermedades por nombre o nombre científico..."
                                    value={searchTerm}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-200 text-gray-700"
                                />
                            </div>
                        </div>

                        {/* Category Filter Dropdown */}
                        <div className="lg:w-64">
                            <select
                                value={selectedCategory}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-200 appearance-none bg-white text-gray-700 pr-10"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236B7280'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 0.75rem center',
                                    backgroundSize: '1.5em 1.5em'
                                }}
                            >
                                {diseaseCategories.map((category: DiseaseCategory) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Category Pills */}
                    <div className="flex flex-wrap gap-3 mt-4">
                        {diseaseCategories.map((category: DiseaseCategory) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm
                                ${selectedCategory === category.id
                                        ? `${getCategoryColorClass(category.id)} ring-2 ring-offset-1 ring-${category.color}-300`
                                        : `bg-gray-100 text-gray-600 hover:bg-gray-200`
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-8 text-center sm:text-left">
                    <p className="text-lg text-gray-700">
                        Mostrando <span className="font-bold text-red-700">{filteredDiseases.length}</span> enfermedades
                    </p>
                </div>

                {/* Diseases Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDiseases.map((disease: FishDisease) => (
                        <div
                            key={disease.id}
                            className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer transform hover:-translate-y-1"
                            onClick={() => openModal(disease)}
                        >
                            <div className="relative p-4 bg-gradient-to-br from-red-50 to-pink-50 flex justify-center items-center h-48 overflow-hidden">
                                <img
                                    src={disease.image}
                                    alt={disease.name}
                                    className="object-contain w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute top-4 right-4 flex flex-col gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(disease.severity)} shadow-sm`}>
                                        {disease.severity}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getContagiousColor(disease.contagiousLevel)} shadow-sm`}>
                                        {disease.contagiousLevel}
                                    </span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-red-700 transition-colors leading-tight">
                                    {disease.name}
                                </h3>
                                {disease.scientificName && (
                                    <p className="text-sm text-gray-500 italic mb-4">{disease.scientificName}</p>
                                )}

                                <div className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-medium ${getCategoryColorClass(disease.category)} shadow-sm`}>
                                    <Heart className="w-3.5 h-3.5 mr-2" />
                                    {diseaseCategories.find((c: DiseaseCategory) => c.id === disease.category)?.name}
                                </div>

                                <p className="text-gray-600 text-base mt-4 mb-5 line-clamp-3 leading-relaxed">
                                    {disease.description}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                                        <div className="flex items-center">
                                            <AlertTriangle className="w-3.5 h-3.5 mr-1 text-orange-500" />
                                            {disease.causes.length} causas
                                        </div>
                                        <div className="flex items-center">
                                            <CheckCircle className="w-3.5 h-3.5 mr-1 text-green-500" />
                                            {disease.treatments.length} tratamientos
                                        </div>
                                        {disease.timeToTreat && (
                                            <div className="flex items-center">
                                                <Clock className="w-3.5 h-3.5 mr-1 text-blue-500" />
                                                {disease.timeToTreat}
                                            </div>
                                        )}
                                    </div>

                                    <button className="flex items-center text-red-600 hover:text-red-700 text-sm font-medium group-hover:translate-x-1 transition-all duration-200">
                                        <Eye className="w-4 h-4 mr-1.5" />
                                        Ver detalles
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No results */}
                {filteredDiseases.length === 0 && (
                    <div className="text-center py-16 bg-white/70 rounded-2xl shadow-lg mt-8">
                        <div className="text-gray-400 mb-6">
                            <Search className="w-20 h-20 mx-auto" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-3">¡Lo sentimos, no se encontraron enfermedades!</h3>
                        <p className="text-gray-500 text-lg">Prueba a utilizar otros términos de búsqueda o ajusta los filtros de categoría para encontrar lo que necesitas.</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && selectedDisease && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto animate-fade-in-up">
                        {/* Modal Header */}
                        <div className="relative bg-gradient-to-br from-red-100 to-pink-100 p-6 sm:p-8 rounded-t-3xl flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full">
                                <img
                                    src={selectedDisease.image}
                                    alt={selectedDisease.name}
                                    className="w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-contain rounded-xl border border-gray-200 shadow-md flex-shrink-0"
                                />
                                <div className="text-center sm:text-left flex-grow">
                                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-2">
                                        {selectedDisease.name}
                                    </h2>
                                    {selectedDisease.scientificName && (
                                        <p className="text-lg text-gray-600 italic mb-3">{selectedDisease.scientificName}</p>
                                    )}
                                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
                                        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getSeverityColor(selectedDisease.severity)} shadow-sm`}>
                                            Severidad: {selectedDisease.severity}
                                        </span>
                                        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getContagiousColor(selectedDisease.contagiousLevel)} shadow-sm`}>
                                            {selectedDisease.contagiousLevel}
                                        </span>
                                        {selectedDisease.prognosis && (
                                            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getPrognosisColor(selectedDisease.prognosis)} shadow-sm`}>
                                                Pronóstico: {selectedDisease.prognosis}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-gray-800"
                                aria-label="Cerrar"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 sm:p-8 space-y-8">
                            {/* Description */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <Info className="w-5 h-5 mr-2 text-blue-600" />
                                    Descripción General
                                </h3>
                                <p className="text-gray-700 leading-relaxed">{selectedDisease.description}</p>
                            </div>

                            {/* Visual Symptoms */}
                            {selectedDisease.visualSymptoms && (
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                        <Eye className="w-5 h-5 mr-2 text-purple-600" />
                                        Síntomas Visuales
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed bg-purple-50 p-4 rounded-lg border border-purple-100">
                                        {selectedDisease.visualSymptoms}
                                    </p>
                                </div>
                            )}

                            {/* Behavioral Symptoms */}
                            {selectedDisease.behavioralSymptoms && (
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                        <Activity className="w-5 h-5 mr-2 text-teal-600" />
                                        Síntomas de Comportamiento
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed bg-teal-50 p-4 rounded-lg border border-teal-100">
                                        {selectedDisease.behavioralSymptoms}
                                    </p>
                                </div>
                            )}

                            {/* Causes */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                                    Principales Causas
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {selectedDisease.causes.map((cause: string, index: number) => (
                                        <div key={index} className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg border border-orange-100 shadow-sm">
                                            <div className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-orange-700 font-bold text-sm">{index + 1}</span>
                                            </div>
                                            <p className="text-gray-700 text-base leading-relaxed">{cause}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Treatments */}
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <Stethoscope className="w-5 h-5 mr-2 text-green-600" />
                                    Tratamientos Efectivos
                                </h3>
                                <div className="space-y-4">
                                    {selectedDisease.treatments.map((treatment: string, index: number) => (
                                        <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-100 shadow-sm">
                                            <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <CheckCircle className="w-4 h-4 text-green-700" />
                                            </div>
                                            <p className="text-gray-700 text-base leading-relaxed">{treatment}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Prevention */}
                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 shadow-inner">
                                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                    <ShieldCheck className="w-5 h-5 mr-2 text-blue-600" />
                                    Clave para la Prevención
                                </h3>
                                <p className="text-gray-700 font-medium leading-relaxed">{selectedDisease.prevention}</p>
                            </div>

                            {/* Affected Species */}
                            {selectedDisease.affectedSpecies && selectedDisease.affectedSpecies.length > 0 && (
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                        <Heart className="w-5 h-5 mr-2 text-pink-600" />
                                        Especies Más Afectadas
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedDisease.affectedSpecies.map((species: string, index: number) => (
                                            <span key={index} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
                                                {species}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Treatment Time */}
                            {selectedDisease.timeToTreat && (
                                <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100 shadow-inner">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                        <Clock className="w-5 h-5 mr-2 text-indigo-600" />
                                        Tiempo de Tratamiento
                                    </h3>
                                    <p className="text-gray-700 font-medium leading-relaxed">{selectedDisease.timeToTreat}</p>
                                </div>
                            )}

                            {/* Warnings */}
                            {selectedDisease.warnings && selectedDisease.warnings.length > 0 && (
                                <div className="bg-red-50 rounded-xl p-6 border border-red-100 shadow-inner">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                        <AlertCircleIcon className="w-5 h-5 mr-2 text-red-600" />
                                        Advertencias y Consideraciones Importantes
                                    </h3>
                                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                        {selectedDisease.warnings.map((warning: string, index: number) => (
                                            <li key={index}>{warning}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FishDiseasesGuide;
