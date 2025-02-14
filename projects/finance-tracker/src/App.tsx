import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from './HomeScreen';
import { AddAssetScreen } from './AddAssetScreen';
import { AddExpenseScreen } from './AddExpenseScreen';
import { AddIncomeScreen } from './AddIncomeScreen';
import { FinanceProvider } from './FinanceContext';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
            <FinanceProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: '#4C669F',
                            },
                            headerTintColor: '#fff',
                            headerTitleStyle: {
                                fontWeight: '600',
                            },
                        }}
                    >
                        <Stack.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{
                                title: 'Finance Tracker',
                            }}
                        />
                        <Stack.Screen
                            name="AddAsset"
                            component={AddAssetScreen}
                            options={{
                                title: 'Add Asset',
                            }}
                        />
                        <Stack.Screen
                            name="AddExpense"
                            component={AddExpenseScreen}
                            options={{
                                title: 'Add Expense',
                            }}
                        />
                        <Stack.Screen
                            name="AddIncome"
                            component={AddIncomeScreen}
                            options={{
                                title: 'Add Income',
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </FinanceProvider>
        </SafeAreaProvider>
    );
}
