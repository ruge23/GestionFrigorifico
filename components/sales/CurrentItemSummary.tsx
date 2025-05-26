import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './salesStyles';
import { CurrentItemSummaryProps } from './salesTypes';
import { formatPrice, parseArgentineKilos, parseArgentinePrice } from './salesUtils';

const CurrentItemSummary: React.FC<CurrentItemSummaryProps> = ({ selectedPieceData, kilos }) => {
	return (
		<View style={styles.itemSummaryCard}>
			<Text style={styles.summaryTitle}>Resumen del Item</Text>

			<View style={styles.summaryRow}>
				<Text style={styles.summaryLabel}>Producto:</Text>
				<Text style={styles.summaryValue}>{selectedPieceData.nombre}</Text>
			</View>

			<View style={styles.summaryRow}>
				<Text style={styles.summaryLabel}>Precio unitario:</Text>
				<Text style={styles.summaryValue}>{selectedPieceData.precio}</Text>
			</View>

			<View style={styles.summaryRow}>
				<Text style={styles.summaryLabel}>Cantidad:</Text>
				<Text style={styles.summaryValue}>{kilos} kg</Text>
			</View>

			<View style={[styles.summaryRow, styles.totalRow]}>
				<Text style={[styles.summaryLabel, styles.totalLabel]}>Subtotal:</Text>
				<Text style={[styles.summaryValue, styles.totalValue]}>
					{formatPrice(parseArgentinePrice(selectedPieceData.precio) * parseArgentineKilos(kilos))}
				</Text>
			</View>
		</View>
	);
};

export default CurrentItemSummary;