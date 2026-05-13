"use client";

import Link from "next/link";
import { useActionState } from "react";
import { FormState } from "@/lib/form";
import { FormSubmit } from "@/components/form-submit";

type AuthFormProps = {
  mode: "login" | "register";
  action: (state: FormState, formData: FormData) => Promise<FormState>;
};

export function AuthForm({ mode, action }: AuthFormProps) {
  const [state, formAction] = useActionState(action, {});
  const isRegister = mode === "register";

  return (
    <form action={formAction} className="space-y-4">
      {state.error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      ) : null}

      {isRegister ? (
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Nome</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </label>
      ) : null}

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">E-mail</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">Senha</span>
        <input
          name="password"
          type="password"
          autoComplete={isRegister ? "new-password" : "current-password"}
          required
          className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      </label>

      <FormSubmit className="w-full">
        {isRegister ? "Criar conta" : "Entrar"}
      </FormSubmit>

      <p className="text-center text-sm text-slate-600">
        {isRegister ? "Ja tem conta?" : "Ainda nao tem conta?"}{" "}
        <Link
          href={isRegister ? "/login" : "/register"}
          className="font-semibold text-emerald-700 hover:text-emerald-800"
        >
          {isRegister ? "Entrar" : "Cadastrar"}
        </Link>
      </p>
    </form>
  );
}
