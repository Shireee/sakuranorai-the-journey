import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import GameScreen from './GameScreen';
import MenuScreen from './MenuScreen';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden = {true} />
      <Stack.Navigator>
        <Stack.Screen name="MenuScreen" component={MenuScreen}   options={{ headerShown: false }} />
        <Stack.Screen name="GameScreen" component={GameScreen}   options={{ headerShown: false }} key={({ route }) => route.params && route.params.key}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;