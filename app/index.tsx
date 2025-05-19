import { Redirect } from 'expo-router';

export default function Index() {
	console.log("Redireccionando..."); // Debe aparecer en los logs
	return <Redirect href="/(auth)/login" />;
}