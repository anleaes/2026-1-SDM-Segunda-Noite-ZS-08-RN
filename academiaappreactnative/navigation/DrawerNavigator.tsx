import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../src/components/CustomDrawerContent';

import { DrawerParamList } from './types';

import AlimentosScreen from '../screens/AlimentosScreen';
import CriaAlimentosScreen from '../screens/CriaAlimentosScreen';
import EditaAlimentosScreen from '../screens/EditaAlimentosScreen';
import ExerciciosScreen from '../screens/ExerciciosScreen';
import CriaExercicioScreen from '../screens/CriaExercicioScreen';
import EditaExercicioScreen from '../screens/EditaExercicioScreen';
import TreinosScreen from '../screens/TreinosScreen';
import CriaTreinoScreen from '../screens/CriaTreinoScreen';
import AlunosScreen from '../screens/AlunosScreen';
import CriaAlunoScreen from '../screens/CriaAlunoScreen';
import EditaAlunoScreen from '../screens/EditaAlunoScreen';
import InstrutoresScreen from '../screens/InstrutoresScreen';
import CriaInstrutorScreen from '../screens/CriaInstrutorScreen';
//import EditaInstrutorScreen from '../screens/EditaInstrutorScreen';
import HomeScreen from '../screens/HomeScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#4B7BE5',
        drawerLabelStyle: { marginLeft: 0, fontSize: 16 },
        drawerStyle: { backgroundColor: '#fff', width: 250 },
        headerStyle: { backgroundColor: '#4B7BE5' },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color}  />,
          title: 'Início',
        }}
      />
      <Drawer.Screen
        name="Alimentos"
        component={AlimentosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="fish-outline" size={size} color={color} />,
          title: 'Alimentos',
        }}
      />  
      <Drawer.Screen
        name="Exercicios"
        component={ExerciciosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="fish-outline" size={size} color={color} />,
          title: 'Exercícios',
        }}
      />  
      <Drawer.Screen
        name="Treinos"
        component={TreinosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="fish-outline" size={size} color={color} />,
          title: 'Treinos',
        }}
      />  
      <Drawer.Screen
        name="Alunos"
        component={AlunosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="fish-outline" size={size} color={color} />,
          title: 'Alunos',
        }}
      />  
      <Drawer.Screen
        name="Instrutores"
        component={InstrutoresScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="fish-outline" size={size} color={color} />,
          title: 'Instrutores',
        }}
      />  
      <Drawer.Screen
        name="CriaAlimentos"
        component={CriaAlimentosScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo alimento' }}
      />
      <Drawer.Screen
        name="CriaExercicio"
        component={CriaExercicioScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo exercício' }}
      />
      <Drawer.Screen
        name="CriaTreino"
        component={CriaTreinoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo treino' }}
      />
      <Drawer.Screen
        name="CriaAluno"
        component={CriaAlunoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo aluno' }}
      />
      <Drawer.Screen
        name="CriaInstrutor"
        component={CriaInstrutorScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo instrutor' }}
      />
      <Drawer.Screen
        name="EditaAlimentos"
        component={EditaAlimentosScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar alimento' }}
      />
      <Drawer.Screen
        name="EditaExercicio"
        component={EditaExercicioScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar exercício' }}
      />
      <Drawer.Screen
        name="EditaAluno"
        component={EditaAlunoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar aluno' }}
      />
    </Drawer.Navigator>  
  );
};

export default DrawerNavigator;