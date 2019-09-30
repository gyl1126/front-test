//
//  regidentNumberInputField.js
//  Split
//
//  Created by Mumakil on 2019. 1. 29..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';
import Regex from 'etc/regex';

/**
 * @protocol RegidentNumberInputField
 * @date 2019/01/29
 * @brief 주민등록번호 입력 필드
 */
export default class RegidentNumberInputField extends Component {
    constructor(props) {
        super(props);
        this.onBirthChange = this.onBirthChange.bind(this);
        this.onGenderChange = this.onGenderChange.bind(this)
    }

    onBirthChange = event => {
        console.log(event.nativeEvent.text);
        console.log(Regex.validateNumber(event.nativeEvent.text));
        this.props.method(this.props.bId, event.nativeEvent.text);
    }

    onGenderChange = event => {
        console.log(event.nativeEvent.text);
        this.props.method(this.props.gId, event.nativeEvent.text);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.container_title, TextStyle.default, TextStyle.weigth_bold, TextStyle.size_18, TextStyle.color_niceblue2, TextStyle.align_left]}>
                    {this.props.title}
                </Text>
                <View style={styles.container_rowlist}>
                    <View style={styles.container_left}>
                        <TextInput style={[styles.container_input, TextStyle.size_18, TextStyle.color_grey38, TextStyle.weight_light]}
                            placeholder={this.props.placeholder}
                            keyboardType='numeric'
                            maxLength={6}
                            onChange={this.onBirthChange}>
                        </TextInput>
                    </View>
                    <View style={styles.container_center}>
                        <Image source={Images.HorizonLine}/>
                    </View>
                    <View style={styles.container_right}>
                        <View style={styles.container_rightcontent}>
                            <TextInput style={[styles.container_inputone, TextStyle.size_18, TextStyle.color_grey38, TextStyle.weight_light]}
                                placeholder={this.props.placeholder}
                                keyboardType='numeric'
                                maxLength={1}
                                onChange={this.onGenderChange}>
                            </TextInput>
                        </View>
                        <View style={styles.container_rightcontentimage}>
                            <Image source={Images.Asterisk}/>
                        </View>
                        <View style={styles.container_rightcontentimage}>
                            <Image source={Images.Asterisk}/>
                        </View>
                        <View style={styles.container_rightcontentimage}>
                            <Image source={Images.Asterisk}/>
                        </View>
                        <View style={styles.container_rightcontentimage}>
                            <Image source={Images.Asterisk}/>
                        </View>
                        <View style={styles.container_rightcontentimage}>
                            <Image source={Images.Asterisk}/>
                        </View>
                        <View style={styles.container_rightcontentimage}>
                            <Image source={Images.Asterisk}/>
                        </View>
                    </View>
                </View> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      height:63,
      
    },
    container_rowlist: {
        marginTop:5,
        flex: 1,
        flexDirection: 'row',
    },
    container_left: {
        height:33,
        flex: .4,
        backgroundColor:'red',
    },
    container_center: {
        height:33,
        width:34,
        alignItems:'center',
        justifyContent: 'center',
    },
    container_right: {
        height:33,
        flex: .6,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
    },
    container_rightcontent: {
        flex: .14,
    },
    container_rightcontentimage: {
        flex: .14,
        alignItems:'center',
        justifyContent: 'center',
    },
    container_input: {
        height:'100%',
        backgroundColor:ColorStyle.GreyEF,
        paddingLeft:10,
        paddingRight:10,
        paddingTop: -10,
        paddingBottom: -10,
    },
    container_inputone: {
        height:'100%',
        backgroundColor:ColorStyle.GreyEF,
        textAlign: 'center',
        paddingTop: -10,
        paddingBottom: -10,
    },
});