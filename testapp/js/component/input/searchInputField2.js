//
//  searchInputField2.js
//  Split
//
//  Created by Mumakil on 2019. 4. 23..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

/**
 * @protocol SearchInputField2
 * @date 2019/04/23
 * @brief 검색어 입력 필드
 */
export default class SearchInputField2 extends Component {
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
                <Image
                    style={styles.icon}
                    source={Images.IconSearch}/>
                <TextInput 
                    style={[styles.input, TextStyle.color_brownishgrey]}
                    onChange={this.onChange}
                    placeholder={this.props.placeholder}
                    value={this.state.value}>
                </TextInput>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height:55,
        backgroundColor: ColorStyle.White,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        height: '100%',
    },
    icon: {
        width: 25,
        height: 25,
        marginLeft: 23,
        marginRight: 23,
    }
});