'use client';

import { useCart } from '@/app/context/CartContext';
import { createOrder } from '@/app/actions/checkout';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
    const { items, removeFromCart, clearCart, totalPrice } = useCart();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleCheckout = async () => {
        if (items.length === 0) return;

        setLoading(true);

        try {
            // In a real app, we'd get this from the session.
            // For now, we'll let the server action handle finding/creating a default client if needed,
            // OR we pass a known ID. Since we can't easily create a client client-side,
            // let's update the server action to handle the "Guest" client creation if ID is missing.
            // For this step, I will pass a placeholder and update the server action to be robust.
            const clientId = 'guest-client';

            const result = await createOrder(
                items.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                totalPrice,
                items[0].restaurantId,
                clientId
            );

            if (result.success) {
                clearCart();
                alert('Order placed successfully! 🚀');
                router.push('/client');
            } else {
                alert('Failed to place order');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
                <div className="text-6xl mb-4">🛒</div>
                <h1 className="text-xl font-bold text-[#3E2723] mb-2">Your cart is empty</h1>
                <p className="text-muted mb-8">Looks like you haven't added any breakfast yet.</p>
                <Link href="/client" className="px-8 py-3 bg-[#3E2723] text-white rounded-xl font-bold shadow-lg hover:bg-[#5D4037] transition-colors">
                    Start Ordering
                </Link>
            </div>
        );
    }

    return (
        <div className="pb-24">
            <h1 className="text-2xl font-bold text-[#3E2723] mb-6">Your Cart</h1>

            <div className="space-y-4 mb-8">
                {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                            🥐
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-[#3E2723]">{item.name}</h3>
                            <p className="text-xs text-muted">{item.restaurantName}</p>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-[#D4AF37] font-bold">{item.price} MAD x {item.quantity}</span>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 text-xs font-medium px-2 py-1 bg-red-50 rounded-md"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-muted">Subtotal</span>
                    <span className="font-bold">{totalPrice.toFixed(2)} MAD</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-muted">Delivery Fee</span>
                    <span className="font-bold text-green-600">Free</span>
                </div>
                <div className="border-t pt-4 flex justify-between items-center mb-6">
                    <span className="font-bold text-lg text-[#3E2723]">Total</span>
                    <span className="font-bold text-2xl text-[#3E2723]">{totalPrice.toFixed(2)} MAD</span>
                </div>

                <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="w-full py-4 bg-[#3E2723] text-white rounded-xl font-bold text-lg hover:bg-[#5D4037] transition-colors shadow-lg disabled:opacity-50"
                >
                    {loading ? 'Placing Order...' : 'Checkout 💳'}
                </button>
            </div>
        </div>
    );
}
