import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import styled from 'styled-components/native';
import { Audio } from 'expo-av';
import { imageFiles, audioFiles } from '../assets/assets';

function MenuScreen({ navigation }) {

  // New game button logic
  function Start() {
    navigation.reset({
      index: 0,
      routes: [{ name: 'GameScreen' }],
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
  const [sound, setSound] = useState(new Audio.Sound());

  async function SwitchSound() {
    const status = await sound.getStatusAsync();
    if (status.isLoaded) {
      if (status.isPlaying){
        await sound.stopAsync();
        await sound.unloadAsync();
      } 
      else await sound.playAsync();
    } else {
        try {
          await sound.loadAsync(audioFiles.menu, { isLooping: true });
          await sound.playAsync();
        } catch (error) {
          console.error("Error loading sound", error);
        }
      }
  }

  useEffect(() => {
    SwitchSound();
  }, [])
  
  return (
    <Background source={imageFiles.menu}>
      <Menu>
        <Button onPress={() => { SwitchSound(); Start()} }><ButtonText>Новая игра</ButtonText></Button>
        <Button onPress={() => { SwitchSound(); LoadGame()} }><ButtonText>Продолжить</ButtonText></Button>
        <Button onPress={ Exit }><ButtonText>Выход</ButtonText></Button>
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