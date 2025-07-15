// pages/products.tsx

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { productList } from '../data/productData';
import type { Product } from '../data/productData';
import ProductCard from '../components/productCard';

// Definimos los tipos de uso posibles para el filtro
type ProductUse = 'Alimentación' | 'Filtración' | 'Acondicionadores' | 'Decoración' | 'Iluminación' | 'Sustratos' | 'Calefacción' | 'Todos';

const ProductsPage: React.FC = () => {
    const [selectedUse, setSelectedUse] = useState<ProductUse>('Todos');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // Creamos una ref para el contenido del modal
    const modalContentRef = useRef<HTMLDivElement>(null);

    // Obtener todas las categorías de uso únicas para el filtro
    const allUses: ProductUse[] = useMemo(() => {
        const uses = new Set<ProductUse>();
        productList.forEach(product => uses.add(product.use));
        return ['Todos', ...Array.from(uses).sort()];
    }, []);

    // Filtrar productos basados en el uso seleccionado
    const filteredProducts = useMemo(() => {
        if (selectedUse === 'Todos') {
            return productList;
        }
        return productList.filter(product => product.use === selectedUse);
    }, [selectedUse]);

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    // useEffect para manejar los clics fuera del modal y la tecla Escape
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Si el clic no fue dentro del contenido del modal, y el modal está abierto, ciérralo
            if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node) && isModalOpen) {
                closeModal();
            }
        };

        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isModalOpen) {
                closeModal();
            }
        };

        // Añadir listeners cuando el modal está abierto
        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscapeKey);
        }

        // Limpiar listeners al cerrar el modal o desmontar el componente
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [isModalOpen]); // Se ejecuta cada vez que isModalOpen cambia


    return (
        <>
            {/* Encabezado fijo similar a FishPage */}
            <div className="bg-white/95 backdrop-blur-sm shadow-lg border-b border-blue-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-800 bg-clip-text text-transparent">
                                Productos de interés
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Explora nuestra selección de productos esenciales para tu acuario. Encuentra lo que necesitas para el cuidado y mantenimiento de tus peces.
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
                    {/* Sección de filtro */}
                    <div className="mb-8 p-4 md:p-6 bg-white rounded-xl shadow-md border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            Filtrar productos por uso
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {allUses.map(use => (
                                <button
                                    key={use}
                                    onClick={() => setSelectedUse(use)}
                                    className={`
                                        px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                                        ${selectedUse === use
                                            ? 'bg-purple-600 text-white shadow-md'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                                    `}
                                >
                                    {use}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Lista de productos */}
                    {filteredProducts.length === 0 ? (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-md">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.542 2.705-1.542 3.47 0l5.58 11.25c.38.766-.112 1.65-.948 1.65H3.596c-.836 0-1.328-.884-.949-1.65l5.58-11.25zM10 11a1 1 0 100-2 1 1 0 000 2zm1-2a1 1 0 10-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-yellow-700">
                                        No se encontraron productos para la categoría seleccionada.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} onClick={handleProductClick} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de detalles del producto */}
            {isModalOpen && selectedProduct && (
                <div
                    className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center p-4 z-50"
                    // Elimina el onClick aquí para que solo se cierre con el botón o clic fuera
                >
                    <div
                        className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
                        ref={modalContentRef} // Asignamos la ref aquí
                        onClick={(e) => e.stopPropagation()} // Detenemos la propagación del clic dentro del modal
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                        >
                            &times;
                        </button>
                        <div className="relative w-full h-64 overflow-hidden rounded-t-lg">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.title}
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="p-6">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedProduct.title}</h2>
                            <p className="text-md text-gray-600 mb-1">{selectedProduct.brand}</p>
                            <span className="inline-block bg-teal-100 text-teal-800 text-sm px-3 py-1 rounded-full font-semibold mb-4">
                                {selectedProduct.use}
                            </span>
                            <p className="text-gray-700 text-base mb-4">{selectedProduct.description}</p>

                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Detalles:</h3>
                            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                                {selectedProduct.details.map((detail, index) => (
                                    <li key={index}>{detail}</li>
                                ))}
                            </ul>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


export default ProductsPage;