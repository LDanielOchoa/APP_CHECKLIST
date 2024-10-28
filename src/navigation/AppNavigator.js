// src/navigation/AppNavigator.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../screens/HomePage';
import LoginPage from '../screens/LoginPage';
import SelectOption from '../screens/SelectOption';
import SelectNumberCar from '../screens/SelectCar';
import DocumentStatus from '../screens/DocumentStatus';
import SelfieCheckList from '../screens/NPR/selife';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
      <Stack.Navigator initialRouteName="SelfieCheckList">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="SelectOption" component={SelectOption} />
        <Stack.Screen name="SelectNumberCar" component={SelectNumberCar} />
        <Stack.Screen name="DocumentStatus" component={DocumentStatus} />
        <Stack.Screen name="SelfieCheckList" component={SelfieCheckList} />
      </Stack.Navigator>
  );
};

export default AppNavigator;
