import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { ProductCard } from './ProductCard';

interface HomeScreenProps {
    onProductSelect: (id: string) => void;
}

const CATEGORIES = ['All', 'New', 'Dresses', 'Tops', 'Shoes', 'Bags'];

const MOCK_PRODUCTS = [
    { id: '1', title: 'Oversized Wool Blend Coat', price: '$199.90', wishlisted: false },
    { id: '2', title: 'Satin Effect Midi Dress', price: '$89.90', wishlisted: true },
    { id: '3', title: 'High-Waist Cargo Trousers', price: '$69.90', wishlisted: false },
];

export function HomeScreen({ onProductSelect }: HomeScreenProps) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [products, setProducts] = useState(MOCK_PRODUCTS);

    const toggleWishlist = (productId: string) => {
        setProducts(products.map(product =>
            product.id === productId
                ? { ...product, wishlisted: !product.wishlisted }
                : product
        ));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>ZARA</Text>
                <View style={styles.headerActions}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <Search size={20} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconButton}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        <SlidersHorizontal size={20} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesContainer}
            >
                {CATEGORIES.map((category) => (
                    <TouchableOpacity
                        key={category}
                        onPress={() => setSelectedCategory(category)}
                        style={[
                            styles.categoryButton,
                            selectedCategory === category && styles.categoryButtonActive
                        ]}
                    >
                        <Text style={[
                            styles.categoryText,
                            selectedCategory === category && styles.categoryTextActive
                        ]}>
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.productsContainer}
            >
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        title={product.title}
                        price={product.price}
                        onPress={() => onProductSelect(product.id)}
                        onWishlist={() => toggleWishlist(product.id)}
                        isWishlisted={product.wishlisted}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        letterSpacing: 1,
    },
    headerActions: {
        flexDirection: 'row',
        gap: 16,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoriesContainer: {
        paddingHorizontal: 16,
        marginTop: 24,
    },
    categoryButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
    },
    categoryButtonActive: {
        backgroundColor: '#000',
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
    },
    categoryTextActive: {
        color: '#fff',
    },
    productsContainer: {
        padding: 24,
        paddingTop: 32,
    },
});
