import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './salesStyles';
import { GrandTotalSummaryProps } from './salesTypes';
import { formatPrice } from './salesUtils';

const GrandTotalSummary: React.FC<GrandTotalSummaryProps> = ({ ventaActual }) => {
  return (
    <View style={styles.grandTotalCard}>
      <View style={[styles.summaryRow, styles.grandTotalRow]}>
        <Text style={[styles.summaryLabel, styles.grandTotalLabel]}>TOTAL VENTA:</Text>
        <Text style={[styles.summaryValue, styles.grandTotalValue]}>
          {formatPrice(ventaActual.total)}
        </Text>
      </View>
    </View>
  );
};

export default GrandTotalSummary;