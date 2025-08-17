import CreateNote from '@/components/CreateNote'
import Navbar from '@/components/Navbar'
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
        <ul className='flex flex-col gap-5 w-1/2'>
          <li className='bg-gray-100 p-3'>
            <Link 
                className="flex rounded gap-5 justify-between" 
                href="/notes/:id"
            >
              <h2 className="font-semibold capitalize">title noteapp</h2>
              <p className="bg-gray-800 rounded text-white tracking-widest px-2 py-1">Shared</p>
            </Link>
          </li>
        </ul>
      </div>
      <CreateNote />
    </div>
  )
}
