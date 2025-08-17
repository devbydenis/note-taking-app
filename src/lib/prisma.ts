// import { PrismaClient } from '@prisma/client'; // karna kita udah custom location (bukan di node modules lagi) -> makanya pathnya harus path custom
import { PrismaClient } from '../generated/prisma';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({
    log: ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Prisma menyarankan hanya satu instance PrismaClient (tiap instance bawa connection pool). Pola singleton seperti ini umum dipakai di Next.js.