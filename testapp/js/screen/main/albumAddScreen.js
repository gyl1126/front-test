//
//  albumAddScreen.js
//  Split
//
//  Created by Mumakil on 2019. 3. 4..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

import LogoBar from 'component-bar/logoBar';
import { getStatusBarHeight } from 'react-native-status-bar-height';

/**
 * @protocol AlbumAddScreen
 * @date 2019/03/04
 * @brief 정산 앨범 등록 화면
 */
export default class AlbumAddScreen extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#4F6D7A"/>
        <LogoBar/>
        <View style={styles.container_title}>
          <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_30, TextStyle.color_niceblue, TextStyle.align_left]}>정산 앨범 등록</Text>
        </View>
        <View style={styles.container_add}>
          <TouchableOpacity
            activeOpacity = { .5 }
            onPress={() => this.props.navigation.navigate('RegAlbumInfo')}>
            <View style={styles.container_addicon}>
              <Text style={[styles.addicon, TextStyle.default, TextStyle.weight_thin, TextStyle.size_170, TextStyle.color_grey69]}>
                +
              </Text>
            </View>
            <View style={styles.container_addtitle}>
              <Text style={[TextStyle.default, TextStyle.weigth_medium, TextStyle.size_25, TextStyle.color_greya0]}>
                정산 앨범 추가하기
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorStyle.GreyF7,
  },
  container_logo: {
    top:0,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: ColorStyle.NiceBlue2,
  },
  container_title: {
    marginTop: 40,
    marginLeft: 33,
  },
  container_add: {
    marginTop: 31,
    marginLeft: 29,
    marginRight: -20,
    backgroundColor: ColorStyle.White,
    height: 380,
    borderRadius:20,
    borderWidth:1,
    borderColor: ColorStyle.White,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
    shadowRadius: 10,
    elevation: 1,
  },
  container_addicon: {
    marginTop: 44,
    marginLeft: 49,
    height: 229,
    backgroundColor: ColorStyle.GreyDD,
    aspectRatio: 1/1,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  container_addtitle: {
    marginLeft: 49,
    height: 66,
    width: 229,
    backgroundColor: ColorStyle.GreyF8,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  addicon: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
  },
});