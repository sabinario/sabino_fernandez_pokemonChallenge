import { useState } from 'react';

import {
	Alert,
	Button,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	TextInput,
	View,
} from 'react-native';

import { getPokemon } from '../api/pokemon';

const Search = ({ setPokemons, setLoading, setNextPage, fetchPokemons }) => {
	const [text, setText] = useState('');

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
			setText('');
			setLoading(false);
			Alert.alert('Lo sentimos', 'El pokemon no existe');
		}
	};

	const search = async () => {
		if (!text) {
			fetchPokemons();
			return;
		}

		try {
			fetchPokemon(text.trim());
		} catch (error) {
			console.log(error);
		}
	};

	const inputChange = (text) => {
		setText(text);
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<View style={styles.input}>
				<TextInput
					placeholder='Search a Pokemon'
					value={text}
					onChangeText={inputChange}
				/>
			</View>
			<Button title='Search' onPress={search} style={styles.button} />
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 40,
		marginHorizontal: 20,
		marginTop: 20,
		marginBottom: 20,
	},
	input: {
		borderColor: '#ccc',
		borderWidth: 2,
		paddingHorizontal: 12,
		borderRadius: 10,
		justifyContent: 'center',
		width: '70%',
	},
	button: {
		width: '30%',
	},
});

export default Search;
