import React from 'react';

interface ButtonProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
}

export default function Button({ className, onClick, text }: ButtonProps) {
  return (
    <button className={`rounded-3xl hover:cursor-pointer ${className}`} onClick={onClick}>
      {text}
    </button>
  );
}
