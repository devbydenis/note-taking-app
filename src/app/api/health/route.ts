import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  // Tes query ringan ke DB (aman karena pakai tagged template)
  const ok = await prisma.$queryRaw<{ ok: number }[]>`SELECT 1 AS ok`;
  return NextResponse.json({ db: ok[0]?.ok === 1 ? 'up' : 'down' });
}
