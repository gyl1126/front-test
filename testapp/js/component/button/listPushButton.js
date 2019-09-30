//
//  listPushButton.js
//  Split
//
//  Created by Mumakil on 2019. 3. 7..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

/**
 * @protocol ListPushButton
 * @date 2019/03/05
 * @brief 리스트 항목 추가 버튼
 */
export default class ListPushButton extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                <TouchableOpacity
                    style={styles.container_button}
                    onPress={this.props.method}>
                    <Image style={styles.plus}
                        source={Images.Plus}/>
                    <Text style={[styles.title, TextStyle.default, TextStyle.weigth_bold, TextStyle.size_20, TextStyle.color_niceblue2, TextStyle.align_left]}>
                        {this.props.title}
                    </Text>      
                    <Image style={styles.arrow}
                        source={Images.ArrowBlue}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: ColorStyle.White,
    },
    container_button: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    plus: {
        width: 19,
        height: 19,
        marginLeft: 40,
    },
    arrow: {
        width: 11,
        height: 20,
        marginRight: 38,
    },
    title: {
        flex: 1,
        marginLeft: 12,
    }
});