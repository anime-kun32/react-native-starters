import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from './HomeScreen';
import { ProductDetailScreen } from './ProductDetailScreen';

export default function App() {
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

    return (
        <SafeAreaProvider>
            {selectedProduct ? (
                <ProductDetailScreen
                    onBack={() => setSelectedProduct(null)}
                />
            ) : (
                <HomeScreen
                    onProductSelect={(id) => setSelectedProduct(id)}
                />
            )}
        </SafeAreaProvider>
    );
}
