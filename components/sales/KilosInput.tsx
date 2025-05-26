import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { styles } from './salesStyles';
import { KilosInputProps } from './salesTypes';

const KilosInput: React.FC<KilosInputProps> = ({ kilos, setKilos }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Kilos</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese los kilos"
        placeholderTextColor="#999"
        value={kilos}
        onChangeText={setKilos}
        keyboardType="numeric"
      />
    </View>
  );
};

export default KilosInput;