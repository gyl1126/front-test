//
//  transferCompleteScreen.js
//  Split
//
//  Created by Mumakil on 2019. 4. 24..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

import HomeNavigationBar, {HOMENAVIGATIONBAR_THEME_BLUE} from 'component-bar/homeNavigationBar';
import SubmitButton from 'component-button/submitButton';
import SplitUtil from 'etc/splitUtil';
import { StackActions } from 'react-navigation';

import TransferInfo, {TRANSFERINFO_CONTAINER} from 'info/transferInfo';

/**
 * @protocol TransferCompletecreen
 * @date 2019/04/24
 * @brief 송금 완료 화면
 */
export default class TransferCompleteScreen extends Component {
    constructor(props) {
        super(props);

        var transferInfo = this.props.navigation.getParam(TRANSFERINFO_CONTAINER);
        
        // var transferInfo = new TransferInfo;
        // transferInfo.currency = 'KWD';
        // transferInfo.amount = 10000;
        // transferInfo.senderAccount.userName = '홍길동';
        // transferInfo.senderAccount.bankCode = 0;
        // transferInfo.senderAccount.bankName = 'Split';
        // transferInfo.senderAccount.bankIconUrl = Images.SplitMoney;
        // transferInfo.senderAccount.accountNumber = '1234567890';
        // transferInfo.receiverAccount.userName = '홍길동';
        // transferInfo.receiverAccount.bankCode = 4;
        // transferInfo.receiverAccount.bankName = '우리';
        // transferInfo.receiverAccount.bankIconUrl = Images.BankList[3];
        // transferInfo.receiverAccount.accountNumber = '110457788585';
        
        this.state = {
            transferInfo: transferInfo,
        }

        this.onConfirmPressed = this.onConfirmPressed.bind(this);
    }

    /**
     * 완료 버튼 클릭시 호출
     */
    onConfirmPressed() {
        this.props.navigation.dispatch(StackActions.popToTop());
    }

    render() {
        return (
        <View style={styles.container}>
            <HomeNavigationBar 
                title='송금하기'
                theme={HOMENAVIGATIONBAR_THEME_BLUE}/>
            <View style={styles.container_content}>
                <View style={styles.container_row}>
                    <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_20, TextStyle.color_grey33]}>
                        {this.state.transferInfo.receiverAccount.userName}
                    </Text>
                    <Text style={[TextStyle.default, TextStyle.weigth_light, TextStyle.size_20, TextStyle.color_grey33]}>
                        님의
                    </Text>
                </View>
                <View style={styles.container_row}>
                    <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_20, TextStyle.color_grey33]}>
                        {this.state.transferInfo.receiverAccount.bankName + '은행 계좌'}
                    </Text>
                    <Text style={[TextStyle.default, TextStyle.weigth_light, TextStyle.size_20, TextStyle.color_grey33]}>
                        로
                    </Text>
                </View>
                <View style={styles.container_row}>
                    <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_20, TextStyle.color_grey33]}>
                        {SplitUtil.numberWithCommas(Number(this.state.transferInfo.amount))+'원'}
                    </Text>
                </View>
                <View style={styles.container_bankcontent}>
                    <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_30, TextStyle.color_grey33,
                        {marginBottom: 21,}]}>
                        송금 완료
                    </Text>
                    <View style={styles.container_bank}>
                        <View style={styles.bankprop}>
                            <Image style={styles.bank}
                                source={this.state.transferInfo.receiverAccount.bankIconUrl}/>
                        </View>
                    </View>
                    <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_15, TextStyle.color_browngreytwo,
                        {marginTop: 19}]}>
                        {this.state.transferInfo.receiverAccount.userName
                            + ' ' + this.state.transferInfo.receiverAccount.bankName
                            + ' ' + this.state.transferInfo.receiverAccount.accountNumber}
                    </Text>
                    <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_15, TextStyle.color_browngreytwo,
                        {marginTop: 15}]}>
                        {'송금 후 스플릿머니 ' + SplitUtil.numberWithCommas(Number(this.state.transferInfo.senderAccount.balance)) + '원'}
                    </Text>
                </View>
            </View>
            <SubmitButton containerStyle={styles.container_submitbutton}
                title='확인'
                enable={true}
                method={this.onConfirmPressed}/>
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
        alignItems: 'center',
        paddingTop: 60,
    },
    container_row: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    container_bankcontent: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_bank: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container_submitbutton: {
        marginTop: 40,
        marginBottom: 24,
        alignItems:'center',
        height: 43,
    },
    bankprop: {
        width: 91,
        height: 91,
        borderColor: ColorStyle.Silver,
        borderWidth: 1,
        borderRadius: 45.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bank: {
        width: 82,
        height: 82,
    },
    arrow: {
        width: 45,
        height: 26,
        marginLeft: 18,
        marginRight: 18,
    }
});