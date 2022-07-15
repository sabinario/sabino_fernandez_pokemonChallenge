import { Image, StyleSheet, Text, View } from 'react-native';

const Header = ({ name, order, image }) => {
  return (
    <View>
      <Image source={{ uri: image }} style={styles.image} />
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
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 32,
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  number: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Header;
