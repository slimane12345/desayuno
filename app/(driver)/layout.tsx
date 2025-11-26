import Link from 'next/link';
import { ReactNode } from 'react';

export default function DriverLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 pb-[80px]">
            <header className="bg-[#3E2723] text-white p-4 shadow-md sticky top-0 z-50">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-lg">L&apos;Mouwazi3 App</h1>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs font-medium">Online</span>
                    </div>
                </div>
            </header>

            <main className="p-4">
                {children}
            </main>

            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t h-[70px] flex items-center justify-around z-50">
                <Link href="/driver" className="flex flex-col items-center gap-1 p-2 text-[#3E2723]">
                    <span className="text-xl">🛵</span>
                    <span className="text-xs">Orders</span>
                </Link>
                <Link href="/driver/earnings" className="flex flex-col items-center gap-1 p-2 text-gray-400">
                    <span className="text-xl">💰</span>
                    <span className="text-xs">Earnings</span>
                </Link>
                <Link href="/driver/profile" className="flex flex-col items-center gap-1 p-2 text-gray-400">
                    <span className="text-xl">⚙️</span>
                    <span className="text-xs">Settings</span>
                </Link>
            </nav>
        </div>
    );
}
