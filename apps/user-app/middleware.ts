import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

const publicPaths = ['/', '/sign-in', '/sign-up'];

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    const { pathname } = req.nextUrl;

    if (token && publicPaths.includes(pathname)) {
        const dashboardUrl = new URL('/dashboard', req.url);
        return NextResponse.redirect(dashboardUrl);
    }

    if (!token && !publicPaths.includes(pathname)) {
        const signInUrl = new URL('/', req.url);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/sign-in', '/sign-up', '/dashboard/:path*', '/transfer', '/transactions'],
};
