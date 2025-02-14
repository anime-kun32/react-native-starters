import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Heart, Ruler } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from './Button';

const { width } = Dimensions.get('window');

const SIZES = ['XS', 'S', 'M', 'L', 'XL'];

interface ProductDetailScreenProps {
    onBack: () => void;
}

export function ProductDetailScreen({ onBack }: ProductDetailScreenProps) {
    const [selectedSize, setSelectedSize] = useState('');
    const [isWishlisted, setIsWishlisted] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={onBack}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        style={styles.backButton}
                    >
                        <ArrowLeft size={24} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setIsWishlisted(!isWishlisted)}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        style={styles.wishlistButton}
                    >
                        <Heart
                            size={24}
                            color={isWishlisted ? '#FF4365' : '#000'}
                            fill={isWishlisted ? '#FF4365' : 'transparent'}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: 'https://images.pexels.com/photos/8148577/pexels-photo-8148577.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(255,255,255,0.9)', '#fff']}
                        style={styles.gradient}
                    />
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>Oversized Wool Blend Coat</Text>
                    <Text style={styles.price}>$199.90</Text>

                    <Text style={styles.description}>
                        Oversized coat featuring a lapel collar and long sleeves. Front welt pockets.
                        Interior lining. Double-breasted button fastening at the front.
                    </Text>

                    <View style={styles.sizeSection}>
                        <View style={styles.sizeHeader}>
                            <Text style={styles.sizeTitle}>Select Size</Text>
                            <TouchableOpacity
                                style={styles.sizeGuide}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            >
                                <Ruler size={16} color="#000" />
                                <Text style={styles.sizeGuideText}>Size Guide</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.sizeGrid}>
                            {SIZES.map((size) => (
                                <TouchableOpacity
                                    key={size}
                                    style={[
                                        styles.sizeButton,
                                        selectedSize === size && styles.sizeButtonSelected
                                    ]}
                                    onPress={() => setSelectedSize(size)}
                                >
                                    <Text style={[
                                        styles.sizeButtonText,
                                        selectedSize === size && styles.sizeButtonTextSelected
                                    ]}>
                                        {size}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Add to Bag"
                    onPress={() => {}}
                />
            </View>
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    wishlistButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    imageContainer: {
        width: width,
        height: width * 1.3,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
    },
    content: {
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    price: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
    },
    description: {
        fontSize: 14,
        lineHeight: 22,
        color: '#666',
        marginBottom: 32,
    },
    sizeSection: {
        marginBottom: 24,
    },
    sizeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sizeTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    sizeGuide: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    sizeGuideText: {
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    sizeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    sizeButton: {
        width: (width - 48 - 32) / 5,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
    },
    sizeButtonSelected: {
        backgroundColor: '#000',
    },
    sizeButtonText: {
        fontSize: 14,
        fontWeight: '500',
    },
    sizeButtonTextSelected: {
        color: '#fff',
    },
    footer: {
        padding: 24,
        paddingBottom: 32,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#e1e1e1',
    },
});
