import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{
          // Opciones globales para todas las pantallas
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: '#ffffff' },
        }}>
        <Stack.Screen name="(auth)"  />
        <Stack.Screen name="(main)" />
        {/* <Stack.Screen name="category" />
        <Stack.Screen name="pieceManagement" />
        <Stack.Screen name="profitability" />
        <Stack.Screen name="sales" /> */}
      </Stack>
    </Provider>
  );
}