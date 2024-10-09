import { z } from "zod"
import { NextResponse } from "next/server";
import prisma from "@/lib/client";
import bcrypt from 'bcryptjs';
import { passwordValidator, usernameValidator } from "@/validators/user";

const registerDto = z.object({
    username: usernameValidator,
    password: passwordValidator
})

export async function POST(request: Request) {
    const body = await request.json()
    const { error, success, data: dto } = registerDto.safeParse(body)
    if (!success) {
        return NextResponse.json({ message: error.errors[0].message }, { status: 400 })
    }

    const dup = await prisma.user.findFirst({
        where: { username: dto.username },
    })
    if (dup !== null) {
        return NextResponse.json({ message: "Пользователь с такими данными уже существует!" }, { status: 401 })
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt);

    const created = await prisma.user.create({
        data: {
            username: dto.username,
            password: hash,
            lastOnline: new Date()
        }
    })

    return NextResponse.json({ created }, { status: 200 })
}