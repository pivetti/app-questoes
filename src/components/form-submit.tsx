"use client";

import { useFormStatus } from "react-dom";

type FormSubmitProps = {
  children: React.ReactNode;
  className?: string;
};

export function FormSubmit({ children, className = "" }: FormSubmitProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex h-11 items-center justify-center rounded-md bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {pending ? "Salvando..." : children}
    </button>
  );
}
