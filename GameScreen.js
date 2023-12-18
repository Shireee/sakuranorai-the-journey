import { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import scenario from './assets/scenario.json';
import { imageFiles, audioFiles } from './assets';

const Background = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%; 
  height: 100%; 
`

const Menu = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 150px;
  background: rgba(0, 0, 0, 0.80);
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`

const ButtonBox = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background-color: red;
`

const Button = styled.TouchableOpacity`

`
const ButtonBoxWrapper = styled.View`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`

const IconButton = styled(Image)`
  width: 30px;
  height: 30px;
  margin: 0 10px 0 10px;
`;

const TextContent = styled.Text`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 105px;
  padding: 15px 15px 0 15px;
  color: #E2DED3;
  font-family: Roboto;
  font-size: 20px;
  font-style: italic;
  font-weight: 400;
`;

function GameScreen({ navigation, route: navigationRoute }) {

  const [isUIVisible, setUIVisible] = useState(true);
  useEffect(() => {
    SwitchSound();
  }, []);

  function Back2Menu() {
    navigation.navigate('MenuScreen');
  }

  function FastForward() {
    // TODO
  }

  function Hide() {
    setUIVisible(!isUIVisible);
  }


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
        await soundObject.loadAsync(audioFiles[currentScene.audio], { isLooping: true });
        await soundObject.playAsync();
      } catch (error) {
        console.error("Error loading sound", error);
      }
    }
  }
  
  useFocusEffect(
    React.useCallback(() => {
      SwitchSound();
      return () => {
        if (soundObject) {
          soundObject.stopAsync();
        }
      };
    }, [])
  );
  
  const [chapter, setChapter] = useState(0);
  const [route, setRoute] = useState(0);
  const [scene, setScene] = useState(0);
  const [content, setContent] = useState(0);

  useEffect(() => {
    const isNewGame = navigationRoute.params?.isNewGame;
    if (isNewGame !== undefined) {
      setChapter(0);
      setRoute(0);
      setScene(0);
      setContent(0);
    }
  }, [navigationRoute.params?.isNewGame]);

  const Next = () => {
    const chapterData = scenario.chapters[chapter];
    const routeData = chapterData.routes[route];
    const sceneData = routeData.scenes[scene];
  
    if (content < sceneData.content.length - 1) {
      setContent(content + 1);
    } else if (scene < routeData.scenes.length - 1) {
      setScene(scene + 1);
      setContent(0);
    } else if (route < chapterData.routes.length - 1) {
      setRoute(route + 1);
      setScene(0);
      setContent(0);
    } else if (chapter < scenario.chapters.length - 1) {
      setChapter(chapter + 1);
      setRoute(0);
      setScene(0);
      setContent(0);
    }
  };

  const [currentScene, setCurrentScene] = useState(scenario.chapters[0].routes[0].scenes[0]);

  useEffect(() => {
    setCurrentScene(scenario.chapters[chapter].routes[route].scenes[scene]);
  }, [chapter, route, scene]);

    return (
      <TouchableOpacity activeOpacity={1} onPress={isUIVisible ? Next : Hide} style={{flex: 1}}>
      <Background source={imageFiles[currentScene.image]}>
        <Menu visible={isUIVisible}>
          <TextContent>
            { scenario.chapters[chapter].routes[route].scenes[scene].content[content].text }
          </TextContent>
          <ButtonBoxWrapper>
            <ButtonBox>
              <Button onPress={() => { Back2Menu();}}>
                <IconButton source={require('./assets/icons/back.png')} />
              </Button>
              <Button onPress={SwitchSound}>
                <IconButton source={require('./assets/icons/sound-on.png')} />
              </Button>
              <Button onPress={FastForward}>
                <IconButton source={require('./assets/icons/fast-forward.png')} />
              </Button>
              <Button onPress={Hide}>
                <IconButton source={require('./assets/icons/eye.png')} />
              </Button>
            </ButtonBox>
          </ButtonBoxWrapper>
        </Menu>
      </Background>
    </TouchableOpacity>
    );
  }

export default GameScreen;