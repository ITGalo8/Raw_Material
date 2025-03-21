import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import Dashboard from '../screens/Dashboard';
import TabNavigator from './TabNavigator';
import Repair from '../screens/Repair';
import AddItem from '../screens/AddItem';
import AddSubItemName from '../screens/AddSubItemName';
import Bom from '../screens/Bom';


const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={Dashboard}
      options={{title: 'LoginPage', headerShown: false}} />

      <Stack.Screen name="Dashboard" component={Dashboard}
      options={{title: 'Dashboard', headerShown: false }} />

      <Stack.Screen name="TabNavigator" component={TabNavigator}
      options={{title: 'TabNavigator', headerShown: false }} />

      <Stack.Screen name="Repair" component={Repair}
      options={{title: 'Repair', headerShown: false }} />

     <Stack.Screen name="AddItem" component={AddItem}
      options={{title: 'AddItem', headerShown: false }} />

      <Stack.Screen name="AddSubItemName" component={AddSubItemName}
      options={{title: 'AddSubItemName', headerShown: false }} />

     <Stack.Screen name="Bom" component={Bom}
      options={{title: 'Bom', headerShown: false }} />
     
    </Stack.Navigator>
  );
};

export default StackNavigator;
    