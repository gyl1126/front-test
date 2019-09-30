//
//  selCalculateScreen.js
//  Split
//
//  Created by Mumakil on 2019. 9. 17..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';
import ConstantString from 'constants/string';

import LogoBar from 'component-bar/logoBar';

/**
 * @protocol selCalculateScreen
 * @date 2019/09/17
 * @brief 정산 타입 선택 화면
 */
export default class selCalculateScreen extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;

        this.state = {
            
        };
    }
    
    render() {
        return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#4F6D7A"/>
            <LogoBar/>
            <View style={styles.container_title}>
                <View style={styles.container_name}>
                    <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_27, TextStyle.color_brownishgrey, TextStyle.align_center]}>
                        {ConstantString.UserName}
                    </Text>
                    <Text style={[TextStyle.default, TextStyle.size_27, TextStyle.color_brownishgrey, TextStyle.align_center]}>
                        님,
                    </Text>
                </View>
                <Text style={[TextStyle.default, TextStyle.size_27, TextStyle.color_brownishgrey, TextStyle.align_center]}>
                    안녕하세요
                </Text>
                <TouchableOpacity
                    activeOpacity = { .5 }
                    onPress={() => this.props.navigation.navigate('AlbumList')}>
                    <View style={styles.container_selalbum}>
                        <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_33, TextStyle.color_white, TextStyle.align_center]}>
                            앨범 정산
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity = { .5 }
                    onPress={() => this.props.navigation.navigate('PerfList')}>
                    <View style={styles.container_selperformance}>
                        <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_33, TextStyle.color_white, TextStyle.align_center]}>
                            공연 정산
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>);
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
    },
    container_name: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    container_selalbum: {
        marginTop: 23,
        marginLeft: 59,
        marginRight: 59,
        height: 94,
        backgroundColor: ColorStyle.NiceBlue2,
        alignItems: 'center',
        justifyContent: 'center', 
        borderRadius: 9,
    },
    container_selperformance: {
        marginTop: 39,
        marginLeft: 59,
        marginRight: 59,
        height: 94,
        backgroundColor: ColorStyle.Melon,
        alignItems: 'center',
        justifyContent: 'center', 
        borderRadius: 9,
    }
});