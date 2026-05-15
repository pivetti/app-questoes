import { PracticeQuestion } from "@/components/practice-question";
import { prisma } from "@/lib/prisma";
import { getQuestionFilters } from "@/lib/queries";
import { requireUser } from "@/lib/session";
import Link from "next/link";

type PracticePageProps = {
  searchParams: Promise<{
    discipline?: string;
    subject?: string;
    board?: string;
  }>;
};

export default async function PracticePage({ searchParams }: PracticePageProps) {
  await requireUser();
  const params = await searchParams;
  const filters = await getQuestionFilters();
  const questions = await prisma.question.findMany({
    where: {
      discipline: params.discipline || undefined,
      subject: params.subject || undefined,
      board: params.board || undefined,
    },
    include: {
      alternatives: {
        orderBy: { option: "asc" },
        select: {
          option: true,
          text: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
    take: 20,
  });

  return (
    <div className="space-y-5 sm:space-y-6">
      <section>
        <p className="text-sm font-semibold text-emerald-700">Treino</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Responder questoes
        </h1>
        <p className="mt-2 text-slate-600">
          Escolha uma alternativa, responda e veja o feedback imediatamente.
        </p>
      </section>

      <form className="grid gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4 md:grid-cols-4">
        <Select name="discipline" label="Disciplina" value={params.discipline} options={filters.disciplines} />
        <Select name="subject" label="Assunto" value={params.subject} options={filters.subjects} />
        <Select name="board" label="Banca" value={params.board} options={filters.boards} />
        <div className="grid grid-cols-2 gap-2 md:flex md:justify-end">
          <Link
            href="/practice"
            className="inline-flex h-10 items-center justify-center rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Limpar
          </Link>
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Filtrar
          </button>
        </div>
      </form>

      <section className="grid gap-5">
        {questions.length ? (
          questions.map((question) => (
            <PracticeQuestion key={question.id} question={question} />
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
            <h2 className="text-lg font-semibold text-slate-950">
              Nenhuma questao para responder
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Cadastre questoes ou ajuste os filtros de treino.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function Select({
  name,
  label,
  value,
  options,
}: {
  name: string;
  label: string;
  value?: string;
  options: string[];
}) {
  return (
    <select
      name={name}
      defaultValue={value ?? ""}
      aria-label={label}
      className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
    >
      <option value="">{label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
