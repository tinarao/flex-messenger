'use client';

import { signOut } from 'next-auth/react';
import { startTransition, useEffect } from 'react';

const LogoutPage = () => {
  useEffect(() => {
    startTransition(async () => {
      await signOut({ callbackUrl: '/auth' });
    });
  }, []);

  return <div>LogoutPage</div>;
};

export default LogoutPage;
