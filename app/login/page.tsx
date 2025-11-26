'use client';

import { login } from '@/app/actions/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        setError('');

        const result = await login(formData);

        if (result.error) {
            setError(result.error);
            setLoading(false);
        } else if (result.success) {
            // Redirect based on role
            if (result.role === 'ADMIN') {
                router.push('/admin');
            } else if (result.role === 'DRIVER') {
                router.push('/driver');
            } else {
                router.push('/client');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F9F5E3] to-[#E5C564] p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-[#3E2723] mb-2">🥐 Desayuno</h1>
                    <p className="text-muted">Sign in to your account</p>
                </div>

                <form action={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-[#3E2723]">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                            placeholder="your@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 text-[#3E2723]">Password</label>
                        <input
                            name="password"
                            type="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-[#3E2723] text-white rounded-lg font-bold hover:bg-[#5D4037] transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-muted">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-[#D4AF37] font-medium hover:underline">
                            Register
                        </Link>
                    </p>
                </div>

                <div className="mt-4 text-center">
                    <Link href="/" className="text-sm text-muted hover:text-[#3E2723]">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
