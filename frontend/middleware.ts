import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	// Allow booking routes
	if (path === "/flights" || path.startsWith("/flights/")) {
		return NextResponse.next();
	}

	// Redirect everything else
	return NextResponse.redirect(new URL("/flights", request.url));
}

export const config = {
	matcher: ["/((?!_next|api|favicon.ico|.*\\.).*)"],
};
