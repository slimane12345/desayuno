import { logout } from '@/app/actions/auth';

export default function DriverProfilePage() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-[#3E2723] mb-6">Driver Profile</h2>

            <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-3xl">
                        🛵
                    </div>
                    <div>
                        <h3 className="font-bold text-xl text-[#3E2723]">Test Driver</h3>
                        <p className="text-sm text-muted">0612345678</p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                            Active
                        </span>
                    </div>
                </div>

                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted">Total Deliveries</span>
                        <span className="font-bold">0</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted">Rating</span>
                        <span className="font-bold">⭐ 5.0</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted">Member Since</span>
                        <span className="font-bold">Today</span>
                    </div>
                </div>
            </div>

            <form action={logout}>
                <button type="submit" className="w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors">
                    Logout
                </button>
            </form>
        </div>
    );
}
