//
//  phoneAuthScreen.js
//  Split
//
//  Created by Mumakil on 2019. 1. 24..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import TextStyle from 'style/text';
import ButtonStyle from 'style/button';
import ColorStyle from 'style/color';
import NavigationBar from 'component-bar/navigationBar';
import TitleBar from 'component-bar/titleBar';
import TitleInputField from 'component-input/titleInputField';
import InputField from 'component-input/inputField';
import RegidentNumberInputField from 'component-input/regidentNumberInputField';
import ActionSheetPicker from 'component-picker/actionSheetPicker';
import DropdownPickerCover from 'component-picker/dropdownPickerCover';
// import firebase from 'react-native-firebase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';
import SubmitButton from 'component-button/submitButton';

const phase = {
  INPUT_NAME: 1,
  INPUT_REGIDENTNUMBER: 2,
  SELECT_PHONEAGENCY: 3,
  INPUT_PHONENUMBER: 4,
  SELECT_AGREEMENT: 5,
  SEND_AUTHMESSAGE: 6,
  INPUT_AUTH: 7,
  COMPLETE: 8,
};

/**
 * @protocol PhoneAuthScreen
 * @date 2019/01/24
 * @brief 휴대폰 인증 화면
 */
export default class PhoneAuthScreen extends Component {
  constructor(props) {
    super(props);
    
    this.agencyList = { data: [
        {
            id: '1',
            name: 'SKT',
        },
        {
            id: '2',
            name: 'KT',
        },
        {
            id: '3',
            name: 'LG U+',
        },
        {
            id: '4',
            name: 'SKT 알뜰폰',
        },
        {
            id: '5',
            name: 'KT 알뜰폰',
        },
        {
            id: '6',
            name: 'LG U+ 알뜰폰',
        },
        {
            id: '0',
            name: '취소'
        }]
    };  // 통신사 목록

    this.state = {
      // FIXME: 임시로 인증 안해도 됨
      phoneAuth: true,      // 인증 여부
      spinner: false,       // 로딩 인디케이터 표시 여부
      selectAgencyId: 0,    // 선택한 통신사 아이디
      selectAgencyName: '', // 선택한 통신사 명
      inputName: '',        // 입력한 이름
      inputBirthNo: '',     // 입력한 생년월일
      inputGenderNo: '',    // 입력한 성별
      inputPhoneNo: '',     // 입력한 전화번호
      inputAuthCode: '',    // 입력한 인증코드
      confirmResult: null,  // 결과 확인(firebase)
      message: '',          // 알림창 메시지
      phase: phase.INPUT_NAME,  // 페이즈
    }
;
    this.inputNameId = 'input-name';        // 이름 입력필드 id
    this.inputBirthNoId = 'input-birthno';  // 생년월일 입력필드 id
    this.inputGenderNoId = 'input-genderno';// 성별 입력필드 id
    this.inputPhoneNoId = 'input-phoneno';  // 휴대폰 입력필드 id
    this.inputAuthCodeId = 'input-authcode';// 인증코드 입력필드 id

    this.onBackPressed = this.onBackPressed.bind(this);
    this.onAgencyPressed = this.onAgencyPressed.bind(this);
    this.onInputChanged = this.onInputChanged.bind(this);
    this.onConfirmPressed = this.onConfirmPressed.bind(this);
  }

  _scrollToInput (reactNode: any) {
    this.scroll.props.scrollToFocusedInput(reactNode)
  }

  /**
   * 인증 요청
   * @param resend 재인증 여부
   */
  requestPhoneAuth(resend) {
    const phoneNumber = '+82' + this.state.inputPhoneNo;
    // this.setState({spinner:true});
    // firebase.auth().signInWithPhoneNumber(phoneNumber, resend)
    //   .then(confirmResult => {
    //     this.setState({ confirmResult });
    //     if( resend )
    //       this.showAlert('인증 코드가 재발송되었습니다');
    //     else
    //       this.showAlert('인증 코드가 발송되었습니다');
    //     })
    //   .catch(error => {
    //     this.showAlert(`인증 과정에서 문제가 발생하였습니다. ${error.message}`);
    //   });
  }

  /**
   * 알림팝업 표시
   * @param message 메시지
   */
  showAlert(message) {
    if (!message.length) return null;
    Alert.alert(
      message,
      '',
      [
        {text: 'OK', onPress: () => this.setState({spinner:false})},
      ],
      {cancelable: false},
    );
  }

  /**
   * 입력필드 값 변경시 호출
   * @param id 입력필드 아이디 
   * @param text 변경 텍스트  
   */
  onInputChanged(id, text) {
    switch(id) {
      case this.inputNameId: {
        this.setState({inputName: text});
        break;
      }
      case this.inputBirthNoId: {
        this.setState({inputBirthNo: text});
        break;
      }
      case this.inputGenderNoId: {
        this.setState({inputGenderNo: text});
        break;
      }
      case this.inputPhoneNoId: {
        this.setState({inputPhoneNo: text});
        break;
      }
      case this.inputAuthCodeId: {
        this.setState({inputAuthCode: text,
          phoneAuth: true,
        });
        break;
      }
    }
  }
  
  /**
   *  액션시트 선택시 호출
   *
   *  @param index 액션시트 선택한 인덱스
   */
  onAgencyPressed(index) {
    if( index < this.agencyList.data.length-1 )
    {
      var selectId = this.agencyList.data[index].id;
      var selectName = this.agencyList.data[index].name;
      
      this.setState({selectAgencyId:selectId,
        selectAgencyName:selectName,
      });
    }
  }

  /**
   * 인증 요청
   */
  onRequestPressed() {
    this.requestPhoneAuth(false);
  }
  
  /**
   * 시간연장 클릭시 호출
   */
  onDelayPressed() {
    this.requestPhoneAuth(true);
  }

  /**
   * 확인 버튼 클릭시 호출
   */
  onConfirmPressed() {
    this.setState({spinner:false});
    this.props.navigation.navigate('PasswordSetting', {agencyId:this.state.selectAgencyId, 
      agency:this.state.selectAgencyName,
      name:this.state.inputName,
      birthNo:this.state.inputBirthNo,
      genderNo:this.state.inputGenderNo,
      phoneNumber:this.state.inputPhoneNo });


    // const { inputAuthCode, confirmResult } = this.state;
    // if( !inputAuthCode.length ) {
    //   this.showAlert('인증코드를 입력해주세요');
    //   return;
    // }
    
    // if (confirmResult && inputAuthCode.length) {
    //   this.setState({spinner:true});
    //   confirmResult.confirm(inputAuthCode)
    //     .then((user) => {
    //       Alert.alert(
    //         '인증이 완료되었습니다',
    //         '',
    //         [
    //           {text: 'OK', onPress: () => {
    //             this.setState({spinner:false});
    //             this.props.navigation.navigate('PasswordSetting', {agencyId:this.state.selectAgencyId, 
    //               agency:this.state.selectAgencyName,
    //               name:this.state.inputName,
    //               birthNo:this.state.inputBirthNo,
    //               genderNo:this.state.inputGenderNo,
    //               phoneNumber:this.state.inputPhoneNo });
    //           }},
    //         ],
    //         {cancelable: false},
    //       );
    //     })
    //     .catch(error => {
    //       this.showAlert(`인증 과정에서 문제가 발생하였습니다.: ${error.message}`);
    //     });
    // }
  }

  /**
   * 뒤로가기 버튼 클릭시 호출
   */
  onBackPressed() {
    this.props.navigation.goBack();
  }

  /**
   * 알림팝업 표시
   */
  renderMessage() {
    const { message } = this.state;
    if (!message.length) return null;
    Alert.alert(
      message,
      '',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderMessage()}
        <StatusBar
          barStyle="light-content"
          backgroundColor="#4F6D7A"
        />
        <Spinner
          visible={this.state.spinner}
        />
        <Text style={styles.title}>

        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorStyle.White,
  },
  container_scrollview: {
    backgroundColor: ColorStyle.GreyF7,
    flex: 1,
    bottom: 0,
  },
  container_name: {
    marginLeft: 40,
    marginRight: 120,
    marginTop: 38,
  },
  container_registernumber: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 29,
  },
  container_phonetitle: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 30,
  },
  container_agency: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 12,
    height:38,
    marginTop:5,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:ColorStyle.VeryLightPinkTwo,
  },
  container_row: {
    marginLeft: 40,
    marginRight: 40,
    marginTop: 12,
    height:38,
    flex:1,
    flexDirection: 'row',
  },
  container_rowinput: {
    flex:1,
    marginRight:10,
  },
  container_rowbutton: {
    width:103,
  },
  container_submitbutton: {
    marginTop: 47,
    marginLeft: 40,
    marginRight: 40,
    alignItems:'center',
    height: 41,
  },
  container_bottomspace: {
    height:40,
    flex:1,
  },
});