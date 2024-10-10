import { Button } from '@/components/ui/button';
import prisma from '@/lib/client';
import { authOptions } from '@/utils/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import ChannelCard from './channel-card';

const ChannelsBlock = async () => {
  const session = await getServerSession(authOptions);
  const channels = await prisma.channel.findMany({
    where: { creatorId: session?.user.id },
  });

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Мои каналы</h1>
      <div className="py-2 flex items-center">
        <Button asChild>
          <Link href="/app/create-channel">Создать канал</Link>
        </Button>
        <span className="text-sm text-muted-foreground pl-2 ml-2 border-l">
          Всего: {channels.length}
        </span>
      </div>
      {channels.length ? (
        <div className="grid grid-cols-4">
          {channels.map((ch) => (
            <ChannelCard key={ch.id} channel={ch} />
          ))}
        </div>
      ) : (
        <div className="py-8">
          <h3 className="font-medium text-xl">Пусто!</h3>
        </div>
      )}
    </div>
  );
};

export default ChannelsBlock;
