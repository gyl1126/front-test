//
//  albumViewScreen.js
//  Split
//
//  Created by Mumakil on 2019. 3. 26..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

import TitleBar from 'component-bar/titleBar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AccordianButton from 'component-button/accordianButton';
import PerfContractInfoView from 'component-view/perfContractInfoView';
import ContractLogView from 'component-view/contractLogView';
import LineBar from 'component-bar/lineBar';
import ContractInfo, {CONTRACTINFO_CONTAINER} from 'info/contractInfo';

/**
 * @protocol AlbumViewScreen
 * @date 2019/03/25
 * @brief 정산 앨범 정보 화면
 */
export default class AlbumViewScreen extends Component {
    constructor(props) {
        super(props);

        var contractInfo = this.props.navigation.getParam(CONTRACTINFO_CONTAINER);

        this.state = {
            contract: contractInfo,     // 계약 정보
        };

        this.onClosePressed = this.onClosePressed.bind(this);
    }

    /**
     * 닫기 버튼 클릭시 호출
     */
    onClosePressed() {
        this.props.navigation.goBack();
    }

    render() {
        return (
        <View style={styles.container}>
            <View style={styles.container_titlebar}>
                <TitleBar title='계약서 보기'/>
            </View>
            <View style={styles.container_close}>
                <TouchableOpacity
                    style={styles.closebutton}
                    onPress={this.onClosePressed}>
                    <Image 
                        source={Images.BtnClose}
                        />
                </TouchableOpacity>
            </View>
            <KeyboardAwareScrollView style={[styles.container_scrollview, {top:getStatusBarHeight()+30}]}
                innerRef={ref => {
                    this.scroll = ref
                }}>
                <AccordianButton
                    styleButton={styles.accordianbutton}
                    styleText={[TextStyle.weigth_bold, TextStyle.size_21]}
                    showFoldingButton={false}
                    title='수발신 확인이력'
                    subview={
                        <ContractLogView
                            style={styles.foldingcontent}
                            data={this.state.contract}/>
                    }/>
                <LineBar style={styles.linebar}/>
                <AccordianButton
                    styleButton={styles.accordianbutton}
                    styleText={[TextStyle.weigth_bold, TextStyle.size_21]}
                    showFoldingButton={false}
                    title='계약 내용'
                    subview={
                        <PerfContractInfoView
                            style={styles.foldingcontent}
                            data={this.state.contract}/>
                    }/>
            </KeyboardAwareScrollView>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorStyle.GreyF7,
    },
    container_scrollview: {
        flex: 1,
        bottom: 0,
        marginBottom: 49+27,
    },
    container_titlebar: {
        marginTop: getStatusBarHeight(),
    },
    container_closebutton: {
        height: 62,
    },
    closebutton: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 57,
        height: 57,
        justifyContent: 'center',
        alignItems: 'center',
    },
    accordianbutton: {
        marginLeft: 37,
        marginRight: 40,
        backgroundColor: ColorStyle.White,
        height: 61,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.29,
        shadowRadius: 6,
        elevation: 1,
    },
    foldingcontent: {
        backgroundColor: ColorStyle.White,
        marginLeft: 37,
        marginRight: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.29,
        shadowRadius: 4,
        elevation: 1,
    },
    folding: {
        marginLeft: 37,
        marginRight: 40,
        backgroundColor: ColorStyle.White,
        height: 27,
    },
    linebar: {
        marginTop: 23,
        marginBottom: 23,
        marginLeft: 34,
        marginRight: 48,
        height: 1,
    },
});