//
//  signatureButton.js
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
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

export const ButtonType = {
    VIEW: 0,
    SUBMIT: 1,
    DISABLE: 2,
}

/**
 * @protocol SignatureButton
 * @date 2019/03/19
 * @brief 서명 입력 버튼
 */
export default class SignatureButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }

        this.onButtonPressed = this.onButtonPressed.bind(this);
    }

    /**
     * 버튼 클릭시 호출
     */
    onButtonPressed() {
        this.props.method(this.props.id, this.props.buttonType);
    }

    /**
     * 버튼 타입에 따른 스타일 반환
     */
    getButtonStyle() {
        switch( this.props.buttonType ) {
            case ButtonType.VIEW:
                return styles.button_view;
            case ButtonType.SUBMIT:
                return styles.button_submit;
            case ButtonType.DISABLE:
                return styles.button_disable;
        }
    }

    /**
     * 버튼 타입에 따른 텍스트 스타일 반환
     */
    getButtonTextStyle() {
        switch( this.props.buttonType ) {
            case ButtonType.VIEW:
                return TextStyle.color_niceblue2;
            case ButtonType.SUBMIT:
            case ButtonType.DISABLE:
                return TextStyle.color_white;
        }
    }

    /**
     * 버튼 타입에 따른 텍스트 반환
     */
    getButtonText() {
        switch( this.props.buttonType ) {
            case ButtonType.VIEW:
                return '서명이력\n보기';
            case ButtonType.SUBMIT:
            case ButtonType.DISABLE:
                return '전자서명\n하기'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container_user}>
                    <View style={styles.container_name}>
                        <Text style={[styles.name, TextStyle.default, TextStyle.size_20, TextStyle.weigth_bold, TextStyle.color_niceblue2, TextStyle.align_left, this.props.styleText]}
                            numberOfLines={1}
                            ellipsizeMode='tail'>
                            {this.props.name}
                        </Text>
                        <View style={styles.container_signature}>
                            <ImageBackground 
                                style={styles.signature}
                                source={this.props.isStamp?Images.StampTestEnableURI:null}
                                // FIXME: 이미지 uri로 교체 필요
                                // source={{uri:Images.StampTestEnableURI}}
                                opacity={1.0}
                                resizeMode='stretch'>
                                <Text style={[styles.signaturetext, TextStyle.default, TextStyle.size_20, TextStyle.weigth_bold, TextStyle.color_niceblue2, TextStyle.align_center, this.props.styleText]}>
                                    (인)
                                </Text>
                            </ImageBackground>
                        </View>
                    </View>
                    <View style={styles.underline}/>
                </View>
                <TouchableOpacity
                    style={[this.getButtonStyle(), this.props.styleButton]}
                    onPress={this.onButtonPressed}>
                    <Text style={[TextStyle.default, TextStyle.size_12, TextStyle.weigth_bold, TextStyle.align_center, this.getButtonTextStyle(), this.props.styleText]}>
                        {this.getButtonText()}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: 37,
    },
    container_user: {
        flex:1,
        justifyContent: 'space-between',
        flexDirection: 'column',
        right: 10,
    },
    container_name: {
        flex:1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    container_signature: {
        width: 60,
        height: 60,
    },
    button_view: {
        backgroundColor: ColorStyle.White,
        width: 63,
        paddingRight: 0,
        borderWidth: 2.5,
        borderColor: ColorStyle.NiceBlue2,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_submit: {
        backgroundColor: ColorStyle.NiceBlue2,
        width: 63,
        paddingRight: 0,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_disable: {
        backgroundColor: ColorStyle.GreyDD,
        width: 63,
        paddingRight: 0,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    underline: {
        height: 1,
        backgroundColor: ColorStyle.NiceBlue2,
    },
    name: {
        width: 75,
        marginLeft: 12,
    },
    signaturetext: {
        
    },
    signature: {
        position: 'absolute',
        left:0,
        right: 0,
        top: 0,
        bottom: 0,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
});