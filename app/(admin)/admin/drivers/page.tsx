import prisma from '@/lib/prisma';

export default async function AdminDriversPage() {
    const drivers = await prisma.user.findMany({
        where: { role: 'DRIVER' },
        include: {
            _count: {
                select: { deliveries: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div>
            <h1 className="h2 text-[#3E2723] mb-6">Drivers</h1>

            <div className="card overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Phone</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Total Deliveries</th>
                            <th className="px-6 py-3">Joined Date</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {drivers.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-muted">
                                    No drivers found.
                                </td>
                            </tr>
                        ) : (
                            drivers.map((driver) => (
                                <tr key={driver.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                            🛵
                                        </div>
                                        {driver.name}
                                    </td>
                                    <td className="px-6 py-4">{driver.phone}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                                            Online
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-[#3E2723]">
                                        {driver._count.deliveries}
                                    </td>
                                    <td className="px-6 py-4 text-muted">{new Date(driver.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-[#3E2723] hover:underline font-medium">
                                            View
                                        </button>
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
