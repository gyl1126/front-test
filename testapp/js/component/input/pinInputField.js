//
//  pinInputField.js
//  Split
//
//  Created by Mumakil on 2019. 2. 8..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
} from 'react-native';
import TextStyle from 'style/text';
import ColorStyle from '../../../asset/style/color';

/**
 * @protocol PinInputField
 * @date 2019/02/8
 * @brief 핀번호 입력 필드
 */
export default class PinInputField extends Component {
    constructor(props) {
        super(props);

        this.focus = this.focus.bind(this);
        this.blur = this.blur.bind(this);
        this.clear = this.clear.bind(this);
    }

    /**
     *  텍스트 입력기 값 변경시 호출
     *
     *  @param event 이벤트
     */
    onChange = event => {
        this.props.method(this.props.id, event.nativeEvent.text);
    }

    /**
     *  텍스트 입력기 키 클릭시 호출
     *
     *  @param event 이벤트
     */
    onKeyPress = event => {
        if( event.nativeEvent.key == 'Backspace' )
            this.props.method(this.props.id, event.nativeEvent.key);
    }

    /**
     *  텍스트 입력기 클릭시 호출
     *
     *  @param event 이벤트
     */
    onFocus = event => {
        this.refs.input.clear();
        this.props.method(this.props.id, null);
    }

    /**
     *  입력 초기화 및 포커스 설정
     */
    focus() {
        this.refs.input.clear();
        this.refs.input.focus();
        this.props.method(this.props.id, null);
    }

    /**
     *  포커스 해제
     */
    blur() {
        this.refs.input.blur();
    }

    /**
     *  입력 초기화
     */
    clear() {
        this.refs.input.clear();
        this.props.method(this.props.id, null);
    }
    
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <TextInput style={[styles.input, TextStyle.weight_bold, TextStyle.size_34, TextStyle.color_niceblue2]}
                    ref='input'
                    keyboardType='numeric'
                    maxLength={1}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    secureTextEntry={true}
                    onKeyPress={this.onKeyPress}
                    editable={this.props.editable}>
                </TextInput>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: ColorStyle.GreyF7,
        borderRadius: 11,
    },
    input: {
        height:'100%',
        textAlign: 'center',
    },
});