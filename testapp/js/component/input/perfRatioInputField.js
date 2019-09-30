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
import InputField, {INPUT_THEME_GREY, INPUT_KEYBOARDTYPE_NORMAL, INPUT_KEYBOARDTYPE_NUMBER, INPUT_ALIGN_CENTER} from 'component-input/inputField';
import {
    PERFORMANCEINFO_TYPE, PERFORMANCEINFO_TYPE_ARTIST, PERFORMANCEINFO_TYPE_LABEL, PERFORMANCEINFO_TYPE_DISTRIBUTION
} from 'info/performanceInfo';

/**
 * @protocol PerfRatioInputField
 * @date 2019/03/08
 * @brief 아티스트 비율 입력 필드
 */
export default class PerfRatioInputField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectType: (this.props.data?this.props.data.type:null),
        }

        this.input = 'input_ratio';

        this.onTypePressed = this.onTypePressed.bind(this);
        this.onArtistChanged = this.onArtistChanged.bind(this);
        this.onRatioChanged = this.onRatioChanged.bind(this);
    }

    /**
     * 아티스트 선택시 호출
     * @param index 선택한 아티스트 인덱스 
     */
    onTypePressed(index) {
        var typeList = this.getUserTypeList();
        
        if( typeList[index].id == 'cancel' ) {

        }
        // 아티스트 선택 시
        else {
            this.setState({
                selectArtistId: typeList[index].id, 
                selectType: typeList[index].id
            });

            this.props.methodType(this.props.id, typeList[index].id, true);
        }
    }


    getUserTypeList() {
        var typeList = [];
        
        typeList.push({
            id: PERFORMANCEINFO_TYPE_ARTIST,
            name: '아티스트',
        });

        typeList.push({
            id: PERFORMANCEINFO_TYPE_LABEL,
            name: '기획사',
        });

        typeList.push({
            id: PERFORMANCEINFO_TYPE_DISTRIBUTION,
            name: '유통사',
        });

        typeList.push({
            id: 'cancel',
            name: '취소',
        });

        return typeList;
    }

    getTypeString() {
        if( this.state.selectType == PERFORMANCEINFO_TYPE_ARTIST )
            return '아티스트';
        else if( this.state.selectType == PERFORMANCEINFO_TYPE_LABEL )
            return '기획사';
        else if( this.state.selectType == PERFORMANCEINFO_TYPE_DISTRIBUTION )
            return '유통사';
    }
    
    /**
     * 입력값 변환시 호출
     * @param id 입력필드 아이디 
     * @param text 변경 텍스트 
     */
    onArtistChanged(id, text) {
        this.props.methodArtist(this.props.id, text);
    }

    /**
     * 입력값 변환시 호출
     * @param id 입력필드 아이디 
     * @param text 변경 텍스트 
     */
    onRatioChanged(id, text) {
        this.props.methodRatio(this.props.id, text);
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
                    <View style={styles.container_artisttype}>
                        <DropdownPickerCoverBlue title={this.state.selectType?this.getTypeString():'선택'}/>
                        <ActionSheetPicker
                            data={this.getUserTypeList()}
                            title="구분을 선택해주세요"
                            method={this.onTypePressed}
                            destructiveEnable={false}
                            cancelEnable={true}/>
                    </View>
                    <View style={styles.container_artistname}>
                        <InputField 
                            id={this.input}
                            ref={this.input}
                            theme={INPUT_THEME_GREY}
                            keyboardType={INPUT_KEYBOARDTYPE_NORMAL}
                            method={this.onArtistChanged}
                            textAlign={INPUT_ALIGN_CENTER}
                            value={(this.props.data?this.props.data.name:null)}
                            editable={this.props.editable?true:false}/>
                    </View>
                </View>
                
                <View style={styles.container_ratio}>
                    <View style={styles.container_ratioinput}>

                    <InputField 
                        id={this.input}
                        ref={this.input}
                        theme={INPUT_THEME_GREY}
                        keyboardType={INPUT_KEYBOARDTYPE_NUMBER}
                        method={this.onRatioChanged}
                        textAlign={INPUT_ALIGN_CENTER}
                        value={(this.props.data?this.props.data.ratio:null)}
                        editable={this.props.editable?true:false}/>
                        </View>
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
        // flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    container_title: {
        justifyContent:'center',
    },
    container_artist: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container_artisttype: {
        width: '40%',
    },
    container_artistname: {
        width: '50%',
    },
    container_input: {
        width: '15%',
    },
    container_percent: {
        justifyContent:'center',
    },
    container_ratio: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
    },
    container_ratioinput: {
        flex: 1,
    }
});