'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { FaEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { LuArrowLeft } from 'react-icons/lu'
import { FaShareFromSquare } from 'react-icons/fa6'

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

export default function NoteDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [comment, setComment] = useState('')

  async function handleAddComment(e: React.FormEvent) {
    e.preventDefault()
    console.log('Add Comment:', comment)
    setComment('')
  }

  return (
    <>
      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
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
            <button className="px-3 py-1 hover:text-yellow-500 cursor-pointer">
              <FaEdit />
            </button>
            <button className="px-3 py-1 hover:text-red-500 cursor-pointer">
              <RiDeleteBin6Line />
            </button>
          </div>
        </div>

        <div className="border-b-1 border-gray-300">
          <h1 className="text-2xl font-bold">{dummyNote.title}</h1>
          <p className="text-gray-400 text-sm">
            Owner: {dummyNote.owner} | Status: {dummyNote.isPublic ? 'Public' : 'Private'}
          </p>
        </div>

        <div className="my-10 text-gray-600 tracking-wider">{dummyNote.content}</div>

        <div className="border-t border-gray-200 pt-5">
          <h2 className="font-semibold mb-2">💬 Comments</h2>

          <div className="space-y-2">
            {dummyNote.comments.map((c) => (
              <div key={c.id} className="border border-gray-300 p-2 rounded bg-gray-100">
                <strong>{c.user}:</strong> {c.content}
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} className="mt-4 flex gap-2">
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
      </div>
    </>
  )
}
