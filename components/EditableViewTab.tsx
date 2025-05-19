import { useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { cortesDeCarne } from '../constants';

interface EditableViewTabProps {
  pieces: typeof cortesDeCarne;
  onPiecesChange?: (updatedPieces: typeof cortesDeCarne) => void;
}

type ImageKeys =
  | 'molida.jpeg'
  | 'comboAsado.jpeg'
  | 'nalgaFeteada.jpeg'
  | 'carne_picada.jpeg'
  | 'osobuco.jpeg'
  | 'cuadril.jpeg'
  | 'costeleta.jpeg'
  | 'costilla_novillo.jpeg'
  | 'bolaDeLomo.jpeg'
  | 'tapaDeAsado.jpeg';

const imageMap: Record<ImageKeys, any> = {
  'molida.jpeg': require('../assets/images/carne_vacuna/molida.jpeg'),
  'comboAsado.jpeg': require('../assets/images/carne_vacuna/comboAsado.jpeg'),
  'nalgaFeteada.jpeg': require('../assets/images/carne_vacuna/nalgaFeteada.jpeg'),
  'carne_picada.jpeg': require('../assets/images/carne_vacuna/carne_picada.jpeg'),
  'osobuco.jpeg': require('../assets/images/carne_vacuna/osobuco.jpeg'),
  'cuadril.jpeg': require('../assets/images/carne_vacuna/cuadril.jpeg'),
  'costeleta.jpeg': require('../assets/images/carne_vacuna/costeleta.jpeg'),
  'costilla_novillo.jpeg': require('../assets/images/carne_vacuna/costilla_novillo.jpeg'),
  'bolaDeLomo.jpeg': require('../assets/images/carne_vacuna/bolaDeLomo.jpeg'),
  'tapaDeAsado.jpeg': require('../assets/images/carne_vacuna/tapaDeAsado.jpeg'),
};

export const EditableViewTab = ({ pieces: initialPieces, onPiecesChange }: EditableViewTabProps) => {
  const [pieces, setPieces] = useState(() => {
    if (!Array.isArray(initialPieces)) return [];
    return initialPieces.map(piece => ({
      ...piece,
      precio: piece.precio || '$0,00',
      kilos: piece.kilos || '0'
    }));
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState({ precio: '', kilos: '' });

  // Calcular totales
  const totals = useMemo(() => {
    let totalKilos = 0;
    let totalPrice = 0;

    pieces.forEach(piece => {
      try {
        const kilos = parseFloat(piece.kilos.replace(',', '.')) || 0;
        const numericPrice = parseFloat(
          piece.precio
            .replace(/[^\d,-]/g, '')
            .replace(',', '.')
        ) || 0;

        totalKilos += kilos;
        totalPrice += numericPrice * kilos;
      } catch (error) {
        console.error('Error processing piece:', piece, error);
      }
    });

    return {
      totalKilos: totalKilos.toFixed(2),
      totalPrice: totalPrice.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
      }).replace('ARS', '').trim()
    };
  }, [pieces]);

  const handleEdit = (index: number) => {
    setEditingId(index);
    setEditValues({
      precio: pieces[index].precio.replace('$', '').replace(/\./g, '').replace(',', '.').trim(),
      kilos: pieces[index].kilos
    });
  };

  const handleSave = (index: number) => {
    const updatedPieces = [...pieces];
    updatedPieces[index] = {
      ...updatedPieces[index],
      precio: `$${Number(editValues.precio).toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`,
      kilos: editValues.kilos
    };

    setPieces(updatedPieces);
    setEditingId(null);

    if (onPiecesChange) {
      onPiecesChange(updatedPieces);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleChange = (field: 'precio' | 'kilos', value: string) => {
    // Validar que solo sean números
    if (field === 'kilos') {
      if (!/^\d*\.?\d*$/.test(value)) return;
    } else {
      if (!/^\d*\.?\d*$/.test(value)) return;
    }

    setEditValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!initialPieces || !Array.isArray(initialPieces)) {
    return <View style={{ flex: 1, justifyContent: 'center' }}><Text>No hay datos</Text></View>;
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.cardsContainer}>
        {pieces.map((piece: any, index: any) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardContent}>
              {/* Imagen a la izquierda */}
              {imageMap[piece.imagen as ImageKeys] && (
                <Image
                  source={imageMap[piece.imagen as ImageKeys]}
                  style={styles.cardImage}
                  resizeMode="contain"
                />
              )}

              {/* Contenido del medio (nombre y precio) */}
              <View style={styles.cardMiddle}>
                <Text style={styles.cardTitle} numberOfLines={2}>{piece.nombre}</Text>

                {editingId === index ? (
                  <TextInput
                    style={styles.input}
                    value={editValues.precio}
                    onChangeText={(text) => handleChange('precio', text)}
                    keyboardType="numeric"
                    placeholder="Nuevo precio"
                  />
                ) : (
                  <Text style={styles.cardPrice}>{piece.precio}</Text>
                )}
              </View>

              {/* Kilos a la derecha */}
              <View style={styles.cardRight}>
                {editingId === index ? (
                  <TextInput
                    style={[styles.input, styles.kilosInput]}
                    value={editValues.kilos}
                    onChangeText={(text) => handleChange('kilos', text)}
                    keyboardType="numeric"
                    placeholder="Kilos"
                  />
                ) : (
                  <Text style={styles.cardKilos}>{piece.kilos} kg</Text>
                )}
              </View>
            </View>

            {/* Botones de edición/guardado */}
            <View style={styles.buttonsContainer}>
              {editingId === index ? (
                <>
                  <TouchableOpacity
                    style={[styles.button, styles.saveButton]}
                    onPress={() => handleSave(index)}
                  >
                    <Text style={styles.buttonText}>Guardar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={handleCancel}
                  >
                    <Text style={styles.buttonText}>Cancelar</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity
                  style={[styles.button, styles.editButton]}
                  onPress={() => handleEdit(index)}
                >
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
        {/* Resumen de totales */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Balance de Piezas</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Peso Total:</Text>
            <Text style={styles.summaryValue}>{totals.totalKilos} kg</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Valor Total:</Text>
            <Text style={styles.summaryValue}> {totals.totalPrice}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
// Estilos actualizados
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    padding: 10,
  },
  cardsContainer: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  cardMiddle: {
    flex: 1,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#cc0000',
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  cardKilos: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    marginBottom: 5,
    backgroundColor: '#fff',
  },
  kilosInput: {
    width: 60,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
    minWidth: 70,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#cc0000',
  },
  saveButton: {
    backgroundColor: '#28a745',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});