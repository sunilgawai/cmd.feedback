import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // Define the routes that require authentication
  const protectedRoutes = ["/home"];

  // Check if the current route is protected
  const { pathname } = req.nextUrl;
  if (protectedRoutes.includes(pathname)) {
    // Get the user's authentication token
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      // If no token is found, redirect to the login page
      const loginUrl = new URL("/", req.url);
      // loginUrl.searchParams.set("from", pathname); // Optional: Add a redirect query param
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/home"], // Specify the routes to apply the middleware to
};
