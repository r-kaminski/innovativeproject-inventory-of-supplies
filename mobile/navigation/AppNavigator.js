import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import HomeScreen from "../screens/HomeScreen";

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
    Home: HomeScreen,
  Main: MainTabNavigator,
}));