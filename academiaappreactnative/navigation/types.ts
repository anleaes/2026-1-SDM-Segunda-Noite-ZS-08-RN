export type Alimento = {
  id: number;
  nome: string;
  calorias_por_100g: string;
  proteinas_g: string;
  carboidratos_g: string;
  gorduras_g: string;
  fibras_g: string;
};

export type Exercicio = {
  id: number;
  nome: string;
  descricao: string;
  instrucoes: string;
  dificuldade: string;
};

export type Treino = {
  id: number;
  aluno: number;
  instrutor: number; 
  nome: string;
  descricao: string;
  duracao_minutos: number;
};

export type ItemTreino = {
  exercicio: string;
  series: string;
  repeticoes: string;
  carga_kg: string;
  intervalo_segundos: string;
};

export type Aluno = {
  id: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  telefone: string;
  data_nascimento: string;
  peso: string;
  altura: string;
  genero: string;
  objetivo: string;
  data_matricula: string;
  plano: number;
};

export type Instrutor = {
  id: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  telefone: string;
  data_nascimento: string;
  cref: string;
  especialidade: string;
  salario: string;
  data_admissao: string;
};

export type Refeicao ={
  id: number;
  nome: string;
  horario: string;
  descricao: string;
  plano_alimentar: number | null;
  alimentos: number[];
}

export type Anamnese = {
  id: number;
  aluno: number;
  ultima_atualizacao: string;
  problemas_cardiacos: boolean;
  cirurgias_recentes: boolean;
  alergias: string;
  restricoes_fisicas: string;
  medicamentos_em_uso: string;
  pressao_arterial: string;
  diabetes: boolean;
  fumante: boolean;
  observacoes: string;
}

export interface PlanoAlimentar {
  id: number;
  aluno: number;
  titulo: string;
  descricao?: string;
  objetivo: string;
  data_inicio: string;
  data_fim?: string;
  calorias_diarias: number;
};

export type PlanoMensalidade = {
  id: number;
  nome: string;
  descricao: string;
  valor: string;
  duracao_dias: number;
  ativo: boolean;
};

export type DrawerParamList = {
  Home: undefined;
  Alimentos: undefined;
  CriaAlimentos: undefined; 
  EditaAlimentos: { alimento: Alimento };
  Exercicios: undefined;
  CriaExercicio: undefined;
  EditaExercicio: { exercicio: Exercicio };
  Treinos: undefined;
  CriaTreino: undefined;
  EditaTreino: { treino: Treino };
  Alunos: undefined;
  CriaAluno: undefined;
  EditaAluno: { aluno: Aluno };
  Instrutores: undefined;
  CriaInstrutor: undefined;
  EditaInstrutor: { instrutor: Instrutor };
  Refeicoes: undefined;
  CriaRefeicao: undefined;
  EditaRefeicao: { refeicao: Refeicao };
  Anamneses: undefined;
  CriaAnamnese: undefined;
  EditaAnamnese: { anamnese: Anamnese };
  PlanosMensalidade: undefined;
  CriaPlanoMensalidade: undefined;
  EditaPlanoMensalidade: { plano: PlanoMensalidade };
  PlanosAlimentares: undefined;
};