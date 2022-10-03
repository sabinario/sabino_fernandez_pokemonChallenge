import { Image, StyleSheet, Text, View } from 'react-native';

import { useLandscape } from '../../hooks/useLandscape';

const Header = ({ name, order, image }) => {
	const { isLandscape } = useLandscape();

	const imageStyles = isLandscape
		? {
				...styles.image,
				width: 150,
				height: 150,
		  }
		: { ...styles.image };

	return (
		<View style={isLandscape && { justifyContent: 'center' }}>
			<Image source={{ uri: image }} style={imageStyles} />
			<Text style={styles.name}>{name}</Text>
			<Text style={styles.number}>#{`${order}`.padStart(3, 0)}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	image: {
		width: 200,
		height: 200,
		resizeMode: 'contain',
		alignSelf: 'center',
	},
	name: {
		color: '#000',
		fontWeight: 'bold',
		fontSize: 32,
		textTransform: 'capitalize',
		textAlign: 'center',
	},
	number: {
		color: '#000',
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center',
	},
});

export default Header;
