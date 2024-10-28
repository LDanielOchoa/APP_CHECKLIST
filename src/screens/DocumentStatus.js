// DocumentStatus.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
} from 'react-native';

const DocumentStatus = ({ route, navigation }) => {
  const { selectedNumber } = route.params; // Recibiendo el número seleccionado

  // Lógica para determinar el estado del SOAT y otros documentos
  const isSOATExpired = (number) => {
    // Lógica de ejemplo para determinar si el SOAT está vencido
    return number % 2 === 0; // Ejemplo: el SOAT está vencido si el número es par
  };

  const soatStatus = isSOATExpired(selectedNumber) ? "Vencido" : "Válido";
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estado de Documentos</Text>
      <Text style={styles.statusText}>Número seleccionado: {selectedNumber}</Text>
      <Text style={styles.statusText}>Estado del SOAT: {soatStatus}</Text>
      <Text style={styles.statusText}>Estado de otros documentos: (puedes agregar más lógica aquí)</Text>

      {/* Botón para ir al checklist */}
      <Button
        title="Ir al Checklist del Vehículo"
        onPress={() => navigation.navigate('ChecklistScreen')}
      />

      {/* Botón para volver atrás */}
      <Button
        title="Volver a Seleccionar Número"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default DocumentStatus;
