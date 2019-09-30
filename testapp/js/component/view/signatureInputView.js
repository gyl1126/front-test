//
//  signatureInputView.js
//  Split
//
//  Created by Mumakil on 2019. 3. 22..
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

import PinInputFieldList from 'component-input/pinInputFieldList';

/**
 * @protocol SignatureInputView
 * @date 2019/03/22
 * @brief 서명 화면
 */
export default class SignatureInputView extends Component {
    constructor(props) {
        super(props);

        this.isLongPress = false;
        this.state = {
            isStamp: false,
        }

        this.onPinChanged = this.onPinChanged.bind(this);
        this.onSignaturePressed = this.onSignaturePressed.bind(this);
        this.onSignaturePressedIn = this.onSignaturePressedIn.bind(this);
        this.onSignaturePressedOut = this.onSignaturePressedOut.bind(this);
    }

    /**
     * 비밀번호 입력값 변경시 호출
     */
    onPinChanged(pin1, pin2, pin3, pin4) {
        if( pin1 == null || pin2 == null || pin3 == null || pin4 == null ) {

        }
        else {
            var input = pin1+pin2+pin3+pin4;
        }
    }

    onSignaturePressed() {
        // this.setState({isStamp:true});
        this.isLongPress = true;
    }

    onSignaturePressedIn() {
        this.isLongPress = false;
    }

    onSignaturePressedOut() {
        if( this.isLongPress ) {
            this.isLongPress = false;
            this.setState({isStamp:true});
            var that = this;
            setTimeout(function(){
                that.props.methodComplete();
            }, 1000);
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.title, TextStyle.default, TextStyle.weigth_bold, TextStyle.size_28, TextStyle.color_niceblue2, TextStyle.align_center]}>
                    전자서명하기
                </Text>
                <Text style={[styles.subtitle, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_15, TextStyle.color_niceblue2, TextStyle.align_center]}>
                    {'비밀번호 4자리 입력 후\n도장을 찍어주세요.'}
                </Text>
                <View style={styles.container_pininputfield}>
                    <PinInputFieldList
                        ref="pinInputField"
                        onTextChanged={this.onPinChanged}>
                    </PinInputFieldList>
                </View>
                <Text style={[styles.description, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_13, TextStyle.color_niceblue2, TextStyle.align_center]}>
                    도장을 2초이상 눌러주세요
                </Text>
                <View style={styles.container_signature}>
                    <TouchableOpacity
                        onLongPress={this.onSignaturePressed}
                        onPressIn={this.onSignaturePressedIn}
                        onPressOut={this.onSignaturePressedOut}>
                        <ImageBackground
                            style={styles.prop} 
                            source={Images.Prop}>
                            <Image
                                style={styles.signature}
                                source={(this.state.isStamp?Images.StampTestEnableURI:Images.StampTestDisableURI)}/>
                                {/* // FIXME: 파일 uri 로 변경 필요
                                source={{uri:Images.StampTestEnableURI}}/> */}
                        </ImageBackground>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    container_pininputfield: {
        marginTop: 32,
        paddingLeft: 24,
        paddingRight: 24,
        height: 55,
        width: '100%',
    },
    container_signature: {
        marginTop: 20,
        marginBottom: 71,
        width: 126,
        height: 126,
        backgroundColor: ColorStyle.White,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.29,
        shadowRadius: 6,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginTop: 46,
    },
    subtitle: {
        marginTop: 20,
    },
    description: {
        marginTop: 31,
    },
    prop: {
        width: 104,
        height: 104,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signature: {
        width: 70,
        height: 70,
    }
});