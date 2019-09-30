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
import SendSMS from 'react-native-sms'

import { getStatusBarHeight } from 'react-native-status-bar-height';

var screen = Dimensions.get('window');
//var screen = require('Dimensions').get('window');

/**
 * @protocol PopupView
 * @date 2019/03/21
 * @brief 팝업 화면
 */
export default class AlbumResultPopupView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            opacityValue: new Animated.Value(0),
        }

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.onButtonPressed = this.onButtonPressed.bind(this);
        this.onClosePressed = this.onClosePressed.bind(this);
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
        SendSMS.send({
            body: this.props.message,
            successTypes: ['sent', 'queued'],
            allowAndroidSendWithoutReadPermission: true
        }, (completed, cancelled, error) => {
            console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);
        });
    }

    onClosePressed() {
        this.hide();
    }

    render() {
        return (
            <Animated.View
                style={[styles.container, {
                opacity: this.state.opacityValue,
            }]}>
                <View style={[styles.container_background, this.props.style]}>
                    <Text style={[styles.title, TextStyle.default, TextStyle.color_peacockblue, TextStyle.weigth_bold, TextStyle.size_30, TextStyle.align_center]}>
                        {this.props.title}
                    </Text>
                    <Image style={styles.logo}
                        source={Images.BankList[3]}/>
                    <Text style={[styles.account, TextStyle.default, TextStyle.color_niceblue2, TextStyle.weigth_bold, TextStyle.size_20, TextStyle.align_center]}>
                        {this.props.account}
                    </Text>
                    <Text style={[styles.description, TextStyle.default, TextStyle.color_browngreytwo, TextStyle.weigth_medium, TextStyle.size_14, TextStyle.align_center]}>
                        {this.props.description}
                    </Text>
                    <View style={styles.container_message}>
                    <Text style={[styles.message, TextStyle.default, TextStyle.color_browngreytwo, TextStyle.weigth_medium, TextStyle.size_14, TextStyle.align_left]}>
                        {this.props.message}
                    </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onButtonPressed}>
                        <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_20, TextStyle.align_center]}>
                            {this.props.buttonTitle}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.closebutton}
                        onPress={this.onClosePressed}>
                        <Image 
                            source={Images.BtnClose}/>
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
        backgroundColor: ColorStyle.GreyF7,
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
        marginTop: 15,
        width: 120,
        height: 120,
    },
    title: {
        marginTop: 54 + getStatusBarHeight(),
    },
    account: {
        marginTop:30,
    },
    description: {
        marginTop: 24,
    },
    message: {

    },
    button: {
        marginTop: 47,
        backgroundColor: ColorStyle.LightGreyBlue,
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container_message: {
        marginTop: 12,
        width: '70%',
        height: 140,
        backgroundColor: ColorStyle.White,
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
    },
    closebutton: {
        position: 'absolute',
        top: 0 + getStatusBarHeight(),
        right: 0,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
});