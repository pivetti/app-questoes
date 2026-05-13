"use server";

import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";
import { answerSchema } from "@/lib/validations";

type SubmitAnswerInput = {
  questionId: string;
  selectedOption: string;
};

export async function submitAnswerAction(input: SubmitAnswerInput) {
  const user = await requireUser();
  const parsed = answerSchema.safeParse(input);

  if (!parsed.success) {
    return { error: "Selecione uma alternativa valida." };
  }

  const question = await prisma.question.findFirst({
    where: {
      id: parsed.data.questionId,
    },
    include: {
      alternatives: {
        orderBy: { option: "asc" },
      },
    },
  });

  if (!question) {
    return { error: "Questao nao encontrada." };
  }

  const selectedAlternative = question.alternatives.find(
    (alternative) => alternative.option === parsed.data.selectedOption,
  );
  const correctAlternative = question.alternatives.find(
    (alternative) => alternative.isCorrect,
  );

  if (!selectedAlternative || !correctAlternative) {
    return { error: "Questao incompleta. Revise o cadastro das alternativas." };
  }

  const isCorrect = selectedAlternative.id === correctAlternative.id;

  await prisma.userAnswer.create({
    data: {
      userId: user.id,
      questionId: question.id,
      alternativeId: selectedAlternative.id,
      selectedOption: selectedAlternative.option,
      isCorrect,
    },
  });

  return {
    isCorrect,
    selectedOption: selectedAlternative.option,
    correctOption: correctAlternative.option,
    explanation: question.explanation,
  };
}
