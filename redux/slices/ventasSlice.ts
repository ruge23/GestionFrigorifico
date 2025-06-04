// En tu ventasSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ImageKeys } from '../../constants';

interface ItemVenta {
  id: string;
  nombre: string;
  precioUnitario: number;
  kilos: number;
  total: number;
  imagen: ImageKeys;
}

interface VentaState {
  ventaActual: {
    items: ItemVenta[];
    total: number;
    fecha: string;
  };
}

const initialState: VentaState = {
  ventaActual: {
    items: [],
    total: 0, 
    fecha: new Date().toISOString(),
  },
};

const ventasSlice = createSlice({
  name: 'ventas',
  initialState,
  reducers: {
    agregarItemVenta(state, action: PayloadAction<ItemVenta>) {
      state.ventaActual.items.push(action.payload);
      state.ventaActual.total = state.ventaActual.items.reduce((sum, item) => sum + item.total, 0);
    },
    eliminarItemVenta(state, action: PayloadAction<string>) {
      state.ventaActual.items = state.ventaActual.items.filter(item => item.id !== action.payload);
      state.ventaActual.total = state.ventaActual.items.reduce((sum, item) => sum + item.total, 0);
    },
    finalizarVenta(state) {
      // Reiniciamos manteniendo la estructura correcta
      state.ventaActual = { 
        items: [], 
        total: 0, 
        fecha: new Date().toISOString() 
      };
    },
  },
});

export const { agregarItemVenta, eliminarItemVenta, finalizarVenta } = ventasSlice.actions;
export default ventasSlice.reducer;