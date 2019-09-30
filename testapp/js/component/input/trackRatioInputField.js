//
//  trackRatioInputField.js
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
import TitleInputField, {INPUT_THEME_GREY, INPUT_TYPE_NORMAL} from 'component-input/titleInputField';
import ArtistRatioInputField from 'component-input/artistRatioInputField';

/**
 * @protocol TrackRatioInputField
 * @date 2019/03/08
 * @brief 곡 정산정보 입력 필드
 */
export default class TrackRatioInputField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            artistList: this.props.data.ratioList,
            ratio: 100,
        };

        this.onArtistChanged = this.onArtistChanged.bind(this);
        this.onRatioChanged = this.onRatioChanged.bind(this);
    }

    /**
     * 아티스트 선택시 호출
     * @param id 입력필드 아이디 
     * @param artistId 아티스트 아이디
     * @param selected 선택 여부
     */
    onArtistChanged(id, artistId, selected) {
        var updateArtistList = this.state.artistList;
        for( var i = 0; i < updateArtistList.length; i++ ) {
            if( updateArtistList[i].id == artistId ) {
                updateArtistList[i].selected = selected;
            }
        }
        
        this.setState({artistList:updateArtistList});
        
        if( this.props.methodArtist != null )
            this.props.methodArtist(this.props.id, id.replace(this.props.id, ''), artistId, selected);
    }

    /**
     * 비율 변경시 호출
     * @param id 입력필드 아이디
     * @param artistId 아티스트 아이디 
     * @param value 비율 값
     */
    onRatioChanged(id, artistId, value) {
        if( this.props.methodRatio != null )
            this.props.methodRatio(this.props.id, id.replace(this.props.id, ''), artistId, value);
    }

    /**
     * 아티스트 비율 입력필드 화면 렌더링
     * @render 입력필드 화면 목록
     */
    renderArtistRatioInputFieldList() {
        var ratioInputList = [];
        
        for( var i = 0; i < this.props.data.ratioList.length; i++ ) {
            var viewId = 'view'+i;
            var title = (i==0?'메인 아티스트':'참여 아티스트');
            
            ratioInputList.push( <View key={viewId}
                                    style={styles.container_artistratio}>
                                    <ArtistRatioInputField
                                        id={this.props.id+i}
                                        title={title}
                                        data={this.state.artistList}
                                        methodArtist={this.onArtistChanged}
                                        methodRatio={this.onRatioChanged}
                                        maxRatio={this.state.ratio}/>
                                </View> );
        }

        return ratioInputList;
    }

    render() {
        return (
            <View style={[styles.container]}>
                <View style={styles.container_title}>
                    <Text style={[TextStyle.default, TextStyle.weigth_medium, TextStyle.size_22, TextStyle.color_niceblue2, TextStyle.align_left]}>
                        {this.props.title}
                    </Text>
                </View>
                <View style={styles.container_titleinput}>
                    <TitleInputField
                        id='title'
                        title='곡 제목'
                        method={this.onInputChanged}
                        theme={INPUT_THEME_GREY}
                        type={INPUT_TYPE_NORMAL}
                        editable={false}
                        value={this.props.data.title}/>
                </View>
                <View style={styles.container_ratiotitle}>
                    <Text style={[TextStyle.default, TextStyle.weigth_medium, TextStyle.size_19, TextStyle.color_niceblue2, TextStyle.align_left]}>
                        분배 비율
                    </Text>
                    <Text style={[TextStyle.default, TextStyle.weigth_medium, TextStyle.size_13, TextStyle.color_niceblue2, TextStyle.align_right]}>
                        (100% 기준)
                    </Text>
                </View>
                {this.renderArtistRatioInputFieldList()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        
    },
    container_title: {
        marginLeft: 46,
        marginRight: 46,
        marginBottom: 10,
    },
    container_titleinput: {
        marginLeft: 47,
        marginRight: 47,
        marginBottom: 37,
    },
    container_ratiotitle: {
        marginLeft: 49,
        marginRight: 66,
        marginBottom: 11,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
    },
    container_artistratio: {
        marginLeft: 49,
        marginRight: 41,
        marginBottom: 8,
    },
    ratiotitle: {
        marginBottom: 7,
        marginLeft: 12,
        marginRight: 12,
    }
});