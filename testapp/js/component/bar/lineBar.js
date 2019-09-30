//
//  lineBar.js
//  Split
//
//  Created by Mumakil on 2019. 3. 14..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import ColorStyle from 'style/color';


/**
 * @protocol LineBar
 * @date 2019/03/14
 * @brief 구분선 바
 */
export default class LineBar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: ColorStyle.LightPeriwinkle2,
      height: 1,
  },
});