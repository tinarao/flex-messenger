import { Channel, ChannelStatus } from '@prisma/client';
import Image from 'next/image';
import ArtPH from '@/assets/create-channel-art.jpg';

const statuses: Record<ChannelStatus, JSX.Element> = {
  OnModeration: (
    <div className="flex items-center justify-center bg-orange-200 w-fit mx-auto rounded-md px-2 py-1">
      <div className="size-4 bg-orange-500 rounded-full"></div>
      <p className="ml-2 font-medium">На модерации</p>
    </div>
  ),
  Approved: (
    <div className="flex items-center justify-center bg-green-200 w-fit mx-auto rounded-md px-2 py-1">
      <div className="size-4 bg-green-500 rounded-full"></div>
      <p className="ml-2 font-medium">Модерация пройдена</p>
    </div>
  ),
  Refused: (
    <div className="flex items-center justify-center bg-red-200 w-fit mx-auto rounded-md px-2 py-1">
      <div className="size-4 bg-red-500 rounded-full"></div>
      <p className="ml-2 font-medium">Не создан</p>
    </div>
  ),
};

const ChannelCard = ({ channel }: { channel: Channel }) => {
  return (
    <div className="border rounded-md w-full py-8">
      <Image
        fetchPriority="low"
        alt={`Аватарка канала '${channel.name}'`}
        src={channel.avatar ?? ArtPH}
        className="aspect-square rounded-full size-32 mx-auto"
      />
      <div className="text-center space-y-2">
        <h3 className="font-bold text-xl">{channel.name}</h3>
        <div className="w-fit mx-auto">{statuses[channel.status]}</div>
      </div>
    </div>
  );
};

export default ChannelCard;
