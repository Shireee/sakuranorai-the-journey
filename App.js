import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

export default function App() {
  return (
    <ImageBackground source={require('./assets/main.gif')} style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%', // ensure the gif covers full width
    height: '100%', // ensure the gif covers full height
    alignItems: 'center',
    justifyContent: 'center',
  },
});
