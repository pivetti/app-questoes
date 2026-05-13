import { createQuestionAction } from "@/app/actions/questions";
import { QuestionForm } from "@/components/question-form";

export default function NewQuestionPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-emerald-700">Cadastro</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Nova questao
        </h1>
        <p className="mt-2 text-slate-600">
          Preencha o enunciado, alternativas e comentario para usar no treino.
        </p>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <QuestionForm action={createQuestionAction} />
      </div>
    </div>
  );
}
