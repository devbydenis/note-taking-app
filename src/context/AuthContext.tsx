"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"

interface AuthContextType {
  userId: number | null
  setUserId: (id: number | null) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null)

  useEffect(() => {
    // Get token from client-side cookie
    const getCookieValue = (name: string) => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
      return match ? match[2] : null
    }

    const token = getCookieValue('token')
    
    if (token) {
      // Decode the token on client side
      try {
        // Simple parsing of JWT without verification
        // (actual verification should happen on the server)
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
        const payload = JSON.parse(window.atob(base64))
        
        if (payload.id) {
          setUserId(Number(payload.id))
        }
      } catch (error) {
        console.error("Error decoding token", error)
        setUserId(null)
      }
    }
  }, [])

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  )
}
