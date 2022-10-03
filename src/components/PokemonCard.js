import {
	Image,
	StyleSheet,
	Text,
	TouchableNativeFeedback,
	View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useLandscape } from '../hooks/useLandscape';
import getPokemonColor from '../utils/getPokemonColor';

const PokemonCard = ({ pokemon }) => {
	const { isLandscape, isTablet } = useLandscape();

	const navigation = useNavigation();

	const goToPokemonPage = (page) => {
		navigation.navigate('Pokemon', { id: pokemon.id });
	};

	const pokemonColor = getPokemonColor(pokemon.type[0]);

	const bgStyles = {
		...styles.card,
		backgroundColor: `${pokemonColor}B3`,
		borderStyle: 'solid',
		borderWidth: 2,
		borderColor: pokemonColor,
		width: isTablet ? '28%' : '45%',
	};

	return (
		<TouchableNativeFeedback onPress={goToPokemonPage}>
			<View
				style={
					isLandscape ? { ...bgStyles, ...styles.cardLandscape } : bgStyles
				}
			>
				<Image source={{ uri: pokemon.image }} style={styles.image} />
				<Text style={styles.number}>#{`${pokemon.order}`.padStart(3, 0)}</Text>
				<Text style={styles.name}>{pokemon.name}</Text>
			</View>
		</TouchableNativeFeedback>
	);
};

const styles = StyleSheet.create({
	card: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 150,
		margin: 5,
		padding: 10,
	},
	cardLandscape: {
		width: '28%',
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
