import { View, ScrollView, Image, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { cortesDeCarne, cortesDeCerdo, embutidos, otros, ImageKeys, imageMap } from '../../constants';
import { useEffect, useState } from 'react';

type PieceType = 'vacuna' | 'porcina' | 'embutidos' | 'otros';

export default function ViewTab() {
  const params = useLocalSearchParams<{ pieces: PieceType }>();
  const [loading, setLoading] = useState(true);
  const [selectPieces, setSelectPieces] = useState(() => {
  switch(params.pieces) {
    case 'vacuna': return cortesDeCarne;
    case 'porcina': return cortesDeCerdo;
    case 'embutidos': return embutidos;
    case 'otros': return otros;
    default: return [];
  }
});

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      if(params.pieces === 'vacuna') setSelectPieces(cortesDeCarne);
      if(params.pieces === 'porcina') setSelectPieces(cortesDeCerdo);
      if(params.pieces === 'embutidos') setSelectPieces(embutidos);
      if(params.pieces === 'otros') setSelectPieces(otros);
      setLoading(false);
    }, 300); 
    return () => clearTimeout(timer);
  },[params.pieces]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#cc0000" />
        <Text style={styles.loadingText}>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.cardsContainer}>
        {selectPieces.length > 0 ? (
          selectPieces.map((piece, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardContent}>
                {imageMap[piece.imagen as ImageKeys] && (
                  <Image
                    source={imageMap[piece.imagen as ImageKeys]}
                    style={styles.cardImage}
                    resizeMode="contain"
                  />
                )}
                
                <View style={styles.cardMiddle}>
                  <Text style={styles.cardTitle} numberOfLines={2}>
                    {piece.nombre}
                  </Text>
                  <Text style={styles.cardPrice}>{piece.precio}</Text>
                </View>
                
                <View style={styles.cardRight}>
                  <Text style={styles.cardKilos}>{piece.kilos} kg</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No se encontraron productos</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#cc0000',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
  },
});