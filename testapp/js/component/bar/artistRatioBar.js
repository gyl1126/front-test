//
//  artistRatioBar.js
//  Split
//
//  Created by Mumakil on 2019. 3. 18..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import TextStyle from 'style/text';

import InputField, {INPUT_THEME_GREY, INPUT_KEYBOARDTYPE_NUMBER, INPUT_ALIGN_CENTER} from 'component-input/inputField';


/**
 * @protocol ArtistRatioBar
 * @date 2019/03/18
 * @brief 아티스트 비율 표시 바
 */
export default class ArtistRatioBar extends Component {
    constructor(props) {
        super(props);

        this.input = 'input_ratio';     // 입력필드 ref
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container_title}>
                    <Text style={[TextStyle.default, TextStyle.weigth_medium, TextStyle.size_16, TextStyle.color_niceblue2, TextStyle.align_left]}>
                        {this.props.title}
                    </Text>
                </View>
                <View style={styles.container_input}>
                    <InputField 
                        id={this.input}
                        ref={this.input}
                        theme={INPUT_THEME_GREY}
                        keyboardType={INPUT_KEYBOARDTYPE_NUMBER}
                        textAlign={INPUT_ALIGN_CENTER}
                        value={this.props.data.ratio}
                        editable={false}/>
                </View>
                <View style={styles.container_percent}>
                    <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_18, TextStyle.color_niceblue2, TextStyle.align_left]}>
                        %                                                                                                                                                                                                                     
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container_title: {
        justifyContent:'center',
    },
    container_input: {
        width: '22%',
    },
    container_percent: {
        justifyContent:'center',
    },
});