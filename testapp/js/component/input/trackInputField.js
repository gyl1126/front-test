//
//  trackInputField.js
//  Split
//
//  Created by Mumakil on 2019. 1. 29..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';
import TitleInputField, {INPUT_THEME_GREY, INPUT_TYPE_NORMAL} from 'component-input/titleInputField';

/**
 * @protocol TrackInputField
 * @date 2019/01/29
 * @brief 곡정보 입력 필드
 */
export default class TrackInputField extends Component {
    constructor(props) {
        super(props);
        this.onTextChanged = this.onTextChanged.bind(this);
    }

    /**
     *  필드 값 변경 이벤트 발생시 호출
    */
    onTextChanged(id, text) {
        this.props.method(id, text);
    }

    /**
     *  입력필드 렌더링
     */
    renderTitleInputField() {
        var inputList = [];
        for( var i = 0; i < this.props.total; i++ ) {
            var viewId = 'view' + i;
            inputList.push( <View key={viewId} 
                                style={styles.container_inputfield}>
                                <TitleInputField
                                    id={this.props.data[i].id}
                                    title={this.props.data[i].name}
                                    method={this.onTextChanged}
                                    theme={INPUT_THEME_GREY}
                                    type={this.props.data[i].type}
                                    value={this.props.data[i].input}/>
                            </View> );
        }

        return inputList;
    }

    /**
     *  설정에 따라 제거 버튼 렌더링
     */
    renderRemoveButton() {
        if( this.props.methodRemove != null ) {
            return (<View style={styles.container_remove}>
                        <View style={styles.line}/>
                        <TouchableOpacity
                            style={styles.removebutton}
                            activeOpacity = { .5 }
                            onPress={() => this.props.methodRemove(this.props.data[0].id)}>
                            <Text style={[TextStyle.default, TextStyle.weigth_medium, TextStyle.size_18, TextStyle.color_lightgreyblue, TextStyle.align_center]}>
                                삭제
                            </Text>
                            <Image
                                style={styles.removeIcon} 
                                source={Images.IconRemove}/>
                        </TouchableOpacity>
                    </View>);
        }
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.container_title}>
                    <Text style={[TextStyle.default, TextStyle.weigth_medium, TextStyle.size_21, TextStyle.color_niceblue2, TextStyle.align_left]}>
                        {this.props.title}
                    </Text>
                    {this.renderRemoveButton()}
                </View>
                
                {this.renderTitleInputField()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 3,
        paddingRight: 3,
    },
    container_inputfield: {
        margin: 10,
    },
    container_title: {
        marginBottom: 7,
        flexDirection: 'row',
        flex: 1,
    },
    container_remove: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
    },
    line: {
        height: 1,
        backgroundColor: ColorStyle.NiceBlue2,
        opacity: .5,
        flex: 1,
        marginLeft: 6,
        marginRight: 6,
    },
    removebutton: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    removeIcon: {
        width: 25,
        height: 25,
        marginLeft: 8,
    }
});