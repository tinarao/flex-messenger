'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import AvatarPH from '@/components/assets/avatar-ph.png';
import { Button } from './ui/button';
import Link from 'next/link';

const ProfileDropdown = () => {
  const { data: session } = useSession();
  if (!session) {
    return;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="lg" variant="outline">
          <Image
            alt={`Аватар пользователя ${session.user.username}`}
            className="size-6 rounded-2xl"
            src={session.user.avatar ?? AvatarPH}
          />
          <span className="ml-2">{session.user.username}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session.user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/app/me">
            Мой профиль
          </Link>
        </DropdownMenuItem>
        {session.user.role === 'Moderator' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link className="cursor-pointer" href="/dashboard">
                Кабинет модератора
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem asChild>
          <Link className="cursor-pointer" href="/app/logout">
            Выйти
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
