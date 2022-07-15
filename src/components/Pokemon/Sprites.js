import React from 'react';

import { Image, StyleSheet, Text, View } from 'react-native';

const Sprites = ({ sprites }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 22, fontWeight: '500', color: '#000' }}>Sprites</Text>
      <View style={styles.imgContainer}>
        {React.Children.toArray(
          sprites.map((sprite) => {
            return (
              <View style={{ backgroundColor: '#fff', borderRadius: 20 }}>
                <Image source={{ uri: sprite }} style={styles.image} />
              </View>
            );
          })
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginVertical: 5,
  },
  imgContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default Sprites;
