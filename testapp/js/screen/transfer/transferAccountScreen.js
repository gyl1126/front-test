//
//  transferAccountScreen.js
//  Split
//
//  Created by Mumakil on 2019. 4. 22..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
} from 'react-native';
import Images from 'asset-image';
import ColorStyle from 'style/color';
import ConstantString from 'constants/string';

import HomeNavigationBar, {HOMENAVIGATIONBAR_THEME_BLUE} from 'component-bar/homeNavigationBar';
import SearchInputField2 from 'component-input/searchInputField2';
import ListPushButton from 'component-button/listPushButton';
import ListView, {LISTVIEWCELLTYPE_ACCOUNT, LISTVIEWCELLTYPE_USERNAME} from 'component-view/listView';

import TransferInfo, {TRANSFERINFO_CONTAINER} from 'info/transferInfo';
import BankAccountInfo, {BANKACCOUNTINFO_CONTAINER} from 'info/bankAccountInfo';

/**
 * @protocol TransferAccountScreen
 * @date 2019/04/22
 * @brief 송금 계좌 선택 화면
 */
export default class TransferAccountScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            myAccountList: {
                id: 'myAccount',
                data: [{
                        id: 0,
                        userName:ConstantString.UserName,
                        bankCode:3,
                        bankName:'신한',
                        accountNumber: '110-068-114762',
                        bankIconUrl: Images.BankList[2],
                    },
                    {
                        id: 1,
                        userName:ConstantString.UserName,
                        bankCode:1,
                        bankName:'NH농협',
                        accountNumber: '3233499003127',
                        bankIconUrl: Images.BankList[0],
                    },
                    {
                        id: 2,
                        userName:ConstantString.UserName,
                        bankCode:4,
                        bankName:'우리',
                        accountNumber: '3333853332344',
                        bankIconUrl: Images.BankList[3],
                    },
                ]
            },  // 내 계좌 목록
            recentAccountList: {
                id: 'recentAccount',
                data: [
                    {
                        id: 0,
                        userName:'안동현',
                        bankCode:4,
                        bankName:'우리',
                        accountNumber: '115232453454',
                        bankIconUrl: Images.BankList[3],
                    },
                ]
            }   // 최근 송금 계좌 목록
        };

        this.onMyWalletAddPressed = this.onMyWalletAddPressed.bind(this);
        this.onCellPressed = this.onCellPressed.bind(this);
        this.onBackPressed = this.onBackPressed.bind(this);
        this.updateData = this.updateData.bind(this);
    }

    componentWillMount() {
        this.props.navigation.addListener('willFocus', this.updateData);
    }

    /**
     * 화면 재 진입시 데이터 변경 체크
     */
    updateData() {
        var transferInfo = this.props.navigation.getParam(TRANSFERINFO_CONTAINER);
        var bankAccountInfo = this.props.navigation.getParam(BANKACCOUNTINFO_CONTAINER);
        
        // 계좌 정보가 있으면, 내 계좌 목록에 추가
        if( bankAccountInfo != null ) {
            var accountList = this.state.myAccountList;
            accountList.data.push({
                id: this.state.myAccountList.data.length,
                userName: transferInfo.senderAccount.userName,
                bankCode: bankAccountInfo.bankCode,
                bankName: bankAccountInfo.bankName,
                accountNumber: bankAccountInfo.accountNumber,
                bankIconUrl: bankAccountInfo.bankIconUrl,
            });
            this.setState({myAccountList: accountList});
        }
    }

    /**
     * 계좌 정보 기반 화면 이동
     * @param data 계좌 정보 
     */
    moveToNextScreenWithData(data) {
        var transferInfo = this.props.navigation.getParam(TRANSFERINFO_CONTAINER);
        transferInfo.receiverAccount.userName = data.userName;
        transferInfo.receiverAccount.bankCode = data.bankCode;
        transferInfo.receiverAccount.bankName = data.bankName;
        transferInfo.receiverAccount.bankIconUrl = data.bankIconUrl;
        transferInfo.receiverAccount.accountNumber = data.accountNumber;

        this.props.navigation.navigate('TransferConfirm', {
            [TRANSFERINFO_CONTAINER]: transferInfo,
        });
    }

    /**
     * 내 계좌 추가하기 버튼 클릭시 호출
     */
    onMyWalletAddPressed() {
        this.props.navigation.navigate('SelBank');
    }

    /**
     * 리스트 내 셀 클릭시 호출
     * @param listId 리스트 뷰 id 
     * @param cellId 셀 id
     */
    onCellPressed(listId, cellId) {
        // 리스트 종류 구분 및 선택한 데이터 기반 화면 전환 요청
        if( listId == this.state.myAccountList.id ) {
            for( var i = 0; i < this.state.myAccountList.data.length; i++ ) {
                if( cellId == this.state.myAccountList.data[i].id ) {
                    this.moveToNextScreenWithData(this.state.myAccountList.data[i]);
                    break;
                }
            }
        }
        else if( listId == this.state.recentAccountList.id ) {
            for( var i = 0; i < this.state.recentAccountList.data.length; i++ ) {
                if( cellId == this.state.recentAccountList.data[i].id ) {
                    this.moveToNextScreenWithData(this.state.recentAccountList.data[i]);
                    break;
                }
            }
        }
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
            <StatusBar
                barStyle="default"
                backgroundColor="#4F6D7A"/>
            <HomeNavigationBar 
                title='송금하기'
                theme={HOMENAVIGATIONBAR_THEME_BLUE}
                methodBack={this.onBackPressed}/>
            <SearchInputField2
                placeholder='받는 분 계좌번호를 입력해주세요'/>
            <View style={styles.container_add}>
                <ListPushButton
                    title='내 계좌 추가하기'
                    method={this.onMyWalletAddPressed}/>
            </View>
            <ScrollView style={[styles.container_scrollview]}
                horizontal={false}>
                <ListView
                    id={this.state.myAccountList.id}
                    style={styles.listview}
                    header='내 계좌로 송금하기'
                    showFoldingButton={true}
                    cellType={LISTVIEWCELLTYPE_ACCOUNT}
                    method={this.onCellPressed}
                    data={this.state.myAccountList.data}/>
                <ListView
                    id={this.state.recentAccountList.id}
                    header='최근 송금 계좌'
                    showFoldingButton={false}
                    cellType={LISTVIEWCELLTYPE_USERNAME}
                    method={this.onCellPressed}
                    data={this.state.recentAccountList.data}/>
            </ScrollView>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorStyle.GreyF7,
    },
    container_add: {
        marginTop: 2,
        width: '100%',
        height: 69,
    },
    container_scrollview: {
        flex: 1,
    },
    listview: {
        marginTop: 10,
        marginBottom: 22,
    }
});