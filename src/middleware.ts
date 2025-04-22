import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import getProfile from "./utils/getProfile";

const authRoutes = ["/login", "/forgot-password"];
const roleBasedRoutes = {
  USER: ["/dashboard"],
  ADMIN: [/^\/dashboard(\/.*)?$/],
  // add more roles here if needed
};

type TRole = keyof typeof roleBasedRoutes;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Logging request for debugging
  console.log("Incoming request:", request.nextUrl.href);

  // Redirect root path '/' to '/dashboard/tests'
  if (pathname === "/") {
    const redirectUrl = new URL("/dashboard/tests", request.nextUrl.href);
    console.log("Redirecting to:", redirectUrl.toString());
    return NextResponse.redirect(redirectUrl);
  }

  // Get the current user from the session
  const user = await getProfile();

  if (!user) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      // Redirect unauthenticated users to login
      const loginRedirectUrl = new URL(`/login?redirect=${pathname}`, request.nextUrl.href);
      console.log("Unauthenticated redirect:", loginRedirectUrl.toString());
      return NextResponse.redirect(loginRedirectUrl);
    }
  }

  const role = (user.role as string).toUpperCase() as TRole;

  // Check role-based access
  if (role && roleBasedRoutes[role]) {
    const allowedRoutes = roleBasedRoutes[role];
    const hasAccess = allowedRoutes.some((route) =>
      typeof route === "string" ? pathname === route : pathname.match(route)
    );

    if (hasAccess) {
      return NextResponse.next();
    }
  }

  // Default redirect if access is denied
  const defaultRedirectUrl = new URL("/dashboard/tests", request.nextUrl.href);
  console.log("Access denied, redirecting to:", defaultRedirectUrl.toString());
  return NextResponse.redirect(defaultRedirectUrl);
}

// Matching paths configuration
export const config = {
  matcher: ["/", "/dashboard/:path*", "/login", "/forgot-password"],
};