//
//  transferConfirmScreen.js
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
  Image,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

import HomeNavigationBar, {HOMENAVIGATIONBAR_THEME_BLUE, HOMENAVIGATIONBAR_THEME_GREY} from 'component-bar/homeNavigationBar';
import SubmitButton from 'component-button/submitButton';
import PopupView from 'component-view/popupView';
import SignatureInputView from 'component-view/signatureInputView';
import LoadingIndicator from 'component-indicator/loadingIndicator';

import SplitUtil from 'etc/splitUtil';

import TransferInfo, {TRANSFERINFO_CONTAINER} from 'info/transferInfo';
import BankAccountInfo, {BANKACCOUNTINFO_CONTAINER} from 'info/bankAccountInfo';

/**
 * @protocol TransferConfirmScreen
 * @date 2019/04/24
 * @brief 송금 확인 화면
 */
export default class TransferConfirmScreen extends Component {
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
            isShowIndicator: false,     // 로딩
            isShowSignaturePopup: false,
            transferInfo: transferInfo,
        }

        this.contractPopup = 'contractPopup';

        this.onSendPressed = this.onSendPressed.bind(this);
        this.onBackPressed = this.onBackPressed.bind(this);
        this.contractPopupClosed = this.contractPopupClosed.bind(this);
        this.onSignatureCompleted = this.onSignatureCompleted.bind(this);
    }
    
    onSendPressed() {
        this.setState({isShowSignaturePopup: true});
    }

    contractPopupClosed() {
        this.setState({isShowSignaturePopup: false});
    }

    onSignatureCompleted() {
        this.refs.contractPopup.onClosePressed();
        
        // FIXME: 임시, 계좌 등록 서버 요청 후, 화면 이동해야함
        // 인디케이터 표시 후, 팝업 및 화면 이동
        // 팝업 모달 해제 후, 300ms 이후에 인디케이터 모달 호출
        // 팝업 해제 중에 인디케이터 표시 안됨
        var that = this;
        setTimeout(function(){
            that.setState({isShowIndicator:true});
            setTimeout(function(){
                var transferInfo = that.state.transferInfo;
                transferInfo.senderAccount.balance -= transferInfo.amount;
                that.setState({isShowIndicator:false});
                that.props.navigation.navigate('TransferComplete', {
                    [TRANSFERINFO_CONTAINER]:transferInfo,
                });
            }, 2000);
        }, 300);
    }
    
    /**
     * 뒤로가기 버튼 클릭시 호출
     */
    onBackPressed() {
        this.props.navigation.goBack();
    }

    render() {
        return (
        <View style={styles.container}>
            <HomeNavigationBar 
                title='송금하기'
                theme={HOMENAVIGATIONBAR_THEME_BLUE}
                methodBack={this.onBackPressed}/>
            
            <View style={styles.container_content}>
                <View style={styles.container_row}>
                    <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_26, TextStyle.color_grey33]}>
                        {this.state.transferInfo.receiverAccount.userName}
                    </Text>
                    <Text style={[TextStyle.default, TextStyle.weigth_light, TextStyle.size_26, TextStyle.color_grey33]}>
                        님의
                    </Text>
                </View>
                <View style={styles.container_row}>
                    <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_26, TextStyle.color_grey33]}>
                        {this.state.transferInfo.receiverAccount.bankName + '은행 계좌'}
                    </Text>
                    <Text style={[TextStyle.default, TextStyle.weigth_light, TextStyle.size_26, TextStyle.color_grey33]}>
                        로
                    </Text>
                </View>
                <View style={styles.container_row}>
                    <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_26, TextStyle.color_grey33]}>
                        {SplitUtil.numberWithCommas(Number(this.state.transferInfo.amount))+'원'}
                    </Text>
                    <Text style={[TextStyle.default, TextStyle.weigth_light, TextStyle.size_26, TextStyle.color_grey33]}>
                        을 보냅니다
                    </Text>
                </View>
                <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_15, TextStyle.color_browngreytwo,
                    {marginTop: 12}]}>
                    {this.state.transferInfo.receiverAccount.userName
                        + ' ' + this.state.transferInfo.receiverAccount.bankName
                        + ' ' + this.state.transferInfo.receiverAccount.accountNumber}
                </Text>
                <View style={styles.container_bankcontent}>
                    <View style={styles.container_bank}>
                        <Image style={styles.bank}
                            source={this.state.transferInfo.senderAccount.bankIconUrl}/>
                        <Image style={styles.arrow}
                            source={Images.ArrowGrey}/>
                        <View style={styles.bankprop}>
                            <Image style={styles.bank}
                                source={this.state.transferInfo.receiverAccount.bankIconUrl}/>
                        </View>
                    </View>
                </View>
            </View>
            <SubmitButton containerStyle={styles.container_submitbutton}
                title='보내기'
                enable={true}
                method={this.onSendPressed}/>
            {
                (this.state.isShowSignaturePopup?
                    <PopupView
                        ref={this.contractPopup}
                        methodClose={this.contractPopupClosed}
                        subview={<SignatureInputView
                            methodComplete={this.onSignatureCompleted}/>}
                    />:null)
            }
            <LoadingIndicator
                message='송금 처리 중'
                visible={this.state.isShowIndicator}/>
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
        marginBottom: 12,
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