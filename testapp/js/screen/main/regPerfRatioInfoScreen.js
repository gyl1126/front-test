//
//  refPerfRatioInfoScreen.js
//  Split
//
//  Created by Mumakil on 2019. 9. 17..
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
import InputField, {INPUT_THEME_GREY, INPUT_KEYBOARDTYPE_NORMAL, INPUT_KEYBOARDTYPE_NUMBER} from 'component-input/inputField';
import UserPhoneInputCell from 'component-cell/userPhoneInputCell';
import InfoLabel from 'component-label/infoLabel';
import SubmitButton from 'component-button/submitButton';
import ListAddButton from 'component-button/listAddButton';
import ArtistSearchView, {ARTISTSEARCHTYPE_USER, ARTISTSEARCHTYPE_CONTACT} from 'component-view/artistSearchView';
import PerfRatioInputField from 'component-input/perfRatioInputField';
import ContractInfo, {CONTRACTINFO_CONTAINER, CONTRACTINFO_TEAMLIST} from 'info/contractInfo';
import {
    TEAMINFO_TEAMID,
    TEAMINFO_NAME,
    TEAMINFO_RATIO,
    TEAMINFO_MEMBERTYPE,
} from 'info/teamInfo';
import PeriodInputField from 'component-input/periodInputField';

/**
 * @protocol RegPerfRationInfoScreen
 * @date 2019/09/17
 * @brief 트랙 정보 등록 화면
 */
export default class RegPerfRationInfoScreen extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            // FIXME: 정책 결정후, 다음 버튼 활성화 체크 기능 넣어야함
            isInputAll: true,   // 입력 체크
            isShowArtistSearchView: false,  // 아티스트 검색 화면 표시
            isShowContactSearchView: false, // 연락처 검색 화면 표시
            selectingInputId: null,         // 검색 직전 선택한 입력필드 id
            categoryList: {
                data: [
                    {
                        title: '분배 비율(100% 기준)',
                        description: '',
                    },
                ]
            },  // 카테고리 정보
            inputList: { data: [
                {
                    id: 'input-artist',
                    idType: 'input-type',
                    idName: 'input-artistname',
                    idRatio: 'input-artistratio',
                    inputType: null,
                    inputName: null,
                    inputRatio: null,
                },
            ]}, // 입력필드 목록
            inputStartDate: null,
            inputEndDate: null,
        };

        this.teamIndex = this.state.inputList.data.length;  // 팀원 인덱스
        
        this.onNextPressed = this.onNextPressed.bind(this);
        this.onInputChanged = this.onInputChanged.bind(this);
        this.onListAddPressed = this.onListAddPressed.bind(this);
        this.onBackPressed = this.onBackPressed.bind(this);
        this.onRemovePressed = this.onRemovePressed.bind(this);
        this.onArtistSearchClosePressed = this.onArtistSearchClosePressed.bind(this);
        this.onContactSearchClosePressed = this.onContactSearchClosePressed.bind(this);
        this.onArtistSelected = this.onArtistSelected.bind(this);
        this.onContactSelected = this.onContactSelected.bind(this);
        this.onFocus = this.onFocus.bind(this);

        this.onTypeChanged = this.onTypeChanged.bind(this);
        this.onArtistChanged = this.onArtistChanged.bind(this);
        this.onRatioChanged = this.onRatioChanged.bind(this);
        this.onStartDateChanged = this.onStartDateChanged.bind(this);
        this.onEndDateChanged = this.onEndDateChanged.bind(this);
    }

    _scrollToInput( reactNode: any ) {
        this.scroll.props.scrollToFocusedInput(reactNode)
    }

    onTypeChanged(id, typeId, selected) {
        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            if( id == this.state.inputList.data[i].id ) {
                var newInputList = this.state.inputList;
                newInputList.data[i].inputType = typeId;
                this.setState({inputList: newInputList});
            }
        }
    }

    onArtistChanged(id, value) {
        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            if( id == this.state.inputList.data[i].id ) {
                var newInputList = this.state.inputList;
                newInputList.data[i].inputName = value;
                this.setState({inputList: newInputList});
            }
        }
    }

    onRatioChanged(id, value) {
        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            if( id == this.state.inputList.data[i].id ) {
                var newInputList = this.state.inputList;
                newInputList.data[i].inputRatio = value;
                this.setState({inputList: newInputList});
            }
        }
    }

    onStartDateChanged(id, date) {
        this.setState({inputStartDate: date});
    }

    onEndDateChanged(id, date) {
        this.setState({inputEndDate: date});
    }

    /**
     *  다음 클릭시 호출
     */
    onNextPressed() {
        var contractInfo = this.props.navigation.getParam(CONTRACTINFO_CONTAINER);

        var teamDataList = [];

        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            var teamData = {};
            
            teamData[TEAMINFO_TEAMID] = this.state.inputList.data[i].id;
            teamData[TEAMINFO_MEMBERTYPE] = this.state.inputList.data[i].inputType;
            teamData[TEAMINFO_NAME] = this.state.inputList.data[i].inputName;
            teamData[TEAMINFO_RATIO] = this.state.inputList.data[i].inputRatio;
            teamDataList.push(teamData);
        }
        
        contractInfo.parseFromDictionary({[CONTRACTINFO_TEAMLIST]:teamDataList});
        contractInfo.performanceInfo.contractStartdate = this.state.inputStartDate;
        contractInfo.performanceInfo.contractEnddate = this.state.inputEndDate;
        console.log(contractInfo);
        this.props.navigation.navigate('RegPerfConfirmInfo', {
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

        newList.data.push({
            id: newList.data[0].id+this.teamIndex,
            idName: newList.data[0].idName+this.teamIndex,
            idPhone: newList.data[0].idPhone+this.teamIndex,
            typeName: newList.data[0].typeName,
            typePhone: newList.data[0].typePhone,
            inputName: null,
            inputPhone: null,
        });

        this.teamIndex++;
        this.setState({inputList: newList});
    }

    /**
     *  리스트 항목 삭제 클릭시 호출
     */
    onRemovePressed(id) {
        var newList = [];

        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            if( this.state.inputList.data[i].id != id ) {
                newList.push(this.state.inputList.data[i]);
            }
        }
        
        this.setState({inputList: {data:newList}});
    }

    /**
     * 입력필드 포커스 이벤트 발생시 호출
     * @param id 포커스된 id
     */
    onFocus(id) {
        // 이름 영역이면 아티스트 검색 화면
        // 휴대폰 영역이면 연락처 검색 화면 표시
        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            if( this.state.inputList.data[i].idName == id ) {
                this.setState({isShowArtistSearchView:true,
                    selectingInputId: this.state.inputList.data[i].id});
            }
            else if( this.state.inputList.data[i].idPhone == id ) {
                this.setState({isShowContactSearchView:true,
                    selectingInputId: this.state.inputList.data[i].id});
            }
        }
    }

    /**
     *  입력 필드 값 변경시 호출
     * @param id 입력필드 id
     * @param text 변경 값
     */
    onInputChanged(id, text) {
        if( id == this.state.inputList.data[0].id ) {
            var newInputList = this.state.inputList;
            newInputList.data[0].inputName = text;
            this.setState({inputList: newInputList});
        }
    }

    /**
     * 아티스트 검색 화면 닫기시 호출
     */
    onArtistSearchClosePressed() {
        this.setState({isShowArtistSearchView: false});
    }

    /**
     * 연락처 검색 화면 닫기시 호출
     */
    onContactSearchClosePressed() {
        this.setState({isShowContactSearchView: false});
    }

    /**
     * 아티스트 선택시 호출
     * @param name 선택한 아티스트 이름 
     * @param phone 선택한 아티스트 전화번호
     */
    onArtistSelected(name, phone) {
        var newInputList = this.state.inputList;
        for( var i = 0; i < newInputList.data.length; i++ ) {
            if( newInputList.data[i].id == this.state.selectingInputId ) {
                newInputList.data[i].inputName = name;
                newInputList.data[i].inputPhone = phone;
            }
        }
        this.setState({isShowArtistSearchView: false,
            inputList: newInputList});
    }

    /**
     * 연락처 선택시 호출
     * @param name 선택한 연락처 이름 
     * @param phone 선택한 연락처 전화번호
     */
    onContactSelected(name, phone) {
        var newInputList = this.state.inputList;
        for( var i = 0; i < newInputList.data.length; i++ ) {
            if( newInputList.data[i].id == this.state.selectingInputId ) {
                newInputList.data[i].inputName = name;
                newInputList.data[i].inputPhone = phone;
            }
        }
        
        this.setState({isShowContactSearchView: false,
            inputList: newInputList});
    }

    /**
     *  입력 항목 렌더링
     */
    renderInputList() {
        var inputList = [];
        for( var i = 0; i < this.state.inputList.data.length; i++ ) {
            var viewId = 'view' + this.state.inputList.data[i].id;

            // 카테고리 ui 추가
            if( i == 0 ) {
                var categoryId = 'category' + i;
                inputList.push(
                    <InfoLabel 
                        key={categoryId}
                        style={styles.infolabel}
                        title={this.state.categoryList.data[i].title}
                        description={this.state.categoryList.data[i].description}
                        showInfoIcon={false}/>);
            }
            
            inputList.push(<View key={viewId}
                style={styles.container_inputfield}>
                <PerfRatioInputField
                    id={this.state.inputList.data[i].id}
                    // title={title}
                    // data={this.state.artistList}
                    methodType={this.onTypeChanged}
                    methodArtist={this.onArtistChanged}
                    methodRatio={this.onRatioChanged}
                    maxRatio={this.state.ratio}
                    editable={true}/>
            </View>);
        }
        
        return inputList;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container_sequence}>
                    <NavigationBar method={this.onBackPressed}/>
                    <RegSequenceBar title='SPLIT 정산 앨범 등록' subtitle='팀 등록' subtitleadd='(자동정산자 등록)' total='5' highlight='3'/>
                </View>
                <KeyboardAwareScrollView style={[styles.container_scrollview, {top:getStatusBarHeight()+30}]}
                    innerRef={ref => {
                        this.scroll = ref
                    }}>
                    {this.renderInputList()}
                    <ListAddButton containerStyle={styles.container_addbutton}
                        title='+ 추가하기'
                        method={this.onListAddPressed}/>
                    <PeriodInputField
                        style={styles.periodinputfield}
                        title='계약기간'
                        startstr='시작일'
                        endstr='만료일'
                        editable={true}
                        methodStartDate={this.onStartDateChanged}
                        methodEndDate={this.onEndDateChanged}/>
                    <SubmitButton containerStyle={styles.container_submitbutton}
                        title='다음'
                        enable={this.state.isInputAll}
                        method={this.onNextPressed}/>
                </KeyboardAwareScrollView>
                {
                    (this.state.isShowArtistSearchView?
                        <ArtistSearchView
                            type={ARTISTSEARCHTYPE_USER}
                            methodClose={this.onArtistSearchClosePressed}
                            methodSelect={this.onArtistSelected}
                        />:null)
                }
                {
                    (this.state.isShowContactSearchView?
                        <ArtistSearchView
                            type={ARTISTSEARCHTYPE_CONTACT}
                            methodClose={this.onContactSearchClosePressed}
                            methodSelect={this.onContactSelected}
                        />:null)
                }
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
        paddingLeft: 54,
        paddingRight: 54,
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
    infolabel: {
        marginTop: 18,
        paddingLeft: 52,
        paddingRight: 52,
    },
    container_artistratio: {
        marginLeft: 59,
        marginRight: 53,
        height:100,
    },
    periodinputfield: {
        marginTop: 20,
        marginLeft: 50,
        marginRight: 58,
    }
});