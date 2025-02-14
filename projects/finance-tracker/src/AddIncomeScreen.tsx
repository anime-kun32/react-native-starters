import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFinance } from './FinanceContext';

export function AddIncomeScreen({ navigation }: any) {
    const [source, setSource] = useState('');
    const [amount, setAmount] = useState('');
    const [frequency, setFrequency] = useState<'monthly' | 'yearly' | 'one-time'>('monthly');
    const { addIncome } = useFinance();

    const handleSubmit = () => {
        if (source && amount) {
            addIncome({
                source,
                amount: parseFloat(amount),
                frequency,
            });
            navigation.goBack();
        }
    };

    const renderFrequencyButton = (
        freq: 'monthly' | 'yearly' | 'one-time',
        label: string
    ) => (
        <TouchableOpacity
            style={[styles.frequencyButton, frequency === freq && styles.selectedFrequency]}
            onPress={() => setFrequency(freq)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
            <Text
                style={[
                    styles.frequencyButtonText,
                    frequency === freq && styles.selectedFrequencyText,
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Add New Income</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Income Source</Text>
                    <TextInput
                        style={styles.input}
                        value={source}
                        onChangeText={setSource}
                        placeholder="Enter income source"
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
                    <Text style={styles.label}>Frequency</Text>
                    <View style={styles.frequencyContainer}>
                        {renderFrequencyButton('monthly', 'Monthly')}
                        {renderFrequencyButton('yearly', 'Yearly')}
                        {renderFrequencyButton('one-time', 'One-time')}
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Text style={styles.submitButtonText}>Add Income</Text>
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
    frequencyContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    frequencyButton: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedFrequency: {
        backgroundColor: '#4C669F',
        borderColor: '#4C669F',
    },
    frequencyButtonText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '500',
    },
    selectedFrequencyText: {
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
