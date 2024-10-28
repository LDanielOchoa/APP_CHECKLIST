import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// Define las rutas de las imágenes correctamente
const options = [
  {
    id: 1,
    name: 'Option 1',
    imgMain: require('../../assets/Vehiculos/RUNNER/RUNNERFRONTAL.png'),
    imgCorner: require('../../assets/Vehiculos/NPR/NPRFRONTAL.png'),
    color: ['#4c669f', '#3b5998', '#192f6a'],
  },
  {
    id: 2,
    name: 'Option 2',
    imgMain: require('../../assets/Vehiculos/NPR/NPRFRONTAL.png'),
    imgCorner: require('../../assets/Vehiculos/NPR/NPRFRONTAL.png'),
    color: ['#ff5f6d', '#ffc371'],
  },
  {
    id: 3,
    name: 'Option 3',
    imgMain: require('../../assets/Vehiculos/AGRALE/AGRALEFRONTAL.png'),
    imgCorner: require('../../assets/Vehiculos/NPR/NPRFRONTAL.png'),
    color: ['#36d1dc', '#5b86e5'],
  },
];

const Card = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View style={styles.card}>
        <LinearGradient
          colors={item.color}
          style={styles.gradient}
        >
          <Image source={item.imgMain} style={styles.cardMainImage} />
          <Image source={item.imgCorner} style={styles.cardCornerImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{item.name}</Text>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const CardList = () => {
  const navigation = useNavigation();

  const handleSelectOption = (optionName) => {
    // Verifica que el nombre de la pantalla esté registrado correctamente
    navigation.navigate('RunnerFront', { optionName });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {options.map((item) => (
        <Card
          key={item.id}
          item={item}
          onPress={() => handleSelectOption(item.name)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  card: {
    width: width * 0.9,
    height: height * 0.35,
    borderRadius: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  gradient: {
    flex: 1,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
  },
  cardMainImage: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
    marginBottom: 10,
  },
  cardCornerImage: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  cardContent: {
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default CardList;
