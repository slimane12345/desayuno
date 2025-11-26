import prisma from '@/lib/prisma';
import { logout } from '@/app/actions/auth';

export default async function ProfilePage() {
    // Mock client ID (same as checkout)
    const clientId = 'guest-client';

    const guestClient = await prisma.user.findUnique({
        where: { phone: '0600000001' }
    });

    const user = guestClient || { name: 'Guest', phone: 'Not registered' };

    return (
        <div className="pb-24">
            <h1 className="text-2xl font-bold text-[#3E2723] mb-6">Profile</h1>

            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-2xl text-white">
                    {user.name?.[0] || 'G'}
                </div>
                <div>
                    <h2 className="font-bold text-lg text-[#3E2723]">{user.name}</h2>
                    <p className="text-sm text-muted">{user.phone}</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <button className="w-full p-4 text-left border-b flex justify-between items-center hover:bg-gray-50">
                        <span className="text-[#3E2723]">📍 My Addresses</span>
                        <span className="text-muted">→</span>
                    </button>
                    <button className="w-full p-4 text-left border-b flex justify-between items-center hover:bg-gray-50">
                        <span className="text-[#3E2723]">💳 Payment Methods</span>
                        <span className="text-muted">→</span>
                    </button>
                    <button className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50">
                        <span className="text-[#3E2723]">🔔 Notifications</span>
                        <span className="text-muted">→</span>
                    </button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <button className="w-full p-4 text-left border-b flex justify-between items-center hover:bg-gray-50">
                        <span className="text-[#3E2723]">❓ Help & Support</span>
                        <span className="text-muted">→</span>
                    </button>
                    <button className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50">
                        <span className="text-[#3E2723]">📜 Terms & Conditions</span>
                        <span className="text-muted">→</span>
                    </button>
                </div>

                <form action={logout}>
                    <button type="submit" className="w-full py-4 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-colors">
                        Log Out
                    </button>
                </form>
            </div>
        </div>
    );
}
