//
//  regTrackInfoScreen.js
//  Split
//
//  Created by Mumakil on 2019. 3. 6..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import ColorStyle from 'style/color';

import NavigationBar from 'component-bar/navigationBar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RegSequenceBar from 'component-bar/regSequenceBar';
import {INPUT_TYPE_NORMAL} from 'component-input/titleInputField';
import TrackInputField from 'component-input/trackInputField';
import SubmitButton from 'component-button/submitButton';
import ListAddButton from 'component-button/listAddButton';
import {CONTRACTINFO_CONTAINER, CONTRACTINFO_TRACKLIST} from 'info/contractInfo';
import {
    TRACKINFO_TRACKID,
    TRACKINFO_TITLE,
    TRACKINFO_TRACKCODE,
} from 'info/trackInfo';


/**
 * @protocol RegTrackInfoScreen
 * @date 2019/03/06
 * @brief 트랙 정보 등록 화면
 */
export default class RegTrackInfoScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // FIXME: 정책 결정후, 다음 버튼 활성화 체크 기능 넣어야함
            isInputAll: true,   // 입력 체크
            inputList: { data: [{
                trackId: 'TRACK',
                trackInputList:[{
                    id: TRACKINFO_TITLE,
                    name: '곡명',
                    type: INPUT_TYPE_NORMAL,
                    input: null,
                },
                {
                    id: TRACKINFO_TRACKCODE,
                    name: '곡 코드',
                    type: INPUT_TYPE_NORMAL,
                    input: null,
                }],
            }]}, // 입력 정보
        };
        
        this.newTrackIndex = 1; // 트랙 추가시 할당되는 번호

        this.onNextPressed = this.onNextPressed.bind(this);
        this.onTextChanged = this.onTextChanged.bind(this);
        this.onRemovePressed = this.onRemovePressed.bind(this);
        this.onListAddPressed = this.onListAddPressed.bind(this);
        this.onBackPressed = this.onBackPressed.bind(this);
    }

    _scrollToInput( reactNode: any ) {
        this.scroll.props.scrollToFocusedInput(reactNode)
    }

    /**
     *  다음 클릭시 호출
     */
    onNextPressed() {
        var contractInfo = this.props.navigation.getParam(CONTRACTINFO_CONTAINER);
        var trackDataList = [];

        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            var trackData = {};
            trackData[TRACKINFO_TRACKID] = 'track'+i;
            var titleId = this.state.inputList.data[i].trackInputList[0].id.replace(/[0-9]/g, '');
            trackData[titleId] = this.state.inputList.data[i].trackInputList[0].input;
            var codeId = this.state.inputList.data[i].trackInputList[1].id.replace(/[0-9]/g, '');
            trackData[codeId] = this.state.inputList.data[i].trackInputList[1].input;
            trackDataList.push(trackData);
        }
        
        contractInfo.parseFromDictionary({[CONTRACTINFO_TRACKLIST]:trackDataList});
        
        this.props.navigation.navigate('RegTeamInfo', {
            [CONTRACTINFO_CONTAINER]:contractInfo
        });
    }

    /**
     * 뒤로가기 버튼 클릭시 호출
     */
    onBackPressed() {
        this.props.navigation.goBack();
    }

    /**
     *  리스트 항목 추가 클릭시 호출
     */
    onListAddPressed() {
        var newList = this.state.inputList;
        const inputCount = this.state.inputList.data[0].trackInputList.length;

        // 새항목 추가
        var newTrackInputList = [];

        for( var i = 0; i < inputCount; i++ ) {
            var idVal = newList.data[0].trackInputList[i].id+this.newTrackIndex;
            var nameVal = newList.data[0].trackInputList[i].name;
            var typeVal = newList.data[0].trackInputList[i].type;

            newTrackInputList.push({
                id: idVal,
                name: nameVal,
                type: typeVal,
                input: null,
            });
        }

        newList.data.push({
            trackId: this.state.inputList.data[0].trackId + this.newTrackIndex,
            trackInputList: newTrackInputList,
        });

        this.newTrackIndex++;
        
        this.setState({inputList: newList});
    }

    /**
     *  입력 필드 삭제 요청시 호출
     * @param id 입력필드 id
     */
    onRemovePressed(id) {
        // title id로 제거한 항목 생성
        var newList = {};
        newList.data = [];
        
        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            if( id != this.state.inputList.data[i].trackInputList[0].id ) {
                newList.data.push(this.state.inputList.data[i]);
            }
        }
        
        this.setState({inputList: newList});
    }

    /**
     *  입력 필드 값 변경시 호출
     * @param id 입력필드 id
     * @param text 변경 값
     */
    onTextChanged(id, text) {
        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            const inputCount = this.state.inputList.data[i].trackInputList.length;
            for( var j = 0; j < inputCount; j++ ) {
                if( id == this.state.inputList.data[i].trackInputList[j].id ) {
                    console.log(id);
                    // 리스트 값 변경 후, 업데이트
                    var newInputList = this.state.inputList;
                    newInputList.data[i].trackInputList[j].input = text;
                    this.setState({inputList: newInputList});
                    break;
                }
            }
        }
    }

    /**
     *  입력 항목 렌더링
     */
    renderInputList() {
        var inputList = [];
        const inputCount = this.state.inputList.data[0].trackInputList.length;
        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            var key = 'input' + i;
            var titleStr = this.state.inputList.data[0].trackId + (i+1);
            var inputData = [];
            
            for( var j = 0; j < inputCount; j++ ) {
                inputData.push( this.state.inputList.data[i].trackInputList[j] );
            }

            if( i == 0 ) {
                inputList.push( <TrackInputField key={key}
                    style={{marginTop: 24, paddingLeft:35, paddingRight:35,}}
                    title={titleStr}
                    total={inputCount}
                    method={this.onTextChanged}
                    data={inputData}/> );
            }
            else {
                inputList.push( <TrackInputField key={key}
                    style={{marginTop: 24, paddingLeft:35, paddingRight:35,}}
                    title={titleStr}
                    total={inputCount}
                    method={this.onTextChanged}
                    methodRemove={this.onRemovePressed}
                    data={inputData}/> );
            }
        }
        
        return inputList;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container_sequence}>
                    <NavigationBar method={this.onBackPressed}/>
                    <RegSequenceBar title='SPLIT 정산 앨범 등록' subtitle='곡 등록' total='5' highlight='2'/>
                </View>
                <KeyboardAwareScrollView style={[styles.container_scrollview, {top:getStatusBarHeight()+30}]}
                    innerRef={ref => {
                        this.scroll = ref
                    }}>
                    {this.renderInputList()}
                    <ListAddButton containerStyle={styles.container_addbutton}
                        title='+ 곡 추가하기'
                        method={this.onListAddPressed}/>
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
});