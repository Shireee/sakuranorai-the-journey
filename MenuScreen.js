import React from 'react';
import { BackHandler } from 'react-native';
import styled from 'styled-components/native';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';

function MenuScreen({ navigation }) {

  // New game button logic
  function Start() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'GameScreen'}],
    });
  }

  // Continue button logic
  function LoadGame() {
    navigation.navigate('GameScreen');
  }

  // Exit button logic
  function Exit() {
    BackHandler.exitApp();
  }


// Sound logic
let soundObject = null;
async function SwitchSound() {
  if (soundObject) {
    const status = await soundObject.getStatusAsync();
    if (status.isLoaded) {
      if (status.isPlaying) {
        await soundObject.stopAsync();
      } else {
        await soundObject.playAsync();
      }
    }
  } else {
    soundObject = new Audio.Sound();
    try {
      await soundObject.loadAsync(require('./assets/music/main-menu.mp3'), { isLooping: true });
      const status = await soundObject.getStatusAsync();
      if (status.isLoaded) {
        await soundObject.playAsync();
      }
    } catch (error) {
      console.error("Error loading sound", error);
    }
  }
}

useFocusEffect(
  React.useCallback(() => {
    SwitchSound();
    return async () => { 
      if (soundObject) {
        const status = await soundObject.getStatusAsync();
        if (status.isLoaded && status.isPlaying) { 
          await soundObject.stopAsync(); 
        }
      }
    };
  }, [])
);

  return (
    <Background source={require('./assets/main-menu.gif')}>
      <Menu>
        <Button onPress={Start}>
          <ButtonText>Новая игра</ButtonText>
        </Button>
        <Button onPress={LoadGame}>
          <ButtonText>Продолжить</ButtonText>
        </Button>
        <Button onPress={Exit}>
          <ButtonText>Выход</ButtonText>
        </Button>
      </Menu>
    </Background>
  );
}

export default MenuScreen;

// Styled components

const Background = styled.ImageBackground`
  display: flex;
  width: 100%; 
  height: 100%; 
  align-items: center;
  justify-content: center;
`

const Menu = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 270px;
  height: 214px;
  gap: 25px;
  border-radius: 40px;
  background: rgba(0, 0, 0, 0.80);
`
const Button = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 50px;
`
const ButtonText = styled.Text`
  color: #E2DED3;
  font-family: Roboto;
  font-size: 30px;
  font-style: italic;
  font-weight: 400;
  letter-spacing: -0.9px;
`;