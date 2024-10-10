import CreateChannelForm from './_components/create-channel-form';

const CreateChannelPage = () => {
  return (
    <div className="grid grid-cols-2 h-screen">
      <title>Создание канала | Flex</title>
      <div className="col-span-1 flex items-center justify-center h-full">
        <CreateChannelForm />
      </div>
      <div className="col-span-1 border-l p-8">
        <h1 className="text-3xl font-bold">Создайте свой канал</h1>
        <div className="space-y-6">
          <p>
            Вы уже на полпути к тому, чтобы начать монетизировать свой талант!
            <br />
            Сейчас вы создадите заявку, которая отправится на рассмотрение
            модератору.
          </p>
          <p>
            Не забудьте заполнить поле "Информация о канале" - опишите
            деятельность, на которой вы специализируетесь. Расскажите о ваших
            планах и опишите контент, который вы планируете показывать своей
            аудитории. Поле не является обязательным к заполнению, но
            развёрнутое сообщение значительно повысит шансы на успешное создание
            канала
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateChannelPage;
