import React from 'react';
import { router } from 'expo-router';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#cc0000" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categorias</Text>
      </View>
      <View style={styles.gridContainer}>
        {/* Fila superior (50% height) */}
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => router.push('/pieceManagement')}
          >
            <MaterialCommunityIcons name="cow" size={50} color="#cc0000" />
            <Text style={styles.gridText}>Carne Vacuna</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => router.push('/pieceManagementPig')}
          >
            <MaterialCommunityIcons name="pig" size={50} color="#cc0000" />
            <Text style={styles.gridText}>Carne Porcina</Text>
          </TouchableOpacity>
        </View>

        {/* Fila inferior (50% height) */}
        <View style={styles.topRow}>
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => router.push('/pieceManagementEmb')}
          >
            <MaterialCommunityIcons name="food-hot-dog" size={50} color="#cc0000" />
            <Text style={styles.gridText}>Embutidos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.gridItem}>
            <MaterialIcons name="local-grocery-store" size={50} color="#cc0000" />
            <Text style={styles.gridText}>Otros</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#cc0000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center', // Título centrado
    marginHorizontal: 10, // Evita solapamiento
  },
  gridContainer: {
    flex: 1, // Ocupa todo el espacio disponible
  },
  topRow: {
    flex: 0.5, // 50% del height
    flexDirection: 'row',
  },
  gridItem: {
    flex: 1, // Cada botón ocupa 50% del ancho
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5, // Mínimo margen para separación visual
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fullWidthItem: {
    flex: 0.5, // 50% del height
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
});

export default HomeScreen;
