import { getServerSession } from "next-auth/next";
import { NEXT_AUTH } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma"; // or your DB client
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const user = await prisma.user.findFirst({
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
        status: 200,
    });
  } catch (err) {
    console.error("Error fetching profile:", err);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
