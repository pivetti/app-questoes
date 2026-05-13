import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const BOARD = "Simulado Anônimo";
const YEAR = 2026;

function q(number, discipline, subject, statement, alternatives, correctOption) {
  return {
    number,
    discipline,
    subject,
    statement,
    alternatives,
    correctOption,
    explanation: `Gabarito: ${correctOption}. Questão importada do Simulado Anônimo - Informática.`,
  };
}

const questions = [
  q(1, "Língua Portuguesa", "Interpretação de texto", "De acordo com o texto, é correto afirmar que", ["as tecnologias digitais prejudicaram exclusivamente o ambiente escolar.", "o acesso à informação tornou dispensável o papel da educação formal.", "o excesso de informação exige maior capacidade de análise crítica.", "a comunicação digital eliminou os problemas de concentração.", "a velocidade da informação impede o acesso ao conhecimento."], "C"),
  q(2, "Língua Portuguesa", "Relações de sentido", "No trecho “Se, por um lado, a velocidade da informação ampliou o acesso ao conhecimento, por outro...”, a expressão destacada estabelece relação de", ["oposição entre aspectos positivos e negativos.", "conclusão de uma ideia anteriormente apresentada.", "explicação de um termo técnico.", "condição para que ocorra o acesso ao conhecimento.", "finalidade da educação contemporânea."], "A"),
  q(3, "Língua Portuguesa", "Crase", "Assinale a alternativa em que o emprego da crase está correto.", ["O estudante deve estar atento à informações falsas.", "A escola precisa adaptar-se à nova realidade digital.", "Os jovens recorrem à conteúdos disponíveis na internet.", "A tecnologia permite acesso à qualquer fonte de pesquisa.", "O professor explicou à todos os alunos o tema."], "B"),
  q(4, "Língua Portuguesa", "Concordância verbal", "Assinale a alternativa em que a concordância verbal está de acordo com a norma-padrão.", ["Existe muitos desafios no uso das tecnologias digitais.", "Fazem anos que a internet influencia a educação.", "Houveram mudanças importantes na comunicação.", "Cabe aos estudantes avaliar a confiabilidade das fontes.", "A maioria dos alunos acessam conteúdos online sem critério."], "D"),
  q(5, "Língua Portuguesa", "Pronomes", "Assinale a alternativa em que o pronome destacado exerce função de objeto direto.", ["O professor lhe explicou o conteúdo.", "Os alunos se dedicaram ao estudo.", "A notícia falsa confundiu-os.", "A coordenadora entregou-lhe o relatório.", "Todos se lembraram da aula."], "C"),
  q(6, "Língua Portuguesa", "Conjunções", "No enunciado “Embora o recurso seja moderno, seu uso exige planejamento”, o termo “embora” introduz ideia de", ["causa.", "consequência.", "concessão.", "finalidade.", "comparação."], "C"),
  q(7, "Língua Portuguesa", "Pontuação", "Assinale a alternativa em que a pontuação está correta.", ["A internet, quando usada com critério, pode favorecer o aprendizado.", "A internet quando usada, com critério pode favorecer o aprendizado.", "A internet quando usada com critério, pode favorecer, o aprendizado.", "A internet, quando usada com critério pode favorecer o aprendizado.", "A internet quando usada com critério pode, favorecer o aprendizado."], "A"),
  q(8, "Língua Portuguesa", "Colocação pronominal", "Assinale a alternativa em que há emprego correto da colocação pronominal.", ["Não deve-se confiar em qualquer fonte.", "Jamais deve-se compartilhar dados sensíveis.", "Os alunos prepararam-se para a prova.", "Me informaram sobre o resultado ontem.", "Sempre recomenda-se verificar a autoria do texto."], "C"),
  q(9, "Geografia do Brasil", "Domínios morfoclimáticos", "O domínio morfoclimático brasileiro caracterizado por vegetação herbácea e arbustiva, clima tropical com estação seca bem definida e grande presença no Planalto Central é o", ["Cerrado.", "Pampa.", "Pantanal.", "Mares de Morros.", "Araucárias."], "A"),
  q(10, "Geografia do Brasil", "Climas do Brasil", "A existência do clima semiárido no interior do Nordeste brasileiro está relacionada, entre outros fatores,", ["à atuação constante de frentes frias vindas da Antártida.", "à dificuldade de penetração de massas de ar úmidas no interior regional.", "à elevada altitude média do Sertão nordestino.", "ao predomínio de rios perenes e caudalosos.", "à ausência de evaporação nas áreas continentais."], "B"),
  q(11, "Geografia do Brasil", "Agronegócio", "A expansão recente do agronegócio no Centro-Oeste brasileiro está fortemente associada", ["à predominância de solos naturalmente férteis sem necessidade de correção.", "à substituição completa da pecuária pela mineração.", "à modernização técnica da agricultura e à incorporação de áreas do Cerrado.", "ao abandono das exportações agrícolas.", "à concentração exclusiva da produção em pequenas propriedades familiares."], "C"),
  q(12, "Geografia do Brasil", "Geomorfologia", "A formação geomorfológica composta por superfícies relativamente planas, frequentemente encontradas no litoral brasileiro e associadas a sedimentos antigos, é denominada", ["dobramento moderno.", "tabuleiro costeiro.", "planície glacial.", "chapada cristalina.", "cuesta vulcânica."], "B"),
  q(13, "Geografia do Brasil", "Urbanização", "A urbanização brasileira, especialmente a partir da segunda metade do século XX, caracterizou-se por", ["redução absoluta da população urbana.", "forte crescimento das cidades, muitas vezes sem infraestrutura adequada.", "desaparecimento das metrópoles nacionais.", "distribuição homogênea da população pelo território.", "eliminação das desigualdades socioespaciais."], "B"),
  q(14, "Geografia do Brasil", "Problemas ambientais urbanos", "Entre os problemas ambientais associados à ocupação irregular de áreas urbanas em encostas, destaca-se", ["desertificação natural.", "salinização do solo.", "deslizamento de terra.", "laterização oceânica.", "glaciação de altitude."], "C"),
  q(15, "História do Brasil", "Brasil Colonial", "A economia colonial brasileira foi estruturada, durante boa parte do período colonial, com base", ["na pequena propriedade, no trabalho livre e na produção industrial.", "no latifúndio, na monocultura e no trabalho escravizado.", "na urbanização acelerada e no mercado interno autônomo.", "na igualdade jurídica entre colonos e escravizados.", "na produção agrícola voltada exclusivamente ao consumo local."], "B"),
  q(16, "História do Brasil", "Independência do Brasil", "A Independência do Brasil, em 1822, distinguiu-se de muitos processos hispano-americanos porque", ["manteve a monarquia e preservou grande parte da ordem social existente.", "aboliu imediatamente a escravidão.", "instaurou uma república federativa popular.", "rompeu todas as relações econômicas com a Europa.", "eliminou a participação das elites agrárias no poder."], "A"),
  q(17, "História do Brasil", "Proclamação da República", "A Proclamação da República, em 1889, resultou de um processo em que se destacaram", ["exclusivamente revoltas populares camponesas.", "a união permanente entre monarquistas e abolicionistas radicais.", "setores do Exército, elites cafeicultoras e grupos civis republicanos.", "o apoio decisivo da população escravizada, ainda majoritária.", "a restauração do absolutismo português."], "C"),
  q(18, "História do Brasil", "Primeira República", "Durante a Primeira República, o coronelismo caracterizou-se", ["pelo voto secreto e pela autonomia plena do eleitor.", "pelo controle político local exercido por lideranças oligárquicas.", "pela inexistência de fraudes eleitorais.", "pela centralização política nas capitais industriais do Sul.", "pela participação igualitária de todos os cidadãos."], "B"),
  q(19, "História do Brasil", "Era Vargas", "A Revolução de 1930 marcou", ["o fortalecimento definitivo da política dos governadores.", "o retorno do Brasil à condição colonial.", "a ascensão de Getúlio Vargas e a reorganização do Estado brasileiro.", "a restauração da monarquia constitucional.", "a extinção de qualquer intervenção estatal na economia."], "C"),
  q(20, "História do Brasil", "Constituição de 1988", "A Constituição de 1988 ficou conhecida como “Constituição Cidadã” por", ["restringir direitos sociais e políticos.", "limitar a participação popular ao voto censitário.", "ampliar direitos fundamentais, sociais e mecanismos democráticos.", "eliminar garantias trabalhistas criadas no século XX.", "estabelecer o voto indireto permanente para presidente."], "C"),
  q(21, "Informática", "Linux", "No Linux, o comando `chmod 754 arquivo.txt` atribui ao proprietário, ao grupo e aos demais usuários, respectivamente, as permissões", ["rwx, r-x, r--.", "rw-, r-x, r--.", "rwx, rw-, r--.", "r-x, rwx, r--.", "rwx, r--, r-x."], "A"),
  q(22, "Informática", "Linux", "No Linux, o comando `grep \"erro\" log.txt` tem como finalidade", ["alterar as permissões do arquivo log.txt.", "compactar o arquivo log.txt.", "localizar linhas do arquivo que contenham a expressão “erro”.", "remover todas as linhas duplicadas do arquivo.", "exibir o calendário do mês atual."], "C"),
  q(23, "Informática", "Linux", "A permissão especial SUID, quando aplicada a um arquivo executável no Linux, faz com que", ["o arquivo seja executado com os privilégios do proprietário do arquivo.", "o arquivo seja convertido automaticamente em diretório.", "apenas o grupo possa executar o arquivo.", "o arquivo não possa ser lido por nenhum usuário.", "o sistema impeça sua execução por segurança."], "A"),
  q(24, "Informática", "Linux", "Em sistemas Linux, o arquivo `/etc/passwd` armazena, tradicionalmente,", ["regras de firewall do sistema.", "informações básicas das contas de usuários.", "os pacotes instalados no sistema.", "as senhas criptografadas em texto claro.", "os processos em execução."], "B"),
  q(25, "Informática", "RAID", "Em RAID 1, a principal característica é", ["distribuição de paridade entre todos os discos.", "espelhamento dos dados.", "ausência total de redundância.", "compressão automática dos arquivos.", "uso exclusivo para backup em fita."], "B"),
  q(26, "Informática", "Sistemas de numeração", "O número binário `10101100` corresponde, em hexadecimal, a", ["AC.", "CA.", "A6.", "BC.", "9C."], "A"),
  q(27, "Informática", "Sistemas de numeração", "O número hexadecimal `2F` corresponde, em decimal, a", ["31.", "37.", "41.", "47.", "52."], "D"),
  q(28, "Informática", "Sistemas de numeração", "Em complemento de dois com 8 bits, o valor binário `11111111` representa", ["-1.", "0.", "1.", "127.", "255."], "A"),
  q(29, "Informática", "Banco de dados", "Em banco de dados relacional, uma chave primária deve ser", ["obrigatoriamente composta por três atributos.", "nula apenas quando for estrangeira.", "única e não nula.", "repetida para facilitar consultas.", "armazenada sempre como texto."], "C"),
  q(30, "Informática", "SQL", "Em SQL, o comando utilizado para recuperar dados de uma tabela é", ["UPDATE.", "DELETE.", "INSERT.", "SELECT.", "DROP."], "D"),
  q(31, "Informática", "Banco de dados", "A normalização de banco de dados tem como objetivo principal", ["aumentar a redundância para acelerar consultas.", "organizar dados para reduzir redundâncias e anomalias.", "impedir o uso de chaves estrangeiras.", "substituir tabelas por arquivos de texto.", "eliminar relacionamentos entre entidades."], "B"),
  q(32, "Informática", "Banco de dados", "Uma transação em banco de dados deve obedecer às propriedades ACID. A propriedade “atomicidade” indica que", ["os dados devem ficar disponíveis em cache.", "a transação deve ser executada parcialmente quando houver erro.", "todas as operações da transação são concluídas ou nenhuma delas é aplicada.", "cada tabela deve possuir apenas um atributo.", "o banco deve aceitar apenas consultas de leitura."], "C"),
  q(33, "Informática", "Redes", "No modelo OSI, a camada responsável pelo roteamento entre redes é a camada", ["Física.", "Enlace.", "Rede.", "Sessão.", "Aplicação."], "C"),
  q(34, "Informática", "Redes", "O protocolo TCP diferencia-se do UDP principalmente por", ["não utilizar portas.", "oferecer comunicação orientada à conexão e controle de entrega.", "atuar exclusivamente na camada física.", "não possuir cabeçalho.", "não realizar comunicação entre processos."], "B"),
  q(35, "Informática", "Redes", "O endereço IPv4 `192.168.10.25/24` pertence a uma rede cuja máscara padrão é", ["255.0.0.0.", "255.255.0.0.", "255.255.255.0.", "255.255.255.128.", "255.255.255.252."], "C"),
  q(36, "Informática", "Redes", "Uma VLAN tem como finalidade", ["aumentar fisicamente o comprimento máximo de cabos coaxiais.", "segmentar logicamente uma rede local.", "substituir o endereço IP pelo endereço MAC.", "impedir o uso de switches.", "criptografar automaticamente todos os pacotes."], "B"),
  q(37, "Informática", "Segurança da informação", "Um firewall é utilizado principalmente para", ["armazenar páginas web visitadas.", "controlar o tráfego de rede com base em regras de segurança.", "substituir o sistema operacional.", "aumentar a resolução do monitor.", "converter arquivos binários em texto."], "B"),
  q(38, "Informática", "Segurança da informação", "Um vírus polimórfico é caracterizado por", ["infectar apenas arquivos de imagem.", "alterar sua forma/código para dificultar a detecção por assinatura.", "depender exclusivamente de macros do Word.", "atuar somente em redes sem fio.", "não conseguir se replicar."], "B"),
  q(39, "Informática", "Criptografia", "A criptografia assimétrica utiliza", ["uma única chave compartilhada para cifrar e decifrar.", "duas chaves relacionadas: uma pública e uma privada.", "apenas algoritmos de compactação.", "senhas armazenadas sem proteção.", "endereços MAC como chave obrigatória."], "B"),
  q(40, "Informática", "Criptografia", "Uma função hash criptográfica adequada deve", ["permitir a recuperação exata da mensagem original.", "produzir um resumo de tamanho fixo e dificultar colisões.", "cifrar dados usando chave pública.", "substituir certificados digitais.", "gerar sempre valores crescentes."], "B"),
  q(41, "Informática", "UML", "Em UML, o diagrama mais adequado para representar classes, atributos, métodos e relacionamentos estruturais é o diagrama de", ["casos de uso.", "atividades.", "classes.", "sequência.", "estados."], "C"),
  q(42, "Informática", "Análise de sistemas", "Em um Diagrama de Fluxo de Dados, o depósito de dados representa", ["uma entidade externa obrigatoriamente humana.", "o local em que dados são armazenados para uso posterior.", "uma decisão condicional do algoritmo.", "uma linha de código executável.", "a interface física do usuário."], "B"),
  q(43, "Informática", "Métodos ágeis", "Em desenvolvimento ágil, o Scrum utiliza o conceito de sprint, que corresponde", ["a um ciclo de trabalho com duração definida para entregar incrementos do produto.", "a um documento obrigatório de arquitetura em cascata.", "ao processo de eliminar todas as reuniões da equipe.", "a uma etapa exclusiva de testes finais.", "ao contrato de manutenção do software."], "A"),
  q(44, "Informática", "Métodos ágeis", "XP, ou Extreme Programming, é um exemplo de", ["método ágil de desenvolvimento de software.", "sistema operacional embarcado.", "protocolo de roteamento.", "padrão de cabeamento estruturado.", "linguagem de consulta a banco de dados."], "A"),
  q(45, "Informática", "Testes de software", "Em testes de software, o teste de caixa-preta avalia", ["exclusivamente a estrutura interna do código-fonte.", "o comportamento externo do sistema com base em entradas e saídas.", "apenas o desempenho do processador.", "a sintaxe de comandos SQL.", "a topologia física da rede."], "B"),
  q(46, "Informática", "Estruturas de dados", "Em estruturas de dados, uma pilha segue a política", ["FIFO.", "LIFO.", "Round-Robin.", "Multicast.", "Full-duplex."], "B"),
  q(47, "Informática", "Estruturas de dados", "Em uma árvore AVL, para cada nó, a diferença de altura entre as subárvores esquerda e direita deve ser", ["exatamente 2.", "sempre igual a 0.", "no máximo 1 em módulo.", "maior que 3.", "indefinida."], "C"),
  q(48, "Informática", "Algoritmos", "Em complexidade de algoritmos, uma busca binária em uma lista ordenada possui complexidade", ["O(1).", "O(log n).", "O(n).", "O(n²).", "O(2ⁿ)."], "B"),
  q(49, "Informática", "Programação orientada a objetos", "Em programação orientada a objetos, encapsulamento consiste em", ["permitir acesso direto e irrestrito a todos os atributos.", "reunir dados e comportamentos, controlando o acesso aos membros de uma classe.", "eliminar métodos construtores.", "transformar objetos em tabelas relacionais.", "impedir herança entre classes."], "B"),
  q(50, "Informática", "Governança de TI", "No COBIT, a governança de TI busca principalmente", ["alinhar a tecnologia da informação aos objetivos organizacionais e agregar valor.", "substituir todos os processos de negócio por softwares livres.", "eliminar métricas de desempenho.", "definir apenas padrões de cabeamento físico.", "criar linguagens de programação para bancos de dados."], "A"),
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
