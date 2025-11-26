'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function acceptOrder(orderId: string, driverId: string) {
    try {
        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: {
                status: 'ACCEPTED',
                driverId: driverId,
            },
        });

        revalidatePath('/driver');
        return { success: true, order: updatedOrder };
    } catch (error) {
        console.error('Error accepting order:', error);
        return { success: false, error: 'Failed to accept order' };
    }
}

export async function getDriverOrders(driverId: string) {
    try {
        const orders = await prisma.order.findMany({
            where: { driverId: driverId },
            orderBy: { createdAt: 'desc' },
            include: { restaurant: true, client: true }
        });
        return orders;
    } catch (error) {
        console.error('Error fetching driver orders:', error);
        return [];
    }
}

export async function updateOrderStatus(orderId: string, status: string) {
    try {
        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: { status: status },
        });
        revalidatePath('/driver');
        return { success: true, order: updatedOrder };
    } catch (error) {
        console.error('Error updating order status:', error);
        return { success: false, error: 'Failed to update order status' };
    }
}

export async function cancelOrder(orderId: string) {
    try {
        await prisma.order.update({
            where: { id: orderId },
            data: { status: 'CANCELLED' }
        });
        revalidatePath('/admin/orders');
        revalidatePath('/driver');
        revalidatePath('/orders');
        return { success: true };
    } catch (error) {
        console.error('Error cancelling order:', error);
        return { success: false, error: 'Failed to cancel order' };
    }
}
