import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    if(req.method !== "POST") {
        return  NextResponse.json({ message: "Method not allowed" }, { status: 405 });
    }
    const body = await req.json();

    const { name, email, password } = body

    if(!name || !email || !password) {
        return NextResponse.json({ message: "Enter a valid details" }, { status: 400 });
    }

    const existingUsername = await prisma.user.findFirst({
        where: { 
            name: name
         }
    });

    if(existingUsername) {
        return NextResponse.json({ message: "Username already exists", status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword
        }
    });

    if(newUser) {
        return NextResponse.json({ message: "User created successfully", status: 200 });
    } else {
        return NextResponse.json({ message: "Error creating user", status: 500 });
    }
}