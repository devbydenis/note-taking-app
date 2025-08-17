import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./src/lib/auth";

export function middleware(req: NextRequest) {
  // ambil token di cookies
  const token = req.cookies.get("token")?.value;
  console.log("token di middleware", token)
  
  
  // kalo token ga ada redirect ke login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // kalo token expired/invalid redirect ke login
  const decoded = verifyToken(token)
  if (!decoded) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  
  console.log("hasil decode: ", decoded)

  // kalo token valid lanjut ke dashboard
  return NextResponse.next()  
}

// middleware ini cuma jalan di route yg depannya /dashboard atau /notes (butuh token -> harus login dulu)
export const config = {
  runtime: "nodejs",
  matcher: ["/dashboard", "/notes"],
};