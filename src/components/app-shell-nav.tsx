"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

type NavItem = {
  href: string;
  label: string;
};

type AppShellNavProps = {
  email: string;
  navItems: NavItem[];
  logoutAction: () => Promise<void>;
};

export function AppShellNav({ email, navItems, logoutAction }: AppShellNavProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      <div className="flex items-center gap-2 md:hidden">
        <ThemeToggle compact />
        <button
          type="button"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md border border-slate-300 text-slate-700 transition hover:bg-slate-100"
        >
          <span className="h-0.5 w-5 rounded-full bg-current" />
          <span className="h-0.5 w-5 rounded-full bg-current" />
          <span className="h-0.5 w-5 rounded-full bg-current" />
        </button>
      </div>

      <div className="hidden items-center gap-3 md:flex">
        <nav className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              active={isActive(item.href)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <ThemeToggle />
        <LogoutButton action={logoutAction} />
      </div>

      {isOpen ? (
        <div className="absolute left-0 right-0 top-full border-b border-slate-200 bg-white/95 px-4 py-4 shadow-sm backdrop-blur md:hidden">
          <div className="mb-3 rounded-md bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
            {email}
          </div>
          <nav className="grid gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                active={isActive(item.href)}
                mobile
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <form action={logoutAction} className="mt-3">
            <button
              type="submit"
              className="h-11 w-full rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Sair
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}

function NavLink({
  href,
  active,
  mobile = false,
  onClick,
  children,
}: {
  href: string;
  active: boolean;
  mobile?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`rounded-md px-3 py-2 text-sm font-medium transition ${
        mobile ? "block w-full" : ""
      } ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
      }`}
    >
      {children}
    </Link>
  );
}

function LogoutButton({ action }: { action: () => Promise<void> }) {
  return (
    <form action={action}>
      <button
        type="submit"
        className="h-10 rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
      >
        Sair
      </button>
    </form>
  );
}
