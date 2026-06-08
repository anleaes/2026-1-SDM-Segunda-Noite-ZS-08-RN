import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import DrawerNavigator from '../../navigation/DrawerNavigator';

export default function App() {
  return (
    // @ts-ignore
    <NavigationContainer independent={true}>
      <DrawerNavigator />
    </NavigationContainer>
  );
}