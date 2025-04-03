import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import Dashboard from '../screens/Dashboard';
import TabNavigator from './TabNavigator';
import Repair from '../screens/Repair';
import AddItem from '../screens/AddItem';
import AddSubItemName from '../screens/AddSubItemName';
import Bom from '../screens/Bom';
import Logout from '../screens/Logout';
import AllDefectiveData from '../screens/AllDefectiveData';
import Stock from '../screens/Stock';
import UpdateStockMaterial from '../screens/UpdateStockMaterial';
import Reject from '../screens/Reject';
import RepairHistory from '../screens/RepairHistory';
import RejectHistory from '../screens/RejectHistory';
import BarCodeScanner from '../screens/BarCodeScanner';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{title: 'LoginPage', headerShown: false}}
      />

      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{title: 'Dashboard', headerShown: false}}
      />

      <Stack.Screen
        name="Stock"
        component={Stock}
        options={{title: 'Stock', headerShown: false}}
      />

      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{title: 'TabNavigator', headerShown: false}}
      />

      <Stack.Screen
        name="Repair"
        component={Repair}
        options={{title: 'Repair', headerShown: false}}
      />

      <Stack.Screen
        name="AddItem"
        component={AddItem}
        options={{title: 'AddItem', headerShown: false}}
      />

      <Stack.Screen
        name="AddSubItemName"
        component={AddSubItemName}
        options={{title: 'AddSubItemName', headerShown: false}}
      />

      <Stack.Screen
        name="Bom"
        component={Bom}
        options={{title: 'Bom', headerShown: false}}
      />

      <Stack.Screen
        name="Logout"
        component={Logout}
        options={{title: 'Logout', headerShown: false}}
      />

      <Stack.Screen
        name="AllDefectiveData"
        component={AllDefectiveData}
        options={{title: 'AllDefectiveData', headerShown: false}}
      />

      <Stack.Screen
        name="UpdateStockMaterial"
        component={UpdateStockMaterial}
        options={{title: 'UpdateStockMaterial', headerShown: false}}
      />

      <Stack.Screen
        name="Reject"
        component={Reject}
        options={{title: 'Reject', headerShown: false}}
      />

      <Stack.Screen
        name="RepairHistory"
        component={RepairHistory}
        options={{title: 'RepairHistory', headerShown: false}}
      />

      <Stack.Screen
        name="RejectHistory"
        component={RejectHistory}
        options={{title: 'RejectHistory', headerShown: false}}
      />

      <Stack.Screen
        name="BarCodeScanner"
        component={BarCodeScanner}
        options={{title: 'BarCodeScanner', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
