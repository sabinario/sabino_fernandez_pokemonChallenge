import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import Pokemon from '../screens/Pokemon';

const Stack = createNativeStackNavigator();


const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Pokemon' component={Pokemon} />
    </Stack.Navigator>
  );
}

export default StackNavigation