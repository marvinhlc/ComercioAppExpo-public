import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {Provider} from 'react-redux'
import store from './scr/store'
import MyApp from './scr'
import AppNavigator from './AppNavigator'
import { YellowBox } from 'react-native';
import FlashMessage,{showMessage,hideMessage } from "react-native-flash-message";

console.ignoredYellowBox = ['Setting a timer','Warning','Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
      <FlashMessage position="top" />
    </Provider>
  );
}

//WOMPI KEYS
//APP-ID
//2348af52-0f32-4fac-aeff-73e9ff28de16
//API SECRET
//f52e220c-f03e-489b-822b-cfa75122138c