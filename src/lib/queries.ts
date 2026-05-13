import "server-only";

import { prisma } from "@/lib/prisma";

export async function getQuestionFilters() {
  const questions = await prisma.question.findMany({
    select: {
      discipline: true,
      subject: true,
      board: true,
    },
    orderBy: [{ discipline: "asc" }, { subject: "asc" }],
  });

  return {
    disciplines: [...new Set(questions.map((question) => question.discipline))],
    subjects: [...new Set(questions.map((question) => question.subject))],
    boards: [...new Set(questions.map((question) => question.board))],
  };
}

export async function getPerformance(userId: string) {
  const [total, correct, byDiscipline, bySubject] = await Promise.all([
    prisma.userAnswer.count({ where: { userId } }),
    prisma.userAnswer.count({ where: { userId, isCorrect: true } }),
    prisma.userAnswer.groupBy({
      by: ["isCorrect", "questionId"],
      where: { userId },
      _count: true,
    }),
    prisma.userAnswer.groupBy({
      by: ["isCorrect", "questionId"],
      where: { userId },
      _count: true,
    }),
  ]);

  const questionIds = [
    ...new Set([...byDiscipline, ...bySubject].map((item) => item.questionId)),
  ];
  const questions = await prisma.question.findMany({
    where: { id: { in: questionIds } },
    select: { id: true, discipline: true, subject: true },
  });
  const questionMap = new Map(questions.map((question) => [question.id, question]));

  const aggregate = (
    rows: { questionId: string; isCorrect: boolean; _count: number }[],
    key: "discipline" | "subject",
  ) => {
    const data = new Map<string, { total: number; correct: number }>();

    for (const row of rows) {
      const question = questionMap.get(row.questionId);

      if (!question) {
        continue;
      }

      const name = question[key];
      const current = data.get(name) ?? { total: 0, correct: 0 };
      current.total += row._count;

      if (row.isCorrect) {
        current.correct += row._count;
      }

      data.set(name, current);
    }

    return [...data.entries()]
      .map(([name, value]) => ({
        name,
        total: value.total,
        correct: value.correct,
        wrong: value.total - value.correct,
        percentage: value.total ? Math.round((value.correct / value.total) * 100) : 0,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  return {
    total,
    correct,
    wrong: total - correct,
    percentage: total ? Math.round((correct / total) * 100) : 0,
    byDiscipline: aggregate(byDiscipline, "discipline"),
    bySubject: aggregate(bySubject, "subject"),
  };
}
