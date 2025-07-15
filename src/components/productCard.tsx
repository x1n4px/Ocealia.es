// components/ProductCard.tsx

import React from 'react';
import type { Product } from '../data/productData'; // Asegúrate de que la ruta sea correcta

interface ProductCardProps {
    product: Product;
    onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
    return (
        <div
            className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 transform hover:scale-[1.02] flex flex-col h-full"
            onClick={() => onClick(product)}
        >
            <div className="relative w-full h-48 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div  className="absolute inset-0 bg-white opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-white font-medium text-sm">Ver detalles</span>
                </div>
            </div>
            <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                <p className="text-gray-600 text-sm flex-grow line-clamp-3">{product.description}</p>
                <div className="mt-auto pt-3 flex justify-between items-center">
                    <span className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full font-semibold">
                        {product.use}
                    </span>
                </div>
                
            </div>
        </div>
    );
};

export default ProductCard;