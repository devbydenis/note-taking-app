import { NextResponse } from "next/server"  

export async function POST() {
  const res = NextResponse.json({ message: "Logout success" });

  // hapus token cookie
  res.cookies.set("token", "", { 
    httpOnly: true, 
    expires: new Date(0) // expired yang dulu otomatis keapus
  });

  return res
}
