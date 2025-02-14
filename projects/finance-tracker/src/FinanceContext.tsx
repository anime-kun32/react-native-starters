import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Asset, Expense, Income, FinanceData } from './types';

interface FinanceContextType {
    assets: Asset[];
    expenses: Expense[];
    incomes: Income[];
    addAsset: (asset: Omit<Asset, 'id' | 'date'>) => void;
    addExpense: (expense: Omit<Expense, 'id' | 'date'>) => void;
    addIncome: (income: Omit<Income, 'id' | 'date'>) => void;
    netWorth: number;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<FinanceData>({
        assets: [],
        expenses: [],
        incomes: []
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const savedData = await AsyncStorage.getItem('financeData');
            if (savedData) {
                setData(JSON.parse(savedData));
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const saveData = async (newData: FinanceData) => {
        try {
            await AsyncStorage.setItem('financeData', JSON.stringify(newData));
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const addAsset = (asset: Omit<Asset, 'id' | 'date'>) => {
        const newAsset: Asset = {
            ...asset,
            id: Date.now().toString(),
            date: new Date().toISOString(),
        };
        const newData = {
            ...data,
            assets: [...data.assets, newAsset],
        };
        setData(newData);
        saveData(newData);
    };

    const addExpense = (expense: Omit<Expense, 'id' | 'date'>) => {
        const newExpense: Expense = {
            ...expense,
            id: Date.now().toString(),
            date: new Date().toISOString(),
        };
        const newData = {
            ...data,
            expenses: [...data.expenses, newExpense],
        };
        setData(newData);
        saveData(newData);
    };

    const addIncome = (income: Omit<Income, 'id' | 'date'>) => {
        const newIncome: Income = {
            ...income,
            id: Date.now().toString(),
            date: new Date().toISOString(),
        };
        const newData = {
            ...data,
            incomes: [...data.incomes, newIncome],
        };
        setData(newData);
        saveData(newData);
    };

    const calculateNetWorth = () => {
        const totalAssets = data.assets.reduce((sum, asset) => sum + asset.amount, 0);
        const totalExpenses = data.expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const totalIncome = data.incomes.reduce((sum, income) => sum + income.amount, 0);
        return totalAssets + totalIncome - totalExpenses;
    };

    return (
        <FinanceContext.Provider
            value={{
                ...data,
                addAsset,
                addExpense,
                addIncome,
                netWorth: calculateNetWorth(),
            }}
        >
            {children}
        </FinanceContext.Provider>
    );
};

export const useFinance = () => {
    const context = useContext(FinanceContext);
    if (context === undefined) {
        throw new Error('useFinance must be used within a FinanceProvider');
    }
    return context;
};
