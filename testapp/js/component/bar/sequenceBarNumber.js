//
//  sequenceBarNumber.js
//  Split
//
//  Created by Mumakil on 2019. 3. 4..
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
 * @protocol SequenceBarNumber
 * @date 2019/03/04
 * @brief 순서 진행 바 숫자항목
 */
export default class SequenceBarNumber extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={(this.props.highlight?styles.circle_highlight:styles.circle_normal)}>
                    <Text style={[TextStyle.default, TextStyle.size_22, TextStyle.weigth_medium,
                        (this.props.highlight?styles.text_highlight:styles.text_normal)]}>
                        {this.props.number}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        
    },
    circle_normal: {
        width: '100%',
        height: '100%',
        borderWidth:1.5,
        borderColor:ColorStyle.NiceBlue2,
        borderRadius: 100,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    circle_highlight: {
        width: '100%',
        height: '100%',
        backgroundColor:ColorStyle.NiceBlue2,
        borderWidth: 1.5,
        borderColor:ColorStyle.NiceBlue2,
        borderRadius: 100,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    text_normal: {
        top: -2,
        color: ColorStyle.NiceBlue2,
    },
    text_highlight: {
        top: -2,
        color: ColorStyle.White,
    }
});