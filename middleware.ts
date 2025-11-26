import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get session from cookie
    const sessionCookie = request.cookies.get('auth_session');
    const session = sessionCookie ? JSON.parse(sessionCookie.value) : null;

    // Public routes that don't require authentication
    const publicRoutes = ['/', '/login', '/register'];
    const isPublicRoute = publicRoutes.includes(pathname);

    // If accessing a public route, allow
    if (isPublicRoute) {
        return NextResponse.next();
    }

    // If no session and trying to access protected route, redirect to login
    if (!session) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Role-based access control
    const { role } = session;

    // Admin routes
    if (pathname.startsWith('/admin')) {
        if (role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Driver routes
    if (pathname.startsWith('/driver')) {
        if (role !== 'DRIVER') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Client routes (including /client, /cart, /orders, /profile, /restaurant)
    if (pathname.startsWith('/client') ||
        pathname.startsWith('/cart') ||
        pathname.startsWith('/orders') ||
        pathname.startsWith('/profile') ||
        pathname.startsWith('/restaurant')) {
        if (role !== 'CLIENT') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
