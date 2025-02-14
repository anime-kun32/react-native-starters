import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useFinance } from './FinanceContext';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type Transaction = {
    id: string;
    type: 'asset' | 'expense' | 'income';
    amount: number;
    date: string;
    description: string;
};

export function TransactionList() {
    const { assets, expenses, incomes } = useFinance();
    const [filter, setFilter] = useState<'all' | 'thisMonth'>('thisMonth');

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const getTransactionIcon = (type: string) => {
        switch (type) {
            case 'asset':
                return 'briefcase';
            case 'expense':
                return 'arrow-down';
            case 'income':
                return 'arrow-up';
            default:
                return 'circle';
        }
    };

    const getAllTransactions = (): Transaction[] => {
        const assetTransactions = assets.map(asset => ({
            id: asset.id,
            type: 'asset' as const,
            amount: asset.amount,
            date: asset.date,
            description: `${asset.name} (${asset.type})`,
        }));

        const expenseTransactions = expenses.map(expense => ({
            id: expense.id,
            type: 'expense' as const,
            amount: -expense.amount,
            date: expense.date,
            description: `${expense.category}: ${expense.description}`,
        }));

        const incomeTransactions = incomes.map(income => ({
            id: income.id,
            type: 'income' as const,
            amount: income.amount,
            date: income.date,
            description: `${income.source} (${income.frequency})`,
        }));

        return [...assetTransactions, ...expenseTransactions, ...incomeTransactions]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    };

    const filterTransactions = (transactions: Transaction[]) => {
        if (filter === 'thisMonth') {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            return transactions.filter(
                transaction => new Date(transaction.date) >= startOfMonth
            );
        }
        return transactions;
    };

    const transactions = filterTransactions(getAllTransactions());

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#1A1A1A', '#000000']}
                style={styles.header}
            >
                <Text style={styles.title}>TRANSACTION HISTORY</Text>
                <View style={styles.filterContainer}>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
                        onPress={() => setFilter('all')}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>
                            ALL TIME
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.filterButton, filter === 'thisMonth' && styles.activeFilter]}
                        onPress={() => setFilter('thisMonth')}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Text style={[styles.filterText, filter === 'thisMonth' && styles.activeFilterText]}>
                            THIS MONTH
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <ScrollView style={styles.transactionList}>
                {transactions.map(transaction => (
                    <TouchableOpacity
                        key={transaction.id}
                        style={styles.transactionItem}
                        activeOpacity={0.7}
                    >
                        <LinearGradient
                            colors={[
                                transaction.type === 'expense' ? '#1A1A1A' : '#1A1A1A',
                                '#000000'
                            ]}
                            style={styles.transactionContent}
                        >
                            <View style={[styles.iconContainer, {
                                backgroundColor: transaction.type === 'expense' ? '#331111' : '#113311'
                            }]}>
                                <Feather
                                    name={getTransactionIcon(transaction.type)}
                                    size={18}
                                    color={transaction.type === 'expense' ? '#FF4444' : '#44FF44'}
                                />
                            </View>
                            <View style={styles.transactionDetails}>
                                <Text style={styles.transactionDescription}>
                                    {transaction.description}
                                </Text>
                                <Text style={styles.transactionDate}>{formatDate(transaction.date)}</Text>
                            </View>
                            <Text
                                style={[
                                    styles.transactionAmount,
                                    { color: transaction.type === 'expense' ? '#FF4444' : '#44FF44' },
                                ]}
                            >
                                {formatCurrency(transaction.amount)}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A1A1A',
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#333333',
        overflow: 'hidden'
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#333333'
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 16,
        letterSpacing: 2
    },
    filterContainer: {
        flexDirection: 'row',
        gap: 12
    },
    filterButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#000000',
        borderWidth: 1,
        borderColor: '#333333'
    },
    activeFilter: {
        backgroundColor: '#333333',
        borderColor: '#FFFFFF'
    },
    filterText: {
        fontSize: 12,
        color: '#888888',
        fontWeight: '600',
        letterSpacing: 1
    },
    activeFilterText: {
        color: '#FFFFFF'
    },
    transactionList: {
        maxHeight: 400
    },
    transactionItem: {
        marginHorizontal: 12,
        marginVertical: 6
    },
    transactionContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#333333'
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
        borderWidth: 1,
        borderColor: '#333333'
    },
    transactionDetails: {
        flex: 1
    },
    transactionDescription: {
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: '600',
        letterSpacing: 1
    },
    transactionDate: {
        fontSize: 12,
        color: '#888888',
        marginTop: 4,
        letterSpacing: 1
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 1
    }
});
