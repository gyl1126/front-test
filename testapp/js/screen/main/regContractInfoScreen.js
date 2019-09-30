//
//  regContractInfoScreen.js
//  Split
//
//  Created by Mumakil on 2019. 3. 19..
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
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';
import ConstantString from 'constants/string';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import AccordianButton from 'component-button/accordianButton';
import SignatureButton, {ButtonType} from 'component-button/signatureButton';
import ContractInfoView from 'component-view/contractInfoView';
import SplitUtil from 'etc/splitUtil';
import SubmitButton from 'component-button/submitButton';
import PopupView from 'component-view/popupView';
import CompletePopupView from 'component-view/completePopupView';
import AlbumResultPopupView from 'component-view/albumResultPopupView';
import SignatureInputView from 'component-view/signatureInputView';
import SignatureLogView from 'component-view/signatureLogView';
import { StackActions } from 'react-navigation';

import ContractInfo, {CONTRACTINFO_CONTAINER, CONTRACTINFO_TEAMLIST} from 'info/contractInfo';
import AlbumInfo from 'info/albumInfo';
import TeamInfo, {TEAMINFO_TYPEMAIN, TEAMINFO_TYPEOTHER} from 'info/teamInfo';
import TrackInfo from 'info/trackInfo';

var screen = Dimensions.get('window');
//var screen = require('Dimensions').get('window');

/**
 * @protocol RegContractInfoScreen
 * @date 2019/03/19
 * @brief 계약 완료 화면
 */
export default class RegContractInfoScreen extends Component {
    constructor(props) {
        super(props);
        
        var contractInfo = this.props.navigation.getParam(CONTRACTINFO_CONTAINER);

        // var contractInfo = new ContractInfo();
        // var albumInfo = new AlbumInfo();
        // albumInfo.albumId = 'album';
        // albumInfo.albumName = 'title';
        // albumInfo.artist = 'artist';
        // albumInfo.label = 'label';
        // albumInfo.distribution = 'dist';
        // albumInfo.albumCode = 'code';
        // albumInfo.coverImage = null;
        // albumInfo.releaseDate = String(new Date());
        // contractInfo.albumInfo = albumInfo;
        // var teamInfo1 = new TeamInfo();
        // teamInfo1.id = 'team1';
        // teamInfo1.name = 'teset';
        // teamInfo1.type = TEAMINFO_TYPEMAIN;
        // teamInfo1.ratio = 32;
        // teamInfo1.isStamp = false;
        // var teamInfo2 = new TeamInfo();
        // teamInfo2.id = 'team2';
        // teamInfo2.name = 'tesesssssst';
        // teamInfo2.type = TEAMINFO_TYPEOTHER;
        // teamInfo2.ratio = 35;
        // teamInfo2.isStamp = false;
        // contractInfo.teamList = [teamInfo1, teamInfo2];
        // var trackInfo1 = new TrackInfo();
        // trackInfo1.trackId = 'track1';
        // trackInfo1.title = 'title1';
        // trackInfo1.trackCode = '1111';
        // trackInfo1.calculateDay = 24;
        // trackInfo1.startDate = new Date();
        // trackInfo1.endDate = new Date();
        // trackInfo1.teamList = [teamInfo1, teamInfo2];
        // var trackInfo2 = new TrackInfo();
        // trackInfo2.trackId = 'track2';
        // trackInfo2.title = 'title2';
        // trackInfo2.trackCode = '2222';
        // trackInfo2.calculateDay = 24;
        // trackInfo2.startDate = new Date();
        // trackInfo2.endDate = new Date();
        // trackInfo2.teamList = [teamInfo1, teamInfo2];
        // contractInfo.trackList = [trackInfo1, trackInfo2];

        this.state = {
            isInputAll: true,
            contract: contractInfo,
            isShowContractPopup: false,
            isShowLogPopup: false,
            isShowCompletePopup: false,
            isShowResultPopup: false,
        };

        this.contractPopup = 'contractPopup';
        this.logPopup = 'logPopup';
        this.completePopup = 'completePopup';

        this.onButtonPressed = this.onButtonPressed.bind(this);
        this.contractPopupClosed = this.contractPopupClosed.bind(this);
        this.logPopupClosed = this.logPopupClosed.bind(this);
        this.completePopupClosed = this.completePopupClosed.bind(this);
        this.onCompletePressed = this.onCompletePressed.bind(this);
        this.onSignatureCompleted = this.onSignatureCompleted.bind(this);
        this.resultPopupClosed = this.resultPopupClosed.bind(this);
    }

    _scrollToInput( reactNode: any ) {
        this.scroll.props.scrollToFocusedInput(reactNode)
    }
    
    /**
     *  다음 클릭시 호출
     */
    onCompletePressed() {
        this.props.navigation.dispatch(StackActions.popToTop());
    }

    onButtonPressed(id, buttonType) {
        if( buttonType == ButtonType.SUBMIT )
            this.setState({isShowContractPopup:true});
        else
            this.setState({isShowLogPopup:true});
        // this.refs.contractPopup.show();
    }

    onSignatureCompleted() {
        this.refs.contractPopup.onClosePressed();
        var newContract = this.state.contract;
        newContract.teamList[0].isStamp = true;
        this.setState({contract: newContract});

        var that = this;
        setTimeout(function(){
            that.setState({isShowCompletePopup: true});
        }, 2000);
    }

    getCurrentDate() {
        var date = new Date();
        
        return '날짜 : ' + date.getFullYear() + '.' + 
            (date.getMonth()+1) + '.' +
            date.getDate() + ' ' + 
            SplitUtil.getDayFromDate(date);
    }

    contractPopupClosed() {
        this.setState({isShowContractPopup: false});
    }

    logPopupClosed() {
        this.setState({isShowLogPopup: false});
    }

    completePopupClosed() {
        this.setState({isShowCompletePopup: false,
        isShowResultPopup: true});
        // this.props.navigation.dispatch(StackActions.popToTop());
        // this.props.navigation.navigate('AlbumList');
    }

    resultPopupClosed() {
        this.setState({isShowResultPopup: false});
        // this.props.navigation.dispatch(StackActions.popToTop());
        this.props.navigation.navigate('AlbumList', {
            [CONTRACTINFO_CONTAINER]:this.state.contract
        });
    }

    renderSignatureButton() {
        var buttonList = [];
        for( var i = 0; i < this.state.contract.teamList.length; i++ ) {
            var viewId = 'view' + i;
            var type;
            if( i == 0 ) {
                if( this.state.contract.teamList[0].isStamp )
                    type = ButtonType.VIEW;
                else
                    type = ButtonType.SUBMIT;
            }
            else {
                type = ButtonType.VIEW;
            }
            buttonList.push(
                <View key={viewId} 
                    style={styles.container_signaturebutton}>
                    <SignatureButton
                        id={this.state.contract.teamList[i].id}
                        name={this.state.contract.teamList[i].name}
                        isStamp={this.state.contract.teamList[i].isStamp}
                        buttonType={type}
                        method={this.onButtonPressed}/>
                </View> );
        }
        
        return buttonList;
    }

    render() {
        return (
            <View style={styles.container}>
                
                <KeyboardAwareScrollView style={[styles.container_scrollview, {top:getStatusBarHeight()+30}]}
                    innerRef={ref => {
                        this.scroll = ref
                    }}>
                    <Text style={[styles.title, TextStyle.default, TextStyle.weigth_bold, TextStyle.size_30, TextStyle.color_niceblue2, TextStyle.align_center]}>
                        전자계약서
                    </Text>
                    <AccordianButton
                        styleButton={styles.contractbutton}
                        styleText={[TextStyle.weigth_bold, TextStyle.size_30]}
                        showFoldingButton={true}
                        styleFoldingButton={styles.contractfolding}
                        title='계약 내용 펼쳐보기'
                        subview={
                            <ContractInfoView
                                style={styles.contract}
                                data={this.state.contract}/>
                        }/>
                    <View style={styles.container_signature}>
                        <Text style={[styles.date, TextStyle.default, TextStyle.weigth_bold, TextStyle.size_20, TextStyle.color_niceblue2, TextStyle.align_center]}>
                            {this.getCurrentDate()}
                        </Text>
                        { this.renderSignatureButton() }
                        <Text style={[styles.legal, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_11, TextStyle.color_niceblue2, TextStyle.align_left]}>
                            * 전자서명법 제3조(전자서명의 효력 등) 3항에 따르면, 공인전자서명외의 전자서명 또한 당사자간의 약정에 따른 서명, 서명날인 또는 기명날인으로서의 법적 효력을 가집니다. 
                        </Text>
                        <TouchableOpacity
                            style={styles.detailbutton}
                            onPress={this.props.method}>
                            <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_12, TextStyle.color_niceblue2, TextStyle.decoration_underline]}>
                                > 자세히 보러가기
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {/* <SubmitButton containerStyle={styles.container_submitbutton}
                        title='완료'
                        enable={this.state.isInputAll}
                        method={this.onCompletePressed}/> */}
                </KeyboardAwareScrollView>
                {
                    (this.state.isShowContractPopup?
                        <PopupView
                            ref={this.contractPopup}
                            methodClose={this.contractPopupClosed}
                            subview={<SignatureInputView
                                methodComplete={this.onSignatureCompleted}/>}
                        />:null)
                }
                {
                    (this.state.isShowLogPopup?
                        <PopupView
                            methodClose={this.logPopupClosed}
                            subview={<SignatureLogView/>}
                        />:null)
                }
                {
                    (this.state.isShowCompletePopup?
                        <CompletePopupView
                            ref={this.completePopup}
                            title={ConstantString.UserName + '님의 전자서명이\n완료되었습니다'}
                            description={'참여 아티스트들의\n전자서명여부는\n알림을 통해 알려드릴게요'}
                            buttonTitle={'확인'}
                            methodClose={this.completePopupClosed}
                        />:null)
                }
                {
                    (this.state.isShowResultPopup?
                        <AlbumResultPopupView
                            ref={this.completePopup}
                            title={'유통사에게\n입금계좌 알리기'}
                            account={ConstantString.Account}
                            description={'유통사측에 정산금 입금 요청시\n전달되는 입금계좌입니다.'}
                            message={'[안녕하세요 Split 입니다]\n해당 앨범에 대한 정산금 입금 계좌를\n알려드립니다.\n\n'
                             + ConstantString.Account + ' '
                             + ConstantString.UserName
                            }
                            buttonTitle={'문자 전송'}
                            methodClose={this.resultPopupClosed}
                        />:null)
                }
                
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
    container_scrollview: {
        flex: 1,
        bottom: 0,
        marginBottom: 49+27,
    },
    container_submitbutton: {
        marginTop: 40,
        marginBottom: 24,
        alignItems:'center',
        height: 43,
    },
    container_signature: {
        marginTop: 23,
        marginLeft: 37,
        marginRight: 40,
        backgroundColor: ColorStyle.White,
    },
    container_signaturebutton: {
        marginBottom: 13,
        marginLeft: 47,
        marginRight: 47,
    },
    title: {
        marginTop: 49,
    },
    contractbutton: {
        marginLeft: 37,
        marginRight: 40,
        marginTop: 30,
        backgroundColor: ColorStyle.White,
        height: 61,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.29,
        shadowRadius: 6,
        elevation: 1,
    },
    contract: {
        backgroundColor: ColorStyle.White,
        marginLeft: 37,
        marginRight: 40,
    },
    contractfolding: {
        marginLeft: 37,
        marginRight: 40,
        backgroundColor: ColorStyle.White,
        height: 27,
    },
    date: {
        marginTop: 28,
        marginBottom: 36,
    },
    legal: {
        marginTop: 63,
        marginLeft: 51,
        marginRight: 47,
    },
    detailbutton: {
        marginTop: 29,
        marginBottom: 29,
    },
});