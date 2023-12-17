import React from 'react';
import { BackHandler } from 'react-native';
import styled from 'styled-components/native';

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

function MenuScreen({ navigation }) {

    function Start() {
      navigation.navigate('GameScreen');
    }

    function Exit() {
        BackHandler.exitApp();
    }

    return (
      <Background source={require('./assets/main.gif')}>
        <Menu>
          <Button>
            <ButtonText onPress={Start}>New game</ButtonText>
          </Button>
          <Button>
            <ButtonText>Continue</ButtonText>
          </Button>
          <Button onPress={Exit}>
            <ButtonText>Exit</ButtonText>
          </Button>
        </Menu>
        
      </Background>
    );
  }

export default MenuScreen;
