import { verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { TokenPayload } from '@/types/auth'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// GET ALL NOTES (public & private)
export async function GET(req: Request) {
  try {
    // ambil token dulu dari cookies
    const token = req.headers.get('cookie')?.split('token=')[1]
    // const cookieStore = await cookies() // ini gabisa dipake di middleware
    // const token = cookieStore.get("token")?.value
    const user: string | { id: number } | jwt.JwtPayload | null = token ? verifyToken(token) : null

    // ambil list notes dari database
    const notes = await prisma.note.findMany({
      where: {
        userId: user?.id,
      },
      include: { user: { select: { id: true, username: true, email: true } } },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json({ success: true, data: notes })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to query notes' }, { status: 500 })
  }
}

// CREATE NOTE
export async function POST(req: Request) {
  try {
    // const cookieStore = await cookies()
    // const token = cookieStore.get("token")?.value
    const token = req.headers.get('cookie')?.split('token=')[1]
    const userPromise = token ? verifyToken(token) : null
    const user = await userPromise
    console.log('USERRRR', user)

    // cek apakah user udah login
    if (!user) {
      return NextResponse.json({
        success: false,
        status: 401,
        error: 'Unauthorized',
      })
    }

    // ambil data dari body
    const body = await req.json()
    const { title, content, isPublic } = body

    // masukin note ke tabel
    const note = await prisma.note.create({
      data: {
        title,
        content,
        isPublic: isPublic ?? false,
        userId: user.id,
      },
    })

    return NextResponse.json({
      success: true,
      status: 200,
      data: note,
    })
    
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        status: 500,
        error: 'Failed to create note',
      }
    )
  }
}
