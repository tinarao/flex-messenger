import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "../lib/client";
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            type: "credentials",
            name: "credentials",
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "password", type: "password" },
            },

            async authorize(credentials, req) {
                if (!credentials) {
                    throw new Error("Вы точно ввели все данные?")
                }

                const user = await prisma.user.findFirst({
                    where: { username: credentials.username }
                })
                if (!user) {
                    throw new Error("Пользователь не найден")
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
                if (!isPasswordValid) {
                    throw new Error("Неправильный пароль")
                }

                return {
                    avatar: user.avatar ?? undefined,
                    id: user.id,
                    username: user.username,
                    role: user.role
                }
            },
        })
    ],
    secret: process.env.JWT_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 2592000
    },
    pages: {
        signIn: "/login"
    },
    callbacks: {
        jwt({ user, token }) {
            if (user) {
                token.id = parseInt(String(user.id))    // pizdec
                token.username = user.username
                token.avatar = user.avatar
                token.role = user.role
            }

            return token
        },
        session({ session, token }) {
            if (token) {
                session.user.id = token.id
                session.user.username = token.username
                session.user.avatar = token.avatar
                session.user.role = token.role
            }

            return session
        },
    }
}