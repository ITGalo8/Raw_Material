import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigations/StackNavigator';


const App = () => {
    return (
        <NavigationContainer>
          <StackNavigator />
          
        </NavigationContainer>
  )
}

export default App
