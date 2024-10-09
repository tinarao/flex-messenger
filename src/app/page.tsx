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

  useEffect(() => {
    if (!session) {
      router.replace('/auth');
    } else {
      router.push('/app');
    }
  }, [session]);

  return (
    <div className="h-screen flex items-center justify-center">
      <Button>Button component</Button>
    </div>
  );
}
