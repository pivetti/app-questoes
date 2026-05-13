"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { submitAnswerAction } from "@/app/actions/answers";

type Alternative = {
  option: string;
  text: string;
};

type PracticeQuestionProps = {
  question: {
    id: string;
    statement: string;
    discipline: string;
    subject: string;
    board: string;
    year: number;
    imageUrl: string | null;
    alternatives: Alternative[];
  };
};

type Result = {
  isCorrect: boolean;
  selectedOption: string;
  correctOption: string;
  explanation: string;
};

export function PracticeQuestion({ question }: PracticeQuestionProps) {
  const [selectedOption, setSelectedOption] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function submit() {
    setError("");

    startTransition(async () => {
      const response = await submitAnswerAction({
        questionId: question.id,
        selectedOption,
      });

      if ("error" in response) {
        setError(response.error ?? "Nao foi possivel registrar a resposta.");
        return;
      }

      setResult(response);
    });
  }

  function getOptionClass(option: string) {
    if (!result) {
      return selectedOption === option
        ? "border-emerald-500 bg-emerald-50"
        : "border-slate-200 bg-white hover:border-slate-300";
    }

    if (result.correctOption === option) {
      return "border-emerald-500 bg-emerald-50 text-emerald-950";
    }

    if (result.selectedOption === option && !result.isCorrect) {
      return "border-red-500 bg-red-50 text-red-950";
    }

    return "border-slate-200 bg-white opacity-75";
  }

  return (
    <article className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-4 sm:p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <Tag>{question.discipline}</Tag>
          <Tag>{question.subject}</Tag>
          <Tag>{question.board}</Tag>
          <Tag>{question.year}</Tag>
        </div>
        <p className="whitespace-pre-wrap text-sm leading-6 text-slate-900 sm:text-base sm:leading-7">
          {question.statement}
        </p>
        {question.imageUrl ? (
          <div className="relative mt-4 aspect-video overflow-hidden rounded-md border border-slate-200 bg-slate-100">
            <Image
              src={question.imageUrl}
              alt="Imagem da questao"
              fill
              className="object-contain"
            />
          </div>
        ) : null}
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        {question.alternatives.map((alternative) => (
          <label
            key={alternative.option}
            className={`flex cursor-pointer gap-3 rounded-md border p-3 transition sm:p-4 ${getOptionClass(
              alternative.option,
            )}`}
          >
            <input
              type="radio"
              name="selectedOption"
              value={alternative.option}
              checked={selectedOption === alternative.option}
              onChange={() => {
                setSelectedOption(alternative.option);
                setResult(null);
              }}
              className="mt-1 h-4 w-4 accent-emerald-600"
            />
            <span className="font-semibold">{alternative.option}</span>
            <span className="text-sm leading-6">{alternative.text}</span>
          </label>
        ))}

        {error ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {result ? (
          <div
            className={`rounded-md border px-4 py-3 text-sm ${
              result.isCorrect
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-red-200 bg-red-50 text-red-900"
            }`}
          >
            <p className="font-semibold">
              {result.isCorrect ? "Resposta correta." : "Resposta incorreta."}
            </p>
            <p className="mt-2 whitespace-pre-wrap leading-6">{result.explanation}</p>
          </div>
        ) : null}

        <div className="flex justify-end">
          <button
            type="button"
            disabled={isPending}
            onClick={submit}
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {isPending ? "Respondendo..." : "Responder"}
          </button>
        </div>
      </div>
    </article>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
      {children}
    </span>
  );
}
