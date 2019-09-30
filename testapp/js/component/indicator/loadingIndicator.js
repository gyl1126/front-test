//
//  loadingIndicator.js
//  Split
//
//  Created by Mumakil on 2019. 4. 24..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Text,
    ActivityIndicator,
    Modal,
} from 'react-native';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';


/**
 * @protocol LoadingIndicator
 * @date 2019/04/24
 * @brief 로딩 인디케이터
 */
export default class LoadingIndicator extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            opacityValue: new Animated.Value(0),    // 투명도
            isShow: false,  // 표시 여부
            message: this.props.message,    // 메시지
        }

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    componentWillReceiveProps(props) {
        // visible 변경에 따른 표시/해제 설정
        if( props.visible && !this.state.isShow )
            this.show();

        if( !props.visible && this.state.isShow )
            this.hide();

        this.setState({message: props.message});
    }
    /**
     * 표시
     */
    show() {
        // 표시 상태 변경 후, 애니메이션
        this.setState({isShow: true});

        Animated.timing(
            this.state.opacityValue,
            {
                toValue: 1,
                duration: 200,
            }).start();  
    }

    /**
     * 해제
     */
    hide() {
        // 애니메이션 이후, 표시 상태 변경
        Animated.timing(
            this.state.opacityValue,
            {
                toValue: 0,
                duration: 200,
            }).start(()=>{
                this.setState({isShow: false});
            });
    }
    
    render() {
        return  <Modal
                    animationType='fade'
                    supportedOrientations={['portrait']}
                    transparent
                    visible={this.state.isShow}>
                    <Animated.View
                        style={[styles.container, {
                        opacity: this.state.opacityValue,
                        }]}>
                        <View style={[styles.container_background, this.props.style]}>
                            {
                                (this.state.message!=null?
                                    <View style={styles.container_content}>
                                        <View style={styles.container_indicator}>
                                            <ActivityIndicator 
                                                size="large" 
                                                animating={true}
                                                color={ColorStyle.NiceBlue2} />
                                        </View>
                                        <View style={styles.container_message}>
                                            <Text style={[TextStyle.default, TextStyle.weigth_medium, TextStyle.size_15, TextStyle.color_browngreytwo, TextStyle.align_left]}>
                                                {this.state.message}
                                            </Text>
                                        </View>
                                    </View>
                                    :<View style={styles.container_content}>
                                        <View style={styles.container_indicator}>
                                            <ActivityIndicator 
                                                size="large" 
                                                animating={true}
                                                color={ColorStyle.NiceBlue2} />
                                        </View>
                                    </View>
                                )
                            }
                        </View>
                    </Animated.View>
                </Modal>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    container_background: {
        backgroundColor: ColorStyle.Black75,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_content: {
        backgroundColor: ColorStyle.White,
        height: 113,
        borderRadius: 10,
        flexDirection: 'row',
    },
    container_indicator: {
        height: '100%',
        aspectRatio: 1/1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container_message: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
    }
});