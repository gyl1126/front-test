//
//  artistRatioInputField.js
//  Split
//
//  Created by Mumakil on 2019. 3. 8..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
} from 'react-native';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';
import DropdownPickerCoverBlue from 'component-picker/dropdownPickerCoverBlue';
import ActionSheetPicker from 'component-picker/actionSheetPicker';
import InputField, {INPUT_THEME_GREY, INPUT_KEYBOARDTYPE_NUMBER, INPUT_ALIGN_CENTER} from 'component-input/inputField';


/**
 * @protocol ArtistRatioInputField
 * @date 2019/03/08
 * @brief 아티스트 비율 입력 필드
 */
export default class ArtistRatioInputField extends Component {
    constructor(props) {
        super(props);

        // 아티스트 목록 생성
        var artistDataList = [];

        for( var i = 0; i < this.props.data.length; i++ ) {
            if( !this.props.data[i].selected ) {
                artistDataList.push({
                    id: this.props.data[i].id,
                    name: this.props.data[i].artist,
                });
            }
        }

        artistDataList.push({
            id: 'cancel',
            name: '취소',
        });

        this.state = {
            artistList: artistDataList,
            selectArtistId: null,
            selectArtist: null,
        }

        this.input = 'input_ratio';

        this.onArtistPressed = this.onArtistPressed.bind(this);
        this.onInputChanged = this.onInputChanged.bind(this);
    }

    /**
     * 아티스트 선택시 호출
     * @param index 선택한 아티스트 인덱스 
     */
    onArtistPressed(index) {
        var artistList = this.getUnselectArtistList();
        // 삭제 시
        if( artistList[index].id == 'delete' ) {
            var prevSelectAristId = this.state.selectArtistId;
            this.setState({
                selectArtistId:null, 
                selectArtist: null
            });
            this.props.methodArtist(this.props.id, prevSelectAristId, false);
            this.refs.input_ratio.clear();
        }
        else if( artistList[index].id == 'cancel' ) {

        }
        // 아티스트 선택 시
        else {
            this.setState({
                selectArtistId:artistList[index].id, 
                selectArtist: artistList[index].name
            });
            this.props.methodArtist(this.props.id, artistList[index].id, true);
        }
    }

    /**
     * 선택되지 않은 아티스트 목록 반환
     * @return 미선택 아티스트 목록
     */
    getUnselectArtistList() {
        var artistDataList = [];

        for( var i = 0; i < this.props.data.length; i++ ) {
            if( !this.props.data[i].selected ) {
                artistDataList.push({
                    id: this.props.data[i].id,
                    name: this.props.data[i].artist,
                });
            }
        }
        
        artistDataList.push({
            id: 'delete',
            name: '삭제',
        });

        artistDataList.push({
            id: 'cancel',
            name: '취소',
        });

        return artistDataList;
    }

    /**
     * 입력값 변환시 호출
     * @param id 입력필드 아이디 
     * @param text 변경 텍스트 
     */
    onInputChanged(id, text) {
        this.props.methodRatio(this.props.id, this.state.selectArtistId, text);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container_title}>
                    <Text style={[TextStyle.default, TextStyle.weigth_medium, TextStyle.size_16, TextStyle.color_niceblue2, TextStyle.align_left]}>
                        {this.props.title}
                    </Text>
                </View>
                <View style={styles.container_artist}>
                    <DropdownPickerCoverBlue title={this.state.selectArtist?this.state.selectArtist:'선택'}/>
                    <ActionSheetPicker
                        data={this.getUnselectArtistList()}
                        title="아티스트를 선택해주세요"
                        method={this.onArtistPressed}
                        destructiveEnable={true}
                        cancelEnable={true}/>
                </View>
                <View style={styles.container_input}>
                    <InputField 
                        id={this.input}
                        ref={this.input}
                        theme={INPUT_THEME_GREY}
                        keyboardType={INPUT_KEYBOARDTYPE_NUMBER}
                        method={this.onInputChanged}
                        maxValue={this.props.maxRatio}
                        textAlign={INPUT_ALIGN_CENTER}
                        editable={this.state.selectArtist?true:false}/>
                </View>
                <View style={styles.container_percent}>
                    <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_18, TextStyle.color_niceblue2, TextStyle.align_left]}>
                        %                                                                                                                                                                                                                     
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container_title: {
        justifyContent:'center',
    },
    container_artist: {
        width: '40%',
    },
    container_input: {
        width: '15%',
    },
    container_percent: {
        justifyContent:'center',
    },
});