import prisma from '@/lib/prisma';

export default async function AdminClientsPage() {
    const clients = await prisma.user.findMany({
        where: { role: 'CLIENT' },
        include: {
            _count: {
                select: { orders: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div>
            <h1 className="h2 text-[#3E2723] mb-6">Clients</h1>

            <div className="card overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted uppercase bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Phone</th>
                            <th className="px-6 py-3">Total Orders</th>
                            <th className="px-6 py-3">Joined Date</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-muted">
                                    No clients found.
                                </td>
                            </tr>
                        ) : (
                            clients.map((client: any) => (
                                <tr key={client.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-white font-bold">
                                            {client.name?.[0] || 'C'}
                                        </div>
                                        {client.name}
                                    </td>
                                    <td className="px-6 py-4">{client.phone}</td>
                                    <td className="px-6 py-4 font-bold text-[#3E2723]">
                                        {client._count.orders}
                                    </td>
                                    <td className="px-6 py-4 text-muted">{new Date(client.createdAt).toLocaleDateString()}</td>
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
