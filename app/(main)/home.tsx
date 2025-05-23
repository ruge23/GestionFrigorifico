import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { CgMenu } from "react-icons/cg";
import { FaUserCircle, FaCashRegister  } from "react-icons/fa";
import { LuBeef } from "react-icons/lu";
import { GiProgression } from "react-icons/gi";
// import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
// import Icon from 'react-native-vector-icons/MaterialIcons'; // Importa íconos profesionales

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Status Bar + Header */}
      <StatusBar backgroundColor="#cc0000" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log("Abrir menú")}>
          <CgMenu size={28} color="#fff" style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Super Carnes Los Helguera</Text>
        <TouchableOpacity onPress={() => console.log("Ir a perfil")}>
          <FaUserCircle size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.gridContainer}>
        {/* Fila superior (50% height) */}
        <View style={styles.topRow}>
          <TouchableOpacity 
            style={styles.gridItem}
            onPress={() => router.push('/category')} 
          >
            <LuBeef size={90} color="#cc0000" />
            <Text style={styles.gridText}>Piezas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => router.push('/sales')}
          >
            <FaCashRegister size={90} color="#cc0000" />
            <Text style={styles.gridText}>Ventas</Text>
          </TouchableOpacity>
        </View>

        {/* Fila inferior (50% height) */}
        <TouchableOpacity 
          style={styles.fullWidthItem}
          onPress={() => router.push('/profitability')}
        >
          <GiProgression size={90} color="#cc0000" />
          <Text style={styles.gridText}>Balance</Text>
        </TouchableOpacity>
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
  menuIcon: {
    marginRight: 10,
  },
  fullWidth: {
    width: '100%',
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