import React, { useState } from 'react';
import { router } from 'expo-router';
import { SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ProductCategoryPicker from './ProductCategoryPicker';
import ProductPicker from './ProductPicker';
import KilosInput from './KilosInput';
import CurrentItemSummary from './CurrentItemSummary';
import SalesButtons from './SalesButtons';
import AddedItemsList from './AddedItemsList';
import GrandTotalSummary from './GrandTotalSummary';
import { styles } from './salesStyles';
import { parseArgentineKilos, parseArgentinePrice } from './salesUtils';
import { cortesDeCarne, cortesDeCerdo, embutidos, ImageKeys, otros, PieceType } from '../../constants';
import { agregarItemVenta, eliminarItemVenta, finalizarVenta } from '../../redux/slices/ventasSlice';
import { ItemVenta } from './salesTypes';

const SalesForm = () => {
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [selectedPiece, setSelectedPiece] = useState<string>('');
	const [kilos, setKilos] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedPieceData, setSelectedPieceData] = useState<PieceType | null>(null);

	const dispatch = useDispatch();
	const { ventaActual } = useSelector((state: RootState) => state.ventas);

	const getPiecesByCategory = (): PieceType[] => {
		switch (selectedCategory) {
			case 'vacuna': return cortesDeCarne;
			case 'porcina': return cortesDeCerdo;
			case 'embutidos': return embutidos;
			case 'otros': return otros;
			default: return [];
		}
	};

	const handleAddItem = () => {
  if (!selectedCategory || !selectedPiece || !kilos || isNaN(parseArgentineKilos(kilos)) || parseArgentineKilos(kilos) <= 0) {
    alert('Por favor complete todos los campos correctamente');
    return;
  }

  setIsLoading(true);

  setTimeout(() => {
    const pieces = getPiecesByCategory();
    const piece = pieces.find(p => p.nombre === selectedPiece);

    if (piece) {
      // Asegúrate que piece.imagen sea de tipo ImageKeys
      const newItem: ItemVenta = {
        id: Date.now().toString(),
        nombre: piece.nombre,
        precioUnitario: parseArgentinePrice(piece.precio),
        kilos: parseArgentineKilos(kilos),
        total: parseArgentinePrice(piece.precio) * parseArgentineKilos(kilos),
        imagen: piece.imagen as ImageKeys // Conversión de tipo aquí
      };

      dispatch(agregarItemVenta(newItem));
      setSelectedCategory('');
      setSelectedPiece('');
      setSelectedPieceData(null);
      setKilos('');
    }

    setIsLoading(false);
  }, 500);
};

	const handleFinalizeSale = () => {
  if (ventaActual.items.length === 0) {
    alert('Por favor agrega al menos un item a la venta');
    return;
  }
  router.push('/preview'); // Asegúrate de tener esta ruta configurada
};

	const removeItem = (id: string) => {
		dispatch(eliminarItemVenta(id));
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.container}
			>
				<ScrollView contentContainerStyle={styles.scrollContainer}>
					<View style={styles.formContainer}>
						<Text style={styles.title}>Agregar Venta</Text>

						<ProductCategoryPicker
							selectedCategory={selectedCategory}
							setSelectedCategory={setSelectedCategory}
							setSelectedPiece={setSelectedPiece}
							setSelectedPieceData={setSelectedPieceData}
						/>

						{selectedCategory && (
							<ProductPicker
								selectedCategory={selectedCategory}
								selectedPiece={selectedPiece}
								setSelectedPiece={setSelectedPiece}
								setKilos={setKilos}
								setSelectedPieceData={setSelectedPieceData}
							/>
						)}

						{selectedPiece && (
							<KilosInput
								kilos={kilos}
								setKilos={setKilos}
							/>
						)}

						{selectedPieceData && kilos && !isNaN(parseArgentineKilos(kilos)) && parseArgentineKilos(kilos) > 0 && (
							<CurrentItemSummary
								selectedPieceData={selectedPieceData}
								kilos={kilos}
							/>
						)}

						<SalesButtons
							selectedCategory={selectedCategory}
							selectedPiece={selectedPiece}
							kilos={kilos}
							isLoading={isLoading}
							handleAddItem={handleAddItem}
							ventaActual={ventaActual}
							handleFinalizeSale={handleFinalizeSale}
						/>

						{ventaActual.items.length > 0 && (
              <>
                <AddedItemsList
                  ventaActual={ventaActual}
                  removeItem={removeItem}
                />
                <GrandTotalSummary ventaActual={ventaActual} />
              </>
            )}
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default SalesForm;