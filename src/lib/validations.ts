import { z } from "zod";

export const alternativeOptions = ["A", "B", "C", "D", "E"] as const;

const requiredText = (field: string, min = 2) =>
  z
    .string()
    .trim()
    .min(min, `${field} deve ter pelo menos ${min} caracteres.`);

export const registerSchema = z.object({
  name: z.string().trim().max(80, "Nome muito longo.").optional(),
  email: z.string().trim().email("Informe um e-mail valido.").toLowerCase(),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Informe um e-mail valido.").toLowerCase(),
  password: z.string().min(1, "Informe sua senha."),
});

export const questionSchema = z.object({
  statement: requiredText("Enunciado", 10),
  discipline: requiredText("Disciplina"),
  subject: requiredText("Assunto"),
  board: requiredText("Banca"),
  year: z.coerce
    .number()
    .int("Ano invalido.")
    .min(1900, "Ano invalido.")
    .max(new Date().getFullYear() + 1, "Ano invalido."),
  explanation: requiredText("Explicacao", 5),
  imageUrl: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value ? value : null))
    .pipe(z.string().url("URL da imagem invalida.").nullable()),
  correctOption: z.enum(alternativeOptions, {
    error: "Selecione a alternativa correta.",
  }),
  alternatives: z.object({
    A: requiredText("Alternativa A"),
    B: requiredText("Alternativa B"),
    C: requiredText("Alternativa C"),
    D: requiredText("Alternativa D"),
    E: requiredText("Alternativa E"),
  }),
});

export const answerSchema = z.object({
  questionId: z.string().cuid(),
  selectedOption: z.enum(alternativeOptions),
});

export type QuestionInput = z.infer<typeof questionSchema>;
