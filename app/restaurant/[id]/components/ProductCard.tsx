'use client';

import { useCart } from '@/app/context/CartContext';
import { useState } from 'react';

interface ProductProps {
    id: string;
    name: string;
    description: string | null;
    price: number;
    image: string | null;
    restaurantId: string;
    restaurantName: string;
}

export default function ProductCard({ product }: { product: ProductProps }) {
    const { addToCart } = useCart();
    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = () => {
        setIsAdding(true);
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            restaurantId: product.restaurantId,
            restaurantName: product.restaurantName
        });

        // Visual feedback
        setTimeout(() => setIsAdding(false), 500);
    };

    return (
        <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex-1">
                <h3 className="font-bold text-[#3E2723] mb-1">{product.name}</h3>
                <p className="text-xs text-muted mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-[#D4AF37]">{product.price} MAD</span>
                    <button
                        onClick={handleAdd}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${isAdding
                                ? 'bg-green-500 text-white scale-95'
                                : 'bg-[#3E2723] text-white hover:bg-[#5D4037]'
                            }`}
                    >
                        {isAdding ? 'Added! ✓' : 'Add +'}
                    </button>
                </div>
            </div>
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center text-2xl">
                {/* Placeholder for product image */}
                🥐
            </div>
        </div>
    );
}
