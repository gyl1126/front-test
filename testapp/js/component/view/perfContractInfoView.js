//
//  contractInfoView.js
//  Split
//
//  Created by Mumakil on 2019. 3. 13..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

import TitleInputField, {INPUT_THEME_GREY} from 'component-input/titleInputField';
import LineBar from 'component-bar/lineBar';
import PeriodInputField from 'component-input/periodInputField';
import PerfRatioInputField from 'component-input/perfRatioInputField';
import {
    PERFORMANCEINFO_TYPE_ARTIST, 
    PERFORMANCEINFO_TYPE_LABEL, 
    PERFORMANCEINFO_TYPE_DISTRIBUTION
} from 'info/performanceInfo';

var screen = Dimensions.get('window');
//var screen = require('Dimensions').get('window');

/**
 * @protocol ContractInfoView
 * @date 2019/03/13
 * @brief 계약 정보 화면 버튼
 */
export default class PerfContractInfoView extends Component {
    constructor(props) {
        super(props);
        
        this.perfInfoData = [{
            title: '공연 제목',
            value: this.props.data.performanceInfo.title,
        },
        {
            title: '아티스트명',
            value: this.props.data.performanceInfo.artist,
        },
        {
            title: '기획사',
            value: this.props.data.performanceInfo.label,
        },
        {
            title: '유통사',
            value: this.props.data.performanceInfo.distribution,
        }];

        this.teamInfoData = [];
        for( var i = 0; i < this.props.data.teamList.length; i++ ) {
            this.teamInfoData.push({
                type: this.props.data.teamList[i].memberType,
                name: this.props.data.teamList[i].name,
                ratio: this.props.data.teamList[i].ratio,
            });
        }
    }

    renderPerformanceInfo() {
        var perfInfoRenderList = [];
        for( var i = 0; i < this.perfInfoData.length; i++ ) {
            var key = 'view'+i;
            perfInfoRenderList.push( 
                <View style={styles.container_titleinput}
                    key={key}>
                    <TitleInputField
                        title={this.perfInfoData[i].title}
                        theme={INPUT_THEME_GREY}
                        editable={false}
                        value={this.perfInfoData[i].value}/>
                </View>);
        }
        
        return perfInfoRenderList;
    }

    renderTeamInfo() {
        var teamInfoRenderList = [];
        for( var i = 0; i < this.teamInfoData.length; i++ ) {
            var key = 'team'+i;
            teamInfoRenderList.push( 
                <View style={styles.container_titleinput}
                    key={key}>
                    <PerfRatioInputField
                        data={this.teamInfoData[i]}
                        editable={false}/>
                </View>);
        }
        
        return teamInfoRenderList;
    }

    getTypeString() {
        if( this.props.data.performanceInfo.type == PERFORMANCEINFO_TYPE_ARTIST )
            return '아티스트';
        else if( this.props.data.performanceInfo.type == PERFORMANCEINFO_TYPE_LABEL )
            return '기획사';
        else if( this.props.data.performanceInfo.type == PERFORMANCEINFO_TYPE_DISTRIBUTION )
            return '유통사';
    }
    
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Text style={[styles.title, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_21, TextStyle.color_niceblue2, TextStyle.align_left]}>
                    1. 등록자 정보
                </Text>
                <View style={styles.container_titleinput}>
                    <TitleInputField
                        theme={INPUT_THEME_GREY}
                        editable={false}
                        value={this.getTypeString()}/>
                </View>
                <Text style={[styles.title, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_21, TextStyle.color_niceblue2, TextStyle.align_left]}>
                    2. 공연 정보
                </Text>
                <View style={styles.container_coverimage}>
                    <Image 
                        style={styles.coverimage}
                        source={this.props.data.performanceInfo.coverImage?{uri:this.props.data.performanceInfo.coverImage}:Images.AlbumDefault}/>
                </View>
                { this.renderPerformanceInfo() }
                <View style={styles.container_titleinput}>
                    <PeriodInputField
                        style={styles.periodinputfield}
                        title='공연일자'
                        startstr='시작일'
                        endstr='종료일'
                        editable={false}
                        startDate={this.props.data.performanceInfo.startdate}
                        endDate={this.props.data.performanceInfo.enddate}/>
                </View>
                
                <LineBar style={styles.line}/>
                <Text style={[styles.title, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_21, TextStyle.color_niceblue2, TextStyle.align_left]}>
                    3. 정산 정보 (분배비율)
                </Text>
                { this.renderTeamInfo() }
                <View style={styles.container_titleinput}>
                    <PeriodInputField
                        style={styles.periodinputfield}
                        title='계약기간'
                        startstr='시작일'
                        endstr='종료일'
                        editable={false}
                        startDate={this.props.data.performanceInfo.contractStartdate}
                        endDate={this.props.data.performanceInfo.contractEnddate}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom : 22,
    },
    container_coverimage: {
        height: screen.width * 0.4,
        alignItems: 'center',
    },
    container_titleinput: {
        marginTop: 8,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 12,
    },
    title: {
        marginTop: 34,
        marginLeft: 17,
    },
    coverimage: {
        aspectRatio: 1/1,
        height: '100%',
        resizeMode: 'cover',
    },
    line: {
        marginLeft: 8,
        marginRight: 8,
        marginTop : 32,
        marginBottom: 32,
        height: 1,
    },
    trackbutton: {
        marginLeft: 15,
        marginRight: 15,
        marginTop : 12,
        marginBottom: 12,
        height: 41,
        backgroundColor: ColorStyle.GreyEF,
    },
    
});