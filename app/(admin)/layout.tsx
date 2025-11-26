import Link from 'next/link';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-[#3E2723] text-[#F9F5E3] flex-shrink-0">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-[#D4AF37]">Desayuno Admin</h1>
                </div>
                <nav className="mt-6 px-4">
                    <ul className="space-y-2">
                        <li>
                            <Link href="/admin" className="block px-4 py-2 rounded hover:bg-[#D4AF37] hover:text-[#3E2723] transition-colors">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/orders" className="block px-4 py-2 rounded hover:bg-[#D4AF37] hover:text-[#3E2723] transition-colors">
                                Orders
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/restaurants" className="block px-4 py-2 rounded hover:bg-[#D4AF37] hover:text-[#3E2723] transition-colors">
                                Restaurants
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/drivers" className="block px-4 py-2 rounded hover:bg-[#D4AF37] hover:text-[#3E2723] transition-colors">
                                Drivers
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/clients" className="block px-4 py-2 rounded hover:bg-[#D4AF37] hover:text-[#3E2723] transition-colors">
                                Clients
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/settings" className="block px-4 py-2 rounded hover:bg-[#D4AF37] hover:text-[#3E2723] transition-colors">
                                Settings
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <header className="h-[70px] bg-white shadow-sm flex items-center justify-between px-8">
                    <h2 className="text-xl font-semibold text-[#3E2723]">Overview</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#F9F5E3] flex items-center justify-center text-[#D4AF37] font-bold">
                            A
                        </div>
                    </div>
                </header>
                <div className="p-8 overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
