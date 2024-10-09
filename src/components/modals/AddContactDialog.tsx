import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AddContactForm from '../forms/AddContactForm';

const AddContactDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-72">
        <DialogHeader>
          <DialogTitle>Добавить контакт</DialogTitle>
          <DialogDescription>
            Добавить пользователя в свои контакты
          </DialogDescription>
        </DialogHeader>
        <AddContactForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddContactDialog;
