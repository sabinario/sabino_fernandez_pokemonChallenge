import React, { useEffect, useState } from 'react';

import {
	ActivityIndicator,
	Dimensions,
	SafeAreaView,
	ScrollView,
	StyleSheet,
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

	useEffect(() => {
		(async () => {
			fetchPokemons();
		})();
	}, []);

	return (
		<>
			{!loading ? (
				<ScrollView style={styles.homeContainer}>
					<Search
						setPokemons={setPokemons}
						setLoading={setLoading}
						setNextPage={setNextPage}
						fetchPokemons={fetchPokemons}
					/>
					<SafeAreaView style={styles.cardContainer}>
						{React.Children.toArray(
							pokemons &&
								pokemons.map((pokemon) => <PokemonCard pokemon={pokemon} />)
						)}
					</SafeAreaView>
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
							<ChangePageButton
								title='Next page'
								url={nextPage}
								fetchPokemons={fetchPokemons}
							/>
						)}
						{!nextPage && !previousPage && (
							<ChangePageButton title='Go back' fetchPokemons={fetchPokemons} />
						)}
					</View>
				</ScrollView>
			) : (
				<ActivityIndicator size='large' style={styles.spinner} />
			)}
		</>
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
