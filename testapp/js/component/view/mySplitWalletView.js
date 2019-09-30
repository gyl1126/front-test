//
//  mySplitWalletView.js
//  Split
//
//  Created by Mumakil on 2019. 4. 19..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

/**
 * @protocol MySplitWalletView
 * @date 2019/04/19
 * @brief 나의 월렛 화면
 */
export default class MySplitWalletView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isInput: false,     // 입력 여부
        }

        this.onTransferAllPressed = this.onTransferAllPressed.bind(this);
    }
    
    componentWillReceiveProps(props) {
        if( props.value.length > 0 && Number(props.value) != 0 )
            this.setState({ isInput: true});
        else
            this.setState({ isInput: false});
    }

    /**
     * 모두 송금 버튼 클릭시 호출
     */
    onTransferAllPressed() {
        if( this.props.methodAll != null )
            this.props.methodAll();
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.container_top}>
                    <Text style={[styles.title, TextStyle.default, TextStyle.weigth_bold, TextStyle.size_20, TextStyle.color_niceblue, TextStyle.align_left]}>
                        {(this.state.isInput?'송금 금액':'내 SPLIT 계좌')}
                    </Text>
                    {
                        (this.state.isInput?
                            <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_15, TextStyle.color_niceblue, TextStyle.align_right]}>
                                {'송금 가능 금액 : ' + this.props.balance + '원'}
                            </Text>:
                            <TouchableOpacity
                                style={styles.buttonall}
                                onPress={this.onTransferAllPressed}>
                                <Text style={[TextStyle.default, TextStyle.weigth_medium, TextStyle.size_15, TextStyle.color_white, TextStyle.align_center]}>
                                    전액송금
                                </Text>
                            </TouchableOpacity>)
                    }
                </View>
                <View style={styles.line}/>
                <View style={styles.container_money}>
                    <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_30, TextStyle.color_niceblue, TextStyle.align_center]}>
                        {(this.state.isInput?this.props.value:this.props.balance) + '원'}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: ColorStyle.White,
        width: '100%',
        height: 120,
        borderRadius: 12,
    },
    container_top: {
        flexDirection: 'row',
        flex: .4,
        alignItems: 'center',
    },
    container_money: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: .6,
    },
    title: {
        flex: 1,
        marginLeft: 12,
    },
    line: {
        width: '100%',
        height: 2,
        backgroundColor: ColorStyle.LightGreyBlue,
    },
    buttonall: {
        backgroundColor: ColorStyle.LightGreyBlue,
        borderRadius: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
        paddingBottom: 8,
        marginRight: 12,
    }
});