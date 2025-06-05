import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { FiX, FiSave, FiDollarSign, FiCalendar, FiFileText, FiTag } from 'react-icons/fi';
import { FaMoneyBillWave, FaChartPie, FaUserTie, FaBoxes } from 'react-icons/fa';
import { CategoriaGasto, FrecuenciaGasto, GastoFijo } from '../../components/expenses/expensesTypes';

interface ExpenseFormProps {
  expense?: GastoFijo;
  onSubmit: (gasto: Omit<GastoFijo, 'id'> | GastoFijo) => void;
  onCancel: () => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ expense, onSubmit, onCancel }) => {
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState<CategoriaGasto>('otros');
  const [frecuencia, setFrecuencia] = useState<FrecuenciaGasto>('mensual');
  const [notas, setNotas] = useState('');

  useEffect(() => {
    if (expense) {
      setDescripcion(expense.descripcion);
      setMonto(expense.monto.toString());
      setCategoria(expense.categoria);
      setFrecuencia(expense.frecuencia);
      setNotas(expense.notas || '');
    }
  }, [expense]);

  const handleSubmit = () => {
    const gastoData = {
      descripcion,
      monto: parseFloat(monto),
      categoria,
      frecuencia,
      fechaInicio: new Date().toISOString(),
      notas: notas || undefined
    };

    if (expense) {
      onSubmit({ ...gastoData, id: expense.id });
    } else {
      onSubmit(gastoData);
    }
  };

  const getCategoryIcon = (cat: string, size = 18) => {
    switch(cat) {
      case 'alquiler': return <FaMoneyBillWave size={size} color="#ffffff" />;
      case 'servicios': return <FaChartPie size={size} color="#ffffff" />;
      case 'sueldos': return <FaUserTie size={size} color="#ffffff" />;
      case 'insumos': return <FaBoxes size={size} color="#ffffff" />;
      default: return <FiTag size={size} color="#ffffff" />;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoiding}
    >
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>
          {expense ? 'Editar Gasto Fijo' : 'Nuevo Gasto Fijo'}
        </Text>

        {/* Descripción */}
        <View style={styles.inputGroup}>
          <View style={styles.labelContainer}>
            <FiFileText size={18} color="#b91c1c" />
            <Text style={styles.label}>Descripción</Text>
          </View>
          <TextInput
            style={styles.input}
            value={descripcion}
            onChangeText={setDescripcion}
            placeholder="Ej: Alquiler del local"
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Monto */}
        <View style={styles.inputGroup}>
          <View style={styles.labelContainer}>
            <FiDollarSign size={18} color="#b91c1c" />
            <Text style={styles.label}>Monto</Text>
          </View>
          <TextInput
            style={styles.input}
            value={monto}
            onChangeText={setMonto}
            placeholder="Ej: 150000"
            placeholderTextColor="#9ca3af"
            keyboardType="numeric"
          />
        </View>

        {/* Categoría */}
        <View style={styles.inputGroup}>
          <View style={styles.labelContainer}>
            <FiTag size={18} color="#b91c1c" />
            <Text style={styles.label}>Categoría</Text>
          </View>
          <View style={styles.optionsContainer}>
            {['alquiler', 'servicios', 'sueldos', 'insumos', 'otros'].map(cat => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.optionButton,
                  styles.categoryButton,
                  categoria === cat && {
                    backgroundColor: getCategoryColor(cat).bg
                  }
                ]}
                onPress={() => setCategoria(cat as CategoriaGasto)}
              >
                {getCategoryIcon(cat, 14)}
                <Text style={[
                  styles.optionText,
                  categoria === cat && styles.selectedOptionText
                ]}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Frecuencia */}
        <View style={styles.inputGroup}>
          <View style={styles.labelContainer}>
            <FiCalendar size={18} color="#b91c1c" />
            <Text style={styles.label}>Frecuencia</Text>
          </View>
          <View style={styles.optionsContainer}>
            {['diario', 'semanal', 'mensual', 'anual'].map(freq => (
              <TouchableOpacity
                key={freq}
                style={[
                  styles.optionButton,
                  frecuencia === freq && styles.selectedFrequency
                ]}
                onPress={() => setFrecuencia(freq as FrecuenciaGasto)}
              >
                <Text style={[
                  styles.optionText,
                  frecuencia === freq && styles.selectedOptionText
                ]}>
                  {freq.charAt(0).toUpperCase() + freq.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Notas */}
        <View style={styles.inputGroup}>
          <View style={styles.labelContainer}>
            <FiFileText size={18} color="#b91c1c" />
            <Text style={styles.label}>Notas adicionales</Text>
          </View>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            value={notas}
            onChangeText={setNotas}
            placeholder="Información adicional sobre el gasto..."
            placeholderTextColor="#9ca3af"
            multiline
          />
        </View>

        {/* Acciones */}
        <View style={styles.formActions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.cancelButton]} 
            onPress={onCancel}
          >
            <FiX size={20} color="#b91c1c" />
            <Text style={[styles.actionButtonText, { color: '#b91c1c' }]}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.submitButton]} 
            onPress={handleSubmit}
          >
            <FiSave size={20} color="#ffffff" />
            <Text style={[styles.actionButtonText, { color: '#ffffff' }]}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

// Función auxiliar para colores de categoría
const getCategoryColor = (category: string) => {
  switch(category) {
    case 'alquiler': return { bg: '#ef4444', text: '#ffffff' };
    case 'servicios': return { bg: '#3b82f6', text: '#ffffff' };
    case 'sueldos': return { bg: '#10b981', text: '#ffffff' };
    case 'insumos': return { bg: '#8b5cf6', text: '#ffffff' };
    default: return { bg: '#6b7280', text: '#ffffff' };
  }
};

const styles = StyleSheet.create({
  keyboardAvoiding: {
    flex: 1,
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: '#111827',
    backgroundColor: '#f9fafb',
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryButton: {
    paddingLeft: 8,
    gap: 6,
  },
  selectedFrequency: {
    backgroundColor: '#b91c1c',
    borderColor: '#991b1b',
  },
  optionText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4b5563',
  },
  selectedOptionText: {
    color: '#ffffff',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    flex: 1,
    borderWidth: 1,
  },
  cancelButton: {
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
  },
  submitButton: {
    backgroundColor: '#b91c1c',
    borderColor: '#991b1b',
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ExpenseForm;