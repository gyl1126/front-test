//
//  termsGroupBar.js
//  Split
//
//  Created by Mumakil on 2019. 1. 21..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';

/**
 * @protocol TermsBar
 * @date 2019/01/21
 * @brief 약관 바
 */
export default class TermsBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={this.props.method}>
                    <Text
                        style={[styles.text, TextStyle.default, TextStyle.size_13, TextStyle.weigth_medium, TextStyle.color_brownishgrey]}>
                        {this.props.title}
                    </Text>
                    <Image 
                        style={styles.image}
                        source={Images.Arrow}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    height:25,
    width:'100%',
  },
  button: {
    height:'100%',
    alignItems:'flex-start',
    justifyContent: 'center',
  },
  text: {
    position:'absolute',
    left:"23.4%",
  },
  image: {
    position:'absolute',
    right:"12%",
  },
});