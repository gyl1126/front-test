//
//  regPerfInfoScreen.js
//  Split
//
//  Created by Mumakil on 2019. 9. 17..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Dimensions,
} from 'react-native';
import ColorStyle from 'style/color';

import NavigationBar from 'component-bar/navigationBar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import RegSequenceBar from 'component-bar/regSequenceBar';
import AddButton from 'component-button/addButton';
import ImageButton from 'component-button/imageButton';
import TitleInputField, {INPUT_THEME_GREY, INPUT_TYPE_NORMAL, INPUT_TYPE_DATE} from 'component-input/titleInputField';
import SubmitButton from 'component-button/submitButton';
import PeriodInputField from 'component-input/periodInputField';
import ContractInfo, {CONTRACTINFO_CONTAINER} from 'info/contractInfo';
import {
    PERFORMANCEINFO_CONTAINER,
    PERFORMANCEINFO_TITLE,
    PERFORMANCEINFO_ARTIST,
    PERFORMANCEINFO_LABEL,
    PERFORMANCEINFO_DISTRIBUTION,
    PERFORMANCEINFO_STARTDATE,
    PERFORMANCEINFO_ENDDATE,
    PERFORMANCEINFO_COVERIMAGE,
} from 'info/performanceInfo';

var screen = Dimensions.get('window');
//var screen = require('Dimensions').get('window');

/**
 * @protocol RegPerfInfoScreen
 * @date 2019/09/17
 * @brief 공연 정보 등록 화면
 */
export default class RegPerfInfoScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // FIXME: 정책 결정후, 다음 버튼 활성화 체크 기능 넣어야함
            isInputAll: true,   // 입력 체크
            coverImage: null,   // 커버 이미지 
            inputList: { data: [
                {
                    id: PERFORMANCEINFO_TITLE,
                    name: '공연 제목',
                    type: INPUT_TYPE_NORMAL,
                    input: null,
                },
                {
                    id: PERFORMANCEINFO_ARTIST,
                    name: '아티스트명',
                    type: INPUT_TYPE_NORMAL,
                    input: null,
                },
                {
                    id: PERFORMANCEINFO_LABEL,
                    name: '기획사명',
                    type: INPUT_TYPE_NORMAL,
                    input: null,
                },
                {
                    id: PERFORMANCEINFO_DISTRIBUTION,
                    name: '유통사명',
                    type: INPUT_TYPE_NORMAL,
                    input: null,
                },
                {
                    id: PERFORMANCEINFO_STARTDATE,
                    name: '공연일자',
                    type: INPUT_TYPE_DATE,
                    input: new Date(),
                },
                {
                    id: PERFORMANCEINFO_ENDDATE,
                    name: '발매일',
                    type: INPUT_TYPE_DATE,
                    input: new Date(),
                },
            ]}, // 입력 정보
        };
        
        this.onInputChanged = this.onInputChanged.bind(this);
        this.onAddImagePressed = this.onAddImagePressed.bind(this);
        this.onNextPressed = this.onNextPressed.bind(this);
        this.onBackPressed = this.onBackPressed.bind(this);
        this.onStartDateChanged = this.onStartDateChanged.bind(this);
        this.onEndDateChanged = this.onEndDateChanged.bind(this);
    }

    _scrollToInput( reactNode: any ) {
        this.scroll.props.scrollToFocusedInput(reactNode)
    }
    
    /**
     *  이미지 추가 버튼 클릭시 호출
     */
    onAddImagePressed() {
        // 불러온 이미지가 존재하지 않으면, 바로 라이브러리 호출
        // 있으면, 삭제 옵션 추가 확인
        if( this.state.coverImage ) {
            const options = {
                title: '앨범 커버 이미지 등록',
                takePhotoButtonTitle: null,
                chooseFromLibraryButtonTitle: '라이브러리에서 불러오기',
                customButtons: [{ name: 'delete', title: '앨범 커버 이미지 삭제' }],
                cancelButtonTitle: '취소',
                storageOptions: {
                  skipBackup: true,
                  path: 'images',
                },
            };
            
            ImagePicker.showImagePicker(options, (response) => {
                if( response.didCancel ) {
                    console.log('User cancelled image picker');
                } 
                else if( response.error ) {
                    Alert.alert('ImagePicker Error: ' + response.error);
                }
                else if (response.customButton) {
                    this.setState({
                        coverImage: null,
                    });
                    console.log('User tapped custom button: ', response.customButton);
                }
                else {
                    console.log(response.uri);
                    
                    this.setState({
                        coverImage: response.uri,
                    });
                }
            });
        }
        else {
            const options = {
                storageOptions: {
                  skipBackup: true,
                  path: 'images'
                }
              };
            ImagePicker.launchImageLibrary(options, (response) => {
                if( response.didCancel ) {
                    console.log('User cancelled image picker');
                } 
                else if( response.error ) {
                    Alert.alert('ImagePicker Error: ' + response.error);
                }
                else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                }
                else {
                    console.log(response.uri);
                    
                    this.setState({
                        coverImage: response.uri,
                    });
                }
            });
        }
    }

    onStartDateChanged(id, date) {
        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            if( PERFORMANCEINFO_STARTDATE == this.state.inputList.data[i].id ) {
                // 리스트 값 변경 후, 업데이트
                var newInputList = this.state.inputList;
                newInputList.data[i].input = date;
                this.setState({inputList: newInputList});
                break;
            }
        }
    }

    onEndDateChanged(id, date) {
        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            if( PERFORMANCEINFO_ENDDATE == this.state.inputList.data[i].id ) {
                // 리스트 값 변경 후, 업데이트
                var newInputList = this.state.inputList;
                newInputList.data[i].input = date;
                this.setState({inputList: newInputList});
                break;
            }
        }
    }

    /**
     *  다음 클릭시 호출
     */
    onNextPressed() {
        // FIXME: 데이터 입력 체크 필요
        var contractInfo = this.props.navigation.getParam(CONTRACTINFO_CONTAINER);

        var perfData = {};
        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            perfData[this.state.inputList.data[i].id] = this.state.inputList.data[i].input;
        }
        perfData[PERFORMANCEINFO_COVERIMAGE] = this.state.coverImage;
        
        contractInfo.parseFromDictionary({[PERFORMANCEINFO_CONTAINER]: perfData});
        
        this.props.navigation.navigate('RegPerfRatioInfo', {
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
     *  입력 필드 값 변경시 호출
     * @param id 입력필드 id
     * @param text 변경 값
     */
    onInputChanged(id, text) {
        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            if( id == this.state.inputList.data[i].id ) {
                // 리스트 값 변경 후, 업데이트
                var newInputList = this.state.inputList;
                newInputList.data[i].input = text;
                this.setState({inputList: newInputList});
                break;
            }
        }
    }

    /**
     *  입력필드 목록 값에 따른 필드 생성
     */
    renderInputList() {
        var inputList = [];
        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            var viewId = 'view' + i;
            if( this.state.inputList.data[i].type == INPUT_TYPE_NORMAL ) {
                inputList.push(
                    <View key={viewId} style={styles.container_inputfield}>
                        <TitleInputField
                            id={this.state.inputList.data[i].id}
                            title={this.state.inputList.data[i].name}
                            method={this.onInputChanged}
                            theme={INPUT_THEME_GREY}
                            type={this.state.inputList.data[i].type}/>
                    </View> );
            }
        }

        return inputList;
    }

    /**
     *  이미지 불러오기 표시
     */
    renderCoverImage() {  
        if( this.state.coverImage ) {
            return <ImageButton method={this.onAddImagePressed}
                    source={{uri:this.state.coverImage}}/>
        }
        else {
            return <AddButton method={this.onAddImagePressed} 
                    title='공연 이미지 등록' 
                    description={'( 현재  버전에서는 이미지가\n이후 단계에서 자동 등록 됩니다. )'}/>;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container_sequence}>
                    <NavigationBar method={this.onBackPressed}/>
                    <RegSequenceBar title='SPLIT 정산 공연 등록' subtitle='공연 정보 등록' total='4' highlight='2'/>
                </View>
                <KeyboardAwareScrollView style={[styles.container_scrollview, {top:getStatusBarHeight()+30}]}
                    innerRef={ref => {
                        this.scroll = ref
                    }}>
                    <View style={styles.container_addbutton}>
                        {this.renderCoverImage()}
                    </View>
                    {this.renderInputList()}
                    <PeriodInputField
                        style={styles.periodinputfield}
                        title='공연일자'
                        startstr='시작일'
                        endstr='종료일'
                        editable={true}
                        methodStartDate={this.onStartDateChanged}
                        methodEndDate={this.onEndDateChanged}/>
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
        marginTop: 27,
        height: screen.width/2,
        alignItems:'center',
    },
    container_inputfield: {
        marginTop: 15,
        left: 54,
        right: 54,
        width: screen.width - 108,
        height: 63,
    },
    container_submitbutton: {
        marginTop: 60,
        marginBottom: 24,
        alignItems:'center',
        height: 43,
    },
    datepicker: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
    },
    periodinputfield: {
        top: 24,
        marginLeft: 50,
        marginRight: 58,
    }
});