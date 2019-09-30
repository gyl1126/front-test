//
//  inputField.js
//  Split
//
//  Created by Mumakil on 2019. 1. 29..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
} from 'react-native';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

export const INPUT_THEME_DEFAULT    = 'default';
export const INPUT_THEME_GREY       = 'grey';
export const INPUT_KEYBOARDTYPE_NORMAL  = 'default';
export const INPUT_KEYBOARDTYPE_NUMBER  = 'number-pad';
export const INPUT_ALIGN_CENTER     = 'center';

/**
 * @protocol InputField
 * @date 2019/01/30
 * @brief 입력 필드
 */
export default class InputField extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            value: String(this.props.value?this.props.value:''),    // 입력필드 값
        };

        this.input = 'input';   // 입력필드 ref
        
        this.onChange = this.onChange.bind(this);
        this.clear = this.clear.bind(this);
        this.blur = this.blur.bind(this);
        this.onFocus = this.onFocus.bind(this);
    }

    /**
     * 입력값 변경 시 호출
     * @param event 입력값 변경 이벤트
     */
    onChange = event => {
        // 한도값 있는 경우, 한도값 내에서 표시
        if( this.props.maxValue ) {
            if( Number(event.nativeEvent.text) ) {
                if( Number(event.nativeEvent.text) < this.props.maxValue ) {
                    this.setState({value:String(event.nativeEvent.text)});
                    this.props.method(this.props.id, event.nativeEvent.text);
                }
                else {
                    this.setState({value:String(this.props.maxValue)});
                    this.props.method(this.props.id, this.props.maxValue);
                    return false;
                }
            }
            else {
                this.setState({value:''});
                this.props.method(this.props.id, '');
            }
        }
        else {
            this.setState({value:event.nativeEvent.text});
            this.props.method(this.props.id, event.nativeEvent.text);
        }

        // 정규식 테스트
        // const re = /^[0-9\b]+$/;
        // const re = /[0-9]{1,6}/;
        // if (event.nativeEvent.text === '' || re.test(event.nativeEvent.text)) {
        //    this.setState({value: event.nativeEvent.text})
        // }
    }

    /**
     * 입력필드 포커스 시 호출
     * @param event 입력필드 포커스 이벤트
     */
    onFocus = event => {
        if( this.props.methodFocus != null )
            this.props.methodFocus(this.props.id);
    }

    /**
     * 입력필드 포커스 해제
     */
    blur() {
        this.refs.input.blur();
    }

    /**
     * 입력필드 초기화
     */
    clear() {
        this.setState({value:null});
        this.props.method(this.props.id, null);
    }

    /**
     * 입력필드 정렬값 변경
     */
    inputAlignStyle() {
        if( this.props.textAlign == INPUT_ALIGN_CENTER )
            return {textAlign: 'center', paddingLeft:0, paddingRight:0,};
    }

    /**
     * 입력필드 비활성화 상태 설정
     */
    inputDisableStyle() {
        if( !this.props.editable ) {
            return {color: ColorStyle.GreyCC};
        }
    }

    /**
     * 입력필드 렌더링
     */
    renderInput() {
        if( this.props.theme == INPUT_THEME_GREY ) {
            return <TextInput 
                        style={[styles.inputgrey, TextStyle.color_niceblue2, this.inputAlignStyle(), this.inputDisableStyle()]}
                        ref={this.input}
                        placeholder={this.props.placeholder}
                        keyboardType={this.props.keyboardType?this.props.keyboardType:'default'}
                        maxLength={this.props.maxLength?this.props.maxLength:1000}
                        onChange={this.onChange}
                        value={this.state.value}
                        editable={this.props.editable}
                        onFocus={this.onFocus}>
                    </TextInput>;
        }
        return <TextInput 
                    style={[styles.input, TextStyle.color_grey38, TextStyle.size_18, TextStyle.weight_light, this.inputAlignStyle(), this.inputDisableStyle()]}
                    ref={this.input}
                    placeholder={this.props.placeholder}
                    keyboardType={this.props.keyboardType?this.props.keyboardType:'default'}
                    maxLength={this.props.maxLength?this.props.maxLength:1000}
                    onChange={this.onChange}
                    value={this.state.value}
                    editable={this.props.editable}
                    onFocus={this.onFocus}>
                </TextInput>;
    }
    
    render() {
        return (
            <View style={styles.container}>
                {this.renderInput()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height:33,
    },
    input: {
        height:33,
        paddingTop: -5,
        paddingBottom: -5,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:ColorStyle.VeryLightPinkTwo,
    },
    inputgrey: {
        height:'100%',
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:ColorStyle.GreyEF,
        borderWidth:1,
        borderColor:ColorStyle.GreyEF,
    },
});