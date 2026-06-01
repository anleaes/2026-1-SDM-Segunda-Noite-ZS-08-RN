import DrawerNavigator from '../../navigation/DrawerNavigator';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}