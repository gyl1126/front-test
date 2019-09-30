//
//  accountNotifyButton.js
//  Split
//
//  Created by Mumakil on 2019. 4. 17..
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

/**
 * @protocol AccountNotifyButton
 * @date 2019/04/17
 * @brief 계좌 sms 알림 버튼
 */
export default class AccountNotifyButton extends Component {
    constructor(props) {
        super(props);
        
    }

    /**
     * 버튼 클릭시 호출
     */
    onButtonPressed() {
        if( this.props.method != null )
            this.props.method(this.props.id);
    }

    render() {
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                <View style={styles.container_account}>
                    <View style={styles.container_left}/>
                    <View style={styles.container_right}>
                        <View style={styles.container_righttop}>
                            <View style={styles.verticalline}/>
                        </View>
                        <View style={styles.container_rightbottom}>
                            <View style={styles.horizontalline}/>
                        </View>
                    </View>
                    <Text style={[styles.account, TextStyle.default, TextStyle.size_15, TextStyle.weight_thin, TextStyle.color_browngreytwo, TextStyle.align_left]}
                        numberOfLines={1}
                        ellipsizeMode='tail'>
                        {this.props.account}
                    </Text>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => { this.onButtonPressed() }}>
                        <Text
                            style={[TextStyle.default, TextStyle.size_14, TextStyle.weigth_bold, TextStyle.color_white, TextStyle.align_center]}>
                            문자 전송
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container_info}>
                    <Image style={styles.question}
                        source={Images.IconQuestion}/>
                    <Text style={[TextStyle.default, TextStyle.weight_thin, TextStyle.size_11, TextStyle.color_browngreytwo, TextStyle.align_left]}>
                        {this.props.description}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'column',
    },
    container_account: {
        height: 38,
        flexDirection: 'row',
        alignItems: 'center',
    },
    container_info: {
        flexDirection: 'row',
        paddingLeft: 9,
        alignItems: 'center',
    },
    container_left: {
        height: '100%',
        width: 9,
    },
    container_right: {
        height: '100%',
        width: 15,
    },
    container_righttop: {
        width: '100%',
        height: '50%',
    },
    container_rightbottom: {
        width: '100%',
        height: '50%',
    },
    verticalline: {
        width: 1,
        height: '100%',
        backgroundColor: ColorStyle.BrownGreyTwo,
        opacity: 0.3,
    },
    horizontalline: {
        height: 1,
        width: '100%',
        backgroundColor: ColorStyle.BrownGreyTwo,
        opacity: 0.3,
    },
    account: {
        marginLeft: 5,
        marginRight: 5,
    },
    button: {
        backgroundColor: ColorStyle.LightGreyBlue,
        borderRadius: 4,   
        height: 24,
        paddingLeft: 5,
        paddingRight: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    question: {
        width: 11,
        height: 11,
        marginRight: 3,
    }
});