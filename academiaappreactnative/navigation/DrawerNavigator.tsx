import { FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../src/components/CustomDrawerContent';

import { DrawerParamList } from './types';

import AlimentosScreen from '../screens/AlimentosScreen';
import CriaAlimentosScreen from '../screens/CriaAlimentosScreen';
import EditaAlimentosScreen from '../screens/EditaAlimentosScreen';
import PlanosMensalidadeScreen from '../screens/PlanosMensalidadeScreen';
import CriaPlanoMensalidadeScreen from '../screens/CriaPlanoMensalidadeScreen';
import EditaPlanoMensalidadeScreen from '../screens/EditaPlanoMensalidadeScreen';
import ExerciciosScreen from '../screens/ExerciciosScreen';
import CriaExercicioScreen from '../screens/CriaExercicioScreen';
import EditaExercicioScreen from '../screens/EditaExercicioScreen';
import TreinosScreen from '../screens/TreinosScreen';
import CriaTreinoScreen from '../screens/CriaTreinoScreen';
import EditaTreinoScreen from '../screens/EditaTreinoScreen';
import AlunosScreen from '../screens/AlunosScreen';
import CriaAlunoScreen from '../screens/CriaAlunoScreen';
import EditaAlunoScreen from '../screens/EditaAlunoScreen';
import InstrutoresScreen from '../screens/InstrutoresScreen';
import CriaInstrutorScreen from '../screens/CriaInstrutorScreen';
import EditaInstrutorScreen from '../screens/EditaInstrutorScreen';
import RefeicoesScreen from '../screens/RefeicoesScreen';
import CriaRefeicaoScreen from '../screens/CriaRefeicaoScreen';
import EditaRefeicaoScreen from '../screens/EditaRefeicaoScreen';
import AnamnesesScreen from '../screens/AnamnesesScreen';
import CriaAnamneseScreen from '../screens/CriaAnamneseScreen';
import EditaAnamneseScreen from '../screens/EditaAnamneseScreen';
import HomeScreen from '../screens/HomeScreen';
import PlanosAlimentaresScreen from '../screens/PlanosAlimentaresScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { 
          backgroundColor: '#1A1A2E',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

        drawerStyle: { 
          backgroundColor: '#1A1A2E', 
          width: 260 
        },
        drawerActiveTintColor: '#ffffff',
        drawerActiveBackgroundColor: '#4B7BE5',
        drawerInactiveTintColor: '#A0A0B0',
        
        drawerItemStyle: {
          borderRadius: 8,
          marginVertical: 4,
          paddingHorizontal: 8,
        },
        drawerLabelStyle: { 
          fontSize: 16,
          fontWeight: '600'
        },
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
        name="Alunos"
        component={AlunosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
          title: 'Alunos',
        }}
      />  
      <Drawer.Screen
        name="Instrutores"
        component={InstrutoresScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="id-card-outline" size={size} color={color} />,
          title: 'Instrutores',
        }}
      />  
      <Drawer.Screen
        name="Exercicios"
        component={ExerciciosScreen}
        options={{
          drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="weight-lifter" size={size} color={color}/>,
          title: 'Exercícios',
        }}
      />  
      <Drawer.Screen
        name="Treinos"
        component={TreinosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="barbell-outline" size={size} color={color} />,
          title: 'Treinos',
        }}
      />  
      <Drawer.Screen
        name="Alimentos"
        component={AlimentosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="nutrition-outline" size={size} color={color} />,
          title: 'Alimentos',
        }}
      />  
      <Drawer.Screen
        name="Refeicoes"
        component={RefeicoesScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="restaurant-outline" size={size} color={color} />,
          title: 'Refeições',
        }}
      />  
      <Drawer.Screen
        name="Anamneses"
        component={AnamnesesScreen}
        options={{
          drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="clipboard-pulse-outline" size={size} color={color}/>,
          title: 'Anamneses',
        }}
      />  
      <Drawer.Screen
        name="PlanosMensalidade"
        component={PlanosMensalidadeScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="cash-outline" size={size} color={color} />,
          title: 'Planos de mensalidade',
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
        name="CriaRefeicao"
        component={CriaRefeicaoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova refeição' }}
      />
      <Drawer.Screen
        name="CriaAnamnese"
        component={CriaAnamneseScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Nova ficha médica' }}
      />
      <Drawer.Screen
        name="CriaPlanoMensalidade"
        component={CriaPlanoMensalidadeScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo plano de mensalidade' }}
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
        name="EditaTreino"
        component={EditaTreinoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar treino' }}
      />
      <Drawer.Screen
        name="EditaAluno"
        component={EditaAlunoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar aluno' }}
      />
      <Drawer.Screen
        name="EditaInstrutor"
        component={EditaInstrutorScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar instrutor' }}
      />
      <Drawer.Screen
        name="EditaRefeicao"
        component={EditaRefeicaoScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar refeição' }}
      />
      <Drawer.Screen
        name="EditaAnamnese"
        component={EditaAnamneseScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar ficha médica' }}
      
      />
      <Drawer.Screen
        name="PlanosAlimentares"
        component={PlanosAlimentaresScreen}
        options={{drawerIcon: ({ color, size }) => (
      <Ionicons name="calendar-outline" size={size} color={color} />
    ),
    title: 'Planos Alimentares',
  }}
/>

    </Drawer.Navigator>  
  );
};

export default DrawerNavigator;