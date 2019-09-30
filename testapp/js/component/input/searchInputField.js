//
//  searchInputField.js
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
    Text,
    TouchableOpacity,
} from 'react-native';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

/**
 * @protocol SearchInputField
 * @date 2019/04/11
 * @brief 검색어 입력 필드
 */
export default class SearchInputField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: null,
        }

        this.onSearchPressed = this.onSearchPressed.bind(this);
    }

    /**
     *  필드 값 변경 이벤트 발생시 호출
     */
    onChange = event => {
        this.setState({value: event.nativeEvent.text});
        // this.props.method(this.props.id, event.nativeEvent.text);
    }

    onSearchPressed() {
        if( this.props.method != null ) 
            this.props.method(this.state.value);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    style={[styles.input, TextStyle.color_brownishgrey]}
                    onChange={this.onChange}
                    value={this.state.value}>
                </TextInput>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onSearchPressed}>
                    <Text style={[TextStyle.default, TextStyle.weigth_medium, TextStyle.size_20, TextStyle.color_white]}>
                        검색
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height:55,
        backgroundColor: ColorStyle.VeryLightPinkThree,
        width: '100%',
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor:ColorStyle.White,
        borderRadius: 8,
    },
    button: {
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
        paddingLeft: 14,
        paddingRight: 14,
        backgroundColor: ColorStyle.DarkSkyBlue,
        justifyContent: 'center',
        borderRadius: 8,
    }
});