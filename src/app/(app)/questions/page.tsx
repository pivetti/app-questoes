import Link from "next/link";
import { deleteQuestionAction } from "@/app/actions/questions";
import { prisma } from "@/lib/prisma";
import { getQuestionFilters } from "@/lib/queries";
import { requireUser } from "@/lib/session";

type QuestionsPageProps = {
  searchParams: Promise<{
    discipline?: string;
    subject?: string;
    board?: string;
    q?: string;
  }>;
};

export default async function QuestionsPage({ searchParams }: QuestionsPageProps) {
  await requireUser();
  const params = await searchParams;
  const filters = await getQuestionFilters();
  const questions = await prisma.question.findMany({
    where: {
      discipline: params.discipline || undefined,
      subject: params.subject || undefined,
      board: params.board || undefined,
      statement: params.q
        ? { contains: params.q, mode: "insensitive" }
        : undefined,
    },
    include: {
      alternatives: {
        orderBy: { option: "asc" },
      },
      _count: {
        select: { answers: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-5 sm:space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-emerald-700">Banco publico</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Questoes cadastradas
          </h1>
          <p className="mt-2 text-slate-600">
            Cadastre, filtre e mantenha questoes publicas prontas para treino.
          </p>
        </div>
        <Link
          href="/questions/new"
          className="inline-flex h-11 w-full items-center justify-center rounded-md bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 sm:w-auto"
        >
          Nova questao
        </Link>
      </section>

      <FilterBar filters={filters} params={params} />

      <section className="grid gap-4">
        {questions.length ? (
          questions.map((question) => {
            const correctAlternative = question.alternatives.find(
              (alternative) => alternative.isCorrect,
            );

            return (
              <article
                key={question.id}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="mb-3 flex flex-wrap gap-2">
                      <Tag>{question.discipline}</Tag>
                      <Tag>{question.subject}</Tag>
                      <Tag>{question.board}</Tag>
                      <Tag>{question.year}</Tag>
                    </div>
                    <p className="line-clamp-3 whitespace-pre-wrap text-sm leading-6 text-slate-800">
                      {question.statement}
                    </p>
                    <p className="mt-3 text-sm text-slate-500">
                      Correta:{" "}
                      <span className="font-semibold text-emerald-700">
                        {correctAlternative?.option ?? "-"}
                      </span>{" "}
                      - Respostas registradas: {question._count.answers}
                    </p>
                  </div>
                  <div className="grid shrink-0 grid-cols-2 gap-2 sm:flex">
                    <Link
                      href={`/questions/${question.id}/edit`}
                      className="inline-flex h-10 items-center justify-center rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Editar
                    </Link>
                    <form action={deleteQuestionAction.bind(null, question.id)}>
                      <button
                        type="submit"
                        className="inline-flex h-10 w-full items-center justify-center rounded-md border border-red-200 px-4 text-sm font-semibold text-red-700 transition hover:bg-red-50"
                      >
                        Excluir
                      </button>
                    </form>
                  </div>
                </div>
              </article>
            );
          })
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center">
            <h2 className="text-lg font-semibold text-slate-950">
              Nenhuma questao encontrada
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Ajuste os filtros ou cadastre sua primeira questao.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function FilterBar({
  filters,
  params,
}: {
  filters: { disciplines: string[]; subjects: string[]; boards: string[] };
  params: { discipline?: string; subject?: string; board?: string; q?: string };
}) {
  return (
    <form className="grid gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm sm:p-4 md:grid-cols-5">
      <input
        name="q"
        placeholder="Buscar no enunciado"
        defaultValue={params.q ?? ""}
        className="h-10 rounded-md border border-slate-300 px-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 md:col-span-2"
      />
      <Select name="discipline" label="Disciplina" value={params.discipline} options={filters.disciplines} />
      <Select name="subject" label="Assunto" value={params.subject} options={filters.subjects} />
      <Select name="board" label="Banca" value={params.board} options={filters.boards} />
      <div className="grid grid-cols-2 gap-2 md:col-span-5 md:flex md:justify-end">
        <Link
          href="/questions"
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

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
      {children}
    </span>
  );
}
