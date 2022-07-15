import React, { useEffect, useState } from 'react';

import {
  ActivityIndicator, SafeAreaView, ScrollView, StyleSheet,
  View,
} from 'react-native';

import { getPokemon, getPokemons } from '../api/pokemon';
import ChangePageButton from '../components/Button';
import PokemonCard from '../components/PokemonCard';
import Search from '../components/Search';

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);

  const fetchPokemons = async (next) => {
    try {
      setLoading(true);
      const pokemonsData = await getPokemons(next);
      setNextPage(pokemonsData.next);
      setPreviousPage(pokemonsData.previous);
      const pokemonData = [];

      for await (const pokemonInfo of pokemonsData.results) {
        const pokemon = await getPokemon(pokemonInfo.name);
        pokemonData.push({
          id: pokemon.id,
          name: pokemon.name,
          type: pokemon.types.map((type) => type.type.name),
          order: pokemon.order,
          image: pokemon.sprites.other['official-artwork'].front_default,
          url: pokemonInfo.url,
        });
      }
      setPokemons([...pokemonData]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const fetchPokemon = async (name) => {
    try {
      setLoading(true);
      setNextPage(null);
      const pokemonData = [];
      const pokemon = await getPokemon(name.toLowerCase());
      pokemonData.push({
        id: pokemon.id,
        name: pokemon.name,
        type: pokemon.types.map((type) => type.type.name),
        order: pokemon.order,
        image: pokemon.sprites.other['official-artwork'].front_default,
        url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`,
      });
      setPokemons(pokemonData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      fetchPokemons();
    })();
  }, []);

  return (
    <ScrollView style={styles.homeContainer}>
      <Search fetchPokemons={fetchPokemons} fetchPokemon={fetchPokemon} />
      {!loading ? (
        <SafeAreaView style={styles.cardContainer}>
          {React.Children.toArray(
            pokemons && pokemons.map((pokemon) => <PokemonCard pokemon={pokemon} />)
          )}
        </SafeAreaView>
      ) : (
        <ActivityIndicator size='large' style={styles.spinner} />
      )}
      <View
        style={
          !previousPage
            ? { ...styles.buttons, flexDirection: 'row-reverse' }
            : { ...styles.buttons, flexDirection: 'row' }
        }
      >
        {previousPage && (
          <ChangePageButton
            title='Previous page'
            url={previousPage}
            fetchPokemons={fetchPokemons}
          />
        )}
        {nextPage && (
          <ChangePageButton title='Next gage' url={nextPage} fetchPokemons={fetchPokemons} />
        )}
        {!nextPage && !previousPage && (
          <ChangePageButton title='Go back' fetchPokemons={fetchPokemons} />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  spinner: {
    marginTop: 40,
    marginBottom: 40,
  },
  buttons: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
