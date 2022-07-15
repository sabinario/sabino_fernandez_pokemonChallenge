import { useEffect, useState } from 'react';

import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';

import { getPokemon } from '../api/pokemon';
import Header from '../components/Pokemon/Header';
import Info from '../components/Pokemon/Info';
import Moves from '../components/Pokemon/Moves';
import Sprites from '../components/Pokemon/Sprites';
import getPokemonColor from '../utils/getPokemonColor';

const Pokemon = ({ route, navigation }) => {
  const { params } = route;
  const [pokemon, setPokemon] = useState(null);
  const [bgColor, setbgColor] = useState('');

  const fetchPokemonDetails = async (id) => {
    try {
      const pokemonDetail = await getPokemon(id);
      setbgColor(getPokemonColor(pokemonDetail.types[0].type.name));
      setPokemon({
        name: pokemonDetail.name,
        order: pokemonDetail.order,
        image: pokemonDetail.sprites.other['official-artwork'].front_default,
        type: pokemonDetail.types.map((type) => type.type.name),
        weight: pokemonDetail.weight,
        moves: pokemonDetail.moves.map((move) => move.move.name).slice(0, 6),
        sprites: [
          pokemonDetail.sprites['front_default'],
          pokemonDetail.sprites['back_default'],
          pokemonDetail.sprites['front_shiny'],
          pokemonDetail.sprites['back_shiny'],
        ],
      });
    } catch (error) {
      console.error(error);
      navigation.goBack();
    }
  };

  useEffect(() => {
    (async () => {
      await fetchPokemonDetails(params.id);
    })();
  }, [route]);

  return (
    <>
      {pokemon ? (
        <SafeAreaView
          style={{
            ...styles.container,
            backgroundColor: `${bgColor}B3`,
            borderStyle: 'solid',
            borderWidth: 2,
            borderColor: bgColor,
          }}
        >
          <Header name={pokemon?.name} image={pokemon?.image} order={pokemon?.order} />
          <Info types={pokemon?.type} weight={pokemon?.weight} />
          <Sprites sprites={pokemon?.sprites} />
          <Moves moves={pokemon?.moves} />
        </SafeAreaView>
      ) : (
        <ActivityIndicator size='large' style={styles.spinner} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '90%',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  spinner: {
    marginTop: '80%',
  },
});
export default Pokemon;
