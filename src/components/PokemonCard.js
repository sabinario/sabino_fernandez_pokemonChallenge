import {
  Image, StyleSheet, Text, TouchableNativeFeedback,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import getPokemonColor from '../utils/getPokemonColor';

const PokemonCard = ({ pokemon }) => {
  const navigation = useNavigation();

  const goToPokemonPage = (page) => {
    navigation.navigate('Pokemon', { id: pokemon.id });
  };

  const pokemonColor = getPokemonColor(pokemon.type[0]);

  const bgStyles = {
    backgroundColor: `${pokemonColor}B3`,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: pokemonColor,
    ...styles.card,
  };

  return (
    <TouchableNativeFeedback onPress={goToPokemonPage}>
      <View style={bgStyles}>
        <Image source={{ uri: pokemon.image }} style={styles.image} />
        <Text style={styles.number}>#{`${pokemon.order}`.padStart(2, 0)}</Text>
        <Text style={styles.name}>{pokemon.name}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    margin: 5,
    padding: 10,
    /* shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, */
  },
  image: {
    width: 100,
    height: 100,
  },
  number: {
    color: '#fff',
    fontSize: 11,
  },
  name: {
    textTransform: 'capitalize',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default PokemonCard;
