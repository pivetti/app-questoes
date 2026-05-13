"use client";

import { useActionState } from "react";
import { FormState } from "@/lib/form";
import { alternativeOptions } from "@/lib/validations";
import { FormSubmit } from "@/components/form-submit";

type Alternative = {
  option: string;
  text: string;
  isCorrect: boolean;
};

type InitialQuestion = {
  statement: string;
  discipline: string;
  subject: string;
  board: string;
  year: number;
  explanation: string;
  imageUrl: string | null;
  alternatives: Alternative[];
};

type QuestionFormProps = {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  initialQuestion?: InitialQuestion;
};

function getAlternative(initialQuestion: InitialQuestion | undefined, option: string) {
  return (
    initialQuestion?.alternatives.find((alternative) => alternative.option === option)
      ?.text ?? ""
  );
}

export function QuestionForm({ action, initialQuestion }: QuestionFormProps) {
  const [state, formAction] = useActionState(action, {});
  const correctOption =
    initialQuestion?.alternatives.find((alternative) => alternative.isCorrect)?.option ??
    "A";

  return (
    <form action={formAction} className="space-y-6">
      {state.error ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Enunciado</span>
          <textarea
            name="statement"
            required
            rows={8}
            defaultValue={initialQuestion?.statement}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <Input label="Disciplina" name="discipline" defaultValue={initialQuestion?.discipline} />
          <Input label="Assunto" name="subject" defaultValue={initialQuestion?.subject} />
          <Input label="Banca" name="board" defaultValue={initialQuestion?.board} />
          <Input
            label="Ano"
            name="year"
            type="number"
            defaultValue={initialQuestion?.year?.toString()}
          />
          <Input
            label="Imagem opcional (URL)"
            name="imageUrl"
            type="url"
            defaultValue={initialQuestion?.imageUrl ?? ""}
          />
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-3 sm:p-4">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-semibold text-slate-950">Alternativas</h2>
          <span className="text-sm text-slate-500">Marque a correta</span>
        </div>

        <div className="space-y-3">
          {alternativeOptions.map((option) => (
            <div
              key={option}
              className="grid gap-3 rounded-md border border-slate-200 p-3 sm:grid-cols-[56px_1fr]"
            >
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <input
                  type="radio"
                  name="correctOption"
                  value={option}
                  defaultChecked={correctOption === option}
                  className="h-4 w-4 accent-emerald-600"
                />
                {option}
              </label>
              <textarea
                name={`alternative${option}`}
                required
                rows={2}
                defaultValue={getAlternative(initialQuestion, option)}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          ))}
        </div>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-700">Explicacao/comentario</span>
        <textarea
          name="explanation"
          required
          rows={5}
          defaultValue={initialQuestion?.explanation}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      </label>

      <div className="flex justify-end">
        <FormSubmit className="w-full sm:w-auto">
          {initialQuestion ? "Atualizar questao" : "Cadastrar questao"}
        </FormSubmit>
      </div>
    </form>
  );
}

type InputProps = {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
};

function Input({ label, name, type = "text", defaultValue }: InputProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        name={name}
        type={type}
        required={name !== "imageUrl"}
        defaultValue={defaultValue}
        className="h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
      />
    </label>
  );
}
