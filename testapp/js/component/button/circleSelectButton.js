//
//  circleSelectButton.js
//  Split
//
//  Created by Mumakil on 2019. 9. 17..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

/**
 * @protocol CircleSelectButton
 * @date 2019/09/17
 * @brief 원형 선택 버튼
 */
export default class CircleSelectButton extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * 버튼 클릭시 호출
     */
    onButtonPressed() {
        this.props.method(this.props.id);
    }

    render() {
        return (
            <View style={[styles.container, this.props.containerStyle, this.props.select?{backgroundColor: ColorStyle.LightNavy}:{backgroundColor: ColorStyle.White}]}>
                <TouchableOpacity
                    style={styles.button}
                    key={this.props.id}
                    activeOpacity = { .5 }
                    onPress={() => this.onButtonPressed()}>
                    <Text style={[TextStyle.default, TextStyle.weigth_medium, TextStyle.size_19, this.props.select?TextStyle.color_white:TextStyle.color_lightnavy]}>
                        {this.props.name}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 92,
        width: 92,
        alignItems: 'center',
        justifyContent: 'center', 
        borderColor: ColorStyle.LightNavy,
        borderWidth: 1,
        borderRadius: 46,
    },
    button: {
        width: '100%', 
        height: '100%', 
        alignItems: 'center',
        justifyContent: 'center', 
    }
});