import Pusher from "pusher"
import { getPusherEnvs } from "./envs";

export const pusher = new Pusher({
    appId: getPusherEnvs().PUSHER_ID,
    key: getPusherEnvs().PUSHER_KEY,
    secret: getPusherEnvs().PUSHER_SECRET,
    cluster: getPusherEnvs().PUSHER_CLUSTER,
    useTLS: true
});