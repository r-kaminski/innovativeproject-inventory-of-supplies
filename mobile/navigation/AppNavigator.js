import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import ScanScreen from "../screens/ScanScreen";

export default createAppContainer(createSwitchNavigator({
  Main: MainTabNavigator,
    Scanner: ScanScreen
}));