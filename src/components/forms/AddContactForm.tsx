'use client';

import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

const AddContactForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddContact = async () => {
    if (!usernameRef.current) {
      return;
    }

    const username = usernameRef.current.value;
    if (!username || username === '') {
      toast.error('Имя пользователя не указано');
      return;
    }

    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        body: JSON.stringify({
          userToAddUsername: usernameRef.current.value,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      console.log(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <Label>Имя пользователя</Label>
        <Input ref={usernameRef} placeholder="aboba" />
      </div>
      <hr className="my-1" />
      <Button
        disabled={isLoading}
        onClick={handleAddContact}
        variant="outline"
        className="w-full"
      >
        Добавить
      </Button>
    </div>
  );
};

export default AddContactForm;
