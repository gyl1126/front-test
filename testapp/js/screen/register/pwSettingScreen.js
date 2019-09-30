//
//  pwSettingScreen.js
//  Split
//
//  Created by Mumakil on 2019. 2. 1..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Alert,
  Animated
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';
import ConstantString from 'constants/string';

import NavigationBar from 'component-bar/navigationBar';
import TitleBar from 'component-bar/titleBar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LoadingIndicator from 'component-indicator/loadingIndicator';
import SealGenerator, {SealStyle} from 'component-image/sealGenerator';
import KeyInputView from 'component-view/keyInputView';

const phase = {
    INPUT_PINCODE: 1,   // 패스워드 입력 단계
    REINPUT_PINCODE: 2, // 확인용 패스워드 입력 단계
};

/**
 * @protocol PwSettingScreen
 * @date 2019/02/01
 * @brief 비밀번호 설정 화면
 */
export default class PwSettingScreen extends Component {
    constructor(props) {
        super(props);

        // FIXME: 이전 화면에서 넘어온 이름 체크하도록 해둠
        var nameStr = this.props.navigation.getParam('name');
        if( nameStr == null || nameStr.length == 0 ) {
            nameStr = ConstantString.UserName;
        }

        sealEnableUri = null;
        sealDisableUri = null;
        duration = new Animated.Value(0)

        this.state = {
            phase: phase.INPUT_PINCODE,     // 단계 설정값
            sealEnableUri:null,     // 활성화 도장 uri
            sealDisableUri:null,    // 비활성화 도장 uri
            pinCode:null,           // 비밀번호
            isShowIndicator:false,          // 로딩 인디케이터 표시 여부

            // 이전 화면에서 받아온 정보
            agencyId:this.props.navigation.getParam('agencyId'), 
            agency:this.props.navigation.getParam('agency'),
            name: nameStr,
            // name:this.props.navigation.getParam('name'),
            birthNo:this.props.navigation.getParam('birthNo'),
            genderNo:this.props.navigation.getParam('genderNo'),
            phoneNumber:this.props.navigation.getParam('phoneNumber'),
            auth:this.props.navigation.getParam('auth'),
        };

        this.onBackPressed = this.onBackPressed.bind(this);
        this.onPinCodeChanged = this.onPinCodeChanged.bind(this);
        this.onSealEnableImageGenerated = this.onSealEnableImageGenerated.bind(this);
        this.onSealDisableImageGenerated = this.onSealDisableImageGenerated.bind(this);
    }

    _scrollToInput (reactNode: any) {
        this.scroll.props.scrollToFocusedInput(reactNode)
    }

    /**
     * 비밀번호 입력시 호출
     * @param pinCode 입력된 비밀번호
     */
    onPinCodeChanged(pinCode) {
        if( this.state.phase == phase.INPUT_PINCODE ) {
            this.setState({phase: phase.REINPUT_PINCODE,
                pinCode: pinCode});
        }
        else if( this.state.phase == phase.REINPUT_PINCODE ) {
            if( this.state.pinCode == pinCode ) {
                // FIXME: 임시, 회원가입 서버 요청 후, 화면 이동해야함
                // 인디케이터 표시 후, 팝업 및 화면 이동
                this.setState({isShowIndicator:true});
                var that = this;
                setTimeout(function(){
                    that.setState({isShowIndicator:false});
                    setTimeout(function(){
                        Alert.alert(
                            '회원가입 완료',
                            '회원가입이 성공적으로 완료되었습니다.',
                            [
                                {
                                    text: 'OK', onPress: () => {
                                        that.props.navigation.navigate('Home');
                                }},
                            ],
                            {cancelable: false},
                        );
                    }, 300);
                }, 2000);
            }
            else 
                Alert.alert('비밀번호가 일치하지 않습니다');
        }
    }

    /**
     * 뒤로가기 버튼 클릭시 호출
     */
    onBackPressed() {
        this.props.navigation.goBack();
    }

    /**
     * 팝업 알림 표시한다.
     * @param message 알림 메시지
     */
    showAlert(message) {
        if (!message.length) return null;
        Alert.alert(
          message,
          '',
          [
            {text: 'OK', onPress: () => this.setState({isShowIndicator:false})},
          ],
          {cancelable: false},
        );
    }

    /**
     * 활성화된 도장 이미지 생성 완료시 호출
     * @param uri 이미지 파일 패스
     */
    onSealEnableImageGenerated(uri) {
        this.sealEnableUri = uri;

        if( this.sealDisableUri != null ) {
            this.setState({
                sealEnableUri: this.sealEnableUri,
                sealDisableUri: this.sealDisableUri,
            });
        }
    }

    /**
     * 비활성화된 도장 이미지 생성 완료시 호출
     * @param uri 이미지 파일 패스
     */
    onSealDisableImageGenerated(uri) {
        this.sealDisableUri = uri;
        if( this.sealEnableUri != null ) {
            this.setState({
                sealEnableUri: this.sealEnableUri,
                sealDisableUri: this.sealDisableUri,
            });
        }
    }

    /**
     * 타이틀바 렌더링
     */
    renderTitleBar() {
        if( this.state.phase == phase.INPUT_PINCODE ) {
            return <TitleBar title='전자서명키 설정'/>;
        }
        else {
            return <TitleBar title='전자서명키 설정 재확인'/>;
        }
    }

    /**
     * 비밀번호 입력단 렌더링
     */
    renderPinInput() {
        if( this.state.phase == phase.INPUT_PINCODE ) {
            return (
                <View>
                    <Text style={[styles.description, TextStyle.default, TextStyle.size_14, TextStyle.color_niceblue2, TextStyle.weigth_medium]}>
                        전자서명키는 저작권료 정산 계약 및 송금 시 사용되며{"\n"}도장 이미지와 비밀번호의 조합입니다.
                    </Text>
                    <KeyInputView
                        sealTitle={'도장 이미지 선택\n(아래 도장을 터치해주세요)'}
                        pinTitle='비밀번호 설정'
                        sealEnableURI={this.state.sealEnableUri}
                        sealDisableURI={this.state.sealDisableUri}
                        methodComplete={this.onPinCodeChanged}/>
                </View>
            );
        }
        else {
            return (
                <View>
                    <Text style={[styles.description, TextStyle.default, TextStyle.size_14, TextStyle.color_niceblue2, TextStyle.weigth_medium]}>
                        도장 이미지와 비밀번호를 한 번 더 입력해주세요!
                    </Text>
                    <KeyInputView
                        sealTitle='도장 이미지 선택'
                        pinTitle='비밀번호 설정'
                        sealEnableURI={this.state.sealEnableUri}
                        sealDisableURI={this.state.sealDisableUri}
                        methodComplete={this.onPinCodeChanged}/>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container_seal1}>
                    <SealGenerator
                        name={this.state.name}
                        sealStyle={SealStyle.ROUND}
                        enable={true}
                        method={this.onSealEnableImageGenerated}/>
                </View>
                <View style={styles.container_seal2}>
                    <SealGenerator
                        name={this.state.name}
                        sealStyle={SealStyle.ROUND}
                        enable={false}
                        method={this.onSealDisableImageGenerated}/>
                </View>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#4F6D7A"/>
                <NavigationBar method={this.onBackPressed}/>
                <LoadingIndicator
                    message='회원가입 처리중'
                    visible={this.state.isShowIndicator}/>
                { this.renderTitleBar() }
                <KeyboardAwareScrollView style={styles.container_content}
                    innerRef={ref => {
                        this.scroll = ref
                    }}>
                    {this.renderPinInput()}
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorStyle.White,
    },
    container_seal1: {
        marginTop:-400,
        width:200,
        height:200,
    },
    container_seal2: {
        marginTop:0,
        width:200,
        height:200,
    },
    container_content: {
        flex: 1,
        backgroundColor: ColorStyle.GreyF7,
    },
    container_pininputfield: {
        width: '70%',
        top: 150,
    },
    description: {
        marginTop: 28,
        marginBottom: 28,
        marginLeft: 35,
        marginRight: 35,
    }
});