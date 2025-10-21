import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen';
import StarterMenu from './screens/StarterMenu';
import MainMenu from './screens/MainMenu';
import DessertMenu from './screens/DessertMenu';
import MenuEditer from './screens/MenuEditer';
import MenuFilter from './screens/MenuFilter';
import MenuReceipt from './screens/MenuReceipt';

export type StackParams = {
  'Splash Screen': undefined;
  'Starter Menu': undefined;
  'Main Menu': undefined;
  'Dessert Menu': undefined;
  Editer: undefined;
  Filter: undefined;
  Receipt: undefined;
};

const Stack = createNativeStackNavigator<StackParams>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash Screen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash Screen" component={SplashScreen} />
        <Stack.Screen name="Starter Menu" component={StarterMenu} />
        <Stack.Screen name="Main Menu" component={MainMenu} />
        <Stack.Screen name="Dessert Menu" component={DessertMenu} />

        <Stack.Screen name="Editer" component={MenuEditer} />
        <Stack.Screen name="Filter" component={MenuFilter} />
        <Stack.Screen name="Receipt" component={MenuReceipt} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
