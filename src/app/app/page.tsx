'use client';

import { z } from 'zod';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';

const DataValidator = z.object({
  id: z.number(),
  creatorId: z.number(),
  members: z.array(
    z.object({
      id: z.number(),
      username: z.string(),
      avatar: z.string().nullable(),
    })
  ),
});

const AppPage = () => {
  const { data: session } = useSession();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['chats-index'],
    queryFn: async () => {
      const res = await fetch('/api/contacts');
      const json = await res.json();
      const data = z.array(DataValidator).parse(json);

      return data;
    },
  });

  return (
    <div className="container mx-auto grid grid-cols-6 h-full">
      <div className="col-span-1 h-full border-r"></div>
      <div className="col-span-5"></div>
    </div>
  );
};

export default AppPage;
