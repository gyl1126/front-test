//
//  homeNavigationBar.js
//  Split
//
//  Created by Mumakil on 2019. 4. 23..
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
import ColorStyle from 'style/color';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const HOMENAVIGATIONBAR_THEME_BLUE    = 'blue';
export const HOMENAVIGATIONBAR_THEME_GREY    = 'grey';

/**
 * @protocol HomeNavigationBar
 * @date 2019/04/23
 * @brief 네비게이션 바
 */
export default class HomeNavigationBar extends Component {
    constructor(props) {
        super(props);
    }
    
    /**
     * 테마별 배경색 반환
     * @returns 색상 코드
     */
    getBackgroundColor() {
        switch( this.props.theme ) {
            case HOMENAVIGATIONBAR_THEME_GREY:
                return ColorStyle.GreyF8;

            case HOMENAVIGATIONBAR_THEME_BLUE:
                return ColorStyle.NiceBlue2;
        }

        return ColorStyle.GreyF8;
    }

    /**
     * 테마별 타이틀 문구색 반환
     * @returns 색상 코드
     */
    getTitleColor() {
        switch( this.props.theme ) {
            case HOMENAVIGATIONBAR_THEME_GREY:
                return TextStyle.color_niceblue2;

            case HOMENAVIGATIONBAR_THEME_BLUE:
                return TextStyle.color_white;
        }

        return TextStyle.color_niceblue2;
    }

    /**
     * 테마별 타이틀 정렬 반환
     * @returns 정렬
     */
    getTitleAlign() {
        switch( this.props.theme ) {
            case HOMENAVIGATIONBAR_THEME_GREY:
                return TextStyle.align_left;

            case HOMENAVIGATIONBAR_THEME_BLUE:
                return TextStyle.align_center;
        }

        return TextStyle.align_left;
    }

    /**
     * 테마별 타이틀 폰트 사이즈 반환
     * @returns 폰트 사이즈
     */
    getTitleSize() {
        switch( this.props.theme ) {
            case HOMENAVIGATIONBAR_THEME_GREY:
                return TextStyle.size_21;

            case HOMENAVIGATIONBAR_THEME_BLUE:
                return TextStyle.size_26;
        }

        return TextStyle.size_21;
    }

    /**
     * 테마별 뒤로가기 버튼 이미지 반환
     * @returns 버튼 이미지
     */
    getBackImage() {
        switch( this.props.theme ) {
            case HOMENAVIGATIONBAR_THEME_GREY:
                return Images.BtnBackBlue;

            case HOMENAVIGATIONBAR_THEME_BLUE:
                return Images.BtnBackWhite;
        }

        return Image.BtnBack;
    }

    render() {
        return (
            <View style={[styles.container, {backgroundColor: this.getBackgroundColor()}]}>
                {
                    (this.props.methodBack!=null?
                    <TouchableOpacity 
                        style={styles.backbuttn}
                        onPress={this.props.methodBack}>
                        <Image 
                            style={styles.backimage}
                            source={this.getBackImage()}/>
                    </TouchableOpacity>:
                    null)
                }
                <Text style={[styles.title, TextStyle.default, TextStyle.weigth_bold, 
                    (this.props.methodBack!=null?{marginRight: 52,}:{marginRight: 0,}),
                    this.getTitleColor(), this.getTitleAlign(), this.getTitleSize()]}>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorStyle.GreyF8,
        marginTop:getStatusBarHeight(),
        height:50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backbuttn: {
        left:0,
        bottom:0,
        width: 52,
        height:'100%',
        alignItems: 'center',
        justifyContent:'center',
    },
    title: {
        
        flex: 1,
    }
});