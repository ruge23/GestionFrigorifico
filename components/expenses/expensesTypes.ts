// En types/expenses.ts
export interface GastoFijo {
  id: string;
  categoria: CategoriaGasto;
  descripcion: string;
  monto: number;
  frecuencia: FrecuenciaGasto;
  fechaInicio: string; // ISO date
  activo: boolean;
  notas?: string;
}

export type CategoriaGasto = 
  | 'alquiler' 
  | 'servicios' 
  | 'sueldos' 
  | 'impuestos' 
  | 'insumos' 
  | 'mantenimiento' 
  | 'otros';

export type FrecuenciaGasto = 
  | 'diario' 
  | 'semanal' 
  | 'quincenal' 
  | 'mensual' 
  | 'bimestral' 
  | 'trimestral' 
  | 'semestral' 
  | 'anual';

export interface BalancePeriodo {
  fechaInicio: string;
  fechaFin: string;
  totalGastos: number;
  totalVentas: number;
  balance: number;
  gastosDetallados: {
    categoria: CategoriaGasto;
    total: number;
  }[];
}