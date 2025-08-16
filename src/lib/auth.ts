import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

// hash password sebelum simpen ke db
export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

// compare password input dengan yang ada di db
export function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

// generate jwt tokem
export function generateToken(payload: object) { // payload: { id: number, email: string }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

// verify token jwt
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}