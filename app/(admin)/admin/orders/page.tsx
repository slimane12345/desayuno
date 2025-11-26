import prisma from '@/lib/prisma';
import { cancelOrder } from '@/app/actions/order';

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        include: {
            restaurant: true,
            client: true,
            driver: true
        },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div>
            <h1 className="h2 text-[#3E2723] mb-6">Order Management</h1>

            <div className="card overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3">Order ID</th>
                            <th className="px-6 py-3">Client</th>
                            <th className="px-6 py-3">Restaurant</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Driver</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-6 py-8 text-center text-muted">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium">#{order.id.slice(-4)}</td>
                                    <td className="px-6 py-4">{order.client?.name || 'Guest'}</td>
                                    <td className="px-6 py-4">{order.restaurant?.name}</td>
                                    <td className="px-6 py-4 font-bold text-[#D4AF37]">{order.total} MAD</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold
                                            ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : ''}
                                            ${order.status === 'ACCEPTED' ? 'bg-blue-100 text-blue-800' : ''}
                                            ${order.status === 'ON_WAY' ? 'bg-purple-100 text-purple-800' : ''}
                                            ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' : ''}
                                            ${order.status === 'CANCELLED' ? 'bg-red-100 text-red-800' : ''}
                                        `}>
                                            {order.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{order.driver?.name || '-'}</td>
                                    <td className="px-6 py-4 text-muted">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        {['PENDING', 'ACCEPTED'].includes(order.status) && (
                                            <form action={async () => {
                                                'use server';
                                                await cancelOrder(order.id);
                                            }}>
                                                <button className="text-red-600 hover:underline font-medium">
                                                    Cancel
                                                </button>
                                            </form>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
