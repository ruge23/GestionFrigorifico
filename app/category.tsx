import React from 'react';
import { router } from 'expo-router';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';


const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Super Carnes Los Helguera</Text>

          <View style={styles.grid}>
            {/* Piezas */}
            <TouchableOpacity style={styles.gridItem}
              onPress={() => router.push('/pieceManagement')} 
            >
              <Text style={styles.gridText}>Piezas</Text>
            </TouchableOpacity>

            {/* Ventas */}
            <TouchableOpacity style={styles.gridItem}>
              <Text style={styles.gridText}>Ventas</Text>
            </TouchableOpacity>

            {/* Balance */}
            <TouchableOpacity style={[styles.gridItem, styles.fullWidth]}>
              <Text style={styles.gridText}>Balance</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.exitButton}>
            <Text style={styles.exitButtonText}>Salir</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 30,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    height: 200,
    backgroundColor: '#cc0000',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  fullWidth: {
    width: '100%',
  },
  gridText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
  exitButton: {
    marginTop: 138,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: '#000000',
    alignSelf: 'center',
  },
  exitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
