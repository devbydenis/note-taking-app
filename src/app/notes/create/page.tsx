'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { LuArrowLeft } from 'react-icons/lu'
import Alert from '@/components/Alert'
import { useState } from 'react'

// 🔹 Schema validasi pakai Zod
const createNoteSchema = z.object({
  title: z.string().min(3, 'Title minimal 3 karakter'),
  content: z.string().min(5, 'Content minimal 5 karakter'),
  isPublic: z.boolean().optional(),
})

type CreateNoteForm = z.infer<typeof createNoteSchema>

export default function CreateNotePage() {
  const router = useRouter()
  const [showAlert, setShowAlert] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNoteForm>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: { title: '', content: '', isPublic: false },
  })

  async function onSubmit(data: CreateNoteForm) {
    try {
      console.log('Create Note:', data)
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      })
      const result = await res.json()
      // console.log("response create note: ", result)
      if (result.success) {
        setShowAlert(true)
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      }
    } catch (error) {
      console.error('Error creating note:', error)
    }
  }

  return (
    <div className="relative">
      {showAlert && (
        <Alert title="Success" message="Note created successfully!" status={showAlert} />
      )}
      <div className="max-w-2xl mx-auto mt-20 bg-white p-6 rounded-xl shadow-md">
        <Link href="/dashboard" className="flex gap-2 mb-5 text-sm font-semibold text-blue-500">
          <LuArrowLeft />
          Dashboard
        </Link>
        <h1 className="text-2xl font-bold mb-6">Create New Note</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <input
              type="text"
              placeholder="Title"
              className="w-full border border-gray-300 p-2 rounded"
              {...register('title')}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          {/* Content */}
          <div>
            <textarea
              placeholder="Write your note here..."
              className="w-full border border-gray-300 p-2 rounded min-h-[150px]"
              {...register('content')}
            />
            {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
          </div>

          {/* Checkbox Public */}
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register('isPublic')} />
            <span>Public Note</span>
          </label>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={showAlert}
              className={`${showAlert && 'opacity-50'} px-4 py-2 rounded bg-gray-900 cursor-pointer text-white hover:bg-gray-700`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
