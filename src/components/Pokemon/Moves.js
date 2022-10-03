import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import capitalizeFirstLetter from '../../utils/capitalize';

const Moves = ({ moves }) => {
	let capitalizedMoves = moves.map((t) => {
		return capitalizeFirstLetter(t);
	});

	return (
		<View>
			<Text style={styles.title}>Moves:</Text>
			<Text style={styles.moves}>{capitalizedMoves.join(', ')}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 22,
		fontWeight: '800',
		color: '#000',
		textAlign: 'left',
	},
	moves: {
		marginTop: 5,
		fontSize: 18,
		fontWeight: '500',
		color: '#000',
		textAlign: 'left',
	},
});

export default Moves;
