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
  View,
  StatusBar,
  Button,
  TextInput,
} from 'react-native';
import ColorStyle from 'style/color';
import NormalButton, {NORMALBUTTON_THEHE_WHITE} from 'component-button/normalButton';
import * as common from "../communication/NetworkUserInfo";
import { whileStatement } from '@babel/types';
import {
  USERINFO_USERTYPE,
  USERINFO_PASSWORD,
  USERINFO_NAME,
  USERINFO_PHONE,
  USERINFO_EMAIL,
  USERINFO_BIRTHDAY,
  USERINFO_GENDER,
  USERINFO_ADVERTISE,
  USERINFO_MARKETING,
} from 'info/UserInfo';
/**
 * @protocol EmptyScreen
 * @date 2019/02/28
 * @brief 빈 화면
 */
common.requestLoginIn = common.requestLoginIn.bind(this);

export default class EmptyScreen extends Component {
  constructor(props) {
     super(props);
    this.state = {

      name: '',
      pwd:'',
      phone:'',
      email:'',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#4F6D7A"
        />
    <TextInput
          style={{height: 40, backgroundColor: "white"}}
          placeholder="이름"
          onChangeText={(text) => this.setState({name: text})}
          value={this.state.name}
        />
        <TextInput
          style={{height: 40}}
          placeholder="비밀번호"
          onChangeText={(text) => this.setState({pwd: text})}
          value={this.state.pwd}
        />
        <TextInput
          style={{height: 40, backgroundColor: "white"}}
          placeholder="폰번호"
          onChangeText={(text) => this.setState({phone: text})}
          value={this.state.phone}
        />
        <TextInput
          style={{height: 40}}
          placeholder="이메일"
          onChangeText={(text) => this.setState({email: text})}
          value={this.state.email}
        />

<NormalButton containerStyle={styles.button}
            title='시작하기'
            theme={NORMALBUTTON_THEHE_WHITE}
            method={() => common.requestLoginIn(this.state.phone,this.state.pwd)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorStyle.PeacockBlue,
  },
  button: {
    alignItems:'center',
    height: 48,
    width: 163,
  },
});