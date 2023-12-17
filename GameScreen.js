import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Player } from 'react-native-audio-toolkit';

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
  height: 160px;
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

const Scrollable = styled(ScrollView)`
  margin: 15px 15px 0 15px;
  height: 70px;
`;

const TextContent = styled.Text`
  color: #E2DED3;
  font-family: Roboto;
  font-size: 20px;
  font-style: italic;
  font-weight: 400;
`;

function GameScreen({ navigation }) {

  const [isUIVisible, setUIVisible] = useState(true);
  // const player = new Player(require('./assets/music/main-menu.mp3')).prepare((err) => {
  //   if (err) {
  //     console.error('error at _reloadPlayer :', err);
  //   } else {
  //     player.play();
  //   }
  // });

  function Back2Menu() {
    navigation.navigate('MenuScreen');
  }

  function FastForward() {
    // TODO
  }

  function Hide() {
    setUIVisible(!isUIVisible);
  }

  function SwitchSound() {
    // TODO
  }

    return (
      <TouchableOpacity activeOpacity={1} onPress={isUIVisible ? null : Hide} style={{flex: 1}}>
      <Background source={require('./assets/chose.png')}>
        <Menu visible={isUIVisible}>
          <Scrollable>
            <TextContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis hic possimus ullam eveniet animi delectus exercitationem officia consequatur. Dolore impedit ea ex ab a facilis ipsam magni reprehenderit velit et?
            </TextContent>
          </Scrollable>
          <ButtonBoxWrapper>
            <ButtonBox>
              <Button onPress={SwitchSound}>
                <IconButton source={require('./assets/icons/sound-on.png')} />
              </Button>
              <Button onPress={Back2Menu}>
                <IconButton source={require('./assets/icons/back.png')} />
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