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

export type DrawerParamList = {
  Home: undefined;
  Alimentos: undefined;
  CriaAlimentos: undefined; 
  EditaAlimentos: { alimento: Alimento };
  Exercicios: undefined;
  CriaExercicio: undefined;
  EditaExercicio: { exercicio: Exercicio };
};