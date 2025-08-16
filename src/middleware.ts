import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export function middleware(req: NextRequest) {
  // ambil token di cookies
  const token = req.cookies.get("token")?.value;
  
  // kalo token ga ada redirect ke login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // kalo token expired/invalid redirect ke login
  const decoded = verifyToken(token)
  if (!decoded) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // kalo token valid lanjut ke dashboard
  return NextResponse.next()  
}

// middleware ini cuma jalan di route yg depannya /dashboard atau /notes (butuh login dulu)
export const config = {
  matcher: ["/", "/dashboard", "/login", "/register"],
};