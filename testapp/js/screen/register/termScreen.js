//
//  termsScreen.js
//  Split
//
//  Created by Mumakil on 2019. 1. 18..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    StatusBar,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import TextStyle from 'style/text';
import ButtonStyle from 'style/button';
import ColorStyle from 'style/color';
import NavigationBar from 'component-bar/navigationBar';
import TitleBar from 'component-bar/titleBar';
import TermsBar from 'component-bar/termsBar';
import TermsGroupBar from 'component-bar/termsGroupBar';
import { ScrollView } from 'react-native-gesture-handler';

/**
 * @protocol TermsScreen
 * @date 2019/01/18
 * @brief 약관 동의 화면
 */
export default class WalkthroughScreen extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            agreements: [{
                id: 'agreement01',
                state: false,
                optional: false,
            },
            {
                id: 'agreement02',
                state: false,
                optional: false,
            }]  // 동의 항목 목록
        };

        this.allAgreement = false;  // 전체 동의 여부

        this.onBackPressed = this.onBackPressed.bind(this);
        this.onAgreementPressed = this.onAgreementPressed.bind(this);
    }

    /**
     *  뒤로가기 버튼 클릭시 호출
     */
    onBackPressed() {
        this.props.navigation.goBack();
    }

    /**
     *  동의 버튼 클릭시 호출
     *  @param id 버튼 id
     *  @param agreement 동의 여부
     */
    onAgreementPressed(id, agreement) {
        var allAgreement = true;
        var tempAgreements = this.state.agreements.map(function (item, index, array) {
            if( id == item.id ) {
                if( !item.optional && !agreement )
                    allAgreement = false;
                return {id:item.id, state:agreement, optional:item.optional};
            }
            else {
                if( !item.optional && !item.state )
                    allAgreement = false;
                return {id:item.id, state:item.state, optional:item.optional};
            }
        });

        this.setState({
            agreements:tempAgreements,
            allAgreement:allAgreement
        });
    }
    
    /**
     *  모두 동의 버튼 클릭시 호출
     */
    onAllAgreementPressed() {
        var tempAgreements = this.state.agreements.map(function (item, index, array) {
            return {id:item.id, state:true, optional:item.optional};
        });
        
        this.setState({
            agreements:tempAgreements,
            allAgreement:true
        });
    }
    
    /**
     *  확인 버튼 클릭시 호출
     */
    onConfirmPressed() {
        this.props.navigation.navigate('PhoneAuth');
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                />
                <NavigationBar method={this.onBackPressed}/>
                <TitleBar title='약관동의'/>
                <View style={styles.container_agreement}>
                    <TouchableOpacity
                        style={[ButtonStyle.agreement,{position: 'absolute',bottom:23}]}
                        onPress={() => { this.onAllAgreementPressed() }}>
                        <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_17, TextStyle.color_frenchblue]}>약관에 모두 동의하기</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.container_empty}/>
                    <TermsGroupBar id={this.state.agreements[0].id} title='필수 항목 모두 동의' method={this.onAgreementPressed} agreement={this.state.agreements[0].state}/>
                    <TermsBar title='서비스 이용약관'/>
                    <TermsBar title='통합 금융정보 서비스 약관'/>
                    <TermsBar title='개인정보 수집이용 동의'/>
                    <TermsBar title='개인정보 제3자 제공 동의'/>
                    <View style={styles.container_empty}/>
                    <TermsGroupBar id={this.state.agreements[1].id} title='휴대폰 본인확인서비스' method={this.onAgreementPressed} agreement={this.state.agreements[1].state}/>
                    <TermsBar title='서비스 이용약관'/>
                    <TermsBar title='개인정보 수집, 이용 및 위탁 동의'/>
                    <TermsBar title='고유식별정보 처리 동의'/>
                    <TermsBar title='통신사/카드사 이용 약관'/>
                </ScrollView>
                <View style={styles.container_submitbutton}>
                    <TouchableOpacity
                        style={[this.state.allAgreement?ButtonStyle.confirm:ButtonStyle.confirm_disable,{position: 'absolute',bottom:25}]}
                        disabled={!this.state.allAgreement}
                        onPress={() => { this.onConfirmPressed() }}>
                        <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_20, TextStyle.color_white]}>확인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorStyle.GreyF7,
    },
    container_agreement: {
        alignItems:'center',
        justifyContent: 'center',
        height:97,
    },
    container_submitbutton: {
        alignItems:'center',
        height:'15%',
    },
    container_empty: {
        height:27,
    },
});