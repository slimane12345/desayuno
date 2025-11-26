import prisma from '@/lib/prisma';

export default async function DriverEarnings() {
    // Mock current driver
    const currentDriver = await prisma.user.findFirst({
        where: { role: 'DRIVER' }
    });

    if (!currentDriver) {
        return <div>Driver not found</div>;
    }

    const completedOrders = await prisma.order.findMany({
        where: {
            driverId: currentDriver.id,
            status: 'DELIVERED'
        },
        orderBy: { updatedAt: 'desc' }
    });

    const totalEarnings = completedOrders.reduce((acc, order) => acc + (order.total * 0.2), 0); // Assuming 20% commission

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-[#3E2723]">Earnings</h1>

            <div className="bg-[#3E2723] text-white p-6 rounded-2xl shadow-lg">
                <p className="text-sm opacity-80 mb-1">Total Earnings</p>
                <h2 className="text-4xl font-bold">{totalEarnings.toFixed(2)} MAD</h2>
                <div className="mt-4 flex gap-4 text-sm">
                    <div>
                        <p className="opacity-80">Deliveries</p>
                        <p className="font-bold text-xl">{completedOrders.length}</p>
                    </div>
                    <div>
                        <p className="opacity-80">Hours Online</p>
                        <p className="font-bold text-xl">12.5</p>
                    </div>
                </div>
            </div>

            <h2 className="font-bold text-[#3E2723]">Recent Deliveries</h2>
            <div className="space-y-3">
                {completedOrders.length === 0 ? (
                    <p className="text-muted text-sm text-center py-8">No completed deliveries yet.</p>
                ) : (
                    completedOrders.map((order) => (
                        <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center">
                            <div>
                                <p className="font-bold text-[#3E2723]">Order #{order.id.slice(-4)}</p>
                                <p className="text-xs text-muted">{new Date(order.updatedAt).toLocaleDateString()}</p>
                            </div>
                            <span className="font-bold text-green-600">+{(order.total * 0.2).toFixed(2)} MAD</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
