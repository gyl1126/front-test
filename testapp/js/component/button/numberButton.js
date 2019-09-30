//
//  numberButton.js
//  Split
//
//  Created by Mumakil on 2019. 4. 22..
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

/**
 * @protocol NumberButton
 * @date 2019/04/22
 * @brief 숫자 버튼
 */
export default class ImageButton extends Component {
    constructor(props) {
        super(props);

        this.onButtonPressed = this.onButtonPressed.bind(this);
    }

    /**
     * 버튼 클릭시 호출
     */
    onButtonPressed() {
        if( this.props.method != null )
            this.props.method(this.props.id);
    }
    
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onButtonPressed}>
                    <Text style={[TextStyle.default, TextStyle.weigth_medium, TextStyle.size_30, TextStyle.color_niceblue, TextStyle.align_center]}>
                        {this.props.title}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
    }
});