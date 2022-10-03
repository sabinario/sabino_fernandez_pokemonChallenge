import { useEffect, useState } from 'react';

import {
	ActivityIndicator,
	SafeAreaView,
	StyleSheet,
	View,
} from 'react-native';

import { getPokemon } from '../api/pokemon';
import Header from '../components/Pokemon/Header';
import Info from '../components/Pokemon/Info';
import Moves from '../components/Pokemon/Moves';
import Sprites from '../components/Pokemon/Sprites';
import { useLandscape } from '../hooks/useLandscape';
import getPokemonColor from '../utils/getPokemonColor';

const Pokemon = ({ route, navigation }) => {
	const { isLandscape } = useLandscape();
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

	const pokemonStyles = isLandscape
		? {
				...styles.container,
				backgroundColor: `${bgColor}B3`,
				borderColor: bgColor,
				flexDirection: 'row',
				marginVertical: 10,
				height: '90%',
		  }
		: {
				...styles.container,
				backgroundColor: `${bgColor}B3`,
				borderColor: bgColor,
		  };

	return (
		<>
			{pokemon ? (
				<SafeAreaView style={pokemonStyles}>
					<Header
						name={pokemon?.name}
						image={pokemon?.image}
						order={pokemon?.order}
					/>
					<View style={isLandscape && styles.pokemonLandscape}>
						<Info types={pokemon?.type} weight={pokemon?.weight} />
						<Sprites sprites={pokemon?.sprites} />
						<Moves moves={pokemon?.moves} />
					</View>
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
		borderStyle: 'solid',
		borderWidth: 2,
	},
	pokemonLandscape: {
		flexDirection: 'column',
		width: '80%',
		paddingHorizontal: 20,
		paddingVertical: 8,
	},
	spinner: {
		marginTop: '80%',
	},
});
export default Pokemon;
