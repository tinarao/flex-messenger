import { authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

const AppPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/auth');
  }

  return <div>{session?.user.username ?? 'not authorized'}</div>;
};

export default AppPage;
