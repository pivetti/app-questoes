export type FormState = {
  error?: string;
  success?: string;
};

export function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export function formatZodError(error: { issues: { message: string }[] }) {
  return error.issues[0]?.message ?? "Revise os campos e tente novamente.";
}
