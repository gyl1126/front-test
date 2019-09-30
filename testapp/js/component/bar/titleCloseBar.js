//
//  titleCloseBar.js
//  Split
//
//  Created by Mumakil on 2019. 4. 11..
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
 * @protocol TitleCloseBar
 * @date 2019/04/11
 * @brief 제목 닫기버튼 바
 */
export default class TitleCloseBar extends Component {
    constructor(props) {
        super(props);

        this.onClosePressed = this.onClosePressed.bind(this);
    }

    /**
     * 닫기 버튼 클릭시 호출
     */
    onClosePressed() {
        if( this.props.methodClose != null ) 
            this.props.methodClose();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.title, TextStyle.default, TextStyle.size_30, TextStyle.weigth_bold, TextStyle.align_left]}>
                    {this.props.title}
                </Text>
                <TouchableOpacity
                    style={styles.closebutton}
                    onPress={this.onClosePressed}>
                    <Image 
                        source={Images.BtnCloseWhite}/>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: ColorStyle.NiceBlue2,
      height: 60,
      justifyContent: 'center',
  },
  title: {
      left: 16,
  },
  closebutton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
},
});