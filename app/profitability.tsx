import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, StatusBar } from 'react-native';
import Svg, { Circle, G, Line, Path, Rect, Text as SvgText } from 'react-native-svg';
import * as d3 from 'd3-shape';

// Datos de ejemplo
const sampleData = [
    { month: 'Ene', sales: 20000, purchases: 15000 },
    { month: 'Feb', sales: 18000, purchases: 12000 },
    { month: 'Mar', sales: 22000, purchases: 18000 },
    { month: 'Abr', sales: 19000, purchases: 14000 },
    { month: 'May', sales: 21000, purchases: 16000 },
    { month: 'Jun', sales: 25000, purchases: 20000 },
];

// Calcular beneficios
const dataWithProfits = sampleData.map(item => ({
    ...item,
    profit: item.sales - item.purchases
}));

const ProfitabilityScreen = () => {
    const chartWidth = Dimensions.get('window').width - 40;
    const chartHeight = 250;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const innerWidth = chartWidth - margin.left - margin.right;
    const innerHeight = chartHeight - margin.top - margin.bottom;

    // Escalas
    const xScale = (index: number) =>
        margin.left + (index * innerWidth) / (sampleData.length - 1);

    const yScale = (value: number) => {
        const maxValue = Math.max(
            ...sampleData.map(d => d.sales),
            ...sampleData.map(d => d.purchases)
        );
        return chartHeight - margin.bottom - (value / maxValue) * innerHeight;
    };

    // Línea para las ventas
    const salesLine = d3.line<{ month: string, sales: number }>()
        .x((_: any, i: any) => xScale(i))
        .y((d: any) => yScale(d.sales))
        .curve(d3.curveNatural)(sampleData);

    // Línea para las compras
    const purchasesLine = d3.line<{ month: string, purchases: number }>()
        .x((_: any, i: any) => xScale(i))
        .y((d: any) => yScale(d.purchases))
        .curve(d3.curveNatural)(sampleData);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor="#cc0000" barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Análisis de Balance</Text>
            </View>
            <ScrollView style={styles.container}>
                {/* <Text style={styles.title}>Análisis de Rentabilidad</Text> */}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Resumen Trimestral</Text>
                    <View style={styles.summaryContainer}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryLabel}>Ventas Totales:</Text>
                            <Text style={styles.summaryValue}>
                                ${sampleData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}
                            </Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryLabel}>Compras Totales:</Text>
                            <Text style={styles.summaryValue}>
                                ${sampleData.reduce((sum, item) => sum + item.purchases, 0).toLocaleString()}
                            </Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryLabel}>Beneficio Neto:</Text>
                            <Text style={[styles.summaryValue, styles.profitValue]}>
                                ${dataWithProfits.reduce((sum, item) => sum + item.profit, 0).toLocaleString()}
                            </Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryLabel}>Margen (%):</Text>
                            <Text style={[styles.summaryValue, styles.profitValue]}>
                                {(
                                    (dataWithProfits.reduce((sum, item) => sum + item.profit, 0) /
                                        sampleData.reduce((sum, item) => sum + item.sales, 0)) * 100
                                ).toFixed(1)}%
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Tendencia de Ventas vs Compras</Text>
                    <View style={styles.chartContainer}>
                        <Svg width={chartWidth} height={chartHeight}>
                            {/* Eje X */}
                            <Line
                                x1={margin.left}
                                y1={chartHeight - margin.bottom}
                                x2={chartWidth - margin.right}
                                y2={chartHeight - margin.bottom}
                                stroke="#999"
                                strokeWidth="1"
                            />

                            {/* Eje Y */}
                            <Line
                                x1={margin.left}
                                y1={margin.top}
                                x2={margin.left}
                                y2={chartHeight - margin.bottom}
                                stroke="#999"
                                strokeWidth="1"
                            />

                            {/* Etiquetas del eje X */}
                            {sampleData.map((item, index) => (
                                <G key={`xlabel-${index}`}>
                                    <Line
                                        x1={xScale(index)}
                                        y1={chartHeight - margin.bottom}
                                        x2={xScale(index)}
                                        y2={chartHeight - margin.bottom + 5}
                                        stroke="#999"
                                        strokeWidth="1"
                                    />
                                    <SvgText
                                        x={xScale(index)}
                                        y={chartHeight - margin.bottom + 20}
                                        fontSize="12"
                                        fill="#666"
                                        textAnchor="middle"
                                    >
                                        {item.month}
                                    </SvgText>
                                </G>
                            ))}

                            {/* Etiquetas del eje Y */}
                            {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                                const value = Math.max(
                                    ...sampleData.map(d => d.sales),
                                    ...sampleData.map(d => d.purchases)
                                ) * ratio;
                                return (
                                    <G key={`ylabel-${index}`}>
                                        <Line
                                            x1={margin.left - 5}
                                            y1={yScale(value)}
                                            x2={margin.left}
                                            y2={yScale(value)}
                                            stroke="#999"
                                            strokeWidth="1"
                                        />
                                        <SvgText
                                            x={margin.left - 10}
                                            y={yScale(value) + 4}
                                            fontSize="10"
                                            fill="#666"
                                            textAnchor="end"
                                        >
                                            ${(value / 1000).toFixed(0)}k
                                        </SvgText>
                                    </G>
                                );
                            })}

                            {/* Línea de ventas */}
                            <G>
                                {salesLine && (
                                    <Path
                                        d={salesLine}
                                        fill="none"
                                        stroke="#4CAF50"
                                        strokeWidth="3"
                                    />
                                )}
                                {sampleData.map((item, index) => (
                                    <Circle
                                        key={`sales-point-${index}`}
                                        cx={xScale(index)}
                                        cy={yScale(item.sales)}
                                        r="5"
                                        fill="#4CAF50"
                                    />
                                ))}
                            </G>

                            {/* Línea de compras */}
                            <G>
                                {purchasesLine && (
                                    <Path
                                        d={purchasesLine}
                                        fill="none"
                                        stroke="#F44336"
                                        strokeWidth="3"
                                    />
                                )}
                                {sampleData.map((item, index) => (
                                    <Circle
                                        key={`purchases-point-${index}`}
                                        cx={xScale(index)}
                                        cy={yScale(item.purchases)}
                                        r="5"
                                        fill="#F44336"
                                    />
                                ))}
                            </G>

                            {/* Leyenda */}
                            <G>
                                <Rect
                                    x={chartWidth - 120}
                                    y={margin.top}
                                    width="10"
                                    height="10"
                                    fill="#4CAF50"
                                />
                                <SvgText
                                    x={chartWidth - 105}
                                    y={margin.top + 10}
                                    fontSize="12"
                                    fill="#333"
                                >
                                    Ventas
                                </SvgText>
                                <Rect
                                    x={chartWidth - 120}
                                    y={margin.top + 20}
                                    width="10"
                                    height="10"
                                    fill="#F44336"
                                />
                                <SvgText
                                    x={chartWidth - 105}
                                    y={margin.top + 30}
                                    fontSize="12"
                                    fill="#333"
                                >
                                    Compras
                                </SvgText>
                            </G>
                        </Svg>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Detalle Mensual</Text>
                    {dataWithProfits.map((item, index) => (
                        <View key={index} style={styles.monthItem}>
                            <Text style={styles.monthName}>{item.month}</Text>
                            <View style={styles.monthData}>
                                <Text style={styles.monthValue}>V: ${item.sales.toLocaleString()}</Text>
                                <Text style={styles.monthValue}>C: ${item.purchases.toLocaleString()}</Text>
                                <Text style={[styles.monthValue, styles.monthProfit]}>
                                    B: ${item.profit.toLocaleString()}
                                </Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// Estilos (igual que en el ejemplo anterior)
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#cc0000',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
        textAlign: 'center', // Título centrado
        marginHorizontal: 10, // Evita solapamiento
    },
    container: {
        flex: 1,
        padding: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    section: {
        marginBottom: 25,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    summaryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    summaryItem: {
        width: '48%',
        marginBottom: 15,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    profitValue: {
        color: '#4CAF50',
    },
    chartContainer: {
        height: 250,
        marginBottom: 15,
    },
    monthItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    monthName: {
        fontSize: 16,
        fontWeight: 'bold',
        width: 40,
    },
    monthData: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 15,
    },
    monthValue: {
        fontSize: 14,
        color: '#666',
    },
    monthProfit: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
});

export default ProfitabilityScreen;