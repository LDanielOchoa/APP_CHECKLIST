import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { TapGestureHandler, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const LoginPage = () => {
  const navigation = useNavigation();
  const [code, setCode] = useState('');

  // Valores de animación
  const titleTranslateY = useSharedValue(-50);
  const subtitleTranslateY = useSharedValue(-30);
  const inputTranslateY = useSharedValue(50);
  const buttonTranslateY = useSharedValue(50);
  const buttonScale = useSharedValue(0.8);
  const inputBorderColor = useSharedValue(0);

  useEffect(() => {
    titleTranslateY.value = withSpring(0, { damping: 6, stiffness: 80 });
    subtitleTranslateY.value = withSpring(0, { damping: 6, stiffness: 80, delay: 200 });
    inputTranslateY.value = withSpring(0, { damping: 6, stiffness: 80, delay: 400 });
    buttonTranslateY.value = withSpring(0, { damping: 6, stiffness: 80, delay: 600 });
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: titleTranslateY.value }],
    opacity: interpolate(titleTranslateY.value, [-50, 0], [0, 1]),
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: subtitleTranslateY.value }],
    opacity: interpolate(subtitleTranslateY.value, [-30, 0], [0, 1]),
  }));

  const inputStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: inputTranslateY.value }],
    opacity: interpolate(inputTranslateY.value, [50, 0], [0, 1]),
    borderColor: inputBorderColor.value === 1 ? '#5DF164' : '#BEBEBE',
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: buttonTranslateY.value },
      { scale: buttonScale.value }
    ],
    opacity: interpolate(buttonTranslateY.value, [50, 0], [0, 1]),
  }));

  const onButtonStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.BEGAN) {
      buttonScale.value = withSpring(0.95);
    } else if (nativeEvent.state === State.END) {
      buttonScale.value = withSpring(1, {}, () => {
        navigation.navigate('SelectOption');
      });
    }
  };

  const handleCodeChange = (text) => {
    setCode(text);
    inputBorderColor.value = withTiming(text.length > 0 ? 1 : 0, { duration: 300 });
  };

  return (
    <View style={styles.container}>
      {/* Barra superior con botón de regresar */}
      <Animated.View style={[styles.appBar, titleStyle]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
      </Animated.View>

      <View style={styles.content}>
        {/* Título y subtítulo animados */}
        <Animated.Text style={[styles.title, titleStyle]}>Ingresar</Animated.Text>
        <Animated.Text style={[styles.subtitle, subtitleStyle]}>
          Por favor digita tu código de operador.
        </Animated.Text>

        {/* Input para ingresar el código */}
        <Animated.View style={[styles.inputContainer, inputStyle]}>
          <TextInput
            style={styles.input}
            placeholder="Código"
            keyboardType="default"
            value={code}
            onChangeText={handleCodeChange}
          />
        </Animated.View>

        {/* Botón con animación */}
        <TapGestureHandler onHandlerStateChange={onButtonStateChange}>
          <Animated.View style={[styles.button, buttonStyle]}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </Animated.View>
        </TapGestureHandler>
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    elevation: 0,
    backgroundColor: 'white',
  },
  backButton: {
    fontSize: 24,
    color: '#333',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#7D7D7D',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 55,
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 20,
    fontSize: 18,
    borderColor: '#5DF164',
    backgroundColor: 'white',
  },
  button: {
    width: '100%',
    height: 60,
    borderRadius: 30,
    backgroundColor: '#5DF164',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#5DF164',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 20,
    color: 'white',
  },
  image: {
    height: height * 0.33,
    width: width,
  },
});

export default LoginPage;
