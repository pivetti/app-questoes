import { redirect } from "next/navigation";
import { registerAction } from "@/app/actions/auth";
import { AuthForm } from "@/components/auth-form";
import { ThemeToggle } from "@/components/theme-toggle";
import { getCurrentUser } from "@/lib/session";

export default async function RegisterPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <section className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-sm font-semibold text-emerald-700">App Questoes</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-950">Criar conta</h1>
          <p className="mt-2 text-sm text-slate-600">
            Cadastre questoes publicas, responda e revise seus erros.
          </p>
        </div>
        <AuthForm mode="register" action={registerAction} />
      </section>
    </main>
  );
}
