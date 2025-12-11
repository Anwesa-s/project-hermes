import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(request: NextRequest) {
  const token = await getToken({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req: request as any,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // If user is not authenticated and trying to access dashboard, redirect to signin
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    const signInUrl = new URL('/auth/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
