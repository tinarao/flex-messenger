import { z } from "zod";

export const CreateChannelRequestDTO = z.object({
    name: z.string({ message: "Имя канала не указано" })
        .min(3, "Слишком короткое название канала")
        .max(32, "Слишком длинное название канала"),
    message: z.string({ message: "Сообщение отсутствует" })
        .max(256, "Слишком длинное описание канала")
})

export type CreateChannelRequestDTOType = z.infer<typeof CreateChannelRequestDTO>