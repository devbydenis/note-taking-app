import CreateNote from '@/components/CreateNote'
import Navbar from '@/components/Navbar'
import NoteList from '@/components/NoteList'
import { verifyToken } from '@/lib/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  const isLoggedIn = !!token
  
  const dataUser = await verifyToken(token || "")
  console.log("dataUser dashboard", dataUser)
  
  // kalo belom login kita redirect manual
  if (!isLoggedIn) {
    redirect('/login')
  }
  
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
        <NoteList currentUserId={dataUser?.id} />
      </div>
      <CreateNote />
    </div>
  )
}
