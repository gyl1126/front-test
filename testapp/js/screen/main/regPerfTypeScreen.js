//
//  regPerfTypeScreen.js
//  Split
//
//  Created by Mumakil on 2019. 9. 17..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

import NavigationBar from 'component-bar/navigationBar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RegSequenceBar from 'component-bar/regSequenceBar';
import CircleSelectButton from 'component-button/circleSelectButton';
import SubmitButton from 'component-button/submitButton';
import ContractInfo, {CONTRACTINFO_CONTAINER} from 'info/contractInfo';
import {
    PERFORMANCEINFO_CONTAINER, 
    PERFORMANCEINFO_TYPE, 
    PERFORMANCEINFO_TYPE_ARTIST, 
    PERFORMANCEINFO_TYPE_LABEL, 
    PERFORMANCEINFO_TYPE_DISTRIBUTION
} from 'info/performanceInfo';
import { StackActions } from 'react-navigation';
var screen = Dimensions.get('window');
//var screen = require('Dimensions').get('window');

/**
 * @protocol RegPerfTypeScreen
 * @date 2019/09/17
 * @brief 공연 정보 등록 화면
 */
export default class RegPerfTypeScreen extends Component {
    constructor(props) {
        super(props);

        var inputListData = [];
        inputListData.push({
            id: PERFORMANCEINFO_TYPE_ARTIST,
            name: '아티스트',
            select: false,
        });
        inputListData.push({
            id: PERFORMANCEINFO_TYPE_LABEL,
            name: '기획사',
            select: false,
        });
        inputListData.push({
            id: PERFORMANCEINFO_TYPE_DISTRIBUTION,
            name: '유통사',
            select: false,
        });

        this.state = {
            isInputAll: true,
            inputList: inputListData,
            inputType: PERFORMANCEINFO_TYPE_ARTIST // 입력 정보
        };

        this.onNextPressed = this.onNextPressed.bind(this);
        this.onTypePressed = this.onTypePressed.bind(this);
        this.onBackPressed = this.onBackPressed.bind(this);
    }

    _scrollToInput( reactNode: any ) {
        this.scroll.props.scrollToFocusedInput(reactNode)
    }
    
    /**
     *  다음 클릭시 호출
     */
    onNextPressed() {
        // FIXME: 데이터 입력 체크 필요
        var perfData = {};
        for( var i = 0; i < this.state.inputList.length; i++ ) {
            if( this.state.inputList[i].select )
                perfData[PERFORMANCEINFO_TYPE] = this.state.inputList[i].id;
        }

        var contractInfo = new ContractInfo();
        
        contractInfo.parseFromDictionary({[PERFORMANCEINFO_CONTAINER]: perfData});
        
        this.props.navigation.navigate('RegPerfInfo', {
            [CONTRACTINFO_CONTAINER]:contractInfo
        });

        // this.props.navigation.dispatch(StackActions.popToTop());
        // this.props.navigation.navigate('PerfList', {
        //     [CONTRACTINFO_CONTAINER]:contractInfo
        // });
        
    }

    /**
     * 뒤로가기 버튼 클릭시 호출
     */
    onBackPressed() {
        this.props.navigation.goBack();
    }

    onTypePressed(id) {
        var newInputList = this.state.inputList;
        for( var i = 0; i < newInputList.length; i++ ) {
            if( newInputList[i].id == id ) {
                newInputList[i].select = true;
            }
            else {
                newInputList[i].select = false;
            }
        }

        this.setState({inputList: newInputList});
    }

    renderTypeButtonList() {
        var buttonList = [];
        for( var i = 0; i < this.state.inputList.length; i++ ) {
            buttonList.push(<CircleSelectButton
                id={this.state.inputList[i].id}
                key={this.state.inputList[i].id}
                name={this.state.inputList[i].name}
                select={this.state.inputList[i].select}
                method={this.onTypePressed}/>);
        }
        return buttonList;
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container_sequence}>
                    <NavigationBar method={this.onBackPressed}/>
                    <RegSequenceBar title='SPLIT 정산 공연 등록' subtitle='정보 등록' total='4' highlight='1'/>
                </View>
                <KeyboardAwareScrollView style={[styles.container_scrollview, {top:getStatusBarHeight()+30}]}
                    innerRef={ref => {
                        this.scroll = ref
                    }}>
                    <View style={styles.container_button}>
                        { this.renderTypeButtonList() }
                    </View>
                    
                    
                </KeyboardAwareScrollView>
                <SubmitButton containerStyle={styles.container_submitbutton}
                        title='다음'
                        enable={this.state.isInputAll}
                        method={this.onNextPressed}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: ColorStyle.GreyF7,
    },
    container_sequence: {
        height: 132,
    },
    container_scrollview: {
        flex: 1,
        bottom: 0,
        marginBottom: 49+27,
    },
    container_button: {
        paddingLeft: 25,
        paddingRight: 25,
        height: 92,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    container_submitbutton: {
        position: 'absolute',
        left: 39,
        right: 39,
        bottom: 24,
        alignItems:'center',
        height: 43,
    },
    typebutton: {
        height: 92,
        width: 92,
        alignItems: 'center',
        justifyContent: 'center', 
        borderColor: ColorStyle.LightNavy,
        borderWidth: 1,
        borderRadius: 46,
    }
});