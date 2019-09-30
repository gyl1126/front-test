//
//  introScreen.js
//  Split
//
//  Created by Mumakil on 2019. 1. 18..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';
import DeviceInfo from 'react-native-device-info';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import NormalButton, {NORMALBUTTON_THEHE_WHITE} from 'component-button/normalButton';

/**
 * @protocol IntroScreen
 * @date 2019/01/18
 * @brief 인트로 화면
 */
export default class IntroScreen extends Component {
  componentDidMount() {
    console.disableYellowBox = true;

    // FIXME: udid 기반 서버에 계정 체크
    var udid = DeviceInfo.getUniqueID();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#4F6D7A"/>
        <View style={styles.container_logo}>
          <Image source={Images.Logo}
            style={styles.logo}/>
        </View>
        <View style={styles.container_subtitle}>
          <Text style={[TextStyle.default, TextStyle.size_24]}>
              간편 정산
          </Text>
        </View>
        <View style={styles.container_wallet}>
          <Image source={Images.Wallet}/>
        </View>
        <View style={styles.container_button}>
          <NormalButton containerStyle={styles.button}
            title='시작하기'
            theme={NORMALBUTTON_THEHE_WHITE}
            method={() => this.props.navigation.navigate('Walkthrough')}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorStyle.NiceBlue,
  },
  container_logo: {
    marginTop: 90 + getStatusBarHeight(),
    alignItems:'center',
    height: 62,
  },
  container_subtitle: {
    marginTop: 15,
    alignItems:'center',
  },
  container_wallet: {
    marginTop: 0,
    marginBottom: 0,
    alignItems:'center',
    justifyContent: 'center',
    flex:1,
  },
  container_button: {
    marginTop: 0,
    marginBottom: 36,
    alignItems:'center',
    justifyContent: 'center',
    height: 48,
  },
  logo: {
    width: 206,
    height: 62,
    resizeMode: 'contain'
  },
  button: {
    alignItems:'center',
    height: 48,
    width: 163,
  },
});