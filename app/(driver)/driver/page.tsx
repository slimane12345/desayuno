import prisma from '@/lib/prisma';
import AcceptButton from './AcceptButton';
import ActiveOrderCard from './ActiveOrderCard';

export default async function DriverDashboard() {
    // Mock current driver (in a real app, this would come from auth session)
    let currentDriver = await prisma.user.findFirst({
        where: { role: 'DRIVER' }
    });

    // If no driver exists, create one for testing purposes
    if (!currentDriver) {
        currentDriver = await prisma.user.create({
            data: {
                phone: '0600000000',
                name: 'Test Driver',
                role: 'DRIVER'
            }
        });
    }

    // Check for active order (ACCEPTED or ON_WAY)
    const activeOrder = await prisma.order.findFirst({
        where: {
            driverId: currentDriver.id,
            status: { in: ['ACCEPTED', 'ON_WAY'] }
        },
        include: { restaurant: true, client: true }
    });

    const availableOrders = await prisma.order.findMany({
        where: { status: 'PENDING', driverId: null },
        include: { restaurant: true, client: true },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-6">
            {/* Driver Status Header */}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#3E2723]">Driver Dashboard</h1>
                        <p className="text-sm text-muted">Welcome back, {currentDriver.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-sm font-medium text-green-700">Online</span>
                    </div>
                </div>
            </div>

            {activeOrder ? (
                <div>
                    <h2 className="font-bold text-[#3E2723] mb-4">Current Delivery</h2>
                    <ActiveOrderCard order={activeOrder} />
                </div>
            ) : (
                <>
                    <h2 className="font-bold text-[#3E2723]">Available Orders</h2>

                    <div className="space-y-4">
                        {availableOrders.length === 0 ? (
                            <div className="text-center py-12 text-muted text-sm bg-white rounded-xl border border-dashed">
                                No orders available nearby.
                                <br />
                                Wait for notification... 🔔
                            </div>
                        ) : (
                            availableOrders.map((order) => (
                                <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex justify-between mb-2">
                                        <span className="font-bold text-[#3E2723]">#{order.id.slice(-4)}</span>
                                        <span className="text-xs font-bold text-[#D4AF37]">{order.total} MAD</span>
                                    </div>

                                    <div className="flex items-start gap-3 mb-4">
                                        <div className="flex flex-col items-center gap-1 mt-1">
                                            <div className="w-2 h-2 rounded-full bg-[#3E2723]"></div>
                                            <div className="w-0.5 h-8 bg-gray-200"></div>
                                            <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
                                        </div>
                                        <div className="flex-1 text-sm">
                                            <p className="mb-4 font-medium">{order.restaurant?.name || 'Unknown Restaurant'}</p>
                                            <p className="text-muted">{order.address || order.client?.name || "Client Address"}</p>
                                        </div>
                                    </div>

                                    <AcceptButton orderId={order.id} driverId={currentDriver!.id} />
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}
        </div >
    );
}
