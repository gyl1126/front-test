//
//  addButton.js
//  Split
//
//  Created by Mumakil on 2019. 3. 5..
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
 * @protocol AddButton
 * @date 2019/03/05
 * @brief 추가 버튼
 */
export default class AddButton extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.props.method}>
                    <View style={styles.container_button}>
                        <View style={styles.container_space}/>
                        <View style={styles.container_title}>
                            <Text style={[TextStyle.default, TextStyle.weigth_medium, TextStyle.size_13, TextStyle.color_niceblue2]}>
                                {this.props.title}
                            </Text>
                        </View>
                        <View style={styles.container_plus}>
                            <Image style={styles.plus} 
                                source={Images.Plus}
                                resizeMode='contain'/>
                        </View>
                        <View style={styles.container_description}>
                            <Text style={[TextStyle.default, TextStyle.weigth_medium, TextStyle.size_10, TextStyle.color_niceblue2]}>
                                {this.props.description}
                            </Text>
                        </View>
                        <View style={styles.container_space}/>
                    </View>
                    
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        aspectRatio: 1/1,
    },
    container_button: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: ColorStyle.White,
    },
    container_title: {

    },
    container_plus: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_description: {

    },
    container_space: {
        height: 20,
    },
    button: {
        width: '100%',
        height: '100%',
    },
    plus: {
        height: '80%',
        aspectRatio: 1/1,
    },
});