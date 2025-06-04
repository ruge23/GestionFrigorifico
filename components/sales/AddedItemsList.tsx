import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { styles } from './salesStyles';
import { formatPrice } from './salesUtils';
import { ImageKeys, imageMap } from '../../constants';
import { AddedItemsListProps } from './salesTypes';

// interface ItemVenta {
//   id: string;
//   nombre: string;
//   precioUnitario: number;
//   kilos: number;
//   total: number;
//   imagen: ImageKeys;
// }

// interface VentaActual {
//   items: ItemVenta[];
//   total: number;
// }

// interface AddedItemsListProps {
//   ventaActual: VentaActual;
//   removeItem: (id: string) => void;
// }

const AddedItemsList: React.FC<AddedItemsListProps> = ({ ventaActual, removeItem }) => {
  return (
    <View style={styles.itemsListContainer}>
      <Text style={styles.sectionTitle}>Items Agregados</Text>
      <FlatList
        data={ventaActual.items}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={styles.itemContentContainer}>
              {item.imagen && (
                <Image 
                  source={imageMap[item.imagen]} 
                  style={styles.itemImage}
                  resizeMode="contain"
                />
              )}
              
              <View style={styles.itemDetails}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemName} numberOfLines={1} ellipsizeMode="tail">
                    {item.nombre}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeItem(item.id)}
                    style={styles.removeButton}
                    accessibilityLabel="Eliminar item"
                  >
                    <Text style={styles.removeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.detailsContainer}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Precio:</Text>
                    <Text style={styles.detailValue}>{formatPrice(item.precioUnitario)}/kg</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Kilos:</Text>
                    <Text style={styles.detailValue}>{item.kilos.toFixed(2)} kg</Text>
                  </View>
                  
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Total:</Text>
                    <Text style={[styles.detailValue, styles.itemTotalValue]}>
                      {formatPrice(item.total)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>No hay items agregados</Text>
          </View>
        }
      />
    </View>
  );
};

export default AddedItemsList;