import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFinance } from './FinanceContext';

const EXPENSE_CATEGORIES = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Health',
    'Education',
    'Investment',
    'Insurance',
    'Family',
    'Travel',
    'Other'
];

export function AddExpenseScreen({ navigation }: any) {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const { addExpense } = useFinance();

    const handleSubmit = () => {
        if (amount && category) {
            addExpense({
                amount: parseFloat(amount),
                category,
                description,
            });
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
                <Text style={styles.title}>Add New Expense</Text>

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
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Enter description"
                        multiline
                        numberOfLines={3}
                        placeholderTextColor="#999"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Category</Text>
                    <View style={styles.categoryContainer}>
                        {EXPENSE_CATEGORIES.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.categoryButton,
                                    category === cat && styles.selectedCategory,
                                ]}
                                onPress={() => setCategory(cat)}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            >
                                <Text
                                    style={[
                                        styles.categoryButtonText,
                                        category === cat && styles.selectedCategoryText,
                                    ]}
                                >
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Text style={styles.submitButtonText}>Add Expense</Text>
                </TouchableOpacity>
            </ScrollView>
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
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -4,
    },
    categoryButton: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#fff',
        alignItems: 'center',
        margin: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        minWidth: '45%',
    },
    selectedCategory: {
        backgroundColor: '#4C669F',
        borderColor: '#4C669F',
    },
    categoryButtonText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '500',
    },
    selectedCategoryText: {
        color: '#fff',
    },
    submitButton: {
        backgroundColor: '#4C669F',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 40,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
