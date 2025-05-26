import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from './salesStyles';
import { ProductCategoryPickerProps } from './salesTypes';

const ProductCategoryPicker: React.FC<ProductCategoryPickerProps> = ({
  selectedCategory,
  setSelectedCategory,
  setSelectedPiece,
  setSelectedPieceData
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Categoría</Text>
      <View style={[styles.input, styles.pickerContainer]}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => {
            setSelectedCategory(itemValue);
            setSelectedPiece('');
            setSelectedPieceData(null);
          }}
          style={styles.picker}
          dropdownIconColor="#666"
        >
          <Picker.Item label="Seleccione una categoría" value="" />
          <Picker.Item label="Carne Vacuna" value="vacuna" />
          <Picker.Item label="Carne Porcina" value="porcina" />
          <Picker.Item label="Embutidos" value="embutidos" />
          <Picker.Item label="Otros" value="otros" />
        </Picker>
      </View>
    </View>
  );
};

export default ProductCategoryPicker;