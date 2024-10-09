import { z } from "zod"

export const usernameValidator =
    z.string({ "message": "Имя пользователя не указано" })
        .min(2, "Слишком короткое имя пользователя")
        .max(16, "Слишком длинное имя пользователя")

export const passwordValidator =
    z.string({ "message": "Пароль пуст" })
        .min(8, "Слишком короткий пароль")
        .max(64, "Слишком длинный пароль")

export const emailValidator =
    z.string({ message: "Адрес электронной почты не указан" })
        .email({ message: "Некорректный адрес электронной почты" })