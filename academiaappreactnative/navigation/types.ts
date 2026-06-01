export type Alimento = {
  id: number;
  nome: string;
  calorias_por_100g: string;
  proteinas_g: string;
  carboidratos_g: string;
  gorduras_g: string;
  fibras_g: string;
};

export type DrawerParamList = {
  Home: undefined;
  Alimentos: undefined;
  CriaAlimentos: undefined; 
  EditaAlimentos: { alimento: Alimento };
  Products: undefined;
  Socialnetworks: undefined;  
};