//
//  trackInfoView.js
//  Split
//
//  Created by Mumakil on 2019. 3. 18..
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
import RegularDateInputField from 'component-input/regularDateInputField';
import PeriodInputField from 'component-input/periodInputField';
import ArtistRatioBar from 'component-bar/artistRatioBar';

var screen = Dimensions.get('window');
//var screen = require('Dimensions').get('window');

/**
 * @protocol TrackInfoView
 * @date 2019/03/18
 * @brief 곡 정보 화면 버튼
 */
export default class TrackInfoView extends Component {
    constructor(props) {
        super(props);
        
        this.trackInfoData = [{
            title: '곡 명',
            value: this.props.data.title,
        },
        {
            title: '곡 코드',
            value: this.props.data.trackCode,
        },];
    }

    renderTrackInfo() {
        var trackInfoRenderList = [];
        for( var i = 0; i < this.trackInfoData.length; i++ ) {
            var key = 'view'+i;
            trackInfoRenderList.push( <View style={styles.container_titleinput}
                key={key}>
                <TitleInputField
                    title={this.trackInfoData[i].title}
                    theme={INPUT_THEME_GREY}
                    editable={false}
                    value={this.trackInfoData[i].value}/>
            </View>);
        }
        
        return trackInfoRenderList;
    }

    renderArtistRatioBarList() {
        var ratioInputList = [];
        
        for( var i = 0; i < this.props.data.teamList.length; i++ ) {
            var viewId = 'view'+i;
            var title = (i==0?'● 메인 아티스트 ':'● 참여 아티스트 ');
            title += this.props.data.teamList[i].name;

            ratioInputList.push( <View key={viewId}
                                    style={styles.container_artistratio}>
                                    <ArtistRatioBar 
                                        title={title}
                                        data={this.props.data.teamList[i]}
                                        />
                                </View> );
        }

        return ratioInputList;
    }
    
    render() {
        return (
            <View style={styles.container}>
                { this.renderTrackInfo() }
                <Text style={[styles.title, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_19, TextStyle.color_niceblue2, TextStyle.align_left]}>
                    분배 비율
                </Text>
                { this.renderArtistRatioBarList() }
                <RegularDateInputField 
                    style={styles.regulardateinput}
                    title='정산일'
                    frontstr='● 매 월'
                    endstr='일'
                    editable={false}
                    value={this.props.data.calculateDay}/>
                <PeriodInputField
                    style={styles.periodinputfield}
                    title='계약기간(선택)'
                    startstr='시작일'
                    endstr='만료일'
                    editable={false}
                    startDate={this.props.data.startDate}
                    endDate={this.props.data.endDate}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorStyle.GreyFA,
    },
    container_titleinput: {
        marginLeft: 14,
        marginRight: 16,
        marginBottom: 13,
    },
    container_artistratio: {
        marginLeft: 16,
        marginRight: 21,
        marginBottom: 8,
    },
    title: {
        marginTop: 11,
        marginBottom: 12,
        marginLeft: 15,
    },
    regulardateinput: {
        marginTop: 22,
        marginLeft: 16,
        marginRight: 16,
    },
    periodinputfield: {
        marginTop: 29,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 45,
    },
});