import { useState } from 'react';

import { debounce as _debounce } from 'lodash';
import { Button, StyleSheet, TextInput, View } from 'react-native';

const Search = ({ fetchPokemons, fetchPokemon }) => {
  const [text, setText] = useState('');

  const search = async () => {
    if (!text) {
      fetchPokemons();
    } else {
      try {
        fetchPokemon(text);
      } catch (error) {
        throw error;
      }
    }
  };

  const inputChange = (text) => {
    setText(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Search a Pokemon'
        onChangeText={(text) => inputChange(text)}
        style={styles.input}
      />
      <Button title='Search' onPress={() => search()} style={styles.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    width: '70%',
  },
  button: {
    width: '30%',
  },
});

export default Search;
