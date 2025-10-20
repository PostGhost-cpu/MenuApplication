import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
  "Splash Screen": undefined;
  "Starter Menu": undefined;
  "Main Menu": undefined;
  "Dessert Menu": undefined;
};  
export type TabParams = {
  "Editer": undefined;
  "Filter": undefined;
  "Receipt": undefined;
};

const Stack = createNativeStackNavigator<StackParams>();
const TabStack = createBottomTabNavigator<TabParams>();

export default function App() {
  return (
    <><NavigationContainer>
      <Stack.Navigator initialRouteName='Splash Screen'>
        <Stack.Screen name="Splash Screen" component={SplashScreen} />
        <Stack.Screen name="Starter Menu" component={StarterMenu} />
        <Stack.Screen name="Main Menu" component={MainMenu} />
        <Stack.Screen name="Dessert Menu" component={DessertMenu} />
      </Stack.Navigator>
    </NavigationContainer>
    <NavigationContainer>
        <TabStack.Navigator>
          <TabStack.Screen name="Editer" component={MenuEditer} />
          <TabStack.Screen name="Filter" component={MenuFilter} />
          <TabStack.Screen name="Receipt" component={MenuReceipt} />
        </TabStack.Navigator>
      </NavigationContainer></>
  );
}
