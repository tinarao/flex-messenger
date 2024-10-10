import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <header>
        <Button asChild>
          <Link href="/app">
            <User className="size-4 mr-2" /> Личный кабинет
          </Link>
        </Button>
      </header>
      <main className="h-screen"></main>
      <footer className="bg-primary py-32"></footer>
    </>
  );
}
