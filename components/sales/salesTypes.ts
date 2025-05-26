import { ImageKeys, PieceType } from '../../constants';

export interface SalesFormProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedPiece: string;
  setSelectedPiece: (value: string) => void;
  kilos: string;
  setKilos: (value: string) => void;
  selectedPieceData: PieceType | null;
  setSelectedPieceData: (value: PieceType | null) => void;
  isLoading: boolean;
  handleAddItem: () => void;
  removeItem: (id: string) => void;
  handleFinalizeSale: () => void;
}

export interface ProductCategoryPickerProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  setSelectedPiece: (value: string) => void;
  setSelectedPieceData: (value: PieceType | null) => void;
}

export interface ProductPickerProps {
  selectedCategory: string;
  selectedPiece: string;
  setSelectedPiece: (value: string) => void;
  setKilos: (value: string) => void;
  setSelectedPieceData: (value: PieceType | null) => void;
}

export interface KilosInputProps {
  kilos: string;
  setKilos: (value: string) => void;
}

export interface CurrentItemSummaryProps {
  selectedPieceData: PieceType;
  kilos: string;
}

export interface AddedItemsListProps {
  ventaActual: {
    items: Array<{
			imagen: any;
      id: string;
      nombre: string;
      precioUnitario: number;
      kilos: number;
      total: number;
    }>;
    total: number;
  };
  removeItem: (id: string) => void;
  imageMap?: Record<string, any>; // Mapa de imágenes
}

export interface GrandTotalSummaryProps {
  ventaActual: {
    total: number;
  };
}

export interface SalesButtonsProps {
  selectedCategory: string;
  selectedPiece: string;
  kilos: string;
  isLoading: boolean;
  handleAddItem: () => void;
  ventaActual: {
    items: Array<unknown>;
  };
  handleFinalizeSale: () => void;
}

export interface VentaItem {
  id: string;
  nombre: string;
  precioUnitario: number;
  kilos: number;
  total: number;
  imagen: ImageKeys; // Ahora es obligatoria
}