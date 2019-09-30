//
//  regConfirmInfoScreen.js
//  Split
//
//  Created by Mumakil on 2019. 3. 5..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import RegSequenceBar from 'component-bar/regSequenceBar';
import PerfContractInfoView from 'component-view/perfContractInfoView';
import AgreementButton from 'component-button/agreementButton';
import SubmitButton from 'component-button/submitButton';

import ContractInfo, {CONTRACTINFO_CONTAINER, CONTRACTINFO_TEAMLIST} from 'info/contractInfo';
import PerformanceInfo from 'info/performanceInfo';
import TeamInfo, {TEAMINFO_MEMBERTYPE_ARTIST, TEAMINFO_MEMBERTYPE_LABEL, TEAMINFO_MEMBERTYPE_DISTRIBUTION} from 'info/teamInfo';
import TrackInfo from 'info/trackInfo';

var screen = Dimensions.get('window');
//var screen = require('Dimensions').get('window');

/**
 * @protocol RegAlbumInfoScreen
 * @date 2019/03/05
 * @brief 앨범 정보 등록 화면
 */
export default class RegPerfConfirmInfoScreen extends Component {
    constructor(props) {
        super(props);
        
        var contractInfo = this.props.navigation.getParam(CONTRACTINFO_CONTAINER);

        // var contractInfo = new ContractInfo();
        // var perfInfo = new PerformanceInfo;
        // perfInfo.type = 'artist';
        // perfInfo.title = 'title';
        // perfInfo.artist = 'artist';
        // perfInfo.label = 'label';
        // perfInfo.distribution = '유통사';
        // perfInfo.startdate = new Date();
        // perfInfo.enddate = new Date();
        // perfInfo.contractStartdate = new Date();
        // perfInfo.contractEnddate = new Date();
        // contractInfo.performanceInfo = perfInfo;

        // var teamInfo1 = new TeamInfo();
        // teamInfo1.id = 'team1';
        // teamInfo1.name = 'teset';
        // teamInfo1.memberType = TEAMINFO_MEMBERTYPE_ARTIST;
        // teamInfo1.ratio = 32;
        // var teamInfo2 = new TeamInfo();
        // teamInfo2.id = 'team2';
        // teamInfo2.name = 'tesesssssst';
        // teamInfo2.memberType = TEAMINFO_MEMBERTYPE_LABEL;
        // teamInfo2.ratio = 35;
        // contractInfo.teamList = [teamInfo1, teamInfo2];

        this.state = {
            contract: contractInfo,
            isInputAll: true,
        };

        this.onAgreementPressed = this.onAgreementPressed.bind(this);
        this.onNextPressed = this.onNextPressed.bind(this);
    }

    _scrollToInput( reactNode: any ) {
        this.scroll.props.scrollToFocusedInput(reactNode)
    }
    
    /**
     *  다음 클릭시 호출
     */
    onNextPressed() {
        this.props.navigation.navigate('RegPerfContractInfo', {
            [CONTRACTINFO_CONTAINER]:this.state.contract,
        });
        
    }

    onAgreementPressed() {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.container_sequence, {top:getStatusBarHeight()+30}]}>
                    <RegSequenceBar title='SPLIT 정산 공연 등록' subtitle='계약 내용 확인하기' total='4' highlight='4'/>
                </View>
                <KeyboardAwareScrollView style={[styles.container_scrollview, {top:getStatusBarHeight()+30}]}
                    innerRef={ref => {
                        this.scroll = ref
                    }}>
                    <PerfContractInfoView data={this.state.contract}/>
                    <View style={styles.container_legal}>
                        <Text style={[styles.legaltitle, TextStyle.default, TextStyle.weigth_bold, TextStyle.size_13, TextStyle.color_niceblue2, TextStyle.align_left]}>
                            {"<국가법령정보센터_전자문서 및 전자거래 기본법>"}
                        </Text>
                        <Text style={[styles.legaldescription, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_11, TextStyle.color_niceblue2, TextStyle.align_left]}>
                            {"제4조(전자문서의 효력) ① 전자문서는 다른 법률에 특별한 규정이 있는 경우를 제외하고는 전자적 형태로 되어 있다는 이유로 문서로서의 효력이 부인되지 아니한다.\n② 별표에서 정하고 있는 법률에 따른 기록·보고·보관·비치 또는 작성 등의 행위가 전자문서로 행하여진 경우 해당 법률에 따른 행위가 이루어진 것으로 본다.\n[전문개정 2012. 6. 1.] "}
                        </Text>
                    </View>
                    <AgreementButton
                        containerStyle={styles.container_agreementbutton}
                        title='위 입력 내용으로 계약을 진행합니다'
                        method={this.onAgreementPressed}
                        />
                    <SubmitButton containerStyle={styles.container_submitbutton}
                        title='다음'
                        enable={this.state.isInputAll}
                        method={this.onNextPressed}/>
                </KeyboardAwareScrollView>
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
    container_submitbutton: {
        marginTop: 40,
        marginBottom: 24,
        alignItems:'center',
        height: 43,
    },
    container_agreementbutton: {
        marginLeft: 53,
        marginRight: 53,
    },
    container_legal: {
        marginTop: 22,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 30,
        backgroundColor: ColorStyle.White,
    },
    legaltitle: {
        marginLeft: 9,
        marginRight: 9,
        marginTop : 15,
    },
    legaldescription: {
        marginLeft: 12,
        marginRight: 12,
        marginTop : 15,
        marginBottom: 15,
    },
});