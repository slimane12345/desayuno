'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const restaurantId = formData.get('restaurantId') as string;
    const categoryName = formData.get('category') as string;

    if (!name || !price || !restaurantId) {
        return { error: 'Missing required fields' };
    }

    try {
        // Find or create category
        let categoryId = null;
        if (categoryName) {
            const category = await prisma.category.upsert({
                where: { name: categoryName }, // Note: Schema might need @unique on name, checking that next
                update: {},
                create: { name: categoryName }
            });
            categoryId = category.id;
        }

        // Since schema doesn't enforce unique name on Category yet, let's just findFirst or create for safety
        // Actually, looking at schema, Category name is NOT unique. 
        // Let's do a findFirst then create to avoid duplicates if possible, or just create.
        // For simplicity in this iteration, let's assume we want to reuse categories by name.

        let finalCategoryId = null;
        if (categoryName) {
            const existingCategory = await prisma.category.findFirst({
                where: { name: categoryName }
            });

            if (existingCategory) {
                finalCategoryId = existingCategory.id;
            } else {
                const newCategory = await prisma.category.create({
                    data: { name: categoryName }
                });
                finalCategoryId = newCategory.id;
            }
        }

        await prisma.product.create({
            data: {
                name,
                description,
                price,
                restaurantId,
                categoryId: finalCategoryId,
                isAvailable: true
            }
        });

        revalidatePath(`/admin/restaurants/${restaurantId}`);
        return { success: true };
    } catch (error) {
        console.error('Failed to create product:', error);
        return { error: 'Failed to create product' };
    }
}
