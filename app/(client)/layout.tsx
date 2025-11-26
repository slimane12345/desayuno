import Link from 'next/link';
import { ReactNode } from 'react';

export default function ClientLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen pb-[80px]"> {/* Padding for bottom nav */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="container h-[60px] flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold text-[#D4AF37]">
                        desayuno
                    </Link>
                    <div className="flex items-center gap-4">
                        <button className="p-2">
                            🔍
                        </button>
                        <Link href="/cart" className="p-2 relative">
                            🛒
                            <span className="absolute top-0 right-0 w-4 h-4 bg-[#C62828] text-white text-[10px] flex items-center justify-center rounded-full">
                                0
                            </span>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container py-4">
                {children}
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 h-[70px] bg-white border-t border-gray-100 flex items-center justify-around z-50 pb-2">
                <Link href="/" className="flex flex-col items-center gap-1 p-2 text-[#D4AF37]">
                    <span className="text-xl">🏠</span>
                    <span className="text-[10px] font-medium">Home</span>
                </Link>
                <Link href="/orders" className="flex flex-col items-center gap-1 p-2 text-[#3E2723]/60">
                    <span className="text-xl">📄</span>
                    <span className="text-[10px] font-medium">Orders</span>
                </Link>
                <Link href="/profile" className="flex flex-col items-center gap-1 p-2 text-[#3E2723]/60">
                    <span className="text-xl">👤</span>
                    <span className="text-[10px] font-medium">Profile</span>
                </Link>
            </nav>
        </div>
    );
}
