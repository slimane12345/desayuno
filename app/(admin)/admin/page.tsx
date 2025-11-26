import prisma from '@/lib/prisma';

async function getStats() {
    // In a real app, these would be DB queries
    // For now, we'll mock or fetch empty states
    const ordersCount = await prisma.order.count();
    const revenue = await prisma.order.aggregate({
        _sum: { total: true }
    });
    const pendingOrders = await prisma.order.count({
        where: { status: 'PENDING' }
    });
    const activeDrivers = await prisma.user.count({
        where: { role: 'DRIVER' } // Assuming we track online status later
    });

    return {
        ordersCount,
        revenue: revenue._sum.total || 0,
        pendingOrders,
        activeDrivers
    };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div>
            <h1 className="h2 text-[#3E2723]">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="card flex flex-col">
                    <span className="text-muted text-sm mb-2">Total Revenue</span>
                    <span className="text-3xl font-bold text-[#D4AF37]">{stats.revenue.toFixed(2)} MAD</span>
                </div>
                <div className="card flex flex-col">
                    <span className="text-muted text-sm mb-2">Today&apos;s Orders</span>
                    <span className="text-3xl font-bold text-[#3E2723]">{stats.ordersCount}</span>
                </div>
                <div className="card flex flex-col">
                    <span className="text-muted text-sm mb-2">Pending Orders</span>
                    <span className="text-3xl font-bold text-[#C62828]">{stats.pendingOrders}</span>
                </div>
                <div className="card flex flex-col">
                    <span className="text-muted text-sm mb-2">Active Drivers</span>
                    <span className="text-3xl font-bold text-[#2E7D32]">{stats.activeDrivers}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card">
                    <h3 className="h3 mb-4">Recent Activity</h3>
                    <div className="text-muted text-center py-8">
                        No recent activity
                    </div>
                </div>
                <div className="card">
                    <h3 className="h3 mb-4">Top Selling Items</h3>
                    <div className="text-muted text-center py-8">
                        No data available
                    </div>
                </div>
            </div>
        </div>
    );
}
