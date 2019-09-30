//
//  selBankScreen.js
//  Split
//
//  Created by Mumakil on 2019. 4. 23..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  ScrollView,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

import HomeNavigationBar, {HOMENAVIGATIONBAR_THEME_GREY} from 'component-bar/homeNavigationBar';
import BankListView from 'component-view/bankListView';

import BankAccountInfo, {BANKACCOUNTINFO_CONTAINER} from 'info/bankAccountInfo';

/**
 * @protocol SelBankScreen
 * @date 2019/04/23
 * @brief 은행 선택 화면
 */
export default class SelBankScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bankList: {
                data: [{
                        id: 1,
                        name:'NH농협',
                        url: Images.BankList[0],
                    },
                    {
                        id: 2,
                        name:'KB국민',
                        url: Images.BankList[1],
                    },
                    {
                        id: 3,
                        name:'신한',
                        url: Images.BankList[2],
                    },
                    {
                        id: 4,
                        name:'우리',
                        url: Images.BankList[3],
                    },
                    {
                        id: 5,
                        name:'하나',
                        url: Images.BankList[4],
                    },
                    {
                        id: 6,
                        name:'IBK기업',
                        url: Images.BankList[5],
                    },
                    {
                        id: 7,
                        name:'외환',
                        url: Images.BankList[6],
                    },
                    {
                        id: 8,
                        name:'SC제일',
                        url: Images.BankList[7],
                    },
                    {
                        id: 9,
                        name:'KDB산업',
                        url: Images.BankList[8],
                    },
                    {
                        id: 10,
                        name:'새마을',
                        url: Images.BankList[9],
                    },
                    {
                        id: 11,
                        name:'대구',
                        url: Images.BankList[10],
                    },
                    {
                        id: 12,
                        name:'광주',
                        url: Images.BankList[11],
                    },
                    {
                        id: 13,
                        name:'우체국',
                        url: Images.BankList[12],
                    },
                    {
                        id: 14,
                        name:'신협',
                        url: Images.BankList[13],
                    },
                    {
                        id: 15,
                        name:'전북',
                        url: Images.BankList[14],
                    },
                    {
                        id: 16,
                        name:'경남',
                        url: Images.BankList[15],
                    },
                    {
                        id: 17,
                        name:'부산',
                        url: Images.BankList[16],
                    },
                    {
                        id: 18,
                        name:'수협',
                        url: Images.BankList[17],
                    },
                ]
            },  // 은해 정보 목록
        };

        this.onCellPressed = this.onCellPressed.bind(this);
        this.onBackPressed = this.onBackPressed.bind(this);
    }

    /**
     * 셀 클릭시 호출
     * @param cellId 셀 아이디 
     */
    onCellPressed(cellId) {
        var bankAccountInfo = new BankAccountInfo;
        for( var i = 0; i < this.state.bankList.data.length; i++ ) {
            if( this.state.bankList.data[i].id == cellId ) {
                bankAccountInfo.bankCode = this.state.bankList.data[i].id;
                bankAccountInfo.bankName = this.state.bankList.data[i].name;
                bankAccountInfo.bankIconUrl = this.state.bankList.data[i].url;
                break;
            }
        }
        
        this.props.navigation.navigate('RegBankAccount', {
            [BANKACCOUNTINFO_CONTAINER]:bankAccountInfo,
        });
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
                title='내 계좌 추가하기'
                theme={HOMENAVIGATIONBAR_THEME_GREY}
                methodBack={this.onBackPressed}/>
            <Text style={[styles.subtitle, TextStyle.default, TextStyle.size_19, TextStyle.weigth_bold, TextStyle.color_greyishbrown, TextStyle.align_left]}>
                은행 선택
            </Text>
            <ScrollView style={[styles.container_scrollview]}
                horizontal={false}>
                <BankListView
                    method={this.onCellPressed}
                    data={this.state.bankList.data}/>
            </ScrollView>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorStyle.GreyF7,
    },
    subtitle: {
        marginLeft: 37,
        marginTop: 29,
    },
    container_scrollview: {
        flex: 1,
        marginTop: 9,
        marginLeft: 23,
        marginRight: 23,
        paddingLeft: 23,
        paddingRight: 23,
        paddingTop: 23,
        paddingBottom: 23,
        backgroundColor: ColorStyle.White,
    },
});