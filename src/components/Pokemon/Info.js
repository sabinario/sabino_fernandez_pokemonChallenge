import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import capitalizeFirstLetter from '../../utils/capitalize';

const Info = ({ types, weight }) => {
  let capitalizedTypes = types.map((t) => {
    return capitalizeFirstLetter(t);
  });

  return (
    <View>
      <Text style={styles.title}>Types</Text>
      <Text style={styles.types}>{capitalizedTypes.join(', ')}</Text>
      <Text style={styles.title}>Peso</Text>
      <Text style={styles.types}>{weight}kg</Text>
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
  types: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    textAlign: 'left',
  },
});

export default Info;
