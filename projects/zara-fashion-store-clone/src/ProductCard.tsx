import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface ProductCardProps {
    title: string;
    price: string;
    onPress: () => void;
    onWishlist?: () => void;
    isWishlisted?: boolean;
}

export function ProductCard({
                                title,
                                price,
                                onPress,
                                onWishlist,
                                isWishlisted = false
                            }: ProductCardProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}
            activeOpacity={0.9}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://images.pexels.com/photos/3195132/pexels-photo-3195132.jpeg?auto=compress&cs=tinysrgb&h=650&w=940' }}
                    style={styles.image}
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.3)']}
                    style={styles.gradient}
                />
                <TouchableOpacity
                    style={styles.wishlistButton}
                    onPress={onWishlist}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Heart
                        size={20}
                        color={isWishlisted ? '#FF4365' : '#fff'}
                        fill={isWishlisted ? '#FF4365' : 'transparent'}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.details}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.price}>{price}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width - 48,
        marginBottom: 24,
        backgroundColor: '#fff',
    },
    imageContainer: {
        width: '100%',
        height: 500,
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
        height: 160,
    },
    wishlistButton: {
        position: 'absolute',
        right: 16,
        top: 16,
        backgroundColor: 'rgba(0,0,0,0.2)',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    details: {
        paddingVertical: 12,
    },
    title: {
        fontSize: 14,
        fontWeight: '400',
        color: '#000',
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
});
