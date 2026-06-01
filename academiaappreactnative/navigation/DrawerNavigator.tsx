import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';

import AlimentosScreen, { Alimento } from '../screens/AlimentosScreen';
import CriaAlimentosScreen from '../screens/CriaAlimentosScreen';
import EditaAlimentosScreen from '../screens/EditaAlimentosScreen';
import HomeScreen from '../screens/HomeScreen';

export type DrawerParamList = {
  Home: undefined;
  Alimentos: undefined;
  CriaAlimentos: undefined; 
  EditaAlimentos: { category: Alimento };
};

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
          drawerIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
          title: 'Alimentos',
        }}
      />  
      <Drawer.Screen
        name="CriaAlimentos"
        component={CriaAlimentosScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Novo alimento' }}
      />
      <Drawer.Screen
        name="EditaAlimentos"
        component={EditaAlimentosScreen}
        options={{ drawerItemStyle: { display: 'none' }, title: 'Editar alimento' }}
      />
    </Drawer.Navigator>  
  );
};

export default DrawerNavigator;