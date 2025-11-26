import prisma from '@/lib/prisma';

export default async function OrdersPage() {
    // Mock client ID (same as checkout)
    // In real app, get from session
    const clientId = 'guest-client';

    // We need to find the actual ID if it was a guest user created by phone
    // For now, let's try to find the guest client we created in checkout
    const guestClient = await prisma.user.findUnique({
        where: { phone: '0600000001' }
    });

    const finalClientId = guestClient ? guestClient.id : clientId;

    const orders = await prisma.order.findMany({
        where: { clientId: finalClientId },
        include: {
            restaurant: true,
            driver: true
        },
        orderBy: { createdAt: 'desc' }
    });

    const activeOrders = orders.filter(o => !['DELIVERED', 'CANCELLED'].includes(o.status));
    const pastOrders = orders.filter(o => ['DELIVERED', 'CANCELLED'].includes(o.status));

    return (
        <div className="pb-24">
            <h1 className="text-2xl font-bold text-[#3E2723] mb-6">My Orders</h1>

            {/* Active Orders */}
            {activeOrders.length > 0 && (
                <section className="mb-8">
                    <h2 className="font-bold text-lg text-[#3E2723] mb-4">Active Orders</h2>
                    <div className="space-y-4">
                        {activeOrders.map((order) => (
                            <div key={order.id} className="bg-white p-6 rounded-2xl shadow-md border border-[#D4AF37]/20">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-[#3E2723]">{order.restaurant?.name}</h3>
                                        <p className="text-xs text-muted">Order #{order.id.slice(-4)}</p>
                                    </div>
                                    <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                                        {order.status.replace('_', ' ')}
                                    </span>
                                </div>

                                {/* Progress Bar */}
                                <div className="relative pt-4 pb-2">
                                    <div className="flex mb-2 items-center justify-between text-xs font-medium text-gray-400">
                                        <span className={['PENDING', 'ACCEPTED', 'PREPARING', 'ON_WAY'].includes(order.status) ? 'text-[#3E2723]' : ''}>Confirmed</span>
                                        <span className={['ON_WAY'].includes(order.status) ? 'text-[#3E2723]' : ''}>On Way</span>
                                        <span>Delivered</span>
                                    </div>
                                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
                                        <div
                                            style={{ width: order.status === 'ON_WAY' ? '66%' : '33%' }}
                                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#3E2723] transition-all duration-500"
                                        ></div>
                                    </div>
                                </div>

                                {order.driver && (
                                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-50">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                            🛵
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[#3E2723]">{order.driver.name}</p>
                                            <p className="text-xs text-muted">Your Driver</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Past Orders */}
            <section>
                <h2 className="font-bold text-lg text-[#3E2723] mb-4">Past Orders</h2>
                <div className="space-y-4">
                    {pastOrders.length === 0 ? (
                        <div className="text-center py-8 text-muted text-sm">
                            No past orders.
                        </div>
                    ) : (
                        pastOrders.map((order) => (
                            <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center opacity-80">
                                <div>
                                    <h3 className="font-bold text-[#3E2723]">{order.restaurant?.name}</h3>
                                    <p className="text-xs text-muted">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-[#3E2723]">{order.total} MAD</p>
                                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-muted">
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}
