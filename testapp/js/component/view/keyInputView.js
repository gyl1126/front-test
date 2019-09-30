//
//  keyInputView.js
//  Split
//
//  Created by Mumakil on 2019. 4. 15..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

import SealButton from 'component-button/sealButton';
import PinInputFieldList from 'component-input/pinInputFieldList';

var screen = Dimensions.get('window');
//var screen = require('Dimensions').get('window');

/**
 * @protocol KeyInputView
 * @date 2019/04/15
 * @brief 키 입력 화면
 */
export default class KeyInputView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isSelectSeal: false,    // 도장 선택 했는지 체크
        }

        this.onSealPressed = this.onSealPressed.bind(this);
        this.onPinChanged = this.onPinChanged.bind(this);
    }

    /**
     * 도장 클릭시 호출
     */
    onSealPressed() {
        this.setState({isSelectSeal: true});
    }

    /**
     * 비밀번호 입력값 변경시 호출
     * @param pin1 1번째 자리 입력값
     * @param pin2 2번째 자리 입력값
     * @param pin3 3번째 자리 입력값
     * @param pin4 4번째 자리 입력값 
     */
    onPinChanged(pin1, pin2, pin3, pin4) {
        // 빈자리 있는지 체크
        if( pin1 != null && pin2 != null && pin3 != null && pin4 != null ) {
            if( this.props.methodComplete != null ) {
                this.props.methodComplete(pin1+pin2+pin3+pin4);
                this.setState({isSelectSeal: false});
                this.refs.pinInputField.setDisableFocus();
                this.refs.pinInputField.setClear();
                this.refs.sealButton.setClear();
            }
        }
    }

    /**
     * 도장 렌더링
     */
    renderSeal() {
        if( this.state.isSelectSeal ) {
            return  <View style={styles.container_seal}>
                        <Image 
                            style={styles.seal}
                            source={{uri:this.props.sealEnableURI}}>
                        </Image>
                        <Image 
                            style={styles.plus}
                            source={Images.Plus}>
                        </Image>
                    </View>
        }
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Text style={[styles.sealtitle, TextStyle.default, TextStyle.weigth_bold, TextStyle.size_20, TextStyle.color_niceblue2, TextStyle.align_center]}>
                    {this.props.sealTitle}
                </Text>
                <SealButton
                    ref='sealButton'
                    enableLognPress={false}
                    enableURI={this.props.sealEnableURI}
                    disableURI={this.props.sealDisableURI}
                    methodComplete={this.onSealPressed}/>
                <Text style={[styles.pintitle, TextStyle.default, TextStyle.weigth_bold, TextStyle.size_20, TextStyle.color_niceblue2, TextStyle.align_center]}>
                    {this.props.pinTitle}
                </Text>
                <View style={[styles.container_input, (this.state.isSelectSeal?{paddingLeft: 24,
                        paddingRight: 24}:{})]}>
                    {this.renderSeal()}
                    <View style={[styles.container_pininputfield, (this.state.isSelectSeal?{height: 46}:{})]}>
                        <PinInputFieldList
                            ref="pinInputField"
                            onTextChanged={this.onPinChanged}
                            editable={this.state.isSelectSeal}
                            stylepin={{backgroundColor: ColorStyle.White}}>
                        </PinInputFieldList>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    container_input: {
        flexDirection: 'row',
        width: screen.width,
        paddingLeft: 57,
        paddingRight: 57,
        alignItems: 'center',
    },
    container_seal: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    container_pininputfield: {
        flex: 1,
        height: 55,
    },
    sealtitle: {
        marginBottom: 35,
    },
    pintitle: {
        marginTop: 54,
        marginBottom: 35,
    },
    seal: {
        width: 61,
        height: 61,
    },
    plus: {
        marginLeft: 5,
        width: 25,
        height: 25,
    }
});