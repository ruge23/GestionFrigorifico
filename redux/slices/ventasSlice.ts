import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductoVenta {
	id: string;
	nombre: string;
	precioUnitario: number;
	kilos: number;
	total: number;
	imagen: string; // Nueva propiedad para la imagen
}

interface VentaState {
	items: ProductoVenta[];
	total: number;
	ventaActual: {
		items: ProductoVenta[];
		total: number;
	};
}

const initialState: VentaState = {
	items: [],
	total: 0,
	ventaActual: {
		items: [],
		total: 0
	}
};

const ventasSlice = createSlice({
	name: 'ventas',
	initialState,
	reducers: {
		agregarItemVenta: (state, action: PayloadAction<ProductoVenta>) => {
			state.ventaActual.items.push(action.payload);
			state.ventaActual.total = state.ventaActual.items.reduce((sum, item) => sum + item.total, 0);
		},
		eliminarItemVenta: (state, action: PayloadAction<string>) => {
			state.ventaActual.items = state.ventaActual.items.filter(item => item.id !== action.payload);
			state.ventaActual.total = state.ventaActual.items.reduce((sum, item) => sum + item.total, 0);
		},
		finalizarVenta: (state) => {
			state.items = [...state.items, ...state.ventaActual.items];
			state.total += state.ventaActual.total;
			state.ventaActual = {
				items: [],
				total: 0
			};
		},
		limpiarVentaActual: (state) => {
			state.ventaActual = {
				items: [],
				total: 0
			};
		}
	}
});

export const { agregarItemVenta, eliminarItemVenta, finalizarVenta, limpiarVentaActual } = ventasSlice.actions;
export default ventasSlice.reducer;