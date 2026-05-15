import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";
import { AppShellNav } from "@/components/app-shell-nav";
import { requireUser } from "@/lib/session";

const navItems = [
  { href: "/dashboard", label: "Desempenho" },
  { href: "/contents", label: "Conteudos" },
  { href: "/practice", label: "Responder" },
  { href: "/questions", label: "Questoes" },
  { href: "/review", label: "Erradas" },
];

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requireUser();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <Link href="/dashboard" className="text-lg font-bold text-slate-950">
              App Questoes
            </Link>
            <p className="hidden truncate text-sm text-slate-500 md:block">
              {user.email}
            </p>
          </div>
          <AppShellNav
            email={user.email}
            navItems={navItems}
            logoutAction={logoutAction}
          />
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        {children}
      </main>
    </div>
  );
}
