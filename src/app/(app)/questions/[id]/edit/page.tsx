import { notFound } from "next/navigation";
import { updateQuestionAction } from "@/app/actions/questions";
import { QuestionForm } from "@/components/question-form";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/session";

type EditQuestionPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditQuestionPage({ params }: EditQuestionPageProps) {
  await requireUser();
  const { id } = await params;
  const question = await prisma.question.findFirst({
    where: { id },
    include: {
      alternatives: {
        orderBy: { option: "asc" },
      },
    },
  });

  if (!question) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-emerald-700">Edicao</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Editar questao
        </h1>
        <p className="mt-2 text-slate-600">
          Atualize os dados; respostas antigas continuam preservadas no historico.
        </p>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <QuestionForm action={updateQuestionAction.bind(null, question.id)} initialQuestion={question} />
      </div>
    </div>
  );
}
