import React, { useState, useRef } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Modal, Dimensions, Animated, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');
const imageAspectRatio = 400 / 300;
const imageWidth = width;
const imageHeight = imageWidth / imageAspectRatio;

const vehicleParts = [
  { 
    id: 'CTI', 
    name: 'CTI', 
    x: 0.24, 
    y: 0.2,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Roto']
  },
  { 
    id: 'CTD', 
    name: 'CTD', 
    x: 0.85, 
    y: 0.2,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Roto']
  },
  { 
    id: 'PTR', 
    name: 'PTR', 
    x: 0.54, 
    y: 0.2,
    options: ['Limpio', 'Sucio', 'Agrietado', 'Faltante']
  },
  { 
    id: 'CT', 
    name: 'CT', 
    x: 0.54, 
    y: 0.50,
    options: ['Limpio', 'Sucio', 'Agrietado', 'Faltante']
  },
  { 
    id: 'LUZTI', 
    name: 'LUZT I', 
    x: 0.13, 
    y: 0.52,
    options: ['Funcionando', 'Quemada', 'Rota', 'Faltante']
  },
  { 
    id: 'LUZTD', 
    name: 'LUZT D', 
    x: 0.92, 
    y: 0.52,
    options: ['Funcionando', 'Quemada', 'Rota', 'Faltante']
  },
  { 
    id: 'PTI', 
    name: 'PTI', 
    x: 0.27, 
    y: 0.69,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Desprendido']
  },
  { 
    id: 'PTD', 
    name: 'PTD', 
    x: 0.83, 
    y: 0.69,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Desprendido']
  },
  { 
    id: 'LLANTASTI', 
    name: 'LLANTAS TI', 
    x: 0.25, 
    y: 0.93,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Desprendido']
  },
  { 
    id: 'LLANTASTD', 
    name: 'LLANTAS TD', 
    x: 0.73, 
    y: 0.93,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Desprendido']
  },
  { 
    id: 'BMPT', 
    name: 'BMP T', 
    x: 0.54, 
    y: 0.67,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Desprendido']
  },
];

export default function RunnerFront() {
  const [selectedPart, setSelectedPart] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [inconsistencies, setInconsistencies] = useState({});
  const zoomAnim = useRef(new Animated.Value(1)).current;
  const panAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  const handlePartPress = (part) => {
    setSelectedPart(part);
    setModalVisible(true);
    Animated.parallel([
      Animated.timing(zoomAnim, {
        toValue: 2,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(panAnim.x, {
        toValue: width / 2 - part.x * imageWidth,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(panAnim.y, {
        toValue: imageHeight / 2 - part.y * imageHeight,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    Animated.parallel([
      Animated.timing(zoomAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(panAnim.x, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(panAnim.y, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleOptionPress = (option) => {
    setInconsistencies({
      ...inconsistencies,
      [selectedPart.id]: option !== selectedPart.options[0],
    });
    handleCloseModal();
  };

  const animateButton = (value) => {
    Animated.spring(buttonScale, {
      toValue: value,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.zoomContainer,
          {
            transform: [
              { scale: zoomAnim },
              { translateX: panAnim.x },
              { translateY: panAnim.y },
            ],
          },
        ]}
      >
        <Image
          source={require('../../../assets/Vehiculos/AGRALE/AGRALEATRAS.png')}
          style={styles.vehicleImage}
        />
        {vehicleParts.map((part) => (
          <TouchableOpacity
            key={part.id}
            style={[
              styles.partButton,
              {
                left: part.x * imageWidth - 25,
                top: part.y * imageHeight - 10,
                // Eliminamos el backgroundColor para quitar el fondo gris
              },
            ]}
            onPress={() => handlePartPress(part)}
            accessibilityLabel={`Seleccionar ${part.name}`}
          >
            <Text style={styles.partButtonText}>{part.name}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{selectedPart?.name}</Text>
            <ScrollView style={styles.optionsContainer}>
              {selectedPart?.options.map((option, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.optionButton}
                  onPress={() => handleOptionPress(option)}
                  accessibilityLabel={`Seleccionar ${option}`}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
              accessibilityLabel="Cerrar opciones"
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          style={styles.nextButton}
          onPressIn={() => animateButton(0.9)}
          onPressOut={() => animateButton(1)}
          accessibilityLabel="Siguiente"
        >
          <Text style={styles.nextButtonText}>Siguiente</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#e3e1e1', 
    paddingBottom: 20, 
  },
  zoomContainer: {
    width: imageWidth,
    height: imageHeight,
  },
  vehicleImage: {
    width: imageWidth,
    height: imageHeight,
    resizeMode: 'contain',
  },
  partButton: {
    position: 'absolute',
    padding: 5,
    borderRadius: 10,
  },
  partButtonText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationColor: 'lightgreen',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    maxHeight: '80%',
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionsContainer: {
    width: '100%',
    maxHeight: '70%',
  },
  optionButton: {
    padding: 10,
    marginVertical: 5,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgreen',
  },
  optionText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#39c926',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    width: '80%',
    marginBottom: 10, // Espacio adicional para que no toque el borde inferior
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
