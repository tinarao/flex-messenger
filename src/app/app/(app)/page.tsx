const AppPage = () => {
  return (
    <div className="container mx-auto grid grid-cols-5 h-full">
      <div className="col-span-1"></div>
      <div className="col-span-3 h-full border-x">
        Посты от каналов, на которые подписан пользователь
      </div>
      <div className="col-span-1"></div>
    </div>
  );
};

export default AppPage;
