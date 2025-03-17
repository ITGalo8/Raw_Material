import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import Dashboard from '../screens/Dashboard';
import TabNavigator from './TabNavigator';
import Repair from '../screens/Repair';


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
     
    </Stack.Navigator>
  );
};

export default StackNavigator;
    