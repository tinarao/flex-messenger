"use server"

import { authOptions } from "@/utils/auth"
import { getServerSession } from "next-auth"
import { ActionResponse } from "@/types/actions"
import { CreateChannelRequestDTO, CreateChannelRequestDTOType } from "./dto"
import prisma from "@/lib/client"
import { channel } from "diagnostics_channel"

/**
    Контроллер, отвечающий за создание заявок на регистрацию канала.
    Вызывается формой на странице /app/create-channel
 */
export const createChannelRequest = async (values: CreateChannelRequestDTOType): Promise<ActionResponse> => {
    console.time("create channel request")
    const session = await getServerSession(authOptions)
    if (!session) {
        console.timeEnd("create channel request")
        return { code: 401, ok: false, message: "Не авторизован" }
    }

    const { data, success, error } = CreateChannelRequestDTO.safeParse(values)
    if (!success) {
        console.timeEnd("create channel request")
        return { code: 400, ok: false, message: error.errors[0].message }
    }

    await prisma.$transaction(async tx => {
        const createdChannel = await tx.channel.create({
            data: {
                name: data.name,
                creatorId: session.user.id,
                createdAt: new Date(),
                status: "OnModeration"
            }
        })

        const request = await tx.channelRequest.create({
            data: {
                userId: session.user.id,
                channelId: createdChannel.id,
                text: data.message
            }
        })

        return await tx.channel.update({
            where: { id: createdChannel.id },
            data: { request: { connect: { id: request.id } } }
        })
    })

    console.timeEnd("create channel request")
    return { code: 201, ok: true, message: "Заявка отправлена!" }
}