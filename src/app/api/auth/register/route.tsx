import { NextResponse } from "next/server"   // Helper Next.js buat bikin response JSON
import { prisma } from "@/lib/prisma"        // Prisma Client (buat query ke DB)
import { hashPassword } from "@/lib/auth"    // Function hash password yang tadi kita bikin

// Handle HTTP POST /api/auth/register
export async function POST(req: Request) {
  // ambil data dari body request
  const { name, email, password } = await req.json()

  // cek email udah ada di db atau belom
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 400 })
  }

  // hashing password sebelum disimpan ke db
  const hashed = hashPassword(password)

  // simpan user baru ke DB
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  })

  // return response sukses (gausah pake password)
  return NextResponse.json({ id: user.id, email: user.email })
}