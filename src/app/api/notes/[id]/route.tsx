import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/lib/auth"
import { TokenPayload } from "@/types/auth"
import { UpdateNoteBody } from "@/types/notes"

// GET single note
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
    const { id } = await params
  try {
    const note = await prisma.note.findUnique({
      where: { id: Number(id) },
      include: { user: { select: { id: true, username: true } } },
    })

    if (!note) return NextResponse.json({ error: "Note not found" }, { status: 404 })
    return NextResponse.json({success: true, data: note})
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch note" }, { status: 500 })
  }
}

// UPDATE note
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = await params
  try {
    const token = req.headers.get("cookie")?.split("token=")[1]
    const userPromise = token ? verifyToken(token) : null
    const user = await userPromise
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body: UpdateNoteBody = await req.json()
    const data: Partial<UpdateNoteBody> = {}
    if (body.title) data.title = body.title
    if (body.content) data.content = body.content
    if (body.isPublic !== undefined) data.isPublic = body.isPublic

    const note = await prisma.note.findUnique({ where: { id: Number(id) } })
    console.log(note)
    if (!note || note.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const updated = await prisma.note.update({
      where: { id: Number(id) },
      data: data,
    })

    return NextResponse.json({success: true, message: "Note updated successfully", data: updated})
  } catch (err) {
    return NextResponse.json({ error: "Failed to update note" }, { status: 500 })
  }
}

// DELETE note
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const { id } = await params
  try {
    const token = req.headers.get("cookie")?.split("token=")[1]
    const userPromise = token ? verifyToken(token) : null
    const user = await userPromise
    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })

    const note = await prisma.note.findUnique({ where: { id: Number(id) } })
    if (!note || note.userId !== user.id) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 })
    }

    await prisma.note.delete({ where: { id: Number(id) } })
    return NextResponse.json({ success:true, message: "Note deleted" })
  } catch (err) {
    return NextResponse.json({ success: false, error: "Failed to delete note" }, { status: 500 })
  }
}
