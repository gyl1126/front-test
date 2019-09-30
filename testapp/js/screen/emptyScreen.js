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
  Text,
} from 'react-native';
import ColorStyle from 'style/color';
import NormalButton, {NORMALBUTTON_THEHE_WHITE} from 'component-button/normalButton';
import * as common from "../communication/NetworkUserInfo";
import { whileStatement } from '@babel/types';
import UserInfo from '../info/UserInfo'
import { userInfo } from 'os';
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
      type: null,
      name: '',
      newpwd:'',
      pwd:'',
      phone:'',
      email:'',
      birth:'',
      gender:null,

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
          style={{height: 40}}
          placeholder="새비밀번호"
          onChangeText={(text) => this.setState({newpwd: text})}
          value={this.state.newpwd}
        />
        
    <TextInput
          style={{height: 40, backgroundColor: "white"}}
          placeholder="타입"
          onChangeText={(text) => this.setState({type: text})}
          value={this.state.type}
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
         <TextInput
          style={{height: 40, backgroundColor: "white"}}
          placeholder="생일"
          onChangeText={(text) => this.setState({birth: text})}
          value={this.state.birth}
        />
         <TextInput
          style={{height: 40}}
          placeholder="성별"
          onChangeText={(text) => this.setState({gender: text})}
          value={this.state.gender}
        />
        <Text Style={{height: 40, backgroundColor: "white"}}>{common.loginInfo.userID}</Text>
        
        <NormalButton containerStyle={styles.button}
            title='시작하기'
            theme={NORMALBUTTON_THEHE_WHITE}
            method={() => common.putUserPwd( this.state.pwd, this.state.newpwd, this.state.phone,this.state.gender)}/>
       
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