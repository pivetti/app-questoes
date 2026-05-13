import Link from "next/link";
import { getPerformance } from "@/lib/queries";
import { requireUser } from "@/lib/session";

export default async function DashboardPage() {
  const user = await requireUser();
  const performance = await getPerformance(user.id);

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-emerald-700">Painel</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            Desempenho geral
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Acompanhe acertos, erros e pontos de revisao por disciplina e assunto.
          </p>
        </div>
        <Link
          href="/practice"
          className="inline-flex h-11 w-full items-center justify-center rounded-md bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 sm:w-auto"
        >
          Responder questoes
        </Link>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Respondidas" value={performance.total} />
        <StatCard label="Acertos" value={performance.correct} tone="success" />
        <StatCard label="Erros" value={performance.wrong} tone="danger" />
        <StatCard label="Aproveitamento" value={`${performance.percentage}%`} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <PerformanceTable title="Por disciplina" rows={performance.byDiscipline} />
        <PerformanceTable title="Por assunto" rows={performance.bySubject} />
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: number | string;
  tone?: "default" | "success" | "danger";
}) {
  const toneClass =
    tone === "success"
      ? "text-emerald-700"
      : tone === "danger"
        ? "text-red-700"
        : "text-slate-950";

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className={`mt-3 text-2xl font-bold sm:text-3xl ${toneClass}`}>{value}</p>
    </div>
  );
}

function PerformanceTable({
  title,
  rows,
}: {
  title: string;
  rows: { name: string; total: number; correct: number; wrong: number; percentage: number }[];
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3 sm:px-5 sm:py-4">
        <h2 className="font-semibold text-slate-950">{title}</h2>
      </div>
      {rows.length ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium sm:px-5">Nome</th>
                <th className="px-4 py-3 font-medium sm:px-5">Total</th>
                <th className="px-4 py-3 font-medium sm:px-5">Acertos</th>
                <th className="px-4 py-3 font-medium sm:px-5">Erros</th>
                <th className="px-4 py-3 font-medium sm:px-5">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((row) => (
                <tr key={row.name}>
                  <td className="px-4 py-3 font-medium text-slate-900 sm:px-5">{row.name}</td>
                  <td className="px-4 py-3 text-slate-600 sm:px-5">{row.total}</td>
                  <td className="px-4 py-3 text-emerald-700 sm:px-5">{row.correct}</td>
                  <td className="px-4 py-3 text-red-700 sm:px-5">{row.wrong}</td>
                  <td className="px-4 py-3 text-slate-600 sm:px-5">{row.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="px-5 py-6 text-sm text-slate-500">
          Responda questoes para gerar dados aqui.
        </p>
      )}
    </div>
  );
}
