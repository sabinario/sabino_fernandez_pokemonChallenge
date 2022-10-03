import React from 'react';

import { Button, StyleSheet, View } from 'react-native';

const ChangePageButton = ({ title, url, fetchPokemons }) => {
	const changePage = async (url) => {
		fetchPokemons(url);
	};

	return (
		<View style={styles.buttonCtn}>
			<Button title={title} onPress={() => changePage(url)} />
		</View>
	);
};

const styles = StyleSheet.create({
	buttonCtn: {
		marginHorizontal: 20,
		marginBottom: 40,
		width: '40%',
	},
});

export default ChangePageButton;
