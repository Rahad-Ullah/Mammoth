import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";
import getProfile from "./utils/getProfile";

const authRoutes = ["/login", "/forgot-password"];
const roleBasedRoutes = {
  USER: ["/dashboard"],
  ADMIN: [/^\/dashboard(\/.*)?$/],
  // add more role here if needed
};

type TRole = keyof typeof roleBasedRoutes;

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect root path '/' to '/dashboard/tests'
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard/tests", request.url));
  }

  // Get the current user from the session
  const user = await getProfile();

  if (!user) {
    // Allow unauthenticated access to auth routes
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      // Redirect unauthenticated users to login
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  const role = (user.role as string).toUpperCase() as TRole;

  //   Check role-based access
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
  return NextResponse.redirect(new URL("/dashboard/tests", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/dashboard/:path*", "/login", "/forgot-password"],
};
