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
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="GameScreen" component={GameScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
AppRegistry.registerComponent(appName, () => App);

export default App;