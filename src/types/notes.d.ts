interface CreateNoteBody {
  title: string
  content: string
  isPublic?: boolean
}

interface UpdateNoteBody {
  title?: string
  content?: string
  isPublic?: boolean
}