//
//  navigationBar.js
//  Split
//
//  Created by Mumakil on 2019. 1. 18..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image,
    Platform
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';
import { getStatusBarHeight } from 'react-native-status-bar-height';

/**
 * @protocol NavigationBar
 * @date 2019/01/18
 * @brief 네비게이션 바
 */
export default class NavigationBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.backbuttn}
                    onPress={this.props.method}>
                    <Image 
                        style={styles.backimage}
                        source={Images.BtnBack}/>
                    <Text
                        style={[styles.backtext, TextStyle.default, TextStyle.size_17, TextStyle.color_deepskyblue]}>
                        이전 화면
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorStyle.GreyF8,
    marginTop: Platform.OS === "ios"?getStatusBarHeight():0,
    height:50,
  },
  backbuttn: {
    left:0,
    bottom:0,
    width:"30%",
    height:'100%',
  },
  backimage: {
    bottom:13,
    position:'absolute',
    left:8,
  },
  backtext: {
    left:27,
    bottom:12,
    position:'absolute',
  }
});