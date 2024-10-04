'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useForm } from '@tanstack/react-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import { LoaderCircle } from 'lucide-react';

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      if (value.password === '' || value.username === '') {
        toast.error('Вы точно ввели все данные?');
        return;
      }

      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify({
            username: value.username,
            password: value.password,
          }),
        });

        const body = await res.json();
        if (!res.ok) {
          toast.error(body.message);
          return;
        }

        await signIn('credentials', {
          username: value.username,
          password: value.password,
          redirect: true,
          callbackUrl: '/app',
        });

        toast.success('Регистрация прошла успешно!');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="p-6 border rounded-md flex flex-col space-y-2"
    >
      <h1 className="text-xl font-bold">Регистрация</h1>
      <form.Field name="username">
        {(field) => (
          <div>
            <Label>Имя пользователя</Label>
            <Input
              id="username-input"
              disabled={isLoading}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Имя пользователя"
              className="w-72"
            />
          </div>
        )}
      </form.Field>
      <form.Field name="password">
        {(field) => (
          <div>
            <Label className="text-[500]">Пароль</Label>
            <Input
              disabled={isLoading}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="*************"
              type="password"
              className="w-72"
            />
          </div>
        )}
      </form.Field>
      <hr className="my-1" />
      <div className="grid">
        <Button disabled={isLoading}>
          {isLoading ? (
            <LoaderCircle className="size-5 animate-spin" />
          ) : (
            'Зарегистрироваться'
          )}
        </Button>
        <span className="text-center text-sm font-medium my-1">или</span>
        <Button disabled={isLoading} asChild variant="outline">
          <Link href="/auth">Войти</Link>
        </Button>
      </div>
    </form>
  );
};

export default RegisterPage;
