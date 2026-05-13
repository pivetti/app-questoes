"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession } from "@/lib/session";
import { hashPassword, verifyPassword } from "@/lib/password";
import { FormState, formatZodError } from "@/lib/form";
import { loginSchema, registerSchema } from "@/lib/validations";

export async function registerAction(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = registerSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { error: formatZodError(parsed.error) };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true },
  });

  if (existingUser) {
    return { error: "Ja existe uma conta com esse e-mail." };
  }

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name || null,
      email: parsed.data.email,
      passwordHash: await hashPassword(parsed.data.password),
    },
    select: { id: true },
  });

  await createSession(user.id);
  redirect("/dashboard");
}

export async function loginAction(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return { error: formatZodError(parsed.error) };
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true, passwordHash: true },
  });

  if (!user || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return { error: "E-mail ou senha invalidos." };
  }

  await createSession(user.id);
  redirect("/dashboard");
}

export async function logoutAction() {
  await destroySession();
  redirect("/login");
}
