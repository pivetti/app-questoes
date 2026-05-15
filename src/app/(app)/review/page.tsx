import Link from "next/link";
import { PracticeQuestion } from "@/components/practice-question";
import type { PracticeQuestionData } from "@/components/practice-question";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

type WrongAnswerWithQuestion = {
  question: PracticeQuestionData;
};

export default async function ReviewPage() {
  const user = await requireUser();
  const wrongAnswers: WrongAnswerWithQuestion[] = await prisma.userAnswer.findMany({
    where: {
      userId: user.id,
      isCorrect: false,
    },
    distinct: ["questionId"],
    orderBy: { answeredAt: "desc" },
    include: {
      question: {
        include: {
          alternatives: {
            orderBy: { option: "asc" },
            select: {
              option: true,
              text: true,
            },
          },
        },
      },
    },
  });

  const questions: PracticeQuestionData[] = wrongAnswers.map(
    (answer) => answer.question,
  );

  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-emerald-700">Revisao</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Questoes erradas
          </h1>
          <p className="mt-2 text-slate-600">
            Reforce os pontos em que voce errou e registre novas tentativas.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex h-11 w-full items-center justify-center rounded-md border border-slate-300 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 sm:w-auto"
        >
          Ver desempenho
        </Link>
      </section>

      <section className="grid gap-5">
        {questions.length ? (
          questions.map((question) => (
            <PracticeQuestion key={question.id} question={question} />
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
            <h2 className="text-lg font-semibold text-slate-950">
              Nenhuma questao errada ainda
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Quando houver erros, eles aparecerao aqui para revisao.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
