"use server"

import { pusher } from "@/utils/pusher/pusher";

export const sendMessage = async () => {
    await pusher.trigger("messages", "message", {
        message: "hello world"
    });
}