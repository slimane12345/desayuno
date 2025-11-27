import prisma from "@/lib/prisma";
import { createProduct } from "@/app/actions/product";
import Link from "next/link";
import { notFound } from "next/navigation";

// ===== Types =====
type Category = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  createdAt: Date;
  category: Category | null;
};

type RestaurantWithProducts = {
  id: string;
  name: string;
  products: Product[];
};

export default async function AdminRestaurantPage({
  params,
}: {
  params: { id: string };
}) {
  const restaurant: RestaurantWithProducts | null =
    await prisma.restaurant.findUnique({
      where: { id: params.id },
      include: {
        products: {
          include: { category: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

  if (!restaurant) {
    notFound();
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/restaurants" className="text-muted hover:text-[#3E2723]">
          ← Back
        </Link>
        <h1 className="h2 text-[#3E2723]">
          {restaurant.name} - Menu Management
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Product Form */}
        <div className="card h-fit">
          <h3 className="h3 mb-4">Add Product</h3>

          <form action={createProduct} className="flex flex-col gap-4">
            <input type="hidden" name="restaurantId" value={restaurant.id} />

            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                name="name"
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Msmen"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                className="w-full p-2 border rounded"
                placeholder="With honey and cheese..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Price (MAD)
              </label>
              <input
                name="price"
                type="number"
                step="0.5"
                className="w-full p-2 border rounded"
                placeholder="15.00"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                name="category"
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Breads"
                list="categories"
              />
              <datalist id="categories">
                <option value="Breads" />
                <option value="Drinks" />
                <option value="Combos" />
                <option value="Sweets" />
              </datalist>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Add Product
            </button>
          </form>
        </div>

        {/* Product List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="h3 mb-4">
            Current Menu ({restaurant.products.length})
          </h3>

          {restaurant.products.length === 0 ? (
            <div className="card text-center py-12 text-muted">
              No products yet. Add some to the menu!
            </div>
          ) : (
            restaurant.products.map((product: Product) => (
              <div
                key={product.id}
                className="card flex justify-between items-center"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold">{product.name}</h4>

                    {product.category && (
                      <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full text-muted">
                        {product.category.name}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted">{product.description}</p>

                  <p className="font-bold text-[#D4AF37] mt-1">
                    {product.price} MAD
                  </p>
                </div>

                <div className="flex gap-2">
                  <button className="btn btn-outline text-xs px-3 py-1">
                    Edit
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
