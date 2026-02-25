import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Check if we are trying to access an (editor) route
    if (
        request.nextUrl.pathname.startsWith('/news/manage') ||
        request.nextUrl.pathname.startsWith('/news/create') ||
        request.nextUrl.pathname.startsWith('/news/edit')
    ) {
        const token = request.cookies.get('auth-token');

        // If no token exists, redirect to unauthorized/login
        if (!token) {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
        }
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/news/manage/:path*',
        '/news/create/:path*',
        '/news/edit/:path*',
    ],
};
