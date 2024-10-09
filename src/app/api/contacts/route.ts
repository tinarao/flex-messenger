import prisma from "@/lib/client"
import { authOptions } from "@/utils/auth"
import { usernameValidator } from "@/validators/user"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { z } from "zod"

const addContactDTO = z.object({
    userToAddUsername: usernameValidator,
})

export async function POST(request: Request) {
    // const user = await getServerSession(authOptions)
    // if (!user) {
    //     return NextResponse.json({ message: "Не авторизован" }, { status: 401 })
    // }

    // const body = await request.json()
    // const { success, error, data: dto } = addContactDTO.safeParse(body)
    // if (!success) {
    //     return NextResponse.json({ message: error.errors[0].message }, { status: 400 })
    // }

    // const userToAdd = await prisma.user.findFirst({
    //     where: { username: dto.userToAddUsername },
    //     include: { contacts: true }
    // })
    // if (!userToAdd) {
    //     return NextResponse.json({ message: "Пользователь с таким именем не найден" }, { status: 404 })
    // }

    return NextResponse.json({ "ok": "ye" }, { status: 200 })
}

export async function GET(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ message: "Не авторизован" }, { status: 401 })
    }

    const user = await prisma.user.findFirst({
        where: { id: session.user.id },
        include: {
            chats: { include: { members: { select: { id: true, username: true } } } },
            createdChats: { include: { members: { select: { id: true, username: true } } } },
        }
    })

    const chats = [
        ...user!.chats,
        ...user!.createdChats
    ]

    return NextResponse.json({ chats }, { status: 401 })
}