import { Tabs } from 'expo-router';
import { FaListUl } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
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
					<Text style={styles.headerTitle}>Gestión de Despieces</Text>
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
							title: 'Ver Piezas',
							tabBarIcon: ({ color }) => (
								<FaListUl size={24} color={color} />
							),
						}}
					/>
					<Tabs.Screen
						name="edit"
						options={{
							title: 'Editar Piezas',
							tabBarIcon: ({ color }) => (
								<CiEdit size={24} color={color} />
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