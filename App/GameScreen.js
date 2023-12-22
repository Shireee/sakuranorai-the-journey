import { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import React from 'react';
import scenario from '../assets/scenario.json';
import { imageFiles, audioFiles } from '../assets/assets';
import { useFocusEffect } from '@react-navigation/native';

function GameScreen({ navigation }) {

  // Hide UI button logic
  const [isUIVisible, setUIVisible] = useState(true);

  function Hide() {
    setUIVisible(!isUIVisible);
  }

  // Back to menu button logic
  function Back2Menu() {
    navigation.navigate('MenuScreen');
  }

  // Game logic
  const [chapter, setChapter] = useState(0);
  const [route, setRoute] = useState(0);
  const [scene, setScene] = useState(0);
  const [content, setContent] = useState(0);
  const [isChoice, setChoice] = useState(false);

  function Next() {
    // If choices are being shown, block Next()
    if (isChoice) return;

    const chapterData = scenario.chapters[chapter];
    const routeData = chapterData.routes[route];
    const sceneData = routeData.scenes[scene];

    // Stop game if we are reach last scene
    if (scenario.chapters[chapter].routes[route].scenes[scene].content[content].end) return;

    // Hande text transition
    if (content < sceneData.content.length - 1) setContent(content + 1);
    else if (scene < routeData.scenes.length - 1) { setScene(scene + 1); setContent(0); }
    else if (route < chapterData.routes.length - 1) { setRoute(route + 1); setScene(0); setContent(0); }
    else if (chapter < scenario.chapters.length - 1) {
      // Check if the next chapter has more than one route
      if (scenario.chapters[chapter + 1].routes.length > 1) {
        setChoice(true);
      } else {
        setChapter(chapter + 1);
        setRoute(0);
        setScene(0);
        setContent(0);
      }
    }
  };

  // Sound logic
  const [isSoundOn, setSoundOn] = useState(false);
  const [sound, setSound] = useState(new Audio.Sound());
  const [prevSound, setPrevSound] = useState(audioFiles[scenario.chapters[chapter].routes[route].scenes[scene].audio]);
  
  async function SwitchSound() {
    const status = await sound.getStatusAsync();
    const currentSound = audioFiles[scenario.chapters[chapter].routes[route].scenes[scene].audio];

    if (isSoundOn) {
      if (status.isLoaded){

        // if current sound is the same as previous sound, just play it
        if (currentSound === prevSound) await sound.playAsync();

        // if current sound is different from previous sound, unload previous sound, load current sound and play it
        else {
          await sound.unloadAsync();
          await sound.loadAsync(currentSound, { isLooping: true });
          await sound.playAsync();
          setPrevSound(currentSound);
        }
      } 

      // if sound is not loaded, load current sound and play it
      else {
        try {
          await sound.loadAsync(currentSound, { isLooping: true });
          await sound.playAsync();
        } catch (error) {
          console.error("Error loading sound", error);
        }
      }
    }

    // If sound off pause player 
    else if (status.isLoaded) if (status.isPlaying) await sound.pauseAsync();
  }

  useFocusEffect(
    React.useCallback(() => {
      setSoundOn(true); // screen comes into focus
  
      return () => setSoundOn(false) // screen goes out of focus
    }, [])
  );

  useEffect(() => {
    SwitchSound();
  }, [isSoundOn])

  return (
    <TouchableOpacity activeOpacity={1} onPress={() => { isUIVisible ? Next() : Hide(); SwitchSound(); }} style={{ flex: 1 }}>
      <Background source={imageFiles[scenario.chapters[chapter].routes[route].scenes[scene].image]}>
        <Choice showChoice={isChoice}>
          {isChoice && scenario.chapters[chapter + 1].routes.map((route, index) => (
            <ChoiceButton
              key={index}
              onPress={() => {
                setChapter(chapter + 1);
                setRoute(index);
                setScene(0);
                setContent(0);
                setChoice(false);
              }}>
              <ChoiceText>{route.root_title}</ChoiceText>
            </ChoiceButton>))
          }
        </Choice>
        <Menu visible={isUIVisible}>
          <TextContent>{scenario.chapters[chapter].routes[route].scenes[scene].content[content].text}</TextContent>
          <ButtonBoxWrapper>
            <ButtonBox>
              <Button onPress={() => { Back2Menu();  }}><IconButton source={imageFiles.backButton} /></Button>
              <Button onPress={() => { setSoundOn(!isSoundOn) }}><IconButton source={imageFiles.soundButton} /></Button>
              <Button onPress={Hide}><IconButton source={imageFiles.hideButton} /></Button>
            </ButtonBox>
          </ButtonBoxWrapper>
        </Menu>
      </Background>
    </TouchableOpacity>
  );
}

export default GameScreen;

// Styled components
const Background = styled.ImageBackground`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%; 
  height: 100%; 
`

const Menu = styled.View`
  position: relative;
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

const Choice = styled.View`
  position: absolute;
  top: 37%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 370px;
  height: 214px;
  gap: 25px;
  border-radius: 40px;
  background: rgba(0, 0, 0, 0.80);
  opacity: ${({ showChoice }) => (showChoice ? 1 : 0)};
`
const ChoiceButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 50px;
  transition: 0.5s;
`
const ChoiceText = styled.Text`
  color: #E2DED3;
  font-family: Roboto;
  font-size: 25px;
  font-style: italic;
  font-weight: 400;
  letter-spacing: -0.9px;
`;