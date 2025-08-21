import { NextResponse } from 'next/server' // Helper Next.js buat bikin response JSON
import { prisma } from '@/lib/prisma' // Prisma Client (buat query ke DB)
import { hashPassword } from '@/lib/auth' // Function hash password yang tadi kita bikin

// Handle HTTP POST /api/auth/register
export async function POST(req: Request) {
  // ambil data dari body request
  const { username, email, password } = await req.json()

  if (username === '' || email === '' || password === '') {
    return NextResponse.json({
      success: false,
      status: 400,
      error: 'Missing required fields',
    })
  }

  // cek email udah ada di db atau belom
  const existing = await prisma.user?.findUnique({ where: { email: email } })
  if (existing) {
    return NextResponse.json({
      success: false,
      status: 400,
      error: 'Email already registered',
    })
  }

  // hashing password sebelum disimpan ke db
  const hashed = hashPassword(password)

  // simpan user baru ke DB
  const user = await prisma.user?.create({
    data: { username, email, password: hashed },
  })

  // return response sukses (gausah pake password)
  return NextResponse.json({
    success: true,
    status: 200,
    data: {
      id: user?.id,
      email: user?.email,
    },
  })
}
