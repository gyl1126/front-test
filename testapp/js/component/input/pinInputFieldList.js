//
//  pinInputFieldList.js
//  Split
//
//  Created by Mumakil on 2019. 2. 8..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import PinInputField from 'component-input/pinInputField';

/**
 * @protocol PinInputFieldList
 * @date 2019/02/8
 * @brief 핀번호 입력 필드
 */
export default class PinInputFieldList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pin1Text: null, // 1번째 자리 입력
            pin2Text: null, // 2번째 자리 입력
            pin3Text: null, // 3번째 자리 입력
            pin4Text: null, // 4번째 자리 입력
        }
        
        this.pin1 = 'pin1'; // 1번째 입력필드 ref
        this.pin2 = 'pin2'; // 2번째 입력필드 ref
        this.pin3 = 'pin3'; // 3번째 입력필드 ref
        this.pin4 = 'pin4'; // 4번째 입력필드 ref

        this.onInputChanged = this.onInputChanged.bind(this);
        this.setDisableFocus = this.setDisableFocus.bind(this);
        this.setClear = this.setClear.bind(this);
    }

    /**
     *  텍스트 입력기 입력 변경시 호출
     *
     *  @param id 입력시 아이디
     *  @param text 변경된 텍스트
     */
    onInputChanged(id, text) {
        // 백스페이스 입력시에 이전 핀 입력필드로 포커스 이동
        // 일반적인 입력시에는 다음 핀 입력필드로 포커스 이동
        // 마지막 핀 입력시에는 포커스 해제
        switch( id ) {
            case this.pin1: {
                if( text == 'Backspace' ) {
                    break;
                }
                this.setState({pin1Text:text});
                if( this.props.onTextChanged != null )
                    this.props.onTextChanged(text, this.state.pin2Text, this.state.pin3Text, this.state.pin4Text);
                
                if( text )
                    this.refs.pin2.focus();
                break;
            }
            case this.pin2: {
                if( text == 'Backspace' ) {
                    this.refs.pin1.focus();
                    break;
                }
                this.setState({pin2Text:text});
                if( this.props.onTextChanged != null )
                    this.props.onTextChanged(this.state.pin1Text, text, this.state.pin3Text, this.state.pin4Text);
                
                if( text )
                    this.refs.pin3.focus();
                break;
            }
            case this.pin3: {
                if( text == 'Backspace' ) {
                    this.refs.pin2.focus();
                    break;
                }
                this.setState({pin3Text:text});
                if( this.props.onTextChanged != null )
                    this.props.onTextChanged(this.state.pin1Text, this.state.pin2Text, text, this.state.pin4Text);
                
                if( text )
                    this.refs.pin4.focus();
                break;
            }
            case this.pin4: {
                if( text == 'Backspace' ) {
                    this.refs.pin3.focus();
                    break;
                }
                
                if( text != null && text.length > 0 )
                    this.refs.pin4.blur();
                    
                this.setState({pin4Text:text});
                if( this.props.onTextChanged != null )
                    this.props.onTextChanged(this.state.pin1Text, this.state.pin2Text, this.state.pin3Text, text);
                break;
            }
        }
    }

    /**
     *  텍스트 입력기 포커스 해제
     */
    setDisableFocus() {
        this.refs.pin1.blur();
        this.refs.pin2.blur();
        this.refs.pin3.blur();
        this.refs.pin4.blur();
    }

    /**
     *  텍스트 입력기 초기화
     */
    setClear() {
        this.refs.pin1.clear();
        this.refs.pin2.clear();
        this.refs.pin3.clear();
        this.refs.pin4.clear();
        
        this.setState({
            pin1Text: null,
            pin2Text: null,
            pin3Text: null,
            pin4Text: null,
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container_rowlist}>
                    <View style={styles.container_input}>
                        <PinInputField
                            id={this.pin1}
                            ref={this.pin1}
                            style={this.props.stylepin}
                            method={this.onInputChanged}
                            editable={this.props.editable}>
                        </PinInputField>
                    </View>
                    <View style={styles.container_input}>
                        <PinInputField
                            id={this.pin2}
                            ref={this.pin2}
                            style={this.props.stylepin}
                            method={this.onInputChanged}
                            editable={this.props.editable}>
                        </PinInputField>
                    </View>
                    <View style={styles.container_input}>
                        <PinInputField
                            id={this.pin3}
                            ref={this.pin3}
                            style={this.props.stylepin}
                            method={this.onInputChanged}
                            editable={this.props.editable}>
                        </PinInputField>
                    </View>
                    <View style={[styles.container_input, {marginRight:0}]}>
                        <PinInputField
                            id={this.pin4}
                            ref={this.pin4}
                            style={this.props.stylepin}
                            method={this.onInputChanged}
                            editable={this.props.editable}>
                        </PinInputField>
                    </View>
                </View> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
    },
    container_rowlist: {
        flex: 1,
        flexDirection: 'row',
    },
    container_input: {
        height: '100%',
        aspectRatio: 1/1,
        marginRight: 14,
    },
    input: {
        height:'100%',
        textAlign: 'center',
    },
});