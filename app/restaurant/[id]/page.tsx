import prisma from '@/lib/prisma';
import ProductCard from './components/ProductCard';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function RestaurantPage({ params }: { params: { id: string } }) {
    const restaurant = await prisma.restaurant.findUnique({
        where: { id: params.id },
        include: {
            products: {
                where: { isAvailable: true },
                include: { category: true }
            }
        }
    });

    if (!restaurant) {
        notFound();
    }

    // Group products by category
    const productsByCategory = restaurant.products.reduce((acc, product) => {
        const categoryName = product.category?.name || 'Other';
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(product);
        return acc;
    }, {} as Record<string, typeof restaurant.products>);

    return (
        <div className="pb-20">
            {/* Header Image */}
            <div className="h-[200px] bg-gray-200 relative -mx-4 -mt-4 mb-6">
                <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20">
                    🏠
                </div>
                <div className="absolute top-4 left-4">
                    <Link href="/client" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                        ←
                    </Link>
                </div>
            </div>

            {/* Restaurant Info */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-[#3E2723] mb-2">{restaurant.name}</h1>
                <p className="text-sm text-muted mb-4">{restaurant.description}</p>

                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-bold">4.8</span>
                        <span className="text-muted">(120+)</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted">
                        <span>🕒</span>
                        <span>20-30 min</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-600 font-medium">
                        <span>🛵</span>
                        <span>Free Delivery</span>
                    </div>
                </div>
            </div>

            {/* Menu */}
            <div className="space-y-8">
                {Object.entries(productsByCategory).map(([category, products]) => (
                    <section key={category}>
                        <h2 className="font-bold text-lg text-[#3E2723] mb-4 sticky top-[60px] bg-white/95 py-2 z-10">
                            {category}
                        </h2>
                        <div className="space-y-4">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={{
                                        ...product,
                                        restaurantId: restaurant.id,
                                        restaurantName: restaurant.name
                                    }}
                                />
                            ))}
                        </div>
                    </section>
                ))}

                {Object.keys(productsByCategory).length === 0 && (
                    <div className="text-center py-12 text-muted">
                        No products available at the moment.
                    </div>
                )}
            </div>
        </div>
    );
}
