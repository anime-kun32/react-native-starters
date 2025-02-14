import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFinance } from './FinanceContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { TransactionList } from './TransactionList';

export function HomeScreen({ navigation }: any) {
    const { assets, netWorth } = useFinance();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const getAssetsByType = (type: string) => {
        return assets.filter(asset => asset.type === type)
            .reduce((sum, asset) => sum + asset.amount, 0);
    };

    const renderAssetSection = (title: string, amount: number) => (
        <View style={styles.assetSection}>
            <Text style={styles.assetTitle}>{title}</Text>
            <Text style={styles.assetAmount}>{formatCurrency(amount)}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <LinearGradient
                    colors={['#1A1A1A', '#000000']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.headerGradient}
                >
                    <Text style={styles.netWorthLabel}>NET WORTH</Text>
                    <Text style={styles.netWorthAmount}>{formatCurrency(netWorth)}</Text>
                </LinearGradient>

                <View style={styles.assetsContainer}>
                    <Text style={styles.sectionTitle}>ASSETS BREAKDOWN</Text>
                    {renderAssetSection('EQUITY', getAssetsByType('equity'))}
                    {renderAssetSection('MUTUAL FUNDS', getAssetsByType('mutualFund'))}
                    {renderAssetSection('OTHER ASSETS', getAssetsByType('other'))}
                </View>

                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('AddAsset')}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Feather name="plus-circle" size={24} color="#FFFFFF" />
                        <Text style={styles.actionButtonText}>ADD ASSET</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('AddExpense')}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Feather name="minus-circle" size={24} color="#FFFFFF" />
                        <Text style={styles.actionButtonText}>ADD EXPENSE</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('AddIncome')}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Feather name="dollar-sign" size={24} color="#FFFFFF" />
                        <Text style={styles.actionButtonText}>ADD INCOME</Text>
                    </TouchableOpacity>
                </View>

                <TransactionList />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    scrollView: {
        flex: 1
    },
    headerGradient: {
        padding: 28,
        borderRadius: 24,
        margin: 16,
        alignItems: 'center',
        shadowColor: '#FFFFFF',
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#333333'
    },
    netWorthLabel: {
        color: '#888888',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 2
    },
    netWorthAmount: {
        color: '#FFFFFF',
        fontSize: 42,
        fontWeight: '700',
        marginTop: 8,
        letterSpacing: 1
    },
    assetsContainer: {
        backgroundColor: '#1A1A1A',
        margin: 16,
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#333333'
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 16,
        color: '#888888',
        letterSpacing: 2
    },
    assetSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#333333'
    },
    assetTitle: {
        fontSize: 14,
        color: '#FFFFFF',
        letterSpacing: 1
    },
    assetAmount: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
        letterSpacing: 1
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        backgroundColor: '#1A1A1A',
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#333333'
    },
    actionButton: {
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        backgroundColor: '#000000',
        borderWidth: 1,
        borderColor: '#333333',
        minWidth: 100
    },
    actionButtonText: {
        marginTop: 8,
        fontSize: 12,
        color: '#FFFFFF',
        fontWeight: '600',
        letterSpacing: 1
    }
});
