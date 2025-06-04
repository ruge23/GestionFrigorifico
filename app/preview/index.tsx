import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { AppState } from 'react-native';
import { styles } from '../../components/sales/salesStyles';

type RootStackParamList = {
  SalesForm: undefined;
  // Agrega otras rutas según sea necesario
};

type PreviewScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SalesForm'>;

const SalesPreviewScreen = () => {
  const navigation = useNavigation<PreviewScreenNavigationProp>();
  const { ventaActual } = useSelector((state: RootState) => state.ventas);
  
  if (!ventaActual || ventaActual.items.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>No hay items en la venta</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#FF4C4C' }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Calcular totales
  const subtotal = ventaActual.items.reduce((sum, item) => sum + item.total, 0);
  const taxRate = 21; // IVA 21%
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal + taxAmount;

  // Generar HTML para el PDF
  const generateInvoiceHTML = (): string => {
    const itemsHTML = ventaActual.items.map(item => `
      <tr>
        <td>${item.nombre}</td>
        <td>${item.kilos.toFixed(2)} kg</td>
        <td>$ ${item.precioUnitario.toLocaleString('es-AR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}</td>
        <td>$ ${item.total.toLocaleString('es-AR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}</td>
      </tr>
    `).join('');

    return `
      <html>
        <head>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 0;
              padding: 20px;
              color: #333;
              font-size: 14px;
              line-height: 1.4;
            }
            h1 {
              font-size: 18px;
              color: #222;
              text-align: center;
              margin: 10px 0;
              padding-bottom: 10px;
              border-bottom: 2px solid #444;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin: 15px 0;
            }
            th, td { 
              border: 1px solid #ddd; 
              padding: 8px; 
              text-align: left;
            }
            th {
              background-color: #444;
              color: white;
              font-weight: bold;
            }
            .totals {
              margin-top: 20px;
              text-align: right;
            }
            .totals p {
              margin: 5px;
            }
            .signature { 
              margin-top: 60px;
            }
            .signature p {
              margin: 25px 0 0 0;
            }
            .divider {
              border-top: 1px solid #000;
              margin: 10px 0;
            }
          </style>
        </head>
        <body>
          <h1>Factura de Venta</h1>
          <p>Fecha: ${new Date().toLocaleDateString()}</p>
          
          <table>
            <tr>
              <th>PRODUCTO</th>
              <th>KILOS</th>
              <th>PRECIO UNITARIO</th>
              <th>TOTAL</th>
            </tr>
            ${itemsHTML}
          </table>

          <div class="divider"></div>
          
          <div class="totals">
            <p>SUB-TOTAL: $ ${subtotal.toLocaleString('es-AR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}</p>
            <p>IVA (${taxRate}%): $ ${taxAmount.toLocaleString('es-AR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}</p>
            <p>TOTAL: $ ${total.toLocaleString('es-AR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}</p>
          </div>

          <div class="signature">
            <p>Firma del vendedor</p>
            <p>Firma del cliente</p>
          </div>
        </body>
      </html>
    `;
  };

  const generatePDF = async (): Promise<void> => {
    try {
      const html = generateInvoiceHTML();
      const { uri: tempUri } = await Print.printToFileAsync({
        html,
        width: 595, 
        height: 842,
        base64: false,
      });

      // Crear nombre personalizado para el archivo
      const newFileName = `venta-${Date.now()}.pdf`;
      const directory = FileSystem.cacheDirectory;
      const newUri = `${directory}${newFileName}`;

      // Renombrar/mover el archivo
      await FileSystem.moveAsync({
        from: tempUri,
        to: newUri
      });

      if (await Sharing.isAvailableAsync()) {
        const subscription = AppState.addEventListener('change', async (nextAppState) => {
          if (nextAppState === 'active') {
            // Aquí podrías despachar una acción para limpiar la venta actual si es necesario
            navigation.reset({
              index: 0,
              routes: [{ name: 'SalesForm' }],
            });
            subscription.remove();
          }
        });
        
        await Sharing.shareAsync(newUri, {
          dialogTitle: 'Compartir factura',
          mimeType: 'application/pdf',
          UTI: 'com.adobe.pdf'
        });
      }
    } catch (error) {
      console.error('Error al generar PDF:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Resumen de Venta</Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableHeader, styles.tableCell]}>Producto</Text>
              <Text style={[styles.tableHeader, styles.tableCell]}>Kilos</Text>
              <Text style={[styles.tableHeader, styles.tableCell]}>Precio Unitario</Text>
              <Text style={[styles.tableHeader, styles.tableCell]}>Total</Text>
            </View>

            {ventaActual.items.map((item, index) => (
              <View key={`item-${index}`} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.nombre}</Text>
                <Text style={styles.tableCell}>{item.kilos.toFixed(2)} kg</Text>
                <Text style={styles.tableCell}>$ {item.precioUnitario.toLocaleString('es-AR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}</Text>
                <Text style={styles.tableCell}>$ {item.total.toLocaleString('es-AR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}</Text>
              </View>
            ))}
          </View>

          <View style={styles.totalsContainer}>
            <Text style={styles.totalText}>
              Sub-total: $ {subtotal.toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </Text>
            <Text style={styles.totalText}>
              IVA (21%): $ {taxAmount.toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </Text>
            <Text style={styles.grandTotal}>
              Total: $ {total.toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#4CAF50' }]}
              onPress={generatePDF}
            >
              <MaterialIcons name="picture-as-pdf" size={24} color="white" />
              <Text style={styles.buttonText}>Generar PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#FF4C4C' }]}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
              <Text style={styles.buttonText}>Volver</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Añade estos estilos a tu archivo salesStyles.ts
const previewStyles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  tableHeader: {
    fontWeight: 'bold',
    backgroundColor: '#333',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    textAlign: 'center',
    color: '#333',
  },
  totalsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    width: '100%',
  },
  totalText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
    marginVertical: 3,
  },
  grandTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 5,
    minWidth: '48%',
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SalesPreviewScreen;