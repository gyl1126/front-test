//
//  logoBar.js
//  Split
//
//  Created by Mumakil on 2019. 3. 4..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
} from 'react-native';
import ColorStyle from 'style/color';
import Images from 'asset-image';

import { getStatusBarHeight } from 'react-native-status-bar-height';

/**
 * @protocol LogoBar
 * @date 2019/03/04
 * @brief 로고 이미지 바
 */
export default class LogoBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={[styles.container, {height: getStatusBarHeight()+60}]}>
                <Image source={Images.Logo}
                    style={[styles.logo]}
                    resizeMode='contain'/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: ColorStyle.NiceBlue2,
      alignItems:'center',
      justifyContent: 'center',
  },
  logo: {
      position: 'absolute',
      width: 130,
      bottom: 0,
  },
});