import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ChannelsBlock from './_components/channels-block';
import SettingsBlock from './_components/settings-block';
import InfoBlock from './_components/info-block';

const MePage = ({ searchParams }: { searchParams: Record<string, string> }) => {
  const blocks: Record<string, JSX.Element> = {
    channels: <ChannelsBlock />,
    settings: <SettingsBlock />,
  };

  return (
    <div className="grid grid-cols-9 container mx-auto h-full">
      <div className="col-span-2 border-r h-full space-y-1 p-2">
        <Button
          asChild
          variant="ghost"
          size="lg"
          className="w-full justify-start text-lg"
        >
          <Link href="/app/me">Информация</Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="lg"
          className="w-full justify-start text-lg"
        >
          <Link href="/app/me?block=channels">Каналы</Link>
        </Button>
        <Button
          asChild
          variant="ghost"
          size="lg"
          className="w-full justify-start text-lg"
        >
          <Link href="/app/me?block=settings">Настройки</Link>
        </Button>
      </div>
      <div className="col-span-7">
        {searchParams.block ? blocks[searchParams.block] : <InfoBlock />}
      </div>
    </div>
  );
};

export default MePage;
