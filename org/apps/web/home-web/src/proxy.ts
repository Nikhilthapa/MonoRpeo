import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ROUTES } from "@/constants";

const AUTH_COOKIE_NAME = "auth_token";

export function proxy(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.next();
  }

  const isAuthRoute =
    pathname.startsWith(ROUTES.LOGIN) ||
    pathname.startsWith(ROUTES.SIGNUP) ||
    pathname.startsWith(ROUTES.OTP);

  const isProtectedRoute = pathname.startsWith(ROUTES.DASHBOARD);

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
