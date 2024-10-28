import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const SelectNumberCar = ({ route, navigation }) => {
  const { range } = route.params; // Recibiendo el rango de números
  const numbers = Array.from({ length: range.max - range.min + 1 }, (_, i) => range.min + i);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.numberButton} onPress={() => handleSelectNumber(item)}>
      <Text style={styles.numberText}>{item}</Text>
    </TouchableOpacity>
  );

  const handleSelectNumber = (number) => {
    // Navegar a la pantalla de estado de documentos con el número seleccionado
    navigation.navigate('DocumentStatus', { selectedNumber: number });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona un Número</Text>
      <FlatList
        data={numbers}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        numColumns={5} // Número de columnas
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.list}
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
  list: {
    paddingVertical: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Espaciado entre columnas
  },
  numberButton: {
    width: (width - 60) / 5, // Ancho de cada botón para que se ajusten en la pantalla
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50', // Color de fondo del botón
    borderRadius: 8,
    marginBottom: 20, // Aumentar la separación vertical entre filas
    marginHorizontal: 5, // Agregar separación horizontal entre columnas
  },
  numberText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default SelectNumberCar;
