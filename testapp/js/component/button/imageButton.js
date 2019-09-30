//
//  imageButton.js
//  Split
//
//  Created by Mumakil on 2019. 3. 5..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

/**
 * @protocol ImageButton
 * @date 2019/03/05
 * @brief 이미지 버튼
 */
export default class ImageButton extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.props.method}>
                    <Image style={styles.image} 
                        source={this.props.source}
                        resizeMode='contain'/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        aspectRatio: 1/1,
    },
    button: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});