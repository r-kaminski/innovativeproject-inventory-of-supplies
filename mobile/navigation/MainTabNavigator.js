import React from "react";
import { Platform } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { Icon } from "react-native-elements";
import AnimatedTabBar from "../components/AnimatedTabBar.js";

import TabBarIcon from "../components/TabBarIcon";
import StocktakingsScreen from "../screens/StocktakingsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SuppliesScreen from "../screens/SuppliesScreen";
import SupplyScreen from "../screens/SupplyScreen";
import SupplyEdit from "../screens/SupplyEdit";
import SupplyAdd from "../screens/SupplyAdd";
import ScanScreen from "../screens/ScanScreen";
import StocktakingScreen from "../screens/StocktakingScreen";
import StocktakingAdd from "../screens/StocktakingAdd";

const StocktakingStack = createStackNavigator({
  StocktakingsScreen: StocktakingsScreen,
  StocktakingScreen: StocktakingScreen,
  StocktakingAdd: StocktakingAdd,
  StocktakingScanner: ScanScreen
});

StocktakingStack.navigationOptions = {
  tabBarLabel: "Reports",
  tabBarIcon: ({ focused }) => (
    <Icon type="material" name="assignment" color="#FFF" />
  )
};

const ToolsStack = createStackNavigator({
  Supplies: SuppliesScreen,
  Supply: { screen: SupplyScreen },
  SupplyEdit: { screen: SupplyEdit },
  SupplyAdd: { screen: SupplyAdd }
});

ToolsStack.navigationOptions = {
  tabBarLabel: "Supplies",
  tabBarIcon: ({ focused }) => (
    <Icon type="material" name="view-list" color="#FFF" />
  )
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Settings",
  tabBarIcon: ({ focused }) => (
    <Icon type="material" name="account-circle" color="#FFF" />
  ),
  style: {
    color: "red"
  }
};

export default createBottomTabNavigator(
  {
    ToolsStack,
    StocktakingStack,
    SettingsStack
  },
  {
    tabBarComponent: AnimatedTabBar
  }
);
