import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from './salesStyles';
import { ProductPickerProps } from './salesTypes';
import { cortesDeCarne, cortesDeCerdo, embutidos, otros } from '../../constants';

const ProductPicker: React.FC<ProductPickerProps> = ({
  selectedCategory,
  selectedPiece,
  setSelectedPiece,
  setKilos,
  setSelectedPieceData
}) => {
  const getPiecesByCategory = () => {
    switch (selectedCategory) {
      case 'vacuna': return cortesDeCarne;
      case 'porcina': return cortesDeCerdo;
      case 'embutidos': return embutidos;
      case 'otros': return otros;
      default: return [];
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Pieza</Text>
      <View style={[styles.input, styles.pickerContainer]}>
        <Picker
          selectedValue={selectedPiece}
          onValueChange={(itemValue) => {
            setSelectedPiece(itemValue);
            setKilos('');
            setSelectedPieceData(null);
          }}
          style={styles.picker}
          dropdownIconColor="#666"
        >
          <Picker.Item label="Seleccione una pieza" value="" />
          {getPiecesByCategory().map((piece, index) => (
            <Picker.Item
              key={index}
              label={piece.nombre}
              value={piece.nombre}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default ProductPicker;