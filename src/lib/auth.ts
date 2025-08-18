import { TokenPayload } from '@/types/auth'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

export const runtime = 'nodejs' // jsonwebtoken cuma jalan di nodejs bukan edge. sedangkan Next.js API Route jalan di Edge Runtime. maka kita perlu ini

// hash password sebelum simpen ke db
export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

// compare password input dengan yang ada di db
export function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash)
}

// generate jwt tokem
export function generateToken(payload: TokenPayload) {
  console.log('payload to generate token:', payload)
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '10h' })
}

// verify token jwt
export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload
    console.log('verifying token successful:', decoded)
    return decoded
  } catch (error) {
    console.error('Token verification failed:', (error as Error).message)
    return null
  }
}
