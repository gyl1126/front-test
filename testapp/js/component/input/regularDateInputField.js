//
//  regularDateInputField.js
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
} from 'react-native';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';
import InputField, {INPUT_THEME_GREY, INPUT_KEYBOARDTYPE_NUMBER, INPUT_ALIGN_CENTER} from 'component-input/inputField';


/**
 * @protocol RegularDateInputField
 * @date 2019/01/29
 * @brief 타이틀이 있는 입력 필드
 */
export default class RegularDateInputField extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

        this.onInputChanged = this.onInputChanged.bind(this);
    }

    onInputChanged(id, text) {
        console.log(this.props.id, id);
        if( this.props.method != null )
            this.props.method(this.props.id, text);
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.container_title}>
                    <Text style={[TextStyle.default, TextStyle.weigth_medium, TextStyle.size_19, TextStyle.color_niceblue2, TextStyle.align_left]}>
                        {this.props.title}
                    </Text>
                </View>
                <View  style={styles.container_input}>
                    <Text style={[styles.frontstring, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_17, TextStyle.color_niceblue2, TextStyle.align_left]}>
                        {this.props.frontstr}
                    </Text>
                    <View style={styles.input}>
                        <InputField 
                            style={styles.input}
                            id={this.input}
                            ref={this.input}
                            theme={INPUT_THEME_GREY}
                            keyboardType={INPUT_KEYBOARDTYPE_NUMBER}
                            method={this.onInputChanged}
                            maxValue={31}
                            textAlign={INPUT_ALIGN_CENTER}
                            editable={this.props.editable}
                            value={this.props.value}/>
                    </View>
                    <View style={styles.input}>
                        <Text style={[styles.endstring, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_17, TextStyle.color_niceblue2, TextStyle.align_left]}>
                            {this.props.endstr}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        
    },
    container_input: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    frontstring: {
        marginRight: 20,
    },
    endstring: {
        marginLeft: 8,
    },
    input: {
        width: 63,
    },
});