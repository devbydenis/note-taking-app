import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  console.log("MIDDLEWARE EXECUTED FOR PATH:", req.nextUrl.pathname);
  
  // ambil token di cookies
  // const token = req.cookies.get("token")?.value;
  const token = req.cookies.get("token")?.value || "";
  console.log("Token within middleware", token)
  
  
  // kalo token ga ada redirect ke login
  if (!token) {
    console.log("No token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // kalo token expired/invalid redirect ke login
  const decoded = verifyToken(token)
  if (!decoded) {
    console.log("Invalid token, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.url))
  }
  
  console.log("hasil decode: ", decoded)

  // kalo token valid lanjut ke dashboard
  console.log("Token valid, proceeding to protected route")
  return NextResponse.next()  
}

// middleware ini cuma jalan di route yg depannya /dashboard atau /notes (butuh token -> harus login dulu)
export const config = {
  runtime: "nodejs",
  matcher: ["/dashboard/:path*", "/notes/:path*"],
  // matcher: [
  //   '/dashboard',
  //   '/dashboard/(.*)',
  //   '/notes',
  //   '/notes/(.*)'
  // ],
};