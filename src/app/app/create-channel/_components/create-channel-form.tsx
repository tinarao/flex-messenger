'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createChannelRequest } from '@/server/controllers/channels/requests';
import { useForm } from '@tanstack/react-form';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

const CreateChannelForm = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: '',
      message: '',
    },
    onSubmit: async ({ value }) => {
      startTransition(async () => {
        const response = await createChannelRequest(value);
        if (!response.ok) {
          toast.error(response.message);
          return;
        }

        toast.success(response.message);
        router.push('/app/create-channel/ok');

        return;
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="w-96"
    >
      <form.Field name="name">
        {(field) => (
          <div>
            <Label>Название канала</Label>
            <Input
              disabled={isLoading}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Введите название канала"
              maxLength={32}
            />
          </div>
        )}
      </form.Field>
      <form.Field name="message">
        {(field) => (
          <div>
            <Label>Информация о канале</Label>
            <Textarea
              disabled={isLoading}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={8}
              placeholder="Введите название канала"
            />
          </div>
        )}
      </form.Field>
      <hr className="my-2" />
      <div className="flex items-center gap-x-2">
        <Checkbox
          disabled={isLoading}
          checked={isChecked}
          onCheckedChange={(e) => setIsChecked(!!e)}
        />
        <Label>Я правильно заполнил(а) все поля</Label>
      </div>
      <Button
        size="lg"
        disabled={!isChecked || isLoading}
        className="w-full mt-2"
      >
        {isLoading ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          'Отправить'
        )}
      </Button>
    </form>
  );
};

export default CreateChannelForm;
