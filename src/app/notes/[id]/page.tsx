'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { LuArrowLeft } from 'react-icons/lu'
import { FaShareFromSquare } from 'react-icons/fa6'
import { useQuery } from '@tanstack/react-query'
import Loader from '@/components/Loader'
import { set, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createNoteSchema } from '@/types/schema'
import { CreateNoteForm, DetailNoteProps, EditNoteProps } from '@/types/notes'
import Alert from '@/components/Alert'

// sementara data dummy
const dummyNote = {
  id: 1,
  title: 'Belajar Next.js',
  content: 'ini contoh isi notenya',
  owner: 'Denis Rahmadi',
  isPublic: true,
  comments: [
    { id: 1, user: 'User A', content: 'catetan user a' },
    { id: 2, user: 'User B', content: 'catetan user a' },
  ],
}

const fetchNote = async (id: number) => {
  const res = await fetch(`/api/notes/${id}`, {
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Failed to fetch detail note')

  const response = await res.json()

  if (response.success) {
    return response.data
  } else {
    console.error('Error fetching detail note:', response)
  }
}

export default function NoteDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = useParams()
  const [isEdit, setIsEdit] = useState(false)
  const [comment, setComment] = useState('')
  const [showAlert, setShowAlert] = useState(false)

  const {
    data: note,
    error,
    isLoading,
  } = useQuery<DetailNoteProps>({
    queryKey: ['note', id],
    queryFn: () => fetchNote(Number(id)),
  })

  if (isLoading) return <Loader />
  if (error) return <p className="text-red-500">{error.message}</p>
  if (!note) return <p className="text-gray-500">Note not found</p>

  
  async function deleteNote() {
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      const result = await res.json()
      if (result.success) {
        setShowAlert(true)
        setTimeout(() => {
          router.push('/dashboard')
        }, 1000)
      }
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }
  return (
    <>
      <div className='relative top-15'>
        {showAlert && (
          <Alert title="Note Deleted" message="Note has been deleted successfully." status={false} />
        )}
      </div>
      <div className="max-w-3xl mx-auto mt-20 bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-5">
          <button
            onClick={() => router.back()}
            className="flex gap-3 text-sm text-blue-600 cursor-pointer"
          >
            <LuArrowLeft />
            Back
          </button>
          <div className="flex gap-2 text-xl">
            <button className="text-gray-900 px-4 py-2 rounded  hover:text-green-600 cursor-pointer">
              <FaShareFromSquare />
            </button>
            <button
              onClick={() => setIsEdit(!isEdit)}
              className="px-3 py-1 hover:text-yellow-500 cursor-pointer"
            >
              <FaEdit />
            </button>
            <button 
              onClick={deleteNote}
              className="px-3 py-1 hover:text-red-500 cursor-pointer">
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>

        {isEdit ? (
          <EditNote id={id} title={note.title} content={note.content} isEdit={isEdit} setIsEdit={setIsEdit} />
        ) : (
          <>
            <div>
              <div className="border-b-1 border-gray-300">
                <h1 className="text-2xl font-bold">{note.title}</h1>
                <p className="text-gray-400 text-sm">
                  Owner: {note.user.username} | Status: {note.isPublic ? 'Public' : 'Private'}
                </p>
              </div>
  
              <div className="my-10 text-gray-600 tracking-wider">{note.content}</div>
            </div>
            {/*TODO: Implement comment section nanti*/}
            <div className="border-t border-gray-200 pt-5">
              <h2 className="font-semibold mb-2">💬 Comments</h2>
    
              {/*<div className="space-y-2">
                {dummyNote.comments.map((c) => (
                  <div key={c.id} className="border border-gray-300 p-2 rounded bg-gray-100">
                    <strong>{c.user}:</strong> {c.content}
                  </div>
                ))}
              </div>*/}
    
              <form className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full border border-gray-300 p-2 rounded"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-700"
                >
                  Send
                </button>
              </form>
            </div>
          </>
        )}

      </div>
    </>
  )
}

function EditNote({ id, title, content, isEdit, setIsEdit }: EditNoteProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNoteForm>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: { title, content, isPublic: false },
  })
  
  
  async function onSubmit(data: CreateNoteForm) {
    try {
      console.log('Create Note:', data)
      const res = await fetch(`/api/notes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      })
      const result = await res.json()
      // console.log("response create note: ", result)
      if (result.success) {
        // do something here
        setIsEdit(false)
        router.refresh() // SSR refetch data
      }
    } catch (error) {
      console.error('Error creating note:', error)
    }
  }

  return (
    <div>
      <h2 className="font-semibold text-3xl capitalize mb-2">Edit Mode</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <input
            type="text"
            placeholder="Title"
            className="w-full border border-gray-300 p-2 rounded focus:outline-gray-400"
            {...register('title')}
          />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
        </div>

        {/* Content */}
        <div>
          <textarea
            placeholder="Write your note here..."
            className="w-full border border-gray-300 p-2 rounded min-h-[150px] focus:outline-gray-400"
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
            onClick={() => setIsEdit(!isEdit)}
            className="px-4 py-2 font-semibold rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-4 py-2 font-semibold rounded bg-gray-900 cursor-pointer text-white hover:bg-gray-700`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
