//
//  regBankAccountScreen.js
//  Split
//
//  Created by Mumakil on 2019. 4. 24..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

import HomeNavigationBar, {HOMENAVIGATIONBAR_THEME_GREY} from 'component-bar/homeNavigationBar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TitleInputField, {INPUT_THEME_WHITE, INPUT_TYPE_NORMAL, INPUT_KEYBOARDTYPE_NUMBER} from 'component-input/titleInputField';
import SubmitButton from 'component-button/submitButton';
import LoadingIndicator from 'component-indicator/loadingIndicator';

import BankAccountInfo, {BANKACCOUNTINFO_CONTAINER} from 'info/bankAccountInfo';

/**
 * @protocol RegBankAccountScreen
 * @date 2019/04/24
 * @brief 계좌번호 입력 화면
 */
export default class RegBankAccountScreen extends Component {
    constructor(props) {
        super(props);

        var bankAccountInfo = this.props.navigation.getParam(BANKACCOUNTINFO_CONTAINER);
        
        this.state = {
            isShowIndicator: false,     // 로딩
            title: bankAccountInfo.bankName + ' 계좌 등록', // 화면 타이틀
            input: '12',        // 입력값
        };

        this.onTextChanged = this.onTextChanged.bind(this);
        this.onBackPressed = this.onBackPressed.bind(this);
        this.onNextPressed = this.onNextPressed.bind(this);
    }

    /**
     * 입력필드 값 변경시 호출
     * @param id 입력필드 id 
     * @param text 변경된 텍스트 
     */
    onTextChanged(id, text) {
        this.setState({input: text});
    }
    
    /**
     * 뒤로가기 버튼 클릭시 호출
     */
    onBackPressed() {
        this.props.navigation.goBack();
    }

    /**
     * 다음 버튼 클릭시 호출
     */
    onNextPressed() {
        // 기존 정보 업데이트
        var bankAccountInfo = this.props.navigation.getParam(BANKACCOUNTINFO_CONTAINER);
        bankAccountInfo.accountNumber = this.state.input;
        
        // FIXME: 임시, 계좌 등록 서버 요청 후, 화면 이동해야함
        // 인디케이터 표시 후, 팝업 및 화면 이동
        this.setState({isShowIndicator:true});
        var that = this;
        setTimeout(function(){
            that.setState({isShowIndicator:false});
            setTimeout(function(){
                Alert.alert(
                    '계좌 등록 완료',
                    '계좌등록이 성공적으로 완료되었습니다.',
                    [
                        {
                            text: 'OK', onPress: () => {
                                
                                that.props.navigation.navigate('TransferAccount', {
                                    [BANKACCOUNTINFO_CONTAINER]:bankAccountInfo,
                                });
                        }},
                    ],
                    {cancelable: false},
                );
            }, 300);
            
        }, 2000);
    }

    render() {
        return (
        <View style={styles.container}>
            <LoadingIndicator
                message='계좌 확인 중'
                visible={this.state.isShowIndicator}/>
            <HomeNavigationBar 
                title={this.state.title}
                theme={HOMENAVIGATIONBAR_THEME_GREY}
                methodBack={this.onBackPressed}/>
            <TouchableWithoutFeedback 
                onPress={Keyboard.dismiss} 
                accessible={false}>
                <View style={styles.container_content}>
                    <View style={styles.container_input}>
                        <TitleInputField
                            title='계좌번호'
                            placeholder='- 없이 입력'
                            keyboardType={INPUT_KEYBOARDTYPE_NUMBER}
                            method={this.onTextChanged}
                            theme={INPUT_THEME_WHITE}
                            type={INPUT_TYPE_NORMAL}/>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <SubmitButton containerStyle={styles.container_submitbutton}
                title='다음'
                enable={(this.state.input.length>0?true:false)}
                method={this.onNextPressed}/>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorStyle.GreyF7,
    },
    container_content: {
        flex: 1,
        paddingLeft: 33,
        paddingRight: 33,
    },
    container_input: {
        marginTop: 44,
    },
    container_submitbutton: {
        marginTop: 40,
        marginBottom: 24,
        alignItems:'center',
        height: 43,
    },
});