//
//  sealButton.js
//  Split
//
//  Created by Mumakil on 2019. 4. 16..
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

/**
 * @protocol SealButton
 * @date 2019/04/16
 * @brief 도장 입력 화면
 */
export default class SealButton extends Component {
    constructor(props) {
        super(props);

        this.isLongPress = false;   // 롱 프레스 체크

        this.state = {
            isSeal: false,  // 도장 눌렀는지 여부
        }

        this.onSignaturePressed = this.onSignaturePressed.bind(this);
        this.onSignaturePressedIn = this.onSignaturePressedIn.bind(this);
        this.onSignaturePressedOut = this.onSignaturePressedOut.bind(this);
    }

    /**
     * 초기화 한다.
     */
    setClear() {
        this.setState({isSeal: false});
    }

    /**
     * 도장 눌렀을 때 호출
     */
    onSignaturePressed() {
        this.isLongPress = true;
    }

    /**
     * 도장 누르기 시작했을 때 호출
     */
    onSignaturePressedIn() {
        this.isLongPress = false;
    }

    /**
     * 도장 터치가 종료되었을 때 호출
     */
    onSignaturePressedOut() {
        var isPress = false;
        var timer = 1000;

        // 롱 프레스 인식 시에는 타이밍 달리 표시
        if( this.props.enableLongPress ) {
            if( this.isLongPress ) {
                this.isLongPress = false;
                isPress = true;
            }
        }
        else {
            isPress = true;
            timer = 1;
        }

        if( isPress ) {
            this.setState({isSeal:true});
            var that = this;
            setTimeout(function(){
                if( that.props.methodComplete != null )
                    that.props.methodComplete();
            }, timer);
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onLongPress={this.onSignaturePressed}
                    onPressIn={this.onSignaturePressedIn}
                    onPressOut={this.onSignaturePressedOut}>
                    <ImageBackground
                        style={styles.prop} 
                        source={Images.Prop}>
                        <Image
                            style={styles.signature}
                            resizeMode='contain'
                            source={{uri:(this.state.isSeal?
                                (this.props.enableURI?this.props.enableURI:' '):
                                (this.props.disableURI?this.props.disableURI:' '))}}/>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
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
        resizeMode: 'contain',
    }
});