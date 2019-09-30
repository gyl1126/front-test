//
//  contractInfoView.js
//  Split
//
//  Created by Mumakil on 2019. 3. 13..
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
    Modal,
    Dimensions,
} from 'react-native';
import Images from 'asset-image';
import ColorStyle from 'style/color';

var screen = Dimensions.get('window');
//var screen = require('Dimensions').get('window');

/**
 * @protocol PopupView
 * @date 2019/03/21
 * @brief 팝업 화면
 */
export default class PopupView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            opacityValue: new Animated.Value(0),    // 투명도
        }

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.onClosePressed = this.onClosePressed.bind(this);
    }

    componentDidMount() {
        this.show();
    }

    /**
     * 표시
     */
    show() {
        Animated.timing(
            this.state.opacityValue,
            {
                toValue: 1,
                duration: 300,
            }).start();  
    }

    /**
     * 해제
     */
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

    /**
     * 닫기 버튼 클릭시 호출
     */
    onClosePressed() {
        this.hide();
    }

    render() {
        return (
            <Modal
                animationType='fade'
                supportedOrientations={['portrait']}
                transparent>
                <Animated.View
                    style={[styles.container, {
                    opacity: this.state.opacityValue,
                }]}>
                    <View style={[styles.container_background, this.props.style]}>
                        <View style={styles.container_subview}>
                            { this.props.subview }
                            <TouchableOpacity
                                style={styles.closebutton}
                                onPress={this.onClosePressed}>
                                <Image 
                                    source={Images.BtnClose}
                                    />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </Modal>
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
        backgroundColor: ColorStyle.Black75,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_subview: {
        backgroundColor: ColorStyle.White,
        width: screen.width - 66,
    },
    closebutton: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 57,
        height: 57,
        justifyContent: 'center',
        alignItems: 'center',
    },
});