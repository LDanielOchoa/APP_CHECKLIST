import React, { useState, useRef, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Modal, Dimensions, Animated, ScrollView } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const imageAspectRatio = 400 / 300;
const imageHeight = screenHeight * 0.87; // Aumentar al 90% de la altura de la pantalla
const imageWidth = imageHeight * imageAspectRatio;

const vehicleParts = [
  { 
    id: 'CFRI', 
    name: 'CFR I', 
    x: 0.12, 
    y: 0.33,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Roto']
  },
  { 
    id: 'CTI', 
    name: 'CTI', 
    x: 0.99, 
    y: 0.4,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Roto']
  },
  { 
    id: 'VCD', 
    name: 'VCD', 
    x: 0.18, 
    y: 0.44,
    options: ['Limpio', 'Sucio', 'Agrietado', 'Faltante']
  },
  { 
    id: 'CLT I', 
    name: 'CLTI', 
    x: 0.56, 
    y: 0.29,
    options: ['Limpio', 'Sucio', 'Agrietado', 'Faltante']
  },
  { 
    id: 'VNTCI', 
    name: 'VNTC I', 
    x: 0.28, 
    y: 0.41,
    options: ['Funcionando', 'Intermitente', 'No funciona', 'Faltante']
  },
  { 
    id: 'VNT I 1', 
    name: 'VNT I 1', 
    x: 0.42, 
    y: 0.4,
    options: ['Funcionando', 'Intermitente', 'No funciona', 'Faltante']
  },
  { 
    id: 'VNT I 2', 
    name: 'VNT I 2', 
    x: 0.57, 
    y: 0.4,
    options: ['Funcionando', 'Quemada', 'Rota', 'Faltante']
  },
  { 
    id: 'VNT I 3', 
    name: 'VNT I 3', 
    x: 0.73, 
    y: 0.4,
    options: ['Funcionando', 'Quemada', 'Rota', 'Faltante']
  },
  { 
    id: 'VNT I 4', 
    name: 'VNT I 4', 
    x: 0.88, 
    y: 0.4,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Desprendido']
  },
  { 
    id: 'LTI 1', 
    name: 'LTI1', 
    x: 0.08, 
    y: 0.52,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Desprendido']
  },
  { 
    id: 'PDI', 
    name: 'PDI', 
    x: 0.05, 
    y: 0.61,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Desprendido']
  },
  { 
    id: 'RINDIZ', 
    name: 'RIN D IZ', 
    x: 0.28, 
    y: 0.69,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Desprendido']
  },
  { 
    id: 'RINTIZ', 
    name: 'RIN T IZ', 
    x: 0.55, 
    y: 0.69,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Desprendido']
  },
  { 
    id: 'FIZ1 ', 
    name: 'FIZ1', 
    x: 0.35, 
    y: 0.59,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Desprendido']
  },
  { 
    id: 'TPRD', 
    name: 'TPRD', 
    x: 0.58, 
    y: 0.59,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Desprendido']
  },
  { 
    id: 'FIZ2', 
    name: 'FIZ2', 
    x: 0.66, 
    y: 0.59,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Desprendido']
  },
  { 
    id: 'FIZ3', 
    name: 'FIZ3', 
    x: 0.83, 
    y: 0.59,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Desprendido']
  },
  { 
    id: 'TPB', 
    name: 'TPB', 
    x: 0.88, 
    y: 0.64,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Desprendido']
  },
  { 
    id: 'PTI', 
    name: 'PTI', 
    x: 0.99, 
    y: 0.64,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Desprendido']
  },
  { 
    id: 'FIZ4', 
    name: 'FIZ4', 
    x: 0.94, 
    y: 0.59,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Desprendido']
  },
  { 
    id: 'LTI 2', 
    name: 'LTI 2', 
    x: 0.50, 
    y: 0.50,
    options: ['Sin daños', 'Rayado', 'Abollado', 'Desprendido']
  },
];

export default function RunnerFront() {
  const [selectedPart, setSelectedPart] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [inconsistencies, setInconsistencies] = useState({});
  const [orientationModalVisible, setOrientationModalVisible] = useState(false);
  const zoomAnim = useRef(new Animated.Value(1)).current;
  const panAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const checkOrientation = () => {
    const { width, height } = Dimensions.get('window');
    return width < height;
  };

  useEffect(() => {
    const updateOrientation = () => {
      const isPortrait = checkOrientation();
      setOrientationModalVisible(isPortrait);
      if (isPortrait) {
        startRotationAnimation();
      }
    };

    const dimensionsHandler = Dimensions.addEventListener('change', updateOrientation);
    updateOrientation();

    return () => {
      dimensionsHandler.remove();
    };
  }, []);

  const startRotationAnimation = () => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  };

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
        toValue: screenWidth / 2 - part.x * imageWidth,
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

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const PhoneIcon = () => (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <Svg height="100" width="100" viewBox="0 0 24 24">
        <Rect x="5" y="2" width="14" height="20" rx="2" ry="2" fill="none" stroke="black" strokeWidth="2" />
        <Path d="M12 18h.01" stroke="black" strokeWidth="2" strokeLinecap="round" />
      </Svg>
    </Animated.View>
  );

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
          source={require('../../../assets/Vehiculos/RUNNER/RUNNERIZQUIERDA.png')}
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
              },
            ]}
            onPress={() => handlePartPress(part)}
            accessibilityLabel={`Seleccionar ${part.name}`}
          >
            <Text style={styles.partButtonText}>{part.name}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
      <View style={styles.bottomContainer}>
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

      <Modal
        animationType="fade"
        transparent={true}
        visible={orientationModalVisible}
        onRequestClose={() => setOrientationModalVisible(false)}
      >
        <View style={styles.orientationModalBackground}>
          <View style={styles.orientationModalView}>
            <Text style={styles.orientationModalText}>Por favor, gire su dispositivo a modo horizontal</Text>
            <PhoneIcon />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3e1e1',
  },
  zoomContainer: {
    width: imageWidth,
    height: imageHeight,
    alignSelf: 'center',
  },
  vehicleImage: {
    width: '100%',
    height: '100%',
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
    width: '80%',
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
    width: 200,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orientationModalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orientationModalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  orientationModalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});