import { Tabs } from 'expo-router';
import { MdFormatListBulletedAdd } from "react-icons/md";
import { BsUpcScan } from "react-icons/bs";
import { KeyboardAvoidingView, SafeAreaView, View, Text, Platform, StyleSheet } from 'react-native';

export default function Layout() {
	return (
		<SafeAreaView style={styles.safeArea}>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.container}
			>
				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.headerTitle}>Gestión de Ventas</Text>
					{/* Boton de Agregar Piezas */}
					{/* {index === 1 && (
            <TouchableOpacity onPress={addNewPiece} style={styles.addButton}>
              <Icon name="add" size={24} color="#fff" />
            </TouchableOpacity>
          )} */}
				</View>
				<Tabs
					screenOptions={{
						tabBarActiveTintColor: '#cc0000',
						headerShown: false
					}}
				>
					<Tabs.Screen
						name="index"
						options={{
							title: 'Agregar Venta',
							tabBarIcon: ({ color }) => (
								<MdFormatListBulletedAdd size={24} color={color} />
							),
						}}
					/>
					<Tabs.Screen
						name="scanSale"
						options={{
							title: 'Scanear Venta',
							tabBarIcon: ({ color }) => (
								<BsUpcScan size={24} color={color} />
							),
						}}
					/>
				</Tabs>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: '#fff',
	},
	container: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 15,
		backgroundColor: '#cc0000',
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#fff',
	}
})