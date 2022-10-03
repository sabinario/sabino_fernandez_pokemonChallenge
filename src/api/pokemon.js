import axios from 'axios';

const API = 'https://pokeapi.co/api/v2';

export async function getPokemons(apiURL) {
	try {
		const pokemons = await axios.get(
			apiURL ? apiURL : `${API}/pokemon?limit=20&offset=0`
		);
		return pokemons.data;
	} catch (error) {
		throw error;
	}
}

export async function getPokemon(id) {
	try {
		const pokemon = await axios.get(`${API}/pokemon/${id}`);
		return pokemon.data;
	} catch (error) {
		throw new Error('Ocurrio un error', error);
	}
}
