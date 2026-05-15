const baseCards = [
  {
    base: "2",
    name: "Binario",
    symbols: "0 e 1",
    example: "101101(2)",
  },
  {
    base: "8",
    name: "Octal",
    symbols: "0 a 7",
    example: "57(8)",
  },
  {
    base: "10",
    name: "Decimal",
    symbols: "0 a 9",
    example: "253(10)",
  },
  {
    base: "16",
    name: "Hexadecimal",
    symbols: "0 a 9 e A a F",
    example: "2F(16)",
  },
];

const powers = [
  ["2^0", "1"],
  ["2^1", "2"],
  ["2^2", "4"],
  ["2^3", "8"],
  ["2^4", "16"],
  ["2^5", "32"],
  ["2^6", "64"],
  ["2^7", "128"],
  ["2^8", "256"],
  ["2^9", "512"],
  ["2^10", "1024"],
];

const hexValues = [
  ["A", "10"],
  ["B", "11"],
  ["C", "12"],
  ["D", "13"],
  ["E", "14"],
  ["F", "15"],
];

const hexGroups = [
  ["0000", "0"],
  ["0001", "1"],
  ["0010", "2"],
  ["0011", "3"],
  ["0100", "4"],
  ["0101", "5"],
  ["0110", "6"],
  ["0111", "7"],
  ["1000", "8"],
  ["1001", "9"],
  ["1010", "A"],
  ["1011", "B"],
  ["1100", "C"],
  ["1101", "D"],
  ["1110", "E"],
  ["1111", "F"],
];

const octalGroups = [
  ["000", "0"],
  ["001", "1"],
  ["010", "2"],
  ["011", "3"],
  ["100", "4"],
  ["101", "5"],
  ["110", "6"],
  ["111", "7"],
];

const methods = [
  {
    title: "Binario para decimal",
    rule: "Escreva os pesos da direita para a esquerda e some somente onde o bit for 1.",
    example: "11001(2) = 16 + 8 + 1 = 25(10)",
  },
  {
    title: "Decimal para binario",
    rule: "Divida por 2, guarde os restos e leia os restos de baixo para cima.",
    example: "45(10): restos 1, 0, 1, 1, 0, 1 -> 101101(2)",
  },
  {
    title: "Hexadecimal para decimal",
    rule: "Troque letras por valores e multiplique cada digito pela potencia de 16 da posicao.",
    example: "2F(16) = 2 x 16 + 15 = 47(10)",
  },
  {
    title: "Decimal para hexadecimal",
    rule: "Divida por 16; restos 10 a 15 viram A a F; leia de baixo para cima.",
    example: "431(10): restos F, A, 1 -> 1AF(16)",
  },
  {
    title: "Binario e hexadecimal",
    rule: "Agrupe em blocos de 4 bits da direita para a esquerda.",
    example: "10101111(2) -> 1010 1111 -> AF(16)",
  },
  {
    title: "Binario e octal",
    rule: "Agrupe em blocos de 3 bits da direita para a esquerda.",
    example: "111101(2) -> 111 101 -> 75(8)",
  },
  {
    title: "Octal e hexadecimal",
    rule: "Passe pelo binario como ponte para evitar uma formula nova.",
    example: "57(8) -> 101111(2) -> 0010 1111 -> 2F(16)",
  },
  {
    title: "Parte fracionaria",
    rule: "Da base para decimal, use expoentes negativos; de decimal para binario, multiplique a fracao por 2.",
    example: "10,101(2) = 2 + 0,5 + 0,125 = 2,625(10)",
  },
];

const pitfalls = [
  "10(2) vale 2 em decimal, nao dez.",
  "10(16) vale 16 em decimal.",
  "F(16) vale 15; o valor 16 em hexadecimal e 10(16).",
  "Binario para hexadecimal usa grupos de 4 bits.",
  "Binario para octal usa grupos de 3 bits.",
  "Zeros a esquerda podem completar grupos sem alterar o valor.",
  "Nas divisoes sucessivas, a resposta sai lendo os restos de baixo para cima.",
];

const drills = [
  {
    question: "1010(2) em decimal",
    answer: "10(10)",
    note: "8 + 2.",
  },
  {
    question: "11001(2) em decimal",
    answer: "25(10)",
    note: "16 + 8 + 1.",
  },
  {
    question: "45(10) em binario",
    answer: "101101(2)",
    note: "32 + 8 + 4 + 1.",
  },
  {
    question: "2F(16) em decimal",
    answer: "47(10)",
    note: "2 x 16 + 15.",
  },
  {
    question: "431(10) em hexadecimal",
    answer: "1AF(16)",
    note: "Restos F, A e 1.",
  },
  {
    question: "10101111(2) em hexadecimal",
    answer: "AF(16)",
    note: "1010 = A; 1111 = F.",
  },
  {
    question: "9C(16) em binario",
    answer: "10011100(2)",
    note: "9 = 1001; C = 1100.",
  },
  {
    question: "57(8) em decimal",
    answer: "47(10)",
    note: "5 x 8 + 7.",
  },
  {
    question: "83(10) em octal",
    answer: "123(8)",
    note: "Restos 3, 2 e 1.",
  },
  {
    question: "111101(2) em octal",
    answer: "75(8)",
    note: "111 = 7; 101 = 5.",
  },
  {
    question: "57(8) em hexadecimal",
    answer: "2F(16)",
    note: "Use binario como ponte: 101111 -> 0010 1111.",
  },
  {
    question: "0,625(10) em binario",
    answer: "0,101(2)",
    note: "0,625 x 2 = 1,25; 0,25 x 2 = 0,5; 0,5 x 2 = 1,0.",
  },
];

export default function ContentsPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="grid gap-5 lg:grid-cols-[1fr_320px] lg:items-start">
        <div>
          <p className="text-sm font-semibold text-emerald-700">Conteudos</p>
          <h1 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">
            Conversoes numericas
          </h1>
          <p className="mt-2 max-w-3xl text-slate-600">
            Categoria Informatica, materia Sistemas operacionais. Um guia de
            estudo para dominar conversoes entre binario, decimal, octal e
            hexadecimal com os atalhos mais cobrados em prova.
          </p>
        </div>

        <aside className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
          <p className="text-sm font-semibold text-emerald-950">Roteiro rapido</p>
          <ol className="mt-3 space-y-2 text-sm leading-6 text-emerald-900">
            <li>1. Memorize potencias de 2 e letras A a F.</li>
            <li>2. Treine decimal usando divisoes sucessivas.</li>
            <li>3. Use grupos de 4 bits para hexadecimal.</li>
            <li>4. Use grupos de 3 bits para octal.</li>
            <li>5. Resolva os exercicios antes de abrir o gabarito.</li>
          </ol>
        </aside>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {baseCards.map((item) => (
          <article
            key={item.base}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">Base {item.base}</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-950">
              {item.name}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Simbolos: {item.symbols}
            </p>
            <p className="mt-3 rounded-md bg-slate-100 px-3 py-2 font-mono text-sm text-slate-800">
              {item.example}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <div className="space-y-4">
          <ReferenceTable
            title="Potencias de 2"
            headers={["Potencia", "Valor"]}
            rows={powers}
          />
          <ReferenceTable
            title="Letras do hexadecimal"
            headers={["Digito", "Valor"]}
            rows={hexValues}
          />
        </div>

        <div className="space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="text-lg font-semibold text-slate-950">
              Principio posicional
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Todo numero vale pela soma de cada algarismo multiplicado pela
              potencia da base em sua posicao. A casa mais a direita tem
              expoente zero; andando para a esquerda, o expoente aumenta.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ExampleLine value="253(10) = 2 x 10^2 + 5 x 10^1 + 3 x 10^0" />
              <ExampleLine value="1011(2) = 8 + 0 + 2 + 1 = 11(10)" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <ReferenceTable
              title="Binario para hexadecimal"
              headers={["Bits", "Hex"]}
              rows={hexGroups}
              compact
            />
            <ReferenceTable
              title="Binario para octal"
              headers={["Bits", "Octal"]}
              rows={octalGroups}
              compact
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-emerald-700">Metodo</p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            Como escolher o caminho certo
          </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {methods.map((method) => (
            <article
              key={method.title}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
            >
              <h3 className="font-semibold text-slate-950">{method.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {method.rule}
              </p>
              <p className="mt-3 rounded-md bg-slate-100 px-3 py-2 font-mono text-sm text-slate-800">
                {method.example}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <p className="text-sm font-semibold text-emerald-700">Treino</p>
          <h2 className="mt-2 text-xl font-bold text-slate-950">
            Exercicios de fixacao
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {drills.map((drill, index) => (
              <details
                key={drill.question}
                className="rounded-lg border border-slate-200 bg-slate-50 p-3"
              >
                <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                  {index + 1}. {drill.question}
                </summary>
                <div className="mt-3 border-t border-slate-200 pt-3 text-sm text-slate-600">
                  <p>
                    Resposta:{" "}
                    <span className="font-mono font-semibold text-emerald-700">
                      {drill.answer}
                    </span>
                  </p>
                  <p className="mt-1">{drill.note}</p>
                </div>
              </details>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-red-200 bg-red-50 p-4 shadow-sm sm:p-5">
          <p className="text-sm font-semibold text-red-700">
            Pegadinhas de prova
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-red-900">
            {pitfalls.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
}

function ReferenceTable({
  title,
  headers,
  rows,
  compact = false,
}: {
  title: string;
  headers: [string, string];
  rows: string[][];
  compact?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="font-semibold text-slate-950">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-4 py-3 font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map(([left, right]) => (
              <tr key={`${left}-${right}`}>
                <td
                  className={`px-4 font-mono text-slate-900 ${
                    compact ? "py-2" : "py-3"
                  }`}
                >
                  {left}
                </td>
                <td
                  className={`px-4 font-mono font-semibold text-emerald-700 ${
                    compact ? "py-2" : "py-3"
                  }`}
                >
                  {right}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ExampleLine({ value }: { value: string }) {
  return (
    <p className="rounded-md bg-slate-100 px-3 py-2 font-mono text-sm leading-6 text-slate-800">
      {value}
    </p>
  );
}
