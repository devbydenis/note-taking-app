import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/lib/auth"
import { TokenPayload } from "@/types/auth"

// GET single note
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const note = await prisma.note.findUnique({
      where: { id: Number(params.id) },
      include: { user: { select: { id: true, username: true } } },
    })

    if (!note) return NextResponse.json({ error: "Note not found" }, { status: 404 })
    return NextResponse.json(note)
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch note" }, { status: 500 })
  }
}

// UPDATE note
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const token = req.headers.get("cookie")?.split("token=")[1]
    const user: TokenPayload | null = token ? verifyToken(token) : null
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body: UpdateNoteBody = await req.json()

    const note = await prisma.note.findUnique({ where: { id: Number(params.id) } })
    if (!note || note.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const updated = await prisma.note.update({
      where: { id: Number(params.id) },
      data: body,
    })

    return NextResponse.json(updated)
  } catch (err) {
    return NextResponse.json({ error: "Failed to update note" }, { status: 500 })
  }
}

// DELETE note
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    const token = req.headers.get("cookie")?.split("token=")[1]
    const user: TokenPayload | null = token ? verifyToken(token) : null
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const note = await prisma.note.findUnique({ where: { id: Number(params.id) } })
    if (!note || note.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await prisma.note.delete({ where: { id: Number(params.id) } })
    return NextResponse.json({ message: "Note deleted" })
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete note" }, { status: 500 })
  }
}
