import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import StocktakingsScreen from '../screens/StocktakingsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SuppliesScreen from "../screens/SuppliesScreen";
import SupplyScreen from "../screens/SupplyScreen";
import SupplyEdit from "../screens/SupplyEdit";
import SupplyAdd from "../screens/SupplyAdd";
import ScanScreen from '../screens/ScanScreen';
import StocktakingScreen from "../screens/StocktakingScreen";
import StocktakingAdd from "../screens/StocktakingAdd";


const StocktakingStack = createStackNavigator({
    StocktakingsScreen: StocktakingsScreen,
    StocktakingScreen: StocktakingScreen,
    StocktakingAdd: StocktakingAdd,
    StocktakingScanner: ScanScreen,
});

StocktakingStack.navigationOptions = {
    tabBarLabel: 'Stocktaking',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-albums${focused ? '' : '-outline'}`
                    : 'md-albums'
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
    tabBarLabel: 'Tools',
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
    StocktakingStack,
    SettingsStack
});
