"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FormState, formatZodError, getString } from "@/lib/form";
import { requireUser } from "@/lib/session";
import { alternativeOptions, questionSchema } from "@/lib/validations";

function parseQuestionForm(formData: FormData) {
  return questionSchema.safeParse({
    statement: getString(formData, "statement"),
    discipline: getString(formData, "discipline"),
    subject: getString(formData, "subject"),
    board: getString(formData, "board"),
    year: getString(formData, "year"),
    explanation: getString(formData, "explanation"),
    imageUrl: getString(formData, "imageUrl"),
    correctOption: getString(formData, "correctOption"),
    alternatives: {
      A: getString(formData, "alternativeA"),
      B: getString(formData, "alternativeB"),
      C: getString(formData, "alternativeC"),
      D: getString(formData, "alternativeD"),
      E: getString(formData, "alternativeE"),
    },
  });
}

export async function createQuestionAction(
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireUser();
  const parsed = parseQuestionForm(formData);

  if (!parsed.success) {
    return { error: formatZodError(parsed.error) };
  }

  await prisma.question.create({
    data: {
      statement: parsed.data.statement,
      discipline: parsed.data.discipline,
      subject: parsed.data.subject,
      board: parsed.data.board,
      year: parsed.data.year,
      explanation: parsed.data.explanation,
      imageUrl: parsed.data.imageUrl,
      alternatives: {
        create: alternativeOptions.map((option) => ({
          option,
          text: parsed.data.alternatives[option],
          isCorrect: parsed.data.correctOption === option,
        })),
      },
    },
  });

  revalidatePath("/questions");
  redirect("/questions");
}

export async function updateQuestionAction(
  questionId: string,
  _state: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireUser();
  const parsed = parseQuestionForm(formData);

  if (!parsed.success) {
    return { error: formatZodError(parsed.error) };
  }

  const question = await prisma.question.findFirst({
    where: { id: questionId },
    select: { id: true },
  });

  if (!question) {
    notFound();
  }

  await prisma.$transaction([
    prisma.question.update({
      where: { id: questionId },
      data: {
        statement: parsed.data.statement,
        discipline: parsed.data.discipline,
        subject: parsed.data.subject,
        board: parsed.data.board,
        year: parsed.data.year,
        explanation: parsed.data.explanation,
        imageUrl: parsed.data.imageUrl,
      },
    }),
    ...alternativeOptions.map((option) =>
      prisma.alternative.upsert({
        where: {
          questionId_option: {
            questionId,
            option,
          },
        },
        create: {
          questionId,
          option,
          text: parsed.data.alternatives[option],
          isCorrect: parsed.data.correctOption === option,
        },
        update: {
          text: parsed.data.alternatives[option],
          isCorrect: parsed.data.correctOption === option,
        },
      }),
    ),
  ]);

  revalidatePath("/questions");
  revalidatePath(`/questions/${questionId}/edit`);
  redirect("/questions");
}

export async function deleteQuestionAction(questionId: string) {
  await requireUser();

  const question = await prisma.question.findFirst({
    where: { id: questionId },
    select: { id: true },
  });

  if (!question) {
    notFound();
  }

  await prisma.question.delete({
    where: { id: questionId },
  });

  revalidatePath("/questions");
  revalidatePath("/dashboard");
  redirect("/questions");
}
