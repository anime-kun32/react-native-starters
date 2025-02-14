import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFinance } from './FinanceContext';

export function AddAssetScreen({ navigation }: any) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<'equity' | 'mutualFund' | 'other'>('equity');
    const assetTypes = {
        equity: 'Stocks & Equity',
        mutualFund: 'Mutual Funds',
        other: 'FD/PPF/Others'
    };
    const { addAsset } = useFinance();

    const handleSubmit = () => {
        if (name && amount) {
            addAsset({
                name,
                amount: parseFloat(amount),
                type,
            });
            navigation.goBack();
        }
    };

    const renderTypeButton = (buttonType: 'equity' | 'mutualFund' | 'other', label: string) => (
        <TouchableOpacity
            style={[styles.typeButton, type === buttonType && styles.selectedType]}
            onPress={() => setType(buttonType)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
            <Text style={[styles.typeButtonText, type === buttonType && styles.selectedTypeText]}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Add New Asset</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Asset Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter asset name"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Amount</Text>
                    <TextInput
                        style={styles.input}
                        value={amount}
                        onChangeText={setAmount}
                        placeholder="Enter amount"
                        keyboardType="numeric"
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Asset Type</Text>
                    <View style={styles.typeContainer}>
                        {renderTypeButton('equity', assetTypes.equity)}
                        {renderTypeButton('mutualFund', assetTypes.mutualFund)}
                        {renderTypeButton('other', assetTypes.other)}
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Text style={styles.submitButtonText}>Add Asset</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        color: '#333',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#666',
    },
    input: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    typeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    typeButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedType: {
        backgroundColor: '#4C669F',
        borderColor: '#4C669F',
    },
    typeButtonText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '500',
    },
    selectedTypeText: {
        color: '#fff',
    },
    submitButton: {
        backgroundColor: '#4C669F',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
