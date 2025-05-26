import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { styles } from './salesStyles';
import { AddedItemsListProps } from './salesTypes';
import { formatPrice } from './salesUtils';
import { ImageKeys, imageMap } from '../../constants';

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
              <Image 
                source={imageMap[item.imagen as ImageKeys]} 
                style={styles.itemImage}
                resizeMode="contain"
              />
              
              <View style={styles.itemDetails}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemName} numberOfLines={1} ellipsizeMode="tail">
                    {item.nombre}
                  </Text>
                  <TouchableOpacity
                    onPress={() => removeItem(item.id)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.detailsContainer}>
                  {/* Fila compacta para Precio */}
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Precio:</Text>
                    <Text style={styles.detailValue}>{formatPrice(item.precioUnitario)}</Text>
                  </View>
                  
                  {/* Fila compacta para Kilos */}
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Kilos:</Text>
                    <Text style={styles.detailValue}>{item.kilos} kg</Text>
                  </View>
                  
                  {/* Fila compacta para Total */}
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
      />
    </View>
  );
};

export default AddedItemsList;