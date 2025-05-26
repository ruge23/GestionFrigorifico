import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { styles } from './salesStyles';
import { SalesButtonsProps } from './salesTypes';

const SalesButtons: React.FC<SalesButtonsProps> = ({
  selectedCategory,
  selectedPiece,
  kilos,
  isLoading,
  handleAddItem,
  ventaActual,
  handleFinalizeSale
}) => {
  return (
    <>
      <TouchableOpacity
        style={[
          styles.input,
          styles.addButton,
          (!selectedCategory || !selectedPiece || !kilos || isLoading) ? styles.buttonDisabled : null
        ]}
        onPress={handleAddItem}
        disabled={!selectedCategory || !selectedPiece || !kilos || isLoading}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#fff" />
            <Text style={styles.loadingText}>Agregando...</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>Agregar Item</Text>
        )}
      </TouchableOpacity>

      {ventaActual.items.length > 0 && (
        <TouchableOpacity
          style={[
            styles.input,
            styles.finalizeButton,
            isLoading ? styles.buttonDisabled : null
          ]}
          onPress={handleFinalizeSale}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Finalizar Venta</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default SalesButtons;