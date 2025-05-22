import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';
import { prisma} from '@/lib/prisma';

interface Data {}

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const user = await prisma.healthMetric.findFirst({
      where: { email: body.userEmail },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    return NextResponse.json({
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        status
    });
}