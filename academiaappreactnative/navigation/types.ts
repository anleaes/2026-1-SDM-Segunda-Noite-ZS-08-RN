export type Alimento = {
  id: number;
  name: string;
};

export type DrawerParamList = {
  Home: undefined;
  Alimentos: undefined;
  CriaAlimentos: undefined; 
  EditaAlimentos: { alimento: Alimento };
  Products: undefined;
  Socialnetworks: undefined;  
};