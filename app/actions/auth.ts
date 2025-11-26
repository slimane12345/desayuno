'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { pbkdf2Sync, randomBytes } from 'crypto';

// Hash password using PBKDF2
function hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
}

// Verify password
function verifyPassword(password: string, storedHash: string): boolean {
    const [salt, hash] = storedHash.split(':');
    const verifyHash = pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === verifyHash;
}

export async function register(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const password = formData.get('password') as string;
    const role = (formData.get('role') as string) || 'CLIENT';

    if (!email || !password || !phone) {
        return { error: 'Missing required fields' };
    }

    try {
        // Check if user exists
        const existing = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { phone }
                ]
            }
        });

        if (existing) {
            return { error: 'User already exists with this email or phone' };
        }

        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashPassword(password),
                role
            }
        });

        // Set session cookie
        const cookieStore = await cookies();
        cookieStore.set('auth_session', JSON.stringify({
            userId: user.id,
            role: user.role
        }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return { success: true, role: user.role };
    } catch (error) {
        console.error('Registration error:', error);
        return { error: 'Failed to register' };
    }
}

export async function login(formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { error: 'Email and password are required' };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user || !user.password) {
            return { error: 'Invalid credentials' };
        }

        if (!verifyPassword(password, user.password)) {
            return { error: 'Invalid credentials' };
        }

        // Set session cookie
        const cookieStore = await cookies();
        cookieStore.set('auth_session', JSON.stringify({
            userId: user.id,
            role: user.role
        }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return { success: true, role: user.role };
    } catch (error) {
        console.error('Login error:', error);
        return { error: 'Failed to login' };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('auth_session');
    redirect('/login');
}

export async function getSession() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get('auth_session');

        if (!session) {
            return null;
        }

        return JSON.parse(session.value) as { userId: string; role: string };
    } catch {
        return null;
    }
}
