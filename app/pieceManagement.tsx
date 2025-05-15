import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

// Definición de tipos
type Piece = {
  name: string;
  pvp: string;
  kilos: string;
  price: string;
};

type Totals = {
  totalKilos: string;
  totalPrice: string;
  profitPercentage: string;
};

type PieceField = 'name' | 'pvp' | 'kilos' | 'price';

const initialPieces: Piece[] = [
  { name: 'Aleta Ternera', pvp: '9.00', kilos: '5.00', price: '45.00' },
  { name: 'Cadera', pvp: '15.00', kilos: '3.00', price: '45.00' },
  { name: 'Delantero', pvp: '4.00', kilos: '35.00', price: '140.00' },
  { name: 'Filete contra Ternera', pvp: '14.00', kilos: '6.00', price: '84.00' },
  { name: 'Filetes Babilia Ternera', pvp: '13.00', kilos: '8.00', price: '104.00' },
  { name: 'Lorno', pvp: '15.00', kilos: '15.00', price: '225.00' },
];

const initialTotals: Totals = {
  totalKilos: '72.00',
  totalPrice: '643.00',
  profitPercentage: '72.00',
};

// Componente para la pestaña de Edición
const EditTab = ({ 
  pieces, 
  updatePiece,
  addNewPiece,
  totals 
}: {
  pieces: Piece[];
  updatePiece: (index: number, field: PieceField, value: string) => void;
  addNewPiece: () => void;
  totals: Totals;
}) => (
  <ScrollView style={styles.scrollContainer}>
    {/* Encabezados de columnas */}
    <View style={styles.columnHeaders}>
      <Text style={[styles.columnHeader, { flex: 2 }]}>Pieza</Text>
      <Text style={styles.columnHeader}>P.V.P</Text>
      <Text style={styles.columnHeader}>Kilos</Text>
      <Text style={styles.columnHeader}>Precio</Text>
    </View>

    {/* Filas de piezas */}
    {pieces.map((piece, index) => (
      <View key={index} style={styles.pieceRow}>
        <Text style={[styles.pieceName, { flex: 2 }]}>{piece.name}</Text>
        
        <TextInput
          style={styles.input}
          value={piece.pvp}
          onChangeText={(text) => updatePiece(index, 'pvp', text)}
          keyboardType="numeric"
        />
        
        <TextInput
          style={styles.input}
          value={piece.kilos}
          onChangeText={(text) => updatePiece(index, 'kilos', text)}
          keyboardType="numeric"
        />
        
        <Text style={styles.priceText}>$ {piece.price}</Text>
      </View>
    ))}

    {/* Resumen */}
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryTitle}>Rendimiento de peso</Text>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Peso Total:</Text>
        <Text style={styles.summaryValue}>{totals.totalKilos} kg</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Valor Total:</Text>
        <Text style={styles.summaryValue}>$ {totals.totalPrice}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>% Beneficio:</Text>
        <Text style={styles.summaryValue}>{totals.profitPercentage}%</Text>
      </View>
    </View>
  </ScrollView>
);

// Componente para la pestaña de Visualización
const ViewTab = ({ pieces }: { pieces: Piece[] }) => (
  <ScrollView style={styles.scrollContainer}>
    <View style={styles.cardsContainer}>
      {pieces.map((piece, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>{piece.name}</Text>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>P.V.P:</Text>
            <Text style={styles.cardValue}>$ {piece.pvp}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Kilos:</Text>
            <Text style={styles.cardValue}>{piece.kilos} kg</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Total:</Text>
            <Text style={[styles.cardValue, styles.cardTotal]}>$ {piece.price}</Text>
          </View>
        </View>
      ))}
    </View>
  </ScrollView>
);

const PieceManagementScreen: React.FC = () => {
  const [pieces, setPieces] = useState<Piece[]>(initialPieces);
  const [totals, setTotals] = useState<Totals>(initialTotals);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'edit', title: 'Editar' },
    { key: 'view', title: 'Ver' },
  ]);

  const addNewPiece = (): void => {
    setPieces([...pieces, { name: 'Nueva Pieza', pvp: '0.00', kilos: '0.00', price: '0.00' }]);
  };

  const updatePiece = (index: number, field: PieceField, value: string): void => {
    const updatedPieces = [...pieces];
    updatedPieces[index] = {
      ...updatedPieces[index],
      [field]: value
    };
    
    if (field === 'pvp' || field === 'kilos') {
      const pvp = parseFloat(updatedPieces[index].pvp) || 0;
      const kilos = parseFloat(updatedPieces[index].kilos) || 0;
      updatedPieces[index].price = (pvp * kilos).toFixed(2);
    }
    
    setPieces(updatedPieces);
    calculateTotals(updatedPieces);
  };

  const calculateTotals = (piecesList: Piece[]): void => {
    let totalKilos = 0;
    let totalPrice = 0;
    
    piecesList.forEach(piece => {
      totalKilos += parseFloat(piece.kilos) || 0;
      totalPrice += parseFloat(piece.price) || 0;
    });
    
    const profitPercentage = totalKilos > 0 
      ? ((totalPrice / totalKilos) / (totalPrice > 0 ? (totalPrice / totalKilos) : 1) * 100)
      : 0;
    
    setTotals({
      totalKilos: totalKilos.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      profitPercentage: profitPercentage.toFixed(2),
    });
  };

  const renderScene = SceneMap({
    edit: () => (
      <EditTab 
        pieces={pieces} 
        updatePiece={updatePiece} 
        addNewPiece={addNewPiece}
        totals={totals}
      />
    ),
    view: () => <ViewTab pieces={pieces} />,
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Gestión de Despieces</Text>
          {index === 0 && (
            <TouchableOpacity onPress={addNewPiece} style={styles.addButton}>
              <Icon name="add" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        {/* Tabs */}
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: Dimensions.get('window').width }}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={styles.tabIndicator}
              style={styles.tabBar}
            //   labelStyle={styles.tabLabel}
              activeColor="#cc0000"
              inactiveColor="#555"
            />
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Estilos actualizados
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#cc0000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
    padding: 10,
  },
  columnHeaders: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  columnHeader: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pieceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pieceName: {
    fontSize: 14,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  priceText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  summaryContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontWeight: '600',
  },
  summaryValue: {
    fontWeight: 'bold',
  },
  // Estilos para las tabs
  tabBar: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabIndicator: {
    backgroundColor: '#cc0000',
    height: 3,
  },
  tabLabel: {
    fontWeight: 'bold',
    textTransform: 'none',
    fontSize: 14,
  },
  // Estilos para las cards
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
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#cc0000',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardLabel: {
    color: '#555',
  },
  cardValue: {
    fontWeight: '600',
  },
  cardTotal: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default PieceManagementScreen;