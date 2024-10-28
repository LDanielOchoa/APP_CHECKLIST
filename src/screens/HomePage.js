import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, Dimensions, Image } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'

const { width } = Dimensions.get('window')

const messages = [
  "¡Mantén tu vehículo en óptimas condiciones!",
  "La seguridad primero, revisa tu auto regularmente.",
  "Un vehículo bien mantenido es más eficiente.",
  "Prevenir es mejor que lamentar.",
  "Cuida tu auto y él cuidará de ti."
]

export default function HomePage({ navigation }) {
  const [currentMessage, setCurrentMessage] = useState(messages[0])
  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.8)
  const translateY = useSharedValue(50)
  const progress = useSharedValue(0)
  const messageIndex = useSharedValue(0)

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 })
    scale.value = withSpring(1, { damping: 8, stiffness: 100 })
    translateY.value = withSpring(0, { damping: 8, stiffness: 100 })
    progress.value = withTiming(1, { duration: 4000 }, () => {
      runOnJS(navigation.replace)('Login')  // Reemplaza la navegación al finalizar
    })

    const messageInterval = setInterval(() => {
      runOnJS(setCurrentMessage)(messages[(messageIndex.value + 1) % messages.length])
      messageIndex.value = (messageIndex.value + 1) % messages.length
    }, 3000)

    return () => {
      clearInterval(messageInterval)
    }
  }, [])

  const logoStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }))

  const progressStyle = useAnimatedStyle(() => ({
    width: `${interpolate(progress.value, [0, 1], [0, 100], Extrapolate.CLAMP)}%`,
  }))

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#f5f7fa', '#e8edf2']}
        style={styles.gradient}
      >
        <Animated.View style={[styles.content, logoStyle]}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/imagenes/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>CHECK LIST</Text>
          <Text style={styles.subtitle}>Vehicular</Text>
          <Text style={styles.motivationalMessage}>
            {currentMessage}
          </Text>
          <View style={styles.progressContainer}>
            <Animated.View style={[styles.progressBar, progressStyle]} />
          </View>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    alignItems: 'center',
    padding: 30,
    elevation: 5,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  logo: {
    width: '93%',
    height: '93%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
  },
  motivationalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    minHeight: 40,
  },
  progressContainer: {
    width: '100%',
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
})
