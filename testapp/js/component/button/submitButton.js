//
//  submitButton.js
//  Split
//
//  Created by Mumakil on 2019. 3. 6..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';
import ButtonStyle from 'style/button';

/**
 * @protocol SubmitButton
 * @date 2019/03/06
 * @brief 제출 버튼
 */
export default class SubmitButton extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * 버튼 클릭시 호출
     */
    onButtonPressed() {
        if( this.props.enable ) {
            this.props.method();
        }
    }
    
    render() {
        return (
            <View style={this.props.containerStyle}>
                <TouchableOpacity style={[this.props.enable?ButtonStyle.confirm:ButtonStyle.confirm_disable, {position: 'absolute',bottom:0}]}
                    onPress={this.props.method}
                    disabled={!this.props.enable}>
                    <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_20, TextStyle.color_white]}>
                        {this.props.title}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}