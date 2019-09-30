//
//  regRatioInfoScreen.js
//  Split
//
//  Created by Mumakil on 2019. 3. 8..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
} from 'react-native';
import ColorStyle from 'style/color';
import TextStyle from 'style/text';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RegSequenceBar from 'component-bar/regSequenceBar';
import LineBar from 'component-bar/lineBar';
import RegularDateInputField from 'component-input/regularDateInputField';
import PeriodInputField from 'component-input/periodInputField';
import TrackRatioInputField from 'component-input/trackRatioInputField';
import SubmitButton from 'component-button/submitButton';
import ContractInfo, {CONTRACTINFO_CONTAINER, CONTRACTINFO_TEAMLIST} from 'info/contractInfo';
import AlbumInfo from 'info/albumInfo';
import TeamInfo, {TEAMINFO_TYPEMAIN, TEAMINFO_TYPEOTHER} from 'info/teamInfo';
import TrackInfo from 'info/trackInfo';


var screen = Dimensions.get('window');
//var screen = require('Dimensions').get('window');

/**
 * @protocol RegRatioInfoScreen
 * @date 2019/03/08
 * @brief 정산 정보 등록 화면
 */
export default class RegRatioInfoScreen extends Component {
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
        // albumInfo.coverImage = 'sss';
        // var teamInfo1 = new TeamInfo();
        // teamInfo1.teamId = 'team1';
        // teamInfo1.name = 'teset';
        // teamInfo1.type = TEAMINFO_TYPEMAIN;
        // teamInfo1.ratio = 0;
        // var teamInfo2 = new TeamInfo();
        // teamInfo2.teamId = 'team2';
        // teamInfo2.name = 'tesesssssst';
        // teamInfo2.type = TEAMINFO_TYPEOTHER;
        // teamInfo2.ratio = 0;
        // contractInfo.teamList = [teamInfo1, teamInfo2];
        // var trackInfo1 = new TrackInfo();
        // trackInfo1.trackId = 'track1';
        // trackInfo1.title = 'title1';
        // trackInfo1.trackCode = '1111';
        // var trackInfo2 = new TrackInfo();
        // trackInfo2.trackId = 'track2';
        // trackInfo2.title = 'title2';
        // trackInfo2.trackCode = '2222';
        // contractInfo.trackList = [trackInfo1, trackInfo2];


        var teamData = [];

        if( contractInfo.teamList != null ) {    
            for( var i = 0; i < contractInfo.teamList.length; i++ ) {
                teamData.push({
                    id: contractInfo.teamList[i].teamId,
                    artist: contractInfo.teamList[i].name,
                    phone: contractInfo.teamList[i].phone,
                    type: contractInfo.teamList[i].type,
                    ratio: contractInfo.teamList[i].ratio,
                    selected: false,
                })
            }
        }
        
        var inputData = [];
        if( contractInfo.trackList != null ) {
            for( var i = 0; i < contractInfo.trackList.length; i++ ) {
                var ratioListData = [];

                if( contractInfo.teamList != null ) {    
                    for( var j = 0; j < contractInfo.teamList.length; j++ ) {
                        ratioListData.push({
                            id: contractInfo.teamList[j].teamId,
                            artist: contractInfo.teamList[j].name,
                            phone: contractInfo.teamList[i].phone,
                            type: contractInfo.teamList[j].type,
                            ratio: contractInfo.teamList[j].ratio,
                            selected: false,
                        })
                    }
                }
                
                inputData.push({
                    id: contractInfo.trackList[i].trackId,
                    title: contractInfo.trackList[i].title,
                    ratioList: ratioListData,
                    date: null,
                    startDate: null,
                    endDate: null,
                });
            }
        }
        
        this.state = {
            // FIXME: 정책 결정후, 다음 버튼 활성화 체크 기능 넣어야함
            isInputAll: true,
            
            inputList: { data: inputData },
        };

        this.onNextPressed = this.onNextPressed.bind(this);
        this.onArtistChanged = this.onArtistChanged.bind(this);
        this.onRatioChanged = this.onRatioChanged.bind(this);
        this.onRegularDateChanged = this.onRegularDateChanged.bind(this);
        this.onStartDateChanged = this.onStartDateChanged.bind(this);
        this.onEndDateChanged = this.onEndDateChanged.bind(this);
    }

    _scrollToInput( reactNode: any ) {
        this.scroll.props.scrollToFocusedInput(reactNode)
    }

    /**
     *  다음 클릭시 호출
     */
    onNextPressed() {
        var contractInfo = this.props.navigation.getParam(CONTRACTINFO_CONTAINER);
        
        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            var trackInfo = contractInfo.trackList[i];
            trackInfo.calculateDay = this.state.inputList.data[i].date;
            trackInfo.startDate = this.state.inputList.data[i].startDate;
            trackInfo.endDate = this.state.inputList.data[i].endDate;
            
            for( var j = 0; j < this.state.inputList.data[i].ratioList.length; j++ ) {
                if( this.state.inputList.data[i].ratioList[j].selected ) {
                    var teamInfo = new TeamInfo();
                    teamInfo.teamId = this.state.inputList.data[i].ratioList[j].id;
                    teamInfo.name = this.state.inputList.data[i].ratioList[j].artist;
                    teamInfo.phone = this.state.inputList.data[i].ratioList[j].phone;
                    teamInfo.ratio = this.state.inputList.data[i].ratioList[j].ratio;
                    teamInfo.type = this.state.inputList.data[i].ratioList[j].type;

                    trackInfo.teamList.push(teamInfo);
                }
            }
        }

        this.props.navigation.navigate('RegConfirmInfo', {
            [CONTRACTINFO_CONTAINER]:contractInfo
        });
    }

    onArtistChanged(trackId, index, artistId, selected) {
        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            if( trackId == this.state.inputList.data[i].id ) {
                for( var j = 0; j < this.state.inputList.data[i].ratioList.length; j++ ) {
                    if( artistId == this.state.inputList.data[i].ratioList[j].id ) {
                        // 리스트 값 변경 후, 업데이트
                        var newInputList = this.state.inputList;
                        newInputList.data[i].ratioList[j].selected = selected;
                        this.setState({inputList: newInputList});
                        break;
                    }
                }
            }
        }

        console.log(this.state.inputList.data);
    }

    onRatioChanged(trackId, index, artistId, ratio) {
        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            if( trackId == this.state.inputList.data[i].id ) {
                for( var j = 0; j < this.state.inputList.data[i].ratioList.length; j++ ) {
                    if( artistId == this.state.inputList.data[i].ratioList[j].id ) {
                        // 리스트 값 변경 후, 업데이트
                        var newInputList = this.state.inputList;
                        newInputList.data[i].ratioList[j].ratio = ratio;
                        this.setState({inputList: newInputList});
                        break;
                    }
                }
            }
        }
    }

    onStartDateChanged(id, date) {
        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            if( id == this.state.inputList.data[i].id ) {
                // 리스트 값 변경 후, 업데이트
                var newInputList = this.state.inputList;
                newInputList.data[i].startDate = date;
                this.setState({inputList: newInputList});
                break;
            }
        }
    }

    onEndDateChanged(id, date) {
        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            if( id == this.state.inputList.data[i].id ) {
                // 리스트 값 변경 후, 업데이트
                var newInputList = this.state.inputList;
                newInputList.data[i].endDate = date;
                this.setState({inputList: newInputList});
                break;
            }
        }
    }

    onRegularDateChanged(id, date) {
        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            if( id == this.state.inputList.data[i].id ) {
                // 리스트 값 변경 후, 업데이트
                var newInputList = this.state.inputList;
                newInputList.data[i].date = date;
                this.setState({inputList: newInputList});
                break;
            }
        }
    }

    /**
     *  입력 항목 렌더링
     */
    renderInputList() {
        var inputList = [];
        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            var viewId = 'view' + i;
            inputList.push(
                <View key={viewId} style={styles.container_inputfield}>
                    <TrackRatioInputField 
                        id={this.state.inputList.data[i].id}
                        title={'TRACK '+ (i + 1)}
                        data={this.state.inputList.data[i]}
                        methodArtist={this.onArtistChanged}
                        methodRatio={this.onRatioChanged}/>
                    <LineBar style={styles.linebar}/>
                    <RegularDateInputField 
                        id={this.state.inputList.data[i].id}
                        style={styles.regulardateinput}
                        title='정산일'
                        frontstr='매 월'
                        endstr='일'
                        method={this.onRegularDateChanged}/>
                    <LineBar style={styles.linebar}/>
                    <PeriodInputField
                        id={this.state.inputList.data[i].id}
                        style={styles.periodinputfield}
                        title='계약기간(선택)'
                        startstr='시작일'
                        endstr='만료일'
                        editable={true}
                        methodStartDate={this.onStartDateChanged}
                        methodEndDate={this.onEndDateChanged}/>
                    <LineBar style={styles.linebar}/>
                </View> );
        }
        
        return inputList;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.container_sequence, {top:getStatusBarHeight()+30}]}>
                    <RegSequenceBar title='SPLIT 정산 앨범 등록' titleStyle={TextStyle.size_30} subtitle='정산 정보 (분배비율) 등록' total='5' highlight='4'/>
                </View>
                <KeyboardAwareScrollView style={[styles.container_scrollview, {top:getStatusBarHeight()+30}]}
                    innerRef={ref => {
                        this.scroll = ref
                    }}>
                    {this.renderInputList()}
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
    container_inputfield: {
        marginTop: 15,
    },
    container_addbutton: {
        marginTop: 18,
        paddingLeft: 52,
        paddingRight: 52,
        height: 37,
    },
    container_submitbutton: {
        marginTop: 40,
        marginBottom: 24,
        alignItems:'center',
        height: 66,
    },
    linebar: {
        marginTop: 16,
        marginBottom: 19,
        marginLeft: 34,
        marginRight: 48,
        height: 1,
    },
    regulardateinput: {
        marginLeft: 49,
        marginRight: 49,
    },
    periodinputfield: {
        marginLeft: 50,
        marginRight: 58,
    }
});