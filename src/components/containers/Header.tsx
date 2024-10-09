import Link from 'next/link';
import ProfileDropdown from '../ProfileDropdown';
import AddContactDialog from '../modals/AddContactDialog';
import { Button } from '../ui/button';

const Header = () => {
  return (
    <header className="border-b py-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-red-500">
          Flex
        </Link>
        <div className="flex items-center gap-x-2">
          <AddContactDialog>
            <Button size="lg">Добавить контакт</Button>
          </AddContactDialog>
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
