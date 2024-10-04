'use client';

import { Button } from '@/components/ui/button';
import { sendMessage } from '@/server/controllers/messages';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useTransition } from 'react';

export default function Home() {
  const [_, startTransition] = useTransition();
  const { data: session } = useSession();
  const router = useRouter();

  const send = () => {
    startTransition(async () => {
      await sendMessage();
    });
  };

  useEffect(() => {
    if (!session) {
      router.replace('/auth');
    }
  }, [session]);

  // useEffect(() => {
  //   const channel = pusherClient.subscribe('messages');
  //   channel.bind('message', (data) => {
  //     console.log(data);
  //   });

  //   return () => {
  //     channel.unbind('message');
  //   };
  // }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <Button onClick={send}>Button component</Button>
    </div>
  );
}
