//
//  transferInputScreen.js
//  Split
//
//  Created by Mumakil on 2019. 3. 26..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Alert,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';
import ConstantString from 'constants/string';

import LogoBar from 'component-bar/logoBar';
import MoneyInputView from 'component-view/moneyInputView';
import SubmitButton  from 'component-button/submitButton';

import TransferInfo, {TRANSFERINFO_CONTAINER} from 'info/transferInfo';

/**
 * @protocol TransferInputScreen
 * @date 2019/04/19
 * @brief 송금 금액 입력 화면
 */
export default class TransferInputScreen extends Component {
    constructor(props) {
        super(props);

        // 임의의 정보
        var transferInfo = new TransferInfo;
        transferInfo.currency = 'KRW';
        // 본인 split 계좌
        transferInfo.senderAccount.userName = ConstantString.UserName;
        transferInfo.senderAccount.bankCode = 0;
        transferInfo.senderAccount.bankName = 'Split';
        transferInfo.senderAccount.bankIconUrl = Images.SplitMoney;
        transferInfo.senderAccount.accountNumber = '1234567890';
        transferInfo.senderAccount.balance = 2160000;

        this.state = {
            inputValue: '',     // 송금 입력 금액
            transferInfo: transferInfo,
        };

        this.inputView = 'inputView';

        this.viewWillFocus = this.viewWillFocus.bind(this);
        this.onInputChanged = this.onInputChanged.bind(this);
        this.onTransferAllPressed = this.onTransferAllPressed.bind(this);
        this.onTransferPressed = this.onTransferPressed.bind(this);
    }

    componentWillMount() {
        this.props.navigation.addListener('willFocus', this.viewWillFocus);
    }

    /**
     * 화면 재 진입시 데이터 변경 체크
     */
    viewWillFocus() {
        // 입력값 초기화
        this.refs.inputView.initialize();
        this.setState({inputValue: ''});
    }

    /**
     * 송금 금액 입력시 호출
     * @param value 입력 금액 
     */
    onInputChanged(value) {
        this.setState({ inputValue: value });
    }

    /**
     * 모두 송금 버튼 클릭시 호출
     * @param value 송금 금액
     */
    onTransferAllPressed(value) {
        var transferInfo = this.state.transferInfo;
        transferInfo.amount = value;
        transferInfo.currency = 'KRW';

        this.props.navigation.navigate('TransferAccount', {
            [TRANSFERINFO_CONTAINER]:transferInfo
        });
    }

    /**
     * 보내기 버튼 클릭시 호출
     */
    onTransferPressed() {
        if( Number(this.state.transferInfo.senderAccount.balance) < Number(this.state.inputValue) ) {
            Alert.alert(
                '계좌 잔액 이상을 송금 할 수 없습니다',
                '',
                [
                    {
                        text: 'OK', onPress: () => {
                    }},
                ],
                {cancelable: false},
                );
        }
        else {
            var transferInfo = this.state.transferInfo;
            transferInfo.amount = this.state.inputValue;
            transferInfo.currency = 'KRW';
    
            this.props.navigation.navigate('TransferAccount', {
                [TRANSFERINFO_CONTAINER]:transferInfo
            });
        }
    }

    render() {
        return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#4F6D7A"/>
            <LogoBar/>
            <View style={styles.container_title}>
                <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_30, TextStyle.color_niceblue, TextStyle.align_left]}>
                    송금하기
                </Text>
            </View>
            <View style={styles.container_inputview}>
                <MoneyInputView
                    ref={this.inputView}
                    balance={this.state.transferInfo.senderAccount.balance}
                    method={this.onInputChanged}
                    methodAll={this.onTransferAllPressed}/>
            </View>
            <SubmitButton containerStyle={styles.submitbutton}
                title='보내기'
                enable={(this.state.inputValue.length>0?true:false)}
                method={this.onTransferPressed}/>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorStyle.GreyF7,
    },
    container_title: {
        marginTop: 40,
        marginLeft: 33,
    },
    container_inputview: {
        flex: 1,
        paddingLeft: 34,
        paddingRight: 34,
        paddingTop: 12,
        paddingBottom: 12,
    },
    submitbutton: {
        marginBottom: 24,
        alignItems:'center',
        height: 43,
    },
});