//
//  completePopupView.js
//  Split
//
//  Created by Mumakil on 2019. 3. 26..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

import { getStatusBarHeight } from 'react-native-status-bar-height';

var screen = Dimensions.get('window');
//var screen = require('Dimensions').get('window');

/**
 * @protocol PopupView
 * @date 2019/03/21
 * @brief 팝업 화면
 */
export default class CompletePopupView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            opacityValue: new Animated.Value(0),
        }

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.onButtonPressed = this.onButtonPressed.bind(this);
    }

    componentDidMount() {
        this.show();
    }

    show() {
        Animated.timing(
            this.state.opacityValue,
            {
                toValue: 1,
                duration: 300,
            }).start();  
    }

    hide() {
        Animated.timing(
            this.state.opacityValue,
            {
                toValue: 0,
                duration: 300,
            }).start(()=>{
                this.props.methodClose();
            });
    }

    onButtonPressed() {
        this.hide();
    }

    render() {
        return (
            <Animated.View
                style={[styles.container, {
                opacity: this.state.opacityValue,
            }]}>
                <View style={[styles.container_background, this.props.style]}>
                    <Image style={styles.logo}
                        source={Images.Logo}/>
                    <Text style={[styles.title, TextStyle.default, TextStyle.weigth_bold, TextStyle.size_30, TextStyle.align_center]}>
                        {this.props.title}
                    </Text>
                    <Text style={[styles.description, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_20, TextStyle.align_center]}>
                        {this.props.description}
                    </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onButtonPressed}>
                        <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_20, TextStyle.align_center]}>
                            {this.props.buttonTitle}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: screen.width,
        height: screen.height,
    },
    container_background: {
        backgroundColor: ColorStyle.PeacockBlue,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    container_subview: {
        backgroundColor: ColorStyle.White,
        width: screen.width - 66,
    },
    logo: {
        marginTop: 58 + getStatusBarHeight(),
        width: 120,
        height: 36,
    },
    title: {
        marginTop: 40,
    },
    description: {
        marginTop: 26,
    },
    button: {
        marginTop: 51,
        backgroundColor: ColorStyle.SoftBlue,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 6,
        paddingBottom: 4,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});