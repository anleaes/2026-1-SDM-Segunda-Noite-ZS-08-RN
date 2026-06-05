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
};