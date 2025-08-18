import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// 🔹 Schema validasi pakai Zod
export const createNoteSchema = z.object({
  title: z.string().min(3, 'Title minimal 3 karakter'),
  content: z.string().min(5, 'Content minimal 5 karakter'),
  isPublic: z.boolean().optional(),
})