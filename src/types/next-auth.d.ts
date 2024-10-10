import { UserRole } from "@prisma/client"
import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: number,
            username: string,
            avatar?: string,
            role: UserRole
        }
    }

    interface User {
        id: number,
        username: string,
        avatar?: string,
        role: UserRole
    }
}

declare module "next-auth/jwt" {
    // yo why not
    interface JWT {
        id: number,
        username: string,
        avatar?: string,
        role: UserRole
    }
}