// useOrientation.js
import { useEffect, useState } from 'react';

import { Dimensions } from 'react-native';

/**
 * Returns true if the screen is in portrait mode
 */
const isPortrait = () => {
	const dim = Dimensions.get('screen');
	return dim.height >= dim.width;
};

/**
 * A React Hook which updates when the orientation changes
 * @returns whether the user is in 'PORTRAIT' or 'LANDSCAPE'
 */
export function useLandscape() {
	// State to hold the connection status
	const [isLandscape, setIsLandscape] = useState(isPortrait() ? false : true);
	const [isTablet, setIsTablet] = useState(() => {
		return Dimensions.get('window').width > '768';
	});

	useEffect(() => {
		const subscription = Dimensions.addEventListener('change', () => {
			setIsLandscape(isPortrait() ? false : true);
		});

		return () => subscription?.remove();
	}, []);

	return { isLandscape, isTablet };
}
