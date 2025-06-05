// En components/expenses/BalanceChart.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { BarChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import { BalancePeriodo } from '../expenses/expensesTypes';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

interface BalanceChartProps {
  balances: BalancePeriodo[];
  period: string;
}

const BalanceChart: React.FC<BalanceChartProps> = ({ balances, period }) => {
  // Filtrar balances según el periodo seleccionado
  const filteredBalances = balances.filter(b => 
    period === 'todos' || b.frecuencia === period
  );

  const data = filteredBalances.map(b => ({
    label: new Date(b.fechaInicio).toLocaleDateString('es-AR', { month: 'short' }),
    ventas: b.totalVentas,
    gastos: b.totalGastos,
    balance: b.balance,
  }));

  const barData = [
    {
      data: data.map(d => d.ventas),
      svg: { fill: '#4CAF50' },
    },
    {
      data: data.map(d => d.gastos),
      svg: { fill: '#F44336' },
    },
  ];

  const balanceTotal = data.reduce((sum, d) => sum + d.balance, 0);
  const isPositive = balanceTotal >= 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Balance {period.charAt(0).toUpperCase() + period.slice(1)}</Text>
      
      {/* <View style={styles.chartContainer}>
        <YAxis
          data={barData[0].data}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fontSize: 10, fill: 'black' }}
          numberOfTicks={5}
          formatLabel={(value) => `$${value / 1000}k`}
        />
        <BarChart
          style={{ flex: 1, marginLeft: 10 }}
          data={barData}
          yAccessor={({ item, index }) => item}
          contentInset={{ top: 20, bottom: 20 }}
          spacingInner={0.4}
          spacingOuter={0.1}
        >
          <Grid />
        </BarChart>
      </View>
      
      <XAxis
        data={data}
        xAccessor={({ item, index }) => index}
        formatLabel={(value, index) => data[index].label}
        contentInset={{ left: 30, right: 30 }}
        svg={{ fontSize: 10, fill: 'black' }}
      /> */}
      
      <View style={styles.summary}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Ventas:</Text>
          <Text style={[styles.summaryValue, styles.positive]}>
            $ {data.reduce((sum, d) => sum + d.ventas, 0).toLocaleString('es-AR')}
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Gastos:</Text>
          <Text style={[styles.summaryValue, styles.negative]}>
            $ {data.reduce((sum, d) => sum + d.gastos, 0).toLocaleString('es-AR')}
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Balance:</Text>
          <View style={styles.balanceContainer}>
            {isPositive ? (
              <FiTrendingUp size={20} color="#4CAF50" />
            ) : (
              <FiTrendingDown size={20} color="#F44336" />
            )}
            <Text 
              style={[
                styles.summaryValue, 
                isPositive ? styles.positive : styles.negative
              ]}
            >
              $ {Math.abs(balanceTotal).toLocaleString('es-AR')}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  chartContainer: {
    height: 200,
    flexDirection: 'row',
    marginBottom: 10,
  },
  summary: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  positive: {
    color: '#4CAF50',
  },
  negative: {
    color: '#F44336',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

export default BalanceChart;