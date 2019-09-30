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
import TeamInfo, {TEAMINFO_TYPEMAIN, TEAMINFO_TYPEOTHER} from 'info/teamInfo';
import TrackInfo from 'info/trackInfo';
import PerformanceInfo from 'info/performanceInfo';

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

            var contractInfo2 = new ContractInfo();
            var albumInfo2 = new AlbumInfo();
            albumInfo2.albumId = 'album' + 2;
            albumInfo2.albumName = '시티헌터 OST Part4';
            albumInfo2.artist = '김보경';
            albumInfo2.label = '(주)글로리엠케이엔터테인먼트';
            albumInfo2.distribution = '로엔엔터테인먼트';
            albumInfo2.albumCode = '10000196288';
            albumInfo2.coverImage = 'http://cmsimg.mnet.com/clipimage/album/1024/000/222/222741.jpg';
            albumInfo2.releaseDate = '2011.06.15';
            contractInfo2.albumInfo = albumInfo2;

            var teamInfo21 = new TeamInfo();
            teamInfo21.id = 'team1';
            teamInfo21.name = '김보경';
            teamInfo21.type = TEAMINFO_TYPEMAIN;
            teamInfo21.ratio = 60;
            var teamInfo22 = new TeamInfo();
            teamInfo22.id = 'team2';
            teamInfo22.name = '(주)글로리엠케이엔터테인먼트';
            teamInfo22.type = TEAMINFO_TYPEOTHER;
            teamInfo22.ratio = 40;
            contractInfo2.teamList = [teamInfo21, teamInfo22];
            
            var trackInfo21 = new TrackInfo();
            trackInfo21.trackId = 'track1';
            trackInfo21.title = 'Suddenly';
            trackInfo21.trackCode = '10000196288';
            trackInfo21.calculateDay = 30;
            trackInfo21.startDate = '2017.12.22';
            trackInfo21.endDate = '2020.12.21';
            trackInfo21.teamList = [teamInfo21, teamInfo22];
            contractInfo2.trackList = [trackInfo21];
            albumListData.push(contractInfo2);

            var contractInfo4 = new ContractInfo();
            var albumInfo4 = new AlbumInfo();
            albumInfo4.albumId = 'album' + 4;
            albumInfo4.albumName = 'Dollar Sign';
            albumInfo4.artist = '김승민';
            albumInfo4.label = '뷰티풀노이즈';
            albumInfo4.distribution = '다날엔터테인먼트';
            albumInfo4.albumCode = '100002105509';
            albumInfo4.coverImage = 'http://cmsimg.mnet.com/clipimage/album/1024/002/996/2996816.jpg';
            albumInfo4.releaseDate = '2018.06.08';
            contractInfo4.albumInfo = albumInfo4;

            var teamInfo41 = new TeamInfo();
            teamInfo41.id = 'team1';
            teamInfo41.name = '김승민';
            teamInfo41.type = TEAMINFO_TYPEMAIN;
            teamInfo41.ratio = 70;
            var teamInfo42 = new TeamInfo();
            teamInfo42.id = 'team2';
            teamInfo42.name = '뷰티풀노이즈';
            teamInfo42.type = TEAMINFO_TYPEOTHER;
            teamInfo42.ratio = 30;
            contractInfo4.teamList = [teamInfo41, teamInfo42];
            
            var trackInfo41 = new TrackInfo();
            trackInfo41.trackId = 'track1';
            trackInfo41.title = 'Dollar Sign';
            trackInfo41.trackCode = '100002105509';
            trackInfo41.calculateDay = 30;
            trackInfo41.startDate = '2018.06.08';
            trackInfo41.endDate = '2020.06.07';
            trackInfo41.teamList = [teamInfo41, teamInfo42];
            contractInfo4.trackList = [trackInfo41];
            albumListData.push(contractInfo4);


            var contractInfo3 = new ContractInfo();
            var albumInfo3 = new AlbumInfo();
            albumInfo3.albumId = 'album' + 3;
            albumInfo3.albumName = '올댓뮤직,인디스땅스2017 Vol2';
            albumInfo3.artist = '에이프릴세컨드';
            albumInfo3.label = '경기콘텐츠진흥원,KBS올댓뮤직,인디스땅스';
            albumInfo3.distribution = '미러볼뮤직';
            albumInfo3.albumCode = '100001816581';
            albumInfo3.coverImage = 'http://cmsimg.mnet.com/clipimage/album/1024/002/678/2678034.jpg';
            albumInfo3.releaseDate = '2017.12.22';
            contractInfo3.albumInfo = albumInfo3;

            var teamInfo31 = new TeamInfo();
            teamInfo31.id = 'team1';
            teamInfo31.name = '김경희';
            teamInfo31.type = TEAMINFO_TYPEMAIN;
            teamInfo31.ratio = 30;
            var teamInfo32 = new TeamInfo();
            teamInfo32.id = 'team2';
            teamInfo32.name = '김경희';
            teamInfo32.type = TEAMINFO_TYPEOTHER;
            teamInfo32.ratio = 20;
            var teamInfo33 = new TeamInfo();
            teamInfo33.id = 'team3';
            teamInfo33.name = '문대광';
            teamInfo33.type = TEAMINFO_TYPEOTHER;
            teamInfo33.ratio = 25;
            var teamInfo34 = new TeamInfo();
            teamInfo34.id = 'team4';
            teamInfo34.name = '문우건';
            teamInfo34.type = TEAMINFO_TYPEOTHER;
            teamInfo34.ratio = 25;
            contractInfo3.teamList = [teamInfo31, teamInfo32, teamInfo33, teamInfo34];
            var trackInfo31 = new TrackInfo();
            trackInfo31.trackId = 'track1';
            trackInfo31.title = 'Let her cry';
            trackInfo31.trackCode = '100001816581';
            trackInfo31.calculateDay = 30;
            trackInfo31.startDate = '2017.12.22';
            trackInfo31.endDate = '2020.12.21';
            trackInfo31.teamList = [teamInfo31, teamInfo32, teamInfo33, teamInfo34];
            contractInfo3.trackList = [trackInfo31];
            albumListData.push(contractInfo3);

            var contractInfo = new ContractInfo();
            var albumInfo = new AlbumInfo();
            albumInfo.albumId = 'album' + 1;
            albumInfo.albumName = 'Hot City';
            albumInfo.artist = 'Hey Men';
            albumInfo.label = '문화인';
            albumInfo.distribution = '카카오M';
            albumInfo.albumCode = '100002357563';
            albumInfo.coverImage = 'http://cmsimg.mnet.com/clipimage/album/1024/003/139/3139895.jpg';
            albumInfo.releaseDate = '2018.08.02';
            contractInfo.albumInfo = albumInfo;
            var teamInfo1 = new TeamInfo();
            teamInfo1.id = 'team1';
            teamInfo1.name = '도영';
            teamInfo1.type = TEAMINFO_TYPEMAIN;
            teamInfo1.ratio = 53;
            var teamInfo2 = new TeamInfo();
            teamInfo2.id = 'team2';
            teamInfo2.name = '김경희';
            teamInfo2.type = TEAMINFO_TYPEOTHER;
            teamInfo2.ratio = 20;
            var teamInfo3 = new TeamInfo();
            teamInfo3.id = 'team3';
            teamInfo3.name = '김경희';
            teamInfo3.type = TEAMINFO_TYPEOTHER;
            teamInfo3.ratio = 15;
            var teamInfo4 = new TeamInfo();
            teamInfo4.id = 'team4';
            teamInfo4.name = 'Terry Kim';
            teamInfo4.type = TEAMINFO_TYPEOTHER;
            teamInfo4.ratio = 10;
            var teamInfo5 = new TeamInfo();
            teamInfo5.id = 'team5';
            teamInfo5.name = '성원';
            teamInfo5.type = TEAMINFO_TYPEOTHER;
            teamInfo5.ratio = 10;
            var teamInfo6 = new TeamInfo();
            teamInfo6.id = 'team5';
            teamInfo6.name = '공탄';
            teamInfo6.type = TEAMINFO_TYPEOTHER;
            teamInfo6.ratio = 10;
            contractInfo.teamList = [teamInfo1, teamInfo2, teamInfo3, teamInfo4, teamInfo5, teamInfo6];
            var trackInfo1 = new TrackInfo();
            trackInfo1.trackId = 'track1';
            trackInfo1.title = 'Hot City';
            trackInfo1.trackCode = '100002357563';
            trackInfo1.calculateDay = 30;
            trackInfo1.startDate = '2018.08.02';
            trackInfo1.endDate = '2020.08.01';
            trackInfo1.teamList = [teamInfo1, teamInfo2, teamInfo3, teamInfo4, teamInfo5, teamInfo6];
            contractInfo.trackList = [trackInfo1];
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
        this.props.navigation.navigate('AlbumView', {
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
                        앨범 정산 계약 관리
                    </Text>;
    }

    renderAddButton() {
            return  <TouchableOpacity
                        style={[styles.addbutton, {position: 'absolute', right: 27, bottom:56}]}
                        activeOpacity = { .5 }
                        onPress={() => this.props.navigation.navigate('RegAlbumInfo')}>
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