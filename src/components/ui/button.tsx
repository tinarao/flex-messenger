import { Button as HeadlessButton } from '@headlessui/react';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <HeadlessButton
      className="flex items-center justify-center bg-primary px-6 py-2 rounded-md text-white font-[600] data-[hover]:bg-primary/80 data-[active]:bg-primary/60 transition duration-75"
      {...props}
    >
      {children}
    </HeadlessButton>
  );
};

export default Button;
