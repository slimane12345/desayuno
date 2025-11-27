'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createRestaurant(formData: FormData): Promise<void> {
    const name = formData.get('name') as string | null;
    const description = formData.get('description') as string | null;
    const address = formData.get('address') as string | null;

    if (!name || name.trim() === "") {
        throw new Error("Restaurant name is required");
    }

    try {
        await prisma.restaurant.create({
            data: {
                name,
                description: description || "",
                address: address || "",
                isActive: true
            }
        });

        // Revalidate restaurants page
        revalidatePath('/admin/restaurants');

        // Redirect user back to restaurants admin list
        redirect('/admin/restaurants');

    } catch (error) {
        console.error("Failed to create restaurant:", error);
        throw new Error("Failed to create restaurant");
    }
}
