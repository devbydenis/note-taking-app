'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { LuArrowLeft } from 'react-icons/lu'
import Alert from '@/components/Alert'
import { useState } from 'react'
import { createNoteSchema } from '@/types/schema'
import { CreateNoteForm } from '@/types/notes'

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
      console.log("response create note: ", result)
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
        <Alert title="Success" message="Note created successfully!" status={true} />
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
              className="w-full outline-2 outline-gray-300 p-2 rounded focus:outline-gray-700 transition-colors ease-in-out duration-300"
              {...register('title')}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>

          {/* Content */}
          <div>
            <textarea
              placeholder="Write your note here..."
              className="w-full outline-2 outline-gray-300 p-2 rounded focus:outline-gray-700 transition-colors ease-in-out duration-300 min-h-[150px]"
              {...register('content')}
            />
            {errors.content && <p className="text-sm text-red-500">{errors.content.message}</p>}
          </div>

          {/* Checkbox Public */}
          <div className="flex items-center gap-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" {...register('isPublic')} className="sr-only peer" value="" />
              <div className="group peer bg-white rounded-full duration-300 w-12 h-6 ring-2 ring-gray-500 after:duration-300 after:bg-gray-500 peer-checked:after:bg-gray-900 peer-checked:ring-gray-900 after:rounded-full after:absolute after:h-4 after:w-4 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-hover:after:scale-95"></div>
            </label>
            <p className="font-medium">Public</p>
          </div>

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
