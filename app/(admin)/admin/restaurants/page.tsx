import prisma from '@/lib/prisma';
import { createRestaurant } from '@/app/actions/restaurant';
import Link from 'next/link';

export default async function RestaurantsPage() {
    const restaurants = await prisma.restaurant.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="h2 text-[#3E2723]">Restaurants</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Add Restaurant Form */}
                <div className="card h-fit">
                    <h3 className="h3 mb-4">Add New Restaurant</h3>
                    <form action={createRestaurant} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input name="name" type="text" className="w-full p-2 border rounded" placeholder="Chez Fatima" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea name="description" className="w-full p-2 border rounded" placeholder="Authentic Moroccan breakfast..." />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Address</label>
                            <input name="address" type="text" className="w-full p-2 border rounded" placeholder="123 Rue Mohamed V" />
                        </div>
                        <button type="submit" className="btn btn-primary w-full">
                            Add Restaurant
                        </button>
                    </form>
                </div>

                {/* Restaurants List */}
                <div className="lg:col-span-2 space-y-4">
                    {restaurants.length === 0 ? (
                        <div className="card text-center py-12 text-muted">
                            No restaurants found. Add one to get started.
                        </div>
                    ) : (
                        restaurants.map((restaurant) => (
                            <div key={restaurant.id} className="card flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-lg">{restaurant.name}</h3>
                                    <p className="text-sm text-muted">{restaurant.description}</p>
                                    <p className="text-xs text-muted mt-1">{restaurant.address}</p>
                                </div>
                                <div className="flex gap-2">
                                    <span className={`px-3 py-1 rounded-full text-xs ${restaurant.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {restaurant.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                    <Link href={`/admin/restaurants/${restaurant.id}`} className="btn btn-outline text-xs px-3 py-1">
                                        Manage Menu
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
