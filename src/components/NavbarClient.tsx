"use client"

import Link from "next/link"

export default function NavbarClient({ isLoggedIn }: { isLoggedIn: boolean }) {
  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    location.href = "/login"
  }

  return (
    <header className="bg-gray-900">
      <nav className="text-white">
        <ul className="flex justify-evenly items-center p-5">
          <li>
            <Link className="font-bold text-3xl" href="/">
              NoteApp
            </Link>
          </li>

          {isLoggedIn && (
            <li>
              <Link
                className="font-bold text-sm text-gray-300 hover:underline underline-offset-8"
                href="/dashboard"
              >
                Dashboard
              </Link>
            </li>
          )}

          {isLoggedIn ? (
            <li>
              <button
                onClick={logout}
                className="bg-gray-700 p-2 rounded font-bold text-xl cursor-pointer hover:opacity-80"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                className="font-bold text-xl hover:underline underline-offset-8"
                href="/login"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
