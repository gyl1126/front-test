//
//  albumListScreen.js
//  Split
//
//  Created by Mumakil on 2019. 3. 4..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

import AlbumListButton from 'component-button/albumListButton';
import NavigationBar from 'component-bar/navigationBar';

import ContractInfo, {CONTRACTINFO_CONTAINER} from 'info/contractInfo';
import AlbumInfo from 'info/albumInfo';
import TrackInfo from 'info/trackInfo';
import PerformanceInfo, {PERFORMANCEINFO_TYPE_ARTIST} from 'info/performanceInfo';
import TeamInfo, {TEAMINFO_MEMBERTYPE_ARTIST, TEAMINFO_MEMBERTYPE_LABEL, TEAMINFO_MEMBERTYPE_DISTRIBUTION} from 'info/teamInfo';

/**
 * @protocol AlbumListScreen
 * @date 2019/03/25
 * @brief 정산 앨범 목록 화면
 */
export default class AlbumListScreen extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;

        // 임시 데이터
        var albumListData = [];

        var contractInfo = new ContractInfo();
        var perfInfo = new PerformanceInfo();
        perfInfo.type = PERFORMANCEINFO_TYPE_ARTIST;
        perfInfo.performanceId = 'perf1';
        perfInfo.title = '평택 페스티벌';
        perfInfo.artist = '김보경';
        perfInfo.label = '(주)글로리엠케이엔터테인먼트';
        perfInfo.distribution = '로엔엔터테인먼트';
        perfInfo.startdate = '2019.08.10';
        perfInfo.enddate = '2019.08.10';
        perfInfo.contractStartdate = '2019.08.07';
        perfInfo.contractEnddate = '2019.08.13';
        perfInfo.coverImage = 'http://cdn.news2day.co.kr/news-images/peg/news/201907/9rREnhH2C20KqpUolQnmfpMB82Wkluk4Ut8a4BCC-1563416050.jpg';
        contractInfo.performanceInfo = perfInfo;

        var albumInfo2 = new AlbumInfo();
        albumInfo2.albumId = 'album' + 2;
        albumInfo2.albumName = '2019 평택 국제 포켓볼 페스티벌';
        albumInfo2.artist = '김보경';
        albumInfo2.label = '(주)글로리엠케이엔터테인먼트';
        albumInfo2.distribution = '로엔엔터테인먼트';
        albumInfo2.albumCode = '10000196288';
        albumInfo2.coverImage = 'http://cdn.news2day.co.kr/news-images/peg/news/201907/9rREnhH2C20KqpUolQnmfpMB82Wkluk4Ut8a4BCC-1563416050.jpg';
        albumInfo2.releaseDate = '2011.06.15';
        contractInfo.albumInfo = albumInfo2;




        var teamInfo1 = new TeamInfo();
        teamInfo1.id = 'team1';
        teamInfo1.name = '김보경';
        teamInfo1.memberType = TEAMINFO_MEMBERTYPE_ARTIST;
        teamInfo1.ratio = 80;
        var teamInfo2 = new TeamInfo();
        teamInfo2.id = 'team2';
        teamInfo2.name = '(주)글로리엠케이엔터테인먼트';
        teamInfo2.memberType = TEAMINFO_MEMBERTYPE_LABEL;
        teamInfo2.ratio = 20;
        contractInfo.teamList = [teamInfo1, teamInfo2];
            
        albumListData.push(contractInfo);
        
        this.state = {
            albumList:albumListData,    // 앨범 리스트
        };

        this.onBackPressed = this.onBackPressed.bind(this);
        this.onAlbumDetailPressed = this.onAlbumDetailPressed.bind(this);
        this.updateData = this.updateData.bind(this);
    }

    componentWillMount() {
        this.props.navigation.addListener('willFocus', this.updateData);
    }

    /**
     * 화면 재 진입시 데이터 변경 체크
     */
    updateData() {
        var contractInfo = this.props.navigation.getParam(CONTRACTINFO_CONTAINER);
        
        this.props.navigation.setParams({[CONTRACTINFO_CONTAINER]:null});
        // 계약 정보가 있으면, 내 계좌 목록에 추가
        if( contractInfo != null ) {
            var albumList = this.state.albumList;

            var albumInfo = new AlbumInfo();
            albumInfo.albumId = 'album' + albumList.length;
            albumInfo.albumName = contractInfo.performanceInfo.title;
            albumInfo.artist = contractInfo.performanceInfo.artist;
            albumInfo.label = contractInfo.performanceInfo.label;
            albumInfo.distribution = contractInfo.performanceInfo.distribution;
            albumInfo.coverImage = contractInfo.performanceInfo.coverImage;
            contractInfo.albumInfo = albumInfo;

            albumList.push(contractInfo);
            this.setState({albumList: albumList});
            this.props.navigation.setParams({[CONTRACTINFO_CONTAINER]:null});
        }
    }

    /**
     * 뒤로가기 버튼 클릭시 호출
     */
    onBackPressed() {
        this.props.navigation.goBack();
    }

    /**
     * 앨범 클릭시 호출
     * @param id 앨범 id
     */
    onAlbumDetailPressed(id) {
        var album;
        for( var i = 0; i < this.state.albumList.length; i++ ) {
            if( id == this.state.albumList[i].albumInfo.albumId ) {
                album = this.state.albumList[i];
                break;
            }
        }
        this.props.navigation.navigate('PerfView', {
            [CONTRACTINFO_CONTAINER]:album,
        });
    }
    
    /**
     * 앨범 리스트 렌더링
     */
    renderAlbumList() {
        var albumButtonList = [];
        for( var i = 0; i < this.state.albumList.length; i++ )
            albumButtonList.push(<AlbumListButton
                id={this.state.albumList[i].albumInfo.albumId}
                key={this.state.albumList[i].albumInfo.albumId}
                containerStyle={styles.album}
                data={this.state.albumList[i]}
                method={this.onAlbumDetailPressed}/>);
        return albumButtonList;
    }

    /**
     * 앨범 리스트 렌더링
     */
    renderAlbumListTitle() {
        return  <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_30, TextStyle.color_niceblue, TextStyle.align_left]}>
                        공연 정산 계약 관리
                    </Text>;
    }

    renderAddButton() {
        return  <TouchableOpacity
                        style={[styles.addbutton, {position: 'absolute', right: 27, bottom:56}]}
                        activeOpacity = { .5 }
                        onPress={() => this.props.navigation.navigate('RegPerfType')}>
                        <Text style={[{top:-12}, TextStyle.default, TextStyle.weigth_thin, TextStyle.size_71, TextStyle.color_browngreytwo]}>+</Text>
                    </TouchableOpacity>;
    }
    
    render() {
        return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#4F6D7A"/>
            <NavigationBar method={this.onBackPressed}/>
            <View style={styles.container_title}>
                { this.renderAlbumListTitle() }
                
            </View>
            <View style={styles.container_album}>
                <ScrollView style={[styles.container_scrollview]}
                    horizontal={true}>
                    { this.renderAlbumList() }
                </ScrollView>
            </View>
            { this.renderAddButton() }
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorStyle.GreyF7,
    },
    container_logo: {
        top:0,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: ColorStyle.NiceBlue2,
    },
    container_title: {
        marginTop: 40,
        marginLeft: 33,
    },
    container_scrollview: {
        flex: 1,
        marginTop: 44,
        marginBottom: 41,
        marginLeft: 32,
        marginRight: 32,
    },
    container_album: {
        marginTop: 31,
        marginLeft: 29,
        marginRight: -20,
        backgroundColor: ColorStyle.White,
        height: 380,
        borderRadius:20,
        borderWidth:1,
        borderColor: ColorStyle.White,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.29,
        shadowRadius: 10,
        elevation: 1,
    },
    album: {
        marginLeft : 16,
        marginRight: 16,
        height: '100%',
        aspectRatio: 229/295,
    },
    addbutton: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: ColorStyle.White,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.29,
        shadowRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});