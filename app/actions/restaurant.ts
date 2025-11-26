'use server'

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createRestaurant(formData: FormData) {
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const address = formData.get('address') as string;

    if (!name) return { error: 'Name is required' };

    try {
        await prisma.restaurant.create({
            data: {
                name,
                description,
                address,
                isActive: true
            }
        });
        revalidatePath('/admin/restaurants');
        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: 'Failed to create restaurant' };
    }
}
