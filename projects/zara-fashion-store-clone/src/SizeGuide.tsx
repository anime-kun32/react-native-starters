import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Ruler } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const MEASUREMENTS = [
    { label: 'Chest', xs: '32"', s: '34"', m: '36"', l: '38"', xl: '40"' },
    { label: 'Waist', xs: '26"', s: '28"', m: '30"', l: '32"', xl: '34"' },
    { label: 'Hip', xs: '35"', s: '37"', m: '39"', l: '41"', xl: '43"' },
    { label: 'Length', xs: '25"', s: '25.5"', m: '26"', l: '26.5"', xl: '27"' },
    { label: 'Sleeve', xs: '23"', s: '23.5"', m: '24"', l: '24.5"', xl: '25"' }
];

interface SizeGuideProps {
    onClose: () => void;
}

export function SizeGuide({ onClose }: SizeGuideProps) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={onClose}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    style={styles.backButton}
                >
                    <ArrowLeft size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Size Guide</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <View style={styles.measurementTips}>
                    <View style={styles.tipHeader}>
                        <Ruler size={20} color="#000" />
                        <Text style={styles.tipTitle}>How to Measure</Text>
                    </View>
                    <Text style={styles.tipText}>
                        For the most accurate measurements, measure your body in underwear or lightweight clothing.
                        Stand straight and relaxed, and keep the measuring tape comfortably loose.
                    </Text>
                </View>

                <View style={styles.tableContainer}>
                    <LinearGradient
                        colors={['#f8f8f8', '#fff']}
                        style={styles.tableHeader}
                    >
                        <View style={[styles.cell, styles.labelCell]}>
                            <Text style={styles.headerText}>Size</Text>
                        </View>
                        {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                            <View key={size} style={styles.cell}>
                                <Text style={styles.headerText}>{size}</Text>
                            </View>
                        ))}
                    </LinearGradient>

                    {MEASUREMENTS.map((row, index) => (
                        <View
                            key={row.label}
                            style={[
                                styles.tableRow,
                                index === MEASUREMENTS.length - 1 && styles.lastRow
                            ]}
                        >
                            <View style={[styles.cell, styles.labelCell]}>
                                <Text style={styles.labelText}>{row.label}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.measureText}>{row.xs}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.measureText}>{row.s}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.measureText}>{row.m}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.measureText}>{row.l}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.measureText}>{row.xl}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.note}>
                    <Text style={styles.noteTitle}>Find Your Perfect Fit</Text>
                    <Text style={styles.noteText}>
                        If your measurements fall between two sizes, order the smaller size for a tighter fit or the larger size for a looser fit.
                    </Text>
                </View>
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
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e1e1e1',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    content: {
        padding: 24,
    },
    measurementTips: {
        backgroundColor: '#f8f8f8',
        padding: 16,
        borderRadius: 12,
        marginBottom: 32,
    },
    tipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    tipText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#666',
    },
    tableContainer: {
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#e1e1e1',
        marginBottom: 32,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
        paddingVertical: 12,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#e1e1e1',
    },
    lastRow: {
        borderBottomWidth: 0,
    },
    cell: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelCell: {
        flex: 1.2,
        alignItems: 'flex-start',
        paddingLeft: 16,
    },
    headerText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000',
    },
    labelText: {
        fontSize: 14,
        color: '#666',
    },
    measureText: {
        fontSize: 14,
        color: '#000',
    },
    note: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e1e1e1',
    },
    noteTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    noteText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#666',
    },
});
