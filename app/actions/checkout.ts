'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface CheckoutItem {
    productId: string;
    quantity: number;
    price: number;
}

export async function createOrder(items: CheckoutItem[], total: number, restaurantId: string, clientId: string) {
    try {
        // Ensure we have a valid client
        let finalClientId = clientId;

        // Check if client exists, if not (or if guest), create/find a guest client
        const clientExists = await prisma.user.findUnique({ where: { id: clientId } });

        if (!clientExists) {
            const guestClient = await prisma.user.upsert({
                where: { phone: '0600000001' }, // Mock guest phone
                update: {},
                create: {
                    phone: '0600000001',
                    name: 'Guest Client',
                    role: 'CLIENT'
                }
            });
            finalClientId = guestClient.id;
        }

        const order = await prisma.order.create({
            data: {
                total,
                restaurantId,
                clientId: finalClientId,
                status: 'PENDING',
                items: {
                    create: items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            }
        });

        revalidatePath('/driver'); // Notify drivers
        return { success: true, orderId: order.id };
    } catch (error) {
        console.error('Checkout error:', error);
        return { success: false, error: 'Failed to place order' };
    }
}
