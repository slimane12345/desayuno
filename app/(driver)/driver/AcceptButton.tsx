'use client';

import { acceptOrder } from '@/app/actions/order';
import { useState } from 'react';

export default function AcceptButton({ orderId, driverId }: { orderId: string, driverId: string }) {
    const [loading, setLoading] = useState(false);

    const handleAccept = async () => {
        setLoading(true);
        try {
            await acceptOrder(orderId, driverId);
        } catch (error) {
            console.error(error);
            alert('Failed to accept order');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleAccept}
            disabled={loading}
            className="w-full py-3 bg-[#3E2723] text-white rounded-lg font-bold text-sm hover:bg-[#5D4037] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? 'Accepting...' : 'Accept Delivery'}
        </button>
    );
}
