import { verifyToken } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// /api/notes/[id]/comment -> ambil list komentar untuk tiap note
export async function GET({ params }: { params: { id: string } }) {
  try {
    const noteId = Number(params.id)
    const comments = await prisma.comment.findMany({
      where: { noteId },
      include: { user: { select: { id: true, username: true } } },
    })
    console.log("hitt")
    return NextResponse.json({ success: true, data: comments })
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to get comments' }, { status: 500 })
  }
}


// /api/notes/[id]/comment -> buat comment di note
export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    const userPromise = token ? verifyToken(token) : null
    const user = await userPromise
    if (!user) {
      return NextResponse.json({ success: false, message: 'Unauthorized to post comment' }, { status: 401 })
    }

    const body = await req.json()
    const { noteId, content } = body

    const comment = await prisma.comment.create({
      data: {
        content,
        noteId: Number(noteId),
        userId: user.id,
      },
    })

    return NextResponse.json({ success: true, data: comment })
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to post comment' }, { status: 500 })
  }
}
