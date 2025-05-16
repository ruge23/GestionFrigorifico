import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import React from 'react';


export default function Layout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          // Opciones globales para todas las pantallas
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: '#ffffff' },
        }}
      >
        {/* Pantalla inicial con redirección condicional */}
        <Stack.Screen
          name="index"
          options={{
            animation: 'none', // Sin animación para la pantalla de redirección
          }}
        />

        {/* Pantalla de Login */}
        <Stack.Screen name="login" />

        {/* Pantalla principal */}
        <Stack.Screen 
          name="home" 
          options={{
            gestureEnabled: false, // Deshabilitar gesto de volver atrás
          }}
        />

        {/* Pantalla de categoría con parámetros */}
        <Stack.Screen 
          name="category" 
          options={({ route }) => ({
            title: 'Categoría',
            headerShown: false, // Mostrar header solo aquí
            headerBackTitle: 'Atrás',
          })}
        />

        {/* Gestión de piezas */}
        <Stack.Screen
          name="pieceManagement"
          options={({ route }) => ({
            headerShown: false,
          })}
        />

        {/* Rentabilidad */}
        <Stack.Screen
          name="profitability"
          options={({ route }) => ({
            headerShown: false,
          })}
        />

        {/* Ventas */}
        <Stack.Screen
          name="sales"
          options={({ route }) => ({
            headerShown: false,
          })}
        />
      </Stack>
    </Provider>
  );
}