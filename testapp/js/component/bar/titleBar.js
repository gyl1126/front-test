//
//  titleBar.js
//  Split
//
//  Created by Mumakil on 2019. 1. 18..
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

/**
 * @protocol TitleBar
 * @date 2019/01/18
 * @brief 제목 바
 */
export default class TitleBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.title, TextStyle.default, TextStyle.size_34, TextStyle.weigth_bold, TextStyle.align_left]}>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorStyle.NiceBlue2,
        height: 60,
        justifyContent: 'center',
    },
    title: {
        left: 16,
    },
});