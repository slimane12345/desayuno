'use client';

import { register } from '@/app/actions/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        setError('');

        const result = await register(formData);

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
                    <p className="text-muted">Create your account</p>
                </div>

                <form action={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-[#3E2723]">Full Name</label>
                        <input
                            name="name"
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                            placeholder="John Doe"
                            required
                        />
                    </div>

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
                        <label className="block text-sm font-medium mb-1 text-[#3E2723]">Phone</label>
                        <input
                            name="phone"
                            type="tel"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                            placeholder="0600000000"
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

                    <div>
                        <label className="block text-sm font-medium mb-1 text-[#3E2723]">I am a...</label>
                        <select
                            name="role"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                            defaultValue="CLIENT"
                        >
                            <option value="CLIENT">Client (Order Food)</option>
                            <option value="DRIVER">Driver (Deliver Orders)</option>
                        </select>
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
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-muted">
                        Already have an account?{' '}
                        <Link href="/login" className="text-[#D4AF37] font-medium hover:underline">
                            Sign In
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
