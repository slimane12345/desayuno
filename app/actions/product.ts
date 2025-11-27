'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProduct(formData: FormData): Promise<void> {
    const name = formData.get('name') as string | null;
    const description = formData.get('description') as string | null;
    const price = parseFloat(formData.get('price') as string);
    const restaurantId = formData.get('restaurantId') as string | null;
    const categoryName = formData.get('category') as string | null;

    if (!name || !price || !restaurantId) {
        throw new Error('Missing required fields');
    }

    try {
        // Find or create category by name
        let categoryId: string | null = null;

        if (categoryName && categoryName.trim() !== "") {
            const existing = await prisma.category.findFirst({
                where: { name: categoryName }
            });

            if (existing) {
                categoryId = existing.id;
            } else {
                const created = await prisma.category.create({
                    data: { name: categoryName }
                });
                categoryId = created.id;
            }
        }

        // Create product
        await prisma.product.create({
            data: {
                name,
                description: description || "",
                price,
                restaurantId,
                categoryId,
                isAvailable: true
            }
        });

        // Revalidate and redirect back to restaurant page
        revalidatePath(`/admin/restaurants/${restaurantId}`);
        redirect(`/admin/restaurants/${restaurantId}`);

    } catch (error) {
        console.error("Failed to create product:", error);
        throw new Error("Failed to create product");
    }
}
