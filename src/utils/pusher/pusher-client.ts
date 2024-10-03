import Pusher from "pusher-js"
import { getPusherEnvs } from "./envs"

export const pusherClient = new Pusher(getPusherEnvs().PUSHER_KEY, {
    cluster: getPusherEnvs().PUSHER_CLUSTER,
})