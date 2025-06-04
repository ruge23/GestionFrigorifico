import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './salesStyles';
import { formatPrice } from './salesUtils';
import { VentaActual } from './salesTypes';

interface GrandTotalSummaryProps {
  ventaActual: VentaActual;
}

const GrandTotalSummary: React.FC<GrandTotalSummaryProps> = ({ ventaActual }) => {
  const subtotal = ventaActual.items.reduce((sum, item) => sum + item.total, 0);
  const taxRate = 21; // IVA 21%
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  return (
    <View style={styles.grandTotalContainer}>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Subtotal:</Text>
        <Text style={styles.totalValue}>{formatPrice(subtotal)}</Text>
      </View>
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>IVA ({taxRate}%):</Text>
        <Text style={styles.totalValue}>{formatPrice(taxAmount)}</Text>
      </View>
      <View style={[styles.totalRow, styles.grandTotalRow]}>
        <Text style={styles.grandTotalLabel}>Total:</Text>
        <Text style={styles.grandTotalValue}>{formatPrice(total)}</Text>
      </View>
    </View>
  );
};

export default GrandTotalSummary;