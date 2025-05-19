import { RootStackParamList } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
// import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login, loginFailure } from '@/redux/slices/loginSlice';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'login'>;

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = () => {
    setUsernameError('');
    setPasswordError('');
    let isValid = true;

    if (!username.trim()) {
      setUsernameError('Por favor ingresa tu nombre de usuario');
      isValid = false;
    }
    if (!password) {
      setPasswordError('Por favor ingresa tu contraseña');
      isValid = false;
    }
    if (!isValid) return;

    setIsLoading(true);
    
    setTimeout(() => {
      const normalizedUsername = username.toLowerCase().trim();
      console.log('Intento de login con:', { normalizedUsername, password }); // Debug

      if ((normalizedUsername === 'francisco' && password === '357987')) {
        dispatch(login({ username: normalizedUsername }));
        router.push('/home')
      } else {
        dispatch(loginFailure({error: 'Credenciales incorrectas'}));
        setUsernameError('Credenciales incorrectas');
        setPasswordError('Credenciales incorrectas');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.content}>
          <View style={styles.formContainer}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <Image
                source={require('../../assets/images/LosHelgueraLogo.jpg')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.title}>Super Carnes Los Helguera</Text>
            <Text style={styles.subtitle}>Ingresa tus credenciales</Text>

            {/* Usuario */}
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, usernameError ? styles.inputError : null]}
                placeholder="Usuario"
                placeholderTextColor="#666"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
              {usernameError && (
                <Text style={styles.errorText}>{usernameError}</Text>
              )}
            </View>

            {/* Contraseña */}
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, passwordError ? styles.inputError : null]}
                placeholder="Contraseña"
                placeholderTextColor="#666"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError('');
                }}
              />
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <MaterialIcons
                  name={showPassword ? 'visibility-off' : 'visibility'}
                  size={24}
                  color="#666"
                />
              </TouchableOpacity>
            </View>
            {passwordError && (
              <Text style={styles.errorText}>{passwordError}</Text>
            )}

            {/* Botón */}
            <TouchableOpacity
              style={[
                styles.button,
                isLoading ? styles.buttonDisabled : null
              ]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#fff" />
                  <Text style={styles.loadingText}>Cargando...</Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>Ingresar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    
  },
  logo: {
    width: 320,
    height: 350,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    color: '#000',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 15,
    elevation: 1,
  },
  inputError: {
    borderColor: '#b00020',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  toggleButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
    padding: 6,
  },
  errorText: {
    color: '#b00020',
    fontSize: 12,
    marginTop: 5,
    paddingLeft: 5,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
});


export default LoginScreen;
