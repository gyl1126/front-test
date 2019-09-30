//
//  signatureLogView.js
//  Split
//
//  Created by Mumakil on 2019. 3. 25..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

import DeviceInfo from 'react-native-device-info';

/**
 * @protocol SignatureLogView
 * @date 2019/03/25
 * @brief 서명 로그 화면
 */
export default class SignatureLogView extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.title, TextStyle.default, TextStyle.weigth_bold, TextStyle.size_28, TextStyle.color_niceblue2, TextStyle.align_center]}>
                    전자서명 이력
                </Text>
                <Text style={[styles.name, TextStyle.default, TextStyle.weigth_bold, TextStyle.size_16, TextStyle.color_niceblue2, TextStyle.align_left]}>
                    {'서명자 : '+ this.props.name}
                </Text>
                <Text style={[styles.subtitle, TextStyle.default, TextStyle.weigth_bold, TextStyle.size_16, TextStyle.color_niceblue2, TextStyle.align_left]}>
                    UDID
                </Text>
                <View style={styles.container_text}>
                    <Text style={[styles.text, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_16, TextStyle.color_niceblue2, TextStyle.align_left]}>
                        {DeviceInfo.getUniqueID()}
                    </Text>
                </View>
                <Text style={[styles.subtitle, TextStyle.default, TextStyle.weigth_bold, TextStyle.size_16, TextStyle.color_niceblue2, TextStyle.align_left]}>
                    일시
                </Text>
                <View style={[styles.container_text, {marginBottom: 33}]}>
                    <Text style={[styles.text, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_16, TextStyle.color_niceblue2, TextStyle.align_left]}>
                        {String(new Date())}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        
    },
    container_text: {
        backgroundColor: ColorStyle.GreyF7,
        marginTop: 10,
        marginLeft: 35,
        marginRight: 35,
    },
    title: {
        marginTop: 46,
    },
    name: {
        marginTop: 31,
        marginLeft: 31,
        marginRight: 31,
    },
    subtitle: {
        marginTop: 18,
        marginLeft: 31,
        marginRight: 31,
    },
    text: {
        marginTop: 14,
        marginLeft: 14,
        marginRight: 14,
        marginBottom: 14,
    }
});