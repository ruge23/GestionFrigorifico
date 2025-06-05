// En screens/ExpensesManagementScreen.tsx
import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image, Dimensions, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import { RootState } from '../../redux/store';
import { agregarGasto, actualizarGasto, eliminarGasto } from '../../redux/slices/expensesSlice';
import { FiPlus, FiEdit2, FiTrash2, FiPieChart, FiCalendar, FiDollarSign, FiTrendingUp, FiTrendingDown, FiUser, FiPackage } from 'react-icons/fi';
import { FaMoneyBillWave, FaChartLine } from 'react-icons/fa';

// Componentes
import ExpenseForm from '@/components/expenses/ExpensesForm';
import BalanceChart from '@/components/expenses/BalanceChart';
import { GastoFijo } from '@/components/expenses/expensesTypes';

// Datos de empresa
const COMPANY_DATA = {
  name: "Carnicería Los Helguera",
  logo: require('../../assets/images/LosHelgueraLogo-icon.png'),
};

const { width } = Dimensions.get('window');
const isSmallScreen = width < 400;

export default function ExpensesManagementScreen() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { gastosFijos, balances } = useSelector((state: RootState) => state.expenses);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<GastoFijo | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>('mensual');
  const [showBalance, setShowBalance] = useState(false);

  // Calcular total de gastos
  const totalGastos = gastosFijos.reduce((sum, gasto) => sum + gasto.monto, 0);

  const handleSubmit = (gasto: Omit<GastoFijo, 'id'> | GastoFijo) => {
    if ('id' in gasto) {
      dispatch(actualizarGasto(gasto));
    } else {
      dispatch(agregarGasto(gasto));
    }
    setShowForm(false);
    setEditingExpense(null);
  };

  const handleEdit = (gasto: GastoFijo) => {
    setEditingExpense(gasto);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    dispatch(eliminarGasto(id));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        {/* Header - Versión mejorada */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Image source={COMPANY_DATA.logo} style={styles.logo} />
            <Text style={styles.headerTitle}>Gestión de Gastos</Text>
          </View>
        </View>

        {/* Resumen rápido - Versión más limpia */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <FiDollarSign size={isSmallScreen ? 20 : 24} color="#ffffff" />
            <View style={styles.summaryTextContainer}>
              <Text style={styles.summaryLabel}>Gastos totales</Text>
              <Text style={styles.summaryValue}>
                $ {totalGastos.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              </Text>
            </View>
          </View>
          <View style={styles.summaryItem}>
            <View style={styles.counterBadge}>
              <Text style={styles.counterText}>{gastosFijos.length}</Text>
            </View>
            <View style={styles.summaryTextContainer}>
              <Text style={styles.summaryLabel}>Registros</Text>
              <Text style={styles.summarySubtext}>Este mes</Text>
            </View>
          </View>
        </View>

        {/* Controles principales - Versión más profesional */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => setShowForm(true)}
          >
            <FiPlus size={isSmallScreen ? 16 : 20} color="white" />
            <Text style={styles.buttonText}>{isSmallScreen ? 'Nuevo' : 'Nuevo Gasto'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => setShowBalance(!showBalance)}
          >
            <FaChartLine size={isSmallScreen ? 16 : 20} color="white" />
            <Text style={styles.buttonText}>
              {showBalance ? 'Ocultar' : 'Gráfico'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Gráfico de balance */}
        {showBalance && (
          <View style={styles.chartContainer}>
            <BalanceChart
              period={selectedPeriod}
              balances={balances}
            />
          </View>
        )}

        {/* Formulario de gastos */}
        {showForm && (
          <Modal
            visible={showForm}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
              setShowForm(false);
              setEditingExpense(null);
            }}
          >
            <View style={styles.modalOverlay}>
              <ExpenseForm
                expense={editingExpense}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingExpense(null);
                }}
              />
            </View>
          </Modal>
        )}
        {/* Lista de gastos - Versión mejorada */}
        <ScrollView
          style={styles.expensesList}
          contentContainerStyle={gastosFijos.length === 0 ? styles.emptyListContainer : null}
        >
          {gastosFijos.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No hay gastos registrados</Text>
              <TouchableOpacity
                style={[styles.button, styles.primaryButton, styles.emptyStateButton]}
                onPress={() => setShowForm(true)}
              >
                <FiPlus size={isSmallScreen ? 16 : 20} color="white" />
                <Text style={styles.buttonText}>Agregar Primer Gasto</Text>
              </TouchableOpacity>
            </View>
          ) : (
            gastosFijos.map(gasto => (
              <View key={gasto.id} style={styles.expenseCard}>
                <View style={styles.expenseHeader}>
                  <View style={[
                    styles.categoryIconContainer,
                    { backgroundColor: getCategoryColor(gasto.categoria).bg }
                  ]}>
                    {getCategoryIcon(gasto.categoria)}
                  </View>
                  <View style={styles.expenseInfo}>
                    <Text style={styles.expenseCategory}>
                      {gasto.categoria.charAt(0).toUpperCase() + gasto.categoria.slice(1)}
                    </Text>
                    <Text style={styles.expenseDescription} numberOfLines={1} ellipsizeMode="tail">
                      {gasto.descripcion}
                    </Text>
                  </View>
                  <View style={styles.amountContainer}>
                    <Text style={styles.expenseAmount}>
                      $ {gasto.monto.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                    </Text>
                  </View>
                </View>
                <View style={styles.expenseFooter}>
                  <View style={styles.frequencyBadge}>
                    <FiCalendar size={isSmallScreen ? 12 : 14} color="#6b7280" />
                    <Text style={styles.expenseFrequency}>{gasto.frecuencia}</Text>
                  </View>
                  <View style={styles.expenseActions}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleEdit(gasto)}
                    >
                      <FiEdit2 size={isSmallScreen ? 16 : 18} color="#6b7280" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleDelete(gasto.id)}
                    >
                      <FiTrash2 size={isSmallScreen ? 16 : 18} color="#ef4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Funciones auxiliares para estilos dinámicos
const getCategoryIcon = (category: string) => {
  const size = isSmallScreen ? 16 : 20;
  switch (category) {
    case 'alquiler': return <FaMoneyBillWave size={size} color="#ffffff" />;
    case 'servicios': return <FiPieChart size={size} color="#ffffff" />;
    case 'sueldos': return <FiUser size={size} color="#ffffff" />;
    case 'insumos': return <FiPackage size={size} color="#ffffff" />;
    default: return <FiDollarSign size={size} color="#ffffff" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'alquiler': return { bg: '#ef4444', text: '#ffffff' };
    case 'servicios': return { bg: '#3b82f6', text: '#ffffff' };
    case 'sueldos': return { bg: '#10b981', text: '#ffffff' };
    case 'insumos': return { bg: '#8b5cf6', text: '#ffffff' };
    default: return { bg: '#6b7280', text: '#ffffff' };
  }
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#b91c1c',
    paddingBottom: 15,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: Platform.OS === 'android' ? 10 : 0,
  },
  logo: {
    width: 36,
    height: 36,
    marginRight: 12,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  summaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#b91c1c',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  summaryTextContainer: {
    marginLeft: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#fecaca',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 2,
  },
  summarySubtext: {
    fontSize: 12,
    color: '#fca5a5',
    marginTop: 2,
  },
  counterBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 20,
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButton: {
    backgroundColor: '#b91c1c',
  },
  secondaryButton: {
    backgroundColor: '#1e293b',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  expensesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyStateButton: {
    width: '100%',
  },
  expenseCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  expenseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  expenseInfo: {
    flex: 1,
    marginRight: 8,
    overflow: 'hidden',
  },
  expenseCategory: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  expenseDescription: {
    fontSize: 13,
    color: '#6b7280',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#b91c1c',
  },
  expenseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  frequencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  expenseFrequency: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  expenseActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    padding: 6,
  },
});   