import CreateNote from '@/components/CreateNote'
import Navbar from '@/components/Navbar'
import NoteList from '@/components/NoteList'
import Link from 'next/link'

export default function DashboardPage() {
  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST'
    })

    location.href = '/login'
  }
  
  return (
    <div className="min-h-screen items-center justify-center bg-white">
      <Navbar />
      <div className="p-2 flex flex-col items-center">
        <h1 className="text-4xl font-bold my-10">My Notes</h1>
        <NoteList />
      </div>
      <CreateNote />
    </div>
  )
}
