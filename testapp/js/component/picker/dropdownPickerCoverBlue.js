//
//  dropdownPickerCoverBlue.js
//  Split
//
//  Created by Mumakil on 2019. 3. 11..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

/**
 * @protocol DropdownPickerCoverBlue
 * @date 2019/03/11
 * @brief 드랍다운 형식의 피커 커버 이미지
 */
export default class DropdownPickerCoverBlue extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.text_title, TextStyle.default, TextStyle.size_17, TextStyle.weight_medium, TextStyle.color_niceblue2, TextStyle.align_left]}>
                    {this.props.title}
                </Text>
                <Image style={styles.image_drop} source={Images.DropdownDown}>
                </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      backgroundColor: ColorStyle.GreyEF,
  },
  text_title: {
      paddingLeft: 10,
  },
  image_drop: {
    position: 'absolute',
    right: 10,
    top: 10,
    bottom: 10,
    width: 18,
    height: 18,
  }
});