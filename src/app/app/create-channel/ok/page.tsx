import Link from 'next/link';
import { Button } from '@/components/ui/button';

const CreateChannelOkPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h5 className="text-6xl">✨</h5>
        <h1 className="text-4xl">Заявка отправлена на модерацию!</h1>
        <hr className="my-2 w-[65%] mx-auto" />
        <p className="text-xl">
          В ближайшее время модераторы проверят Вашу заявку, и, в случае
          соответствия нашим правилам, одобрят её.
        </p>
        <p>
          Вы можете отследить статус заявки в личном кабинете, в разделе
          &quot;Мои каналы&quot;
        </p>
        <hr className="my-2 w-[15%] mx-auto" />
        <Button asChild>
          <Link href="/app/me?block=channels">Вернуться в личный кабинет</Link>
        </Button>
      </div>
    </div>
  );
};

export default CreateChannelOkPage;
