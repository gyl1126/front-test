//
//  bankUserNameCell.js
//  Split
//
//  Created by Mumakil on 2019. 4. 23..
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
 * @protocol BankUserNameCell
 * @date 2019/04/23
 * @brief 은행 계좌 이름 셀
 */
export default class BankUserNameCell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }

        this.onCellPressed = this.onCellPressed.bind(this);
    }

    /**
     * 셀 클릭시 호출
     */
    onCellPressed() {
        if( this.props.method != null )
            this.props.method(this.props.data.id);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onCellPressed}>
                    <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_17, TextStyle.color_greyishbrown, TextStyle.align_left]}
                        numberOfLines={1}
                        ellipsizeMode='tail'>
                        {this.props.data.userName}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 88,
    },
    button: {
        height: 79,
        backgroundColor: ColorStyle.White,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 32,
    },
});