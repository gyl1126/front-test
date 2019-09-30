//
//  normalButton.js
//  Split
//
//  Created by Mumakil on 2019. 9. 24..
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

export const NORMALBUTTON_THEHE_WHITE   = 'white';
export const NORMALBUTTON_THEHE_MELON   = 'melon';

/**
 * @protocol NormalButton
 * @date 2019/09/24
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

    getButtonStyle() {
        if( this.props.theme == NORMALBUTTON_THEHE_MELON ) {
            return [ButtonStyle.normal_melon];
        }
        else {
            return [ButtonStyle.normal_white];;
        }
    }

    getTextStyle() {
        if( this.props.theme == NORMALBUTTON_THEHE_MELON ) {
            return [TextStyle.default, TextStyle.weight_bold, TextStyle.size_20, TextStyle.color_white];
        }
        else {
            return [TextStyle.default, TextStyle.weight_bold, TextStyle.size_20, TextStyle.color_niceblue];
        }
    }
    
    render() {
        return (
            <View style={this.props.containerStyle}>
                <TouchableOpacity style={this.getButtonStyle()}
                    onPress={this.props.method}>
                    <Text style={this.getTextStyle()}>
                        {this.props.title}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}