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
import AccordianButton from 'component-button/accordianButton';
import TrackInfoView from 'component-view/trackInfoView';

var screen = Dimensions.get('window');
//var screen = require('Dimensions').get('window');

/**
 * @protocol ContractInfoView
 * @date 2019/03/13
 * @brief 계약 정보 화면 버튼
 */
export default class ContractInfoView extends Component {
    constructor(props) {
        super(props);
        
        this.albumInfoData = [{
            title: '앨범명',
            value: this.props.data.albumInfo.albumName,
        },
        {
            title: '아티스트명',
            value: this.props.data.albumInfo.artist,
        },
        {
            title: '기획사',
            value: this.props.data.albumInfo.label,
        },
        {
            title: '유통사',
            value: this.props.data.albumInfo.distribution,
        },
        {
            title: '발매일',
            value: this.props.data.albumInfo.releaseDate,
        },
        {
            title: '앨범코드',
            value: this.props.data.albumInfo.albumCode,
        }];

        this.trackInfoData = [];
        for( var i = 0; i < this.props.data.trackList.length; i++ ) {
            this.trackInfoData.push({
                title: ('TRACK'+(i+1)),
                value: this.props.data.trackList[i],
            });
        }

        this.teamInfoData = [];
        for( var i = 0; i < this.props.data.teamList.length; i++ ) {
            this.teamInfoData.push({
                title: (i==0?'메인 아티스트':'참여 아티스트'),
                value: this.props.data.teamList[i].name,
            });
        }
    }

    renderAlbumInfo() {
        var albumInfoRenderList = [];
        for( var i = 0; i < this.albumInfoData.length; i++ ) {
            var key = 'view'+i;
            albumInfoRenderList.push( 
                <View style={styles.container_titleinput}
                    key={key}>
                    <TitleInputField
                        title={this.albumInfoData[i].title}
                        theme={INPUT_THEME_GREY}
                        editable={false}
                        value={this.albumInfoData[i].value}/>
                </View>);
        }
        
        return albumInfoRenderList;
    }

    renderTrackInfo() {
        var trackInfoRenderList = [];
        for( var i = 0; i < this.trackInfoData.length; i++ ) {
            var key = 'track'+i;
            trackInfoRenderList.push( 
                <AccordianButton
                    key={key}
                    styleButton={styles.trackbutton}
                    title={this.trackInfoData[i].title}
                    subview={
                        <TrackInfoView
                            data={this.trackInfoData[i].value}/>
                    }/>);
        }
        
        return trackInfoRenderList;
    }

    renderTeamInfo() {
        var teamInfoRenderList = [];
        for( var i = 0; i < this.teamInfoData.length; i++ ) {
            var key = 'team'+i;
            teamInfoRenderList.push( 
                <View style={styles.container_titleinput}
                    key={key}>
                    <TitleInputField
                        title={this.teamInfoData[i].title}
                        theme={INPUT_THEME_GREY}
                        editable={false}
                        value={this.teamInfoData[i].value}/>
                </View>);
        }
        
        return teamInfoRenderList;
    }
    
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Text style={[styles.title, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_21, TextStyle.color_niceblue2, TextStyle.align_left]}>
                    1. 앨범 정보
                </Text>
                <View style={styles.container_coverimage}>
                    <Image 
                        style={styles.coverimage}
                        source={this.props.data.albumInfo.coverImage?{uri:this.props.data.albumInfo.coverImage}:Images.AlbumDefault}/>
                </View>
                { this.renderAlbumInfo() }
                <LineBar style={styles.line}/>
                <Text style={[styles.title, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_21, TextStyle.color_niceblue2, TextStyle.align_left]}>
                    2. 곡 정보 및 정산 정보 (분배비율)
                </Text>
                { this.renderTrackInfo() }
                <LineBar style={styles.line}/>
                <Text style={[styles.title, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_21, TextStyle.color_niceblue2, TextStyle.align_left]}>
                    3. 팀 정보 (자동정산자)
                </Text>
                { this.renderTeamInfo() }
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