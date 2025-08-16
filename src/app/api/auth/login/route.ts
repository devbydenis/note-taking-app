import { NextResponse } from 'next/server' // helper buat bikin response JSON
import { prisma } from '@/lib/prisma' // buat query ke db
import { comparePassword, generateToken } from '@/lib/auth'

export async function POST(req: Request) {
  // ambil data dari body request
  const { email, password } = await req.json()

  // cari user berdasarkan email
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // cek passwordnya cocok ga
  const isValid = comparePassword(password, user.password)
  if (!isValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  // generate token
  const token = generateToken({
    id: user.id,
    email: user.email,
  })

  // simpan token di cookie httponly -> aman dari akses js
  const res = NextResponse.json({
    message: "Login success"
  })
  res.cookies.set("token", token, { httpOnly: true, secure: true}) // biar browser otomatis bawa token setiap request -> prevent XSS

  return res
}
