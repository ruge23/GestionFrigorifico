import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { AppState } from 'react-native';
import { styles } from '../../components/sales/salesStyles';
import { 
  FiFileText, 
  FiPrinter, 
  FiShare2, 
  FiArrowLeft,
  FiDollarSign,
  FiPackage,
  FiTruck,
  FiUser 
} from 'react-icons/fi';
import { FaRegFilePdf, FaArrowLeft } from 'react-icons/fa';

// Tipos para navegación
type RootStackParamList = {
  SalesForm: undefined;
  Home: undefined;
};

type PreviewScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SalesForm'>;

// Datos de empresa por defecto
const COMPANY_DATA = {
  name: "Carnicería Premium S.A.",
  address: "Av. Corrientes 1234, CABA",
  phone: "(011) 1234-5678",
  email: "ventas@carnespremium.com",
  cuit: "30-12345678-9",
  logo: require('../../assets/images/LosHelgueraLogo-icon.png'), // Asegúrate de tener este archivo
  invoicePrefix: "FAC-",
  invoiceNumber: "0001-00000001"
};

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
            <FaArrowLeft size={16} color="white" />
            <Text style={styles.buttonText}> Volver</Text>
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

  // Generar HTML para el PDF profesional
  const generateInvoiceHTML = (): string => {
    const itemsHTML = ventaActual.items.map(item => `
      <tr>
        <td style="border-bottom: 1px solid #eee; padding: 8px;">${item.nombre}</td>
        <td style="border-bottom: 1px solid #eee; padding: 8px; text-align: center;">${item.kilos.toFixed(2)} kg</td>
        <td style="border-bottom: 1px solid #eee; padding: 8px; text-align: right;">$ ${item.precioUnitario.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        <td style="border-bottom: 1px solid #eee; padding: 8px; text-align: right;">$ ${item.total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
      </tr>
    `).join('');

    return `
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
            
            body {
              font-family: 'Roboto', sans-serif;
              margin: 0;
              padding: 20px;
              color: #333;
              font-size: 12px;
              line-height: 1.5;
            }
            .invoice-container {
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #eee;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
            }
            .header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
              padding-bottom: 20px;
              border-bottom: 1px solid #eee;
            }
            .logo {
              max-width: 150px;
              max-height: 80px;
            }
            .invoice-info {
              text-align: right;
            }
            h1 {
              font-size: 24px;
              color: #333;
              margin: 0 0 10px 0;
            }
            h2 {
              font-size: 18px;
              color: #555;
              margin: 20px 0 10px 0;
            }
            .client-info, .company-info {
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            th {
              background-color: #f5f5f5;
              padding: 10px;
              text-align: left;
              font-weight: 500;
              border-bottom: 2px solid #ddd;
            }
            td {
              padding: 8px;
              border-bottom: 1px solid #eee;
            }
            .text-right {
              text-align: right;
            }
            .text-center {
              text-align: center;
            }
            .totals {
              margin-top: 20px;
              float: right;
              width: 300px;
            }
            .totals table {
              width: 100%;
            }
            .totals td {
              border: none;
              padding: 5px;
            }
            .totals td:last-child {
              text-align: right;
              font-weight: 500;
            }
            .grand-total {
              font-weight: 700;
              font-size: 14px;
              color: #000;
            }
            .footer {
              margin-top: 50px;
              padding-top: 20px;
              border-top: 1px solid #eee;
              text-align: center;
              font-size: 11px;
              color: #777;
            }
            .signature {
              margin-top: 60px;
              display: flex;
              justify-content: space-between;
            }
            .signature-box {
              width: 200px;
              border-top: 1px solid #333;
              padding-top: 5px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="header">
              <div class="company-info">
                <h1>${COMPANY_DATA.name}</h1>
                <p>${COMPANY_DATA.address}</p>
                <p>Tel: ${COMPANY_DATA.phone} | Email: ${COMPANY_DATA.email}</p>
                <p>CUIT: ${COMPANY_DATA.cuit}</p>
              </div>
              <div class="invoice-info">
                <h1>FACTURA</h1>
                <p>N°: ${COMPANY_DATA.invoicePrefix}${COMPANY_DATA.invoiceNumber}</p>
                <p>Fecha: ${new Date().toLocaleDateString('es-AR')}</p>
              </div>
            </div>

            <div class="client-info">
              <h2>Datos del Cliente</h2>
              <p><strong>Nombre:</strong> Consumidor Final</p>
              <p><strong>CUIT/DNI:</strong> 00-00000000-0</p>
            </div>

            <h2>Detalle de Productos</h2>
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th class="text-center">Cantidad</th>
                  <th class="text-right">Precio Unitario</th>
                  <th class="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHTML}
              </tbody>
            </table>

            <div class="totals">
              <table>
                <tr>
                  <td>Subtotal:</td>
                  <td>$ ${subtotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                </tr>
                <tr>
                  <td>IVA (${taxRate}%):</td>
                  <td>$ ${taxAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                </tr>
                <tr>
                  <td class="grand-total">Total:</td>
                  <td class="grand-total">$ ${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                </tr>
              </table>
            </div>

            <div class="signature">
              <div class="signature-box">
                <p>Firma del Vendedor</p>
              </div>
              <div class="signature-box">
                <p>Firma del Cliente</p>
              </div>
            </div>

            <div class="footer">
              <p>${COMPANY_DATA.name} - ${COMPANY_DATA.address} - Tel: ${COMPANY_DATA.phone}</p>
              <p>Gracias por su compra!</p>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  const generatePDF = async (): Promise<void> => {
    try {
      const html = generateInvoiceHTML();
      const { uri } = await Print.printToFileAsync({
        html,
        width: 595,
        height: 842,
        base64: false,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          dialogTitle: 'Compartir Factura',
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
          {/* Encabezado de factura */}
          <View style={invoiceStyles.header}>
            <Image source={COMPANY_DATA.logo} style={invoiceStyles.logo} />
            <View style={invoiceStyles.invoiceInfo}>
              <Text style={invoiceStyles.invoiceTitle}>FACTURA</Text>
              <Text style={invoiceStyles.invoiceNumber}>{COMPANY_DATA.invoicePrefix}{COMPANY_DATA.invoiceNumber}</Text>
              <Text style={invoiceStyles.invoiceDate}>
                Fecha: {new Date().toLocaleDateString('es-AR')}
              </Text>
            </View>
          </View>

          {/* Datos de la empresa */}
          <View style={invoiceStyles.companyInfo}>
            <Text style={invoiceStyles.companyName}>{COMPANY_DATA.name}</Text>
            <Text style={invoiceStyles.companyDetail}>{COMPANY_DATA.address}</Text>
            <Text style={invoiceStyles.companyDetail}>Tel: {COMPANY_DATA.phone} | CUIT: {COMPANY_DATA.cuit}</Text>
          </View>

          {/* Datos del cliente */}
          <View style={invoiceStyles.clientInfo}>
            <Text style={invoiceStyles.sectionTitle}>Datos del Cliente</Text>
            <Text style={invoiceStyles.clientDetail}>Nombre: Consumidor Final</Text>
            <Text style={invoiceStyles.clientDetail}>CUIT/DNI: 00-00000000-0</Text>
          </View>

          {/* Tabla de productos */}
          <Text style={invoiceStyles.sectionTitle}>Detalle de Productos</Text>
          <View style={invoiceStyles.table}>
            <View style={invoiceStyles.tableHeaderRow}>
              <Text style={[invoiceStyles.tableHeaderCell, { flex: 3 }]}>Producto</Text>
              <Text style={[invoiceStyles.tableHeaderCell, { flex: 1 }]}>Kilos</Text>
              <Text style={[invoiceStyles.tableHeaderCell, { flex: 2 }]}>Precio Unitario</Text>
              <Text style={[invoiceStyles.tableHeaderCell, { flex: 2 }]}>Total</Text>
            </View>

            {ventaActual.items.map((item, index) => (
              <View key={`item-${index}`} style={invoiceStyles.tableRow}>
                <Text style={[invoiceStyles.tableCell, { flex: 3 }]}>{item.nombre}</Text>
                <Text style={[invoiceStyles.tableCell, { flex: 1, textAlign: 'center' }]}>{item.kilos.toFixed(2)} kg</Text>
                <Text style={[invoiceStyles.tableCell, { flex: 2, textAlign: 'right' }]}>
                  $ {item.precioUnitario.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Text>
                <Text style={[invoiceStyles.tableCell, { flex: 2, textAlign: 'right' }]}>
                  $ {item.total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Text>
              </View>
            ))}
          </View>

          {/* Totales */}
          <View style={invoiceStyles.totalsContainer}>
            <View style={invoiceStyles.totalRow}>
              <Text style={invoiceStyles.totalLabel}>Subtotal:</Text>
              <Text style={invoiceStyles.totalValue}>
                $ {subtotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            </View>
            <View style={invoiceStyles.totalRow}>
              <Text style={invoiceStyles.totalLabel}>IVA (21%):</Text>
              <Text style={invoiceStyles.totalValue}>
                $ {taxAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            </View>
            <View style={[invoiceStyles.totalRow, invoiceStyles.grandTotalRow]}>
              <Text style={invoiceStyles.grandTotalLabel}>Total:</Text>
              <Text style={invoiceStyles.grandTotalValue}>
                $ {total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Text>
            </View>
          </View>

          {/* Firmas */}
          <View style={invoiceStyles.signatureContainer}>
            <View style={invoiceStyles.signatureBox}>
              <View style={invoiceStyles.signatureLine} />
              <Text style={invoiceStyles.signatureText}>Firma del Vendedor</Text>
            </View>
            <View style={invoiceStyles.signatureBox}>
              <View style={invoiceStyles.signatureLine} />
              <Text style={invoiceStyles.signatureText}>Firma del Cliente</Text>
            </View>
          </View>

          {/* Pie de página */}
          <Text style={invoiceStyles.footerText}>
            {COMPANY_DATA.name} - {COMPANY_DATA.address} - Tel: {COMPANY_DATA.phone}
          </Text>
          <Text style={invoiceStyles.footerThankYou}>¡Gracias por su compra!</Text>

          {/* Botones de acción */}
          <View style={invoiceStyles.buttonContainer}>
            <TouchableOpacity
              style={[invoiceStyles.button, invoiceStyles.pdfButton]}
              onPress={generatePDF}
            >
              <FaRegFilePdf size={20} color="white" />
              <Text style={invoiceStyles.buttonText}> Generar PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[invoiceStyles.button, invoiceStyles.backButton]}
              onPress={() => navigation.goBack()}
            >
              <FaArrowLeft size={20} color="white" />
              <Text style={invoiceStyles.buttonText}> Volver</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Estilos para la factura
const invoiceStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    width: 120,
    height: 60,
    resizeMode: 'contain',
  },
  invoiceInfo: {
    alignItems: 'flex-end',
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  invoiceNumber: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  invoiceDate: {
    fontSize: 14,
    color: '#777',
  },
  companyInfo: {
    marginBottom: 20,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  companyDetail: {
    fontSize: 14,
    color: '#555',
  },
  clientInfo: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  clientDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  table: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeaderCell: {
    fontWeight: '500',
    paddingHorizontal: 8,
    color: '#333',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableCell: {
    paddingHorizontal: 8,
    color: '#333',
  },
  totalsContainer: {
    alignSelf: 'flex-end',
    width: '60%',
    marginTop: 20,
    marginBottom: 30,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: '#555',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  grandTotalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  grandTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  grandTotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  signatureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 60,
    marginBottom: 30,
  },
  signatureBox: {
    width: '40%',
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    marginBottom: 5,
  },
  signatureText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#555',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#777',
    marginTop: 20,
  },
  footerThankYou: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    marginTop: 5,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '48%',
  },
  pdfButton: {
    backgroundColor: '#d32f2f',
  },
  backButton: {
    backgroundColor: '#757575',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default SalesPreviewScreen;