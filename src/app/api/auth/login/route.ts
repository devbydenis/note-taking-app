import { NextResponse } from 'next/server' // helper buat bikin response JSON
import { prisma } from '@/lib/prisma' // buat query ke db
import { comparePassword, generateToken } from '@/lib/auth'

export const runtime = 'nodejs' // jsonwebtoken cuma jalan di nodejs bukan edge. sedangkan Next.js API Route jalan di Edge Runtime. maka kita perlu ini

export async function POST(req: Request) {
  // ambil data dari body request
  const { username, password } = await req.json()
  console.log(username, password)

  if (!username || !password) {
    return NextResponse.json({
      success: false,
      status: 400,
      error: 'username or password are required',
    })
  }

  // cari user berdasarkan username
  const user = await prisma.user?.findUnique({ where: { username } })
  if (!user) {
    return NextResponse.json({
      success: false,
      status: 401,
      error: 'User not found',
    })
  }

  // cek passwordnya cocok ga
  const isValid = comparePassword(password, user.password)
  if (!isValid) {
    return NextResponse.json({
      success: false,
      status: 401,
      error: 'Invalid credentials',
    })
  }

  // generate token
  const token = generateToken({ id: user.id, username: user.username })

  // simpan token di cookie httponly -> aman dari akses js
  const res = NextResponse.json({
    ok: true,
    message: 'Login success',
    token: token,
  })

  res.cookies.set('token', token, {
    httpOnly: true,
    sameSite: 'lax', // buat kompatibiltas antar browser
    path: '/',
  }) // biar browser otomatis bawa token setiap request -> prevent XSS

  return res
}
