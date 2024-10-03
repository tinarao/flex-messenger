'use client';

import Button from '@/components/ui/button';
import { sendMessage } from '@/server/controllers/messages';
import { pusherClient } from '@/utils/pusher/pusher-client';
import { useEffect, useTransition } from 'react';

export default function Home() {
  const [_, startTransition] = useTransition();

  const send = () => {
    startTransition(async () => {
      await sendMessage();
    });
  };

  useEffect(() => {
    const channel = pusherClient.subscribe('messages');
    channel.bind('message', (data) => {
      console.log(data);
    });

    return () => {
      channel.unbind('message');
    };
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <Button onClick={send}>Button component</Button>
    </div>
  );
}
