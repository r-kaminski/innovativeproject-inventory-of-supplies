import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SuppliesScreen from "../screens/SuppliesScreen";
import SupplyScreen from "../screens/SupplyScreen";
import SupplyEdit from "../screens/SupplyEdit";
import SupplyAdd from "../screens/SupplyAdd";
import StocktakingsScreen from "../screens/StocktakingsScreen";
import ScanScreen from '../screens/ScanScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ToolsStack = createStackNavigator({
  Supplies: SuppliesScreen,
  Supply: { screen: SupplyScreen },
  SupplyEdit: { screen: SupplyEdit },
  SupplyAdd: { screen: SupplyAdd },
});

ToolsStack.navigationOptions = {
  tabBarLabel: 'Narzędzia',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-hammer${focused ? '' : '-outline'}`
          : 'md-hammer'
      }
    />
  ),
};

const StocktakingsStack = createStackNavigator({
  Stocktakings: StocktakingsScreen,
  StockScanner: { screen: ScanScreen },
});

StocktakingsStack.navigationOptions = {
  tabBarLabel: 'Stocktakings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  ToolsStack,
  HomeStack,
  StocktakingsStack,
  SettingsStack,
});
