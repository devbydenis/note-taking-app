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
export function generateToken(payload: object) {
  console.log('payload to generate token:', payload)
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
}

// verify token jwt
export function verifyToken(token: string) {
  try {
    const [header, payload] = token.split('.');
    const decodedHeader = JSON.parse(Buffer.from(header, 'base64').toString());
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString());
    
    console.log('JWT header:', decodedHeader);
    console.log('JWT payload:', decodedPayload);
    
    const decoded = jwt.verify(token, JWT_SECRET)
    console.log('verifying token successful:', decoded)
    return decoded
  } catch (error) {
    console.error('Token verification failed:', (error as Error).message)
    return null
  }
}
