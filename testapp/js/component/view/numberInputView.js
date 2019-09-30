//
//  numberInputView.js
//  Split
//
//  Created by Mumakil on 2019. 4. 19..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Button
} from 'react-native';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

import NumberButton from 'component-button/numberButton';

/**
 * @protocol NumberInputView
 * @date 2019/04/19
 * @brief 금액 입력 필드
 */
export default class NumberInputView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',     // 입력 금액
            padList: [{
                id: 1,
                title: '1',
            },
            {
                id: 2,
                title: '2',
            },
            {
                id: 3,
                title: '3',
            },
            {
                id: 4,
                title: '4',
            },
            {
                id: 5,
                title: '5',
            },
            {
                id: 6,
                title: '6',
            },
            {
                id: 7,
                title: '7',
            },
            {
                id: 8,
                title: '8',
            },
            {
                id: 9,
                title: '9',
            },
            {
                id: 10,
                title: '',
            },
            {
                id: 11,
                title: '0',
            },
            {
                id: 12,
                title: 'del',
            }],     // 키패드 목록
        }

        this.onNumberPressed = this.onNumberPressed.bind(this);
    }

    /**
     * 초기화한다
     */
    initialize() {
        this.setState({inputValue: ''});
    }

    /**
     * 키패드 클릭시 호출
     * @param id 키패드 아이디 
     */
    onNumberPressed(id) {
        var value = this.state.inputValue;
        // 삭제 키패트 
        if( id == 12 ) {
            if( value.length > 0 )
                value = value.slice(0, value.length - 1);
        }
        // 10번은 공백 버튼
        else if( id != 10) {
            // 11번은 0 처리
            if( id == 11 )
                value = value + String(0);
            else
                value = value + String(id);
        }

        this.setState({ inputValue: value });
        if( this.props.method != null ) 
            this.props.method(value);
    }

    /**
     * 키패드 렌더링
     */
    renderNumberPad() {
        var numberPadList = [];

        for( var i = 0; i < 4; i++ ) {
            var rowPadList = [];
            for( var j = 0; j < 3; j++ ) {
                rowPadList.push(<NumberButton 
                                    key={'pad'+(i * 3) + j}
                                    style={styles.container_row}
                                    id={this.state.padList[(i * 3) + j].id}
                                    title={this.state.padList[(i * 3) + j].title}
                                    method={this.onNumberPressed}/>);
            }

            numberPadList.push( <View style={styles.container_column}
                                    key={'view'+i}>
                                    {rowPadList}
                                </View>);
            
            
        }

        return numberPadList;
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderNumberPad()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    container_column: {
        flex: 0.25,
        flexDirection: 'row',
    },
    container_row: {
        flex: 1/3,
        alignItems: 'center',
        justifyContent: 'center',
    }
});