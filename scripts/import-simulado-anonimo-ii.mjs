import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const BOARD = "Simulado Anônimo II";
const YEAR = 2026;

function q(number, discipline, subject, statement, alternatives, correctOption) {
  return {
    number,
    discipline,
    subject,
    statement,
    alternatives,
    correctOption,
    explanation: `Gabarito: ${correctOption}. Questão importada do Simulado Anônimo - Informática II.`,
  };
}

const questions = [
  q(1, "Língua Portuguesa", "Interpretação de texto", "De acordo com o texto, é correto afirmar que", ["a inteligência artificial elimina a necessidade de análise humana.", "ferramentas digitais devem ser usadas com avaliação crítica.", "respostas bem escritas são sempre confiáveis.", "a tecnologia impede a organização de dados.", "o pensamento crítico tornou-se desnecessário."], "B"),
  q(2, "Língua Portuguesa", "Relações de sentido", "No trecho “No entanto, o uso dessas ferramentas exige cuidado...”, a expressão destacada estabelece ideia de", ["conclusão.", "finalidade.", "oposição.", "condição.", "comparação."], "C"),
  q(3, "Língua Portuguesa", "Crase", "Assinale a alternativa em que o emprego da crase está correto.", ["O pesquisador recorreu à ferramenta digital.", "O aluno teve acesso à vários relatórios.", "A professora explicou o tema à todos.", "A empresa adaptou-se à novas tecnologias.", "O relatório foi entregue à prazo."], "A"),
  q(4, "Língua Portuguesa", "Concordância verbal", "Assinale a alternativa em que há concordância verbal de acordo com a norma-padrão.", ["Fazem muitos anos que a tecnologia avança rapidamente.", "Haviam diversas ferramentas disponíveis na plataforma.", "Existem respostas que precisam ser verificadas.", "Deve existir muitos cuidados no uso da IA.", "A maioria dos usuários confiam cegamente nas respostas."], "C"),
  q(5, "Língua Portuguesa", "Colocação pronominal", "Assinale a alternativa em que o pronome foi empregado corretamente.", ["Não deve-se divulgar dados sigilosos.", "Sempre recomenda-se verificar a fonte.", "Os candidatos prepararam-se com antecedência.", "Me informaram sobre a mudança no edital.", "Jamais compartilhe-se senha com terceiros."], "C"),
  q(6, "Língua Portuguesa", "Orações subordinadas", "No período “Como estudou com regularidade, obteve bom desempenho”, a oração destacada expressa ideia de", ["causa.", "concessão.", "oposição.", "finalidade.", "comparação."], "A"),
  q(7, "Língua Portuguesa", "Pontuação", "Assinale a alternativa em que a pontuação está correta.", ["Os candidatos, após a publicação do edital, intensificaram os estudos.", "Os candidatos após a publicação do edital, intensificaram, os estudos.", "Os candidatos, após a publicação do edital intensificaram os estudos.", "Os candidatos após, a publicação do edital, intensificaram os estudos.", "Os candidatos após a publicação, do edital intensificaram os estudos."], "A"),
  q(8, "Língua Portuguesa", "Pronomes", "A frase “O professor entregou os materiais aos alunos” pode ser reescrita, substituindo-se corretamente os termos destacados por pronomes, em:", ["O professor entregou-lhes aos alunos.", "O professor entregou-os-lhes.", "O professor entregou-lhes-os.", "O professor entregou-os a eles.", "O professor os entregou-lhes."], "D"),
  q(9, "Geografia do Brasil", "Domínios morfoclimáticos", "A formação vegetal brasileira marcada por árvores de médio porte, galhos retorcidos, cascas grossas e adaptação à estação seca é típica do domínio", ["Amazônico.", "Cerrado.", "Araucárias.", "Pampa.", "Pantanal."], "B"),
  q(10, "Geografia do Brasil", "Indústria brasileira", "O processo de desconcentração industrial no Brasil, observado nas últimas décadas, relaciona-se principalmente", ["ao desaparecimento da atividade industrial nas metrópoles.", "à busca por menores custos, incentivos fiscais e novas áreas de expansão.", "à proibição da instalação de indústrias no Sudeste.", "ao fim da urbanização brasileira.", "à concentração exclusiva das fábricas na região Norte."], "B"),
  q(11, "Geografia do Brasil", "Amazônia", "A Região Amazônica apresenta grande importância ambiental porque", ["possui baixa biodiversidade e clima semiárido.", "concentra extensas áreas de floresta tropical e grande diversidade biológica.", "é formada apenas por campos temperados.", "não sofre interferência de atividades econômicas.", "possui vegetação predominantemente xerófila."], "B"),
  q(12, "Geografia do Brasil", "Fronteira agrícola", "A expansão da fronteira agrícola no Brasil tem provocado, em algumas áreas, impactos como", ["aumento da cobertura florestal nativa em todos os biomas.", "redução da produção de grãos.", "desmatamento, perda de biodiversidade e conflitos fundiários.", "eliminação da mecanização agrícola.", "extinção da atividade agropecuária."], "C"),
  q(13, "Geografia do Brasil", "População brasileira", "No Brasil, a concentração populacional mais expressiva ocorre historicamente", ["na faixa litorânea e em áreas urbanizadas do Sudeste.", "exclusivamente no interior da Amazônia.", "apenas no Sertão nordestino.", "nas áreas de baixa urbanização do Centro-Oeste.", "nas regiões de fronteira internacional despovoadas."], "A"),
  q(14, "Geografia do Brasil", "Clima urbano", "O fenômeno das ilhas de calor urbanas está associado", ["à redução da temperatura em áreas centrais das cidades.", "ao predomínio de vegetação densa nas metrópoles.", "à impermeabilização do solo, verticalização e concentração de concreto e asfalto.", "à ausência de veículos em áreas urbanas.", "à formação natural de geleiras em centros urbanos."], "C"),
  q(15, "História do Brasil", "Brasil Colonial", "O sistema de capitanias hereditárias, implantado no período colonial, tinha como objetivo", ["promover a industrialização da colônia.", "dividir a administração territorial e transferir custos de colonização a particulares.", "abolir a escravidão indígena e africana.", "criar uma república autônoma no Brasil.", "impedir qualquer exploração econômica da terra."], "B"),
  q(16, "História do Brasil", "Mineração colonial", "A atividade mineradora no século XVIII contribuiu para", ["deslocar parte do eixo econômico colonial para o interior.", "extinguir a escravidão no Brasil.", "reduzir a urbanização nas áreas mineradoras.", "eliminar a cobrança de impostos pela Coroa portuguesa.", "impedir o crescimento de vilas e caminhos comerciais."], "A"),
  q(17, "História do Brasil", "Período Joanino", "A vinda da família real portuguesa para o Brasil, em 1808, teve como uma de suas consequências", ["o fechamento dos portos brasileiros ao comércio externo.", "a abertura dos portos e o aumento da importância política do Brasil no Império português.", "a imediata proclamação da República.", "a extinção do comércio com a Inglaterra.", "a abolição total da escravidão."], "B"),
  q(18, "História do Brasil", "Segundo Reinado", "A Lei Eusébio de Queirós, de 1850, relaciona-se", ["à proibição do tráfico transatlântico de escravizados para o Brasil.", "à criação do voto feminino.", "à proclamação da Independência.", "à instituição do Estado Novo.", "à transferência da capital para Brasília."], "A"),
  q(19, "História do Brasil", "Era Vargas", "Durante a Era Vargas, uma característica importante da política trabalhista foi", ["a ausência total de legislação social.", "a criação de direitos trabalhistas e o controle estatal sobre sindicatos.", "a extinção do Ministério do Trabalho.", "o fim da industrialização brasileira.", "a descentralização completa do poder federal."], "B"),
  q(20, "História do Brasil", "Regime militar", "O regime militar brasileiro, iniciado em 1964, caracterizou-se por", ["ampliação irrestrita das liberdades políticas.", "fechamento político, censura e fortalecimento do Executivo.", "inexistência de oposição política.", "eleições presidenciais diretas em todos os anos.", "extinção das Forças Armadas."], "B"),
  q(21, "Informática", "Linux", "No Linux, o comando `ls -la` é utilizado para", ["listar arquivos, incluindo ocultos, com informações detalhadas.", "alterar a senha do usuário atual.", "compactar arquivos em formato tar.", "remover diretórios vazios.", "exibir conexões de rede ativas."], "A"),
  q(22, "Informática", "Linux", "No Linux, o comando `ps aux` permite", ["editar arquivos de configuração.", "listar processos em execução.", "verificar o uso de disco por diretório.", "alterar permissões de arquivos.", "criar novos usuários."], "B"),
  q(23, "Informática", "Linux", "O comando `chown usuario:grupo arquivo.txt` tem como finalidade", ["modificar o proprietário e o grupo do arquivo.", "alterar apenas a extensão do arquivo.", "executar o arquivo como administrador.", "compactar o arquivo.", "remover permissões de leitura."], "A"),
  q(24, "Informática", "Linux", "Em sistemas Linux, o diretório `/var/log` é comumente utilizado para armazenar", ["arquivos temporários de usuários.", "bibliotecas do sistema.", "arquivos de registro e logs.", "comandos essenciais de inicialização.", "arquivos pessoais dos usuários."], "C"),
  q(25, "Informática", "RAID", "Em RAID 0, a principal característica é", ["espelhamento completo dos dados.", "distribuição dos dados entre discos, sem redundância.", "paridade dupla obrigatória.", "backup automático em nuvem.", "tolerância à falha de dois discos."], "B"),
  q(26, "Informática", "Sistemas de numeração", "O número decimal 45 corresponde, em binário, a", ["101101.", "110101.", "101011.", "111000.", "100111."], "A"),
  q(27, "Informática", "Sistemas de numeração", "O número binário `11001010` corresponde, em decimal, a", ["198.", "200.", "202.", "204.", "210."], "C"),
  q(28, "Informática", "Sistemas de numeração", "Em complemento de dois com 8 bits, o número decimal -2 é representado por", ["00000010.", "11111110.", "11111101.", "10000010.", "01111110."], "B"),
  q(29, "Informática", "Banco de dados", "Em banco de dados relacional, uma chave estrangeira é usada para", ["criptografar uma tabela.", "garantir relacionamento entre tabelas.", "impedir consultas SQL.", "substituir todos os índices.", "armazenar senhas de usuários."], "B"),
  q(30, "Informática", "SQL", "Em SQL, o comando `UPDATE` é utilizado para", ["criar uma nova tabela.", "remover definitivamente uma tabela.", "alterar registros existentes.", "consultar dados sem modificá-los.", "conceder privilégios administrativos."], "C"),
  q(31, "Informática", "SQL", "Em SQL, a cláusula `WHERE` é usada para", ["definir o nome de uma tabela.", "filtrar registros de acordo com uma condição.", "ordenar os resultados em ordem alfabética obrigatória.", "criar uma chave primária.", "agrupar tabelas em um banco."], "B"),
  q(32, "Informática", "Banco de dados", "A restrição `NOT NULL` em uma coluna de banco de dados indica que", ["o campo não pode armazenar valores repetidos.", "o campo deve obrigatoriamente receber algum valor.", "o campo será sempre chave estrangeira.", "o campo aceita apenas números inteiros.", "o campo será removido automaticamente."], "B"),
  q(33, "Informática", "Redes", "No modelo OSI, a camada responsável pela transmissão de bits pelo meio físico é a camada", ["Física.", "Rede.", "Transporte.", "Aplicação.", "Sessão."], "A"),
  q(34, "Informática", "Redes", "O endereço MAC é associado principalmente", ["à camada de aplicação.", "à identificação física/lógica da interface de rede na camada de enlace.", "ao protocolo HTTP.", "à tradução de nomes de domínio.", "à criptografia de arquivos."], "B"),
  q(35, "Informática", "Redes", "O protocolo DNS tem como função", ["transferir arquivos entre computadores.", "traduzir nomes de domínio em endereços IP.", "criptografar conexões sem fio.", "bloquear pacotes suspeitos.", "atribuir permissões de arquivos."], "B"),
  q(36, "Informática", "Redes", "O protocolo DHCP é utilizado para", ["distribuir automaticamente configurações de rede, como endereço IP.", "enviar mensagens de correio eletrônico.", "testar conectividade por eco.", "converter arquivos em PDF.", "realizar autenticação biométrica."], "A"),
  q(37, "Informática", "Segurança da informação", "Uma VPN tem como objetivo", ["permitir conexão segura por meio de túnel criptografado.", "aumentar fisicamente o alcance de cabos UTP.", "substituir completamente o endereço MAC.", "impedir o uso de roteadores.", "executar programas locais em modo texto."], "A"),
  q(38, "Informática", "Segurança da informação", "Um ataque de phishing caracteriza-se por", ["tentativa de enganar usuários para obter informações sensíveis.", "falha física em disco rígido.", "compactação indevida de arquivos.", "atualização automática de antivírus.", "segmentação lógica de redes."], "A"),
  q(39, "Informática", "Segurança da informação", "Em segurança da informação, disponibilidade significa", ["garantir que a informação esteja acessível quando necessária.", "impedir que qualquer usuário acesse o sistema.", "esconder a existência dos dados.", "eliminar todos os backups.", "permitir alteração irrestrita dos dados."], "A"),
  q(40, "Informática", "Segurança da informação", "A autenticação multifator aumenta a segurança porque", ["utiliza mais de um elemento de verificação de identidade.", "remove a necessidade de senha e de controle de acesso.", "libera acesso anônimo ao sistema.", "impede o uso de criptografia.", "substitui firewalls de rede."], "A"),
  q(41, "Informática", "UML", "Em UML, o diagrama de casos de uso representa", ["a estrutura física do banco de dados.", "as interações entre atores externos e funcionalidades do sistema.", "a sequência binária de execução do processador.", "a configuração de endereços IP.", "apenas os atributos privados das classes."], "B"),
  q(42, "Informática", "UML", "Em UML, uma associação entre classes indica", ["relacionamento estrutural entre objetos dessas classes.", "exclusão automática de uma classe.", "erro de compilação.", "impossibilidade de comunicação entre objetos.", "substituição de atributos por métodos estáticos."], "A"),
  q(43, "Informática", "Scrum", "No Scrum, o Product Backlog corresponde", ["à lista priorizada de funcionalidades, melhorias e necessidades do produto.", "ao relatório final de encerramento obrigatório.", "à reunião diária de quinze minutos.", "ao ambiente físico onde a equipe trabalha.", "ao teste unitário executado pelo cliente."], "A"),
  q(44, "Informática", "Desenvolvimento de software", "No desenvolvimento de software, integração contínua refere-se", ["à prática de integrar alterações de código com frequência, geralmente com testes automatizados.", "à criação manual de backups uma vez por ano.", "ao uso exclusivo de documentação impressa.", "à proibição de versionamento de código.", "à substituição dos testes por inspeção visual."], "A"),
  q(45, "Informática", "Testes de software", "O teste unitário tem como objetivo", ["avaliar o sistema inteiro em ambiente de produção.", "verificar pequenas unidades de código, como funções ou métodos.", "medir exclusivamente a velocidade da internet.", "testar apenas a interface gráfica final.", "validar contratos jurídicos do projeto."], "B"),
  q(46, "Informática", "Estruturas de dados", "Em estruturas de dados, uma fila segue a política", ["LIFO.", "FIFO.", "RAID.", "NAT.", "ACID."], "B"),
  q(47, "Informática", "Estruturas de dados", "Uma tabela hash é uma estrutura que busca", ["armazenar dados sempre em ordem alfabética.", "associar chaves a posições por meio de uma função de dispersão.", "eliminar colisões matematicamente impossíveis.", "representar exclusivamente árvores binárias.", "substituir bancos de dados relacionais."], "B"),
  q(48, "Informática", "Algoritmos", "Um algoritmo de ordenação com complexidade média O(n log n) é", ["busca linear.", "quicksort.", "soma sequencial simples.", "busca exaustiva exponencial.", "leitura direta de arquivo único."], "B"),
  q(49, "Informática", "Programação orientada a objetos", "Em programação orientada a objetos, herança permite", ["que uma classe reutilize características de outra classe.", "impedir a criação de objetos.", "eliminar todos os métodos de uma classe.", "transformar código-fonte em banco de dados.", "executar comandos SQL automaticamente."], "A"),
  q(50, "Informática", "ITIL", "Em ITIL, o gerenciamento de incidentes tem como principal objetivo", ["restaurar o serviço normal o mais rápido possível, minimizando impactos ao negócio.", "desenvolver linguagens de programação.", "criar exclusivamente diagramas UML.", "eliminar a necessidade de suporte técnico.", "substituir o gerenciamento de mudanças."], "A"),
];

async function main() {
  let created = 0;
  let skipped = 0;

  for (const item of questions) {
    const statement = `${String(item.number).padStart(2, "0")}. ${item.statement}`;
    const existing = await prisma.question.findFirst({
      where: {
        statement,
        board: BOARD,
        year: YEAR,
      },
      select: { id: true },
    });

    if (existing) {
      skipped += 1;
      continue;
    }

    await prisma.question.create({
      data: {
        statement,
        discipline: item.discipline,
        subject: item.subject,
        board: BOARD,
        year: YEAR,
        explanation: item.explanation,
        alternatives: {
          create: ["A", "B", "C", "D", "E"].map((option, index) => ({
            option,
            text: item.alternatives[index],
            isCorrect: item.correctOption === option,
          })),
        },
      },
    });

    created += 1;
  }

  console.log(`Importação concluída. Criadas: ${created}. Ignoradas: ${skipped}.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
