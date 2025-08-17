import { cookies } from "next/headers"
import NavbarClient from "./NavbarClient"

export default async function Navbar() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  const isLoggedIn = !!token

  return <NavbarClient isLoggedIn={isLoggedIn} />
}
