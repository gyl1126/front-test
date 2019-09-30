//
//  sequenceBarLine.js
//  Split
//
//  Created by Mumakil on 2019. 3. 4..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import ColorStyle from 'style/color';

/**
 * @protocol SequenceBarLine
 * @date 2019/03/04
 * @brief 순서 진행 바 구분선
 */
export default class SequenceBarLine extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.line}>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        width: '100%',
        height: 3,
        backgroundColor: ColorStyle.NiceBlue2,
    },
});