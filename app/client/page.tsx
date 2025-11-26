import prisma from '@/lib/prisma';
import Link from 'next/link';

async function getData() {
    const restaurants = await prisma.restaurant.findMany({
        where: { isActive: true },
        take: 5
    });

    // Mock categories for now
    const categories = [
        { id: '1', name: 'Ftour Beldi', icon: '🥐' },
        { id: '2', name: 'Msmen & Harcha', icon: '🥞' },
        { id: '3', name: 'Drinks', icon: '☕' },
        { id: '4', name: 'Healthy', icon: '🥑' },
    ];

    return { restaurants, categories };
}

export default async function ClientHomePage() {
    const { restaurants, categories } = await getData();

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <section className="relative h-[180px] rounded-2xl overflow-hidden bg-[#3E2723]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#3E2723] to-transparent z-10" />
                <div className="absolute inset-0 flex items-center p-6 z-20">
                    <div className="text-white max-w-[70%]">
                        <h1 className="text-2xl font-bold mb-2">Sabah El Khir! ☀️</h1>
                        <p className="text-sm opacity-90">Order your authentic Moroccan breakfast now.</p>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section>
                <h2 className="font-bold text-lg mb-4 text-[#3E2723]">Categories</h2>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map((cat) => (
                        <div key={cat.id} className="flex flex-col items-center gap-2 min-w-[80px]">
                            <div className="w-16 h-16 rounded-full bg-[#F9F5E3] flex items-center justify-center text-2xl shadow-sm">
                                {cat.icon}
                            </div>
                            <span className="text-xs font-medium text-center">{cat.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Popular Restaurants */}
            <section>
                <h2 className="font-bold text-lg mb-4 text-[#3E2723]">Popular Places</h2>
                <div className="space-y-4">
                    {restaurants.length === 0 ? (
                        <div className="text-center py-8 text-muted text-sm">
                            No restaurants available yet.
                        </div>
                    ) : (
                        restaurants.map((restaurant) => (
                            <Link href={`/restaurant/${restaurant.id}`} key={restaurant.id} className="block">
                                <div className="card p-0 overflow-hidden active:scale-[0.98] transition-transform">
                                    <div className="h-32 bg-gray-200 relative">
                                        {/* Image placeholder */}
                                        <div className="absolute inset-0 flex items-center justify-center text-muted">
                                            🏠 {restaurant.name}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-[#3E2723]">{restaurant.name}</h3>
                                            <span className="bg-green-100 text-green-800 text-[10px] px-2 py-1 rounded-full font-bold">
                                                20-30 min
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted line-clamp-1">{restaurant.description}</p>
                                        <div className="flex items-center gap-2 mt-3 text-xs text-[#D4AF37]">
                                            <span>⭐ 4.8</span>
                                            <span className="text-gray-300">•</span>
                                            <span>Free Delivery</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}
