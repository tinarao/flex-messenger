export const getPusherEnvs = () => {
    const PUSHER_ID = process.env.NEXT_PUBLIC_PUSHER_ID
    const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY
    const PUSHER_SECRET = process.env.NEXT_PUBLIC_PUSHER_SECRET
    const PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER

    if (!PUSHER_KEY || !PUSHER_CLUSTER || !PUSHER_ID || !PUSHER_SECRET) {
        throw new Error("Failed to load .env variables")
    }

    return { PUSHER_KEY, PUSHER_CLUSTER, PUSHER_ID, PUSHER_SECRET }
}