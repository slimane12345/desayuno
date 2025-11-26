'use client';

import { updateOrderStatus } from '@/app/actions/order';
import { useState } from 'react';

interface OrderProps {
    id: string;
    status: string;
    total: number;
    restaurant: { name: string } | null;
    client: { name: string | null } | null;
    address: string | null;
}

export default function ActiveOrderCard({ order }: { order: OrderProps }) {
    const [loading, setLoading] = useState(false);

    const handleStatusUpdate = async (newStatus: string) => {
        setLoading(true);
        try {
            await updateOrderStatus(order.id, newStatus);
        } catch (error) {
            console.error(error);
            alert('Failed to update status');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#3E2723]">
            <div className="flex justify-between items-center mb-4">
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    ACTIVE ORDER
                </span>
                <span className="font-bold text-lg text-[#3E2723]">#{order.id.slice(-4)}</span>
            </div>

            <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                    <div className="mt-1">🏪</div>
                    <div>
                        <p className="text-xs text-muted">Restaurant</p>
                        <p className="font-bold text-[#3E2723]">{order.restaurant?.name}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="h-8 w-0.5 bg-gray-200 ml-2"></div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="mt-1">📍</div>
                    <div>
                        <p className="text-xs text-muted">Deliver to</p>
                        <p className="font-bold text-[#3E2723]">{order.address || order.client?.name || "Client Address"}</p>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl mb-6">
                <div className="flex justify-between items-center">
                    <span className="text-muted">Total to Collect</span>
                    <span className="font-bold text-xl text-[#3E2723]">{order.total} MAD</span>
                </div>
            </div>

            {order.status === 'ACCEPTED' && (
                <button
                    onClick={() => handleStatusUpdate('ON_WAY')}
                    disabled={loading}
                    className="w-full py-4 bg-[#3E2723] text-white rounded-xl font-bold text-lg hover:bg-[#5D4037] transition-colors shadow-md disabled:opacity-50"
                >
                    {loading ? 'Updating...' : 'Pick Up Order 📦'}
                </button>
            )}

            {order.status === 'ON_WAY' && (
                <button
                    onClick={() => handleStatusUpdate('DELIVERED')}
                    disabled={loading}
                    className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-colors shadow-md disabled:opacity-50"
                >
                    {loading ? 'Updating...' : 'Complete Delivery ✅'}
                </button>
            )}
        </div>
    );
}
