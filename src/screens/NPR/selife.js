import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Platform, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import LottieView from 'lottie-react-native';

export default function SelfieCheckList() {
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setPhoto(data.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Para terminar el check list, por favor tómate una selfie
      </Text>
      
      <LottieView
        source={require('./selfie.json')}
        autoPlay
        loop
        style={styles.animation}
      />
      
      {!photo ? (
        <RNCamera
          ref={cameraRef}
          style={styles.camera}
          type={RNCamera.Constants.Type.front}
          captureAudio={false}
        />
      ) : (
        <Image source={{ uri: photo }} style={styles.preview} />
      )}
      
      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <Text style={styles.buttonText}>
          {photo ? 'Tomar otra foto' : 'Tomar Selfie'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.platformMessage}>
        {Platform.OS === 'android' ? 'Estás en un dispositivo Android' : 'Estás en una cámara web'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
  animation: {
    width: 200,
    height: 200,
  },
  camera: {
    width: 300,
    height: 400,
  },
  preview: {
    width: 300,
    height: 400,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    margin: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  platformMessage: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});
