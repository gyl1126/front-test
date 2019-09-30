//
//  listAddButton.js
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
    TouchableOpacity,
} from 'react-native';
import ColorStyle from 'style/color';
import TextStyle from 'style/text';

/**
 * @protocol ListAddButton
 * @date 2019/03/05
 * @brief 리스트 항목 추가 버튼
 */
export default class ListAddButton extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                <TouchableOpacity
                    style={styles.add}
                    onPress={this.props.method}>
                    <Text style={[TextStyle.default, TextStyle.weigth_medium, TextStyle.size_25]}>
                        {this.props.title}
                    </Text>      
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    add: {
        width:'100%',
        height:'100%',
        backgroundColor:ColorStyle.NiceBlue3,
        alignItems:'center',
        justifyContent: 'center',
    }
});