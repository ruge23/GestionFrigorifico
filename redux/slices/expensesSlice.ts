import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GastoFijo, BalancePeriodo } from '../../components/expenses/expensesTypes';

interface ExpensesState {
	gastosFijos: GastoFijo[];
	balances: BalancePeriodo[];
}

const initialState: ExpensesState = {
	gastosFijos: [],
	balances: []
};

const expensesSlice = createSlice({
	name: 'expenses',
	initialState,
	reducers: {
		agregarGasto: (state, action: PayloadAction<Omit<GastoFijo, 'id'>>) => {
			const newGasto = {
				...action.payload,
				id: Date.now().toString(),
				activo: true
			};
			state.gastosFijos.push(newGasto);
		},
		actualizarGasto: (state, action: PayloadAction<GastoFijo>) => {
			const index = state.gastosFijos.findIndex(g => g.id === action.payload.id);
			if (index !== -1) {
				state.gastosFijos[index] = action.payload;
			}
		},
		eliminarGasto: (state, action: PayloadAction<string>) => {
			state.gastosFijos = state.gastosFijos.filter(g => g.id !== action.payload);
		},
		calcularBalance: (state, action: PayloadAction<{ fechaInicio: string; fechaFin: string }>) => {
			// Lógica para calcular balance basado en ventas y gastos
			// Esto requeriría acceder también al estado de ventas
		},
		// Otros reducers según necesidad
	},
});

export const { agregarGasto, actualizarGasto, eliminarGasto, calcularBalance } = expensesSlice.actions;
export default expensesSlice.reducer;