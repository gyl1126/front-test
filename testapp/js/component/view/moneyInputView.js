//
//  moneyInputView.js
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
    Image,
    Dimensions,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

import MySplitWalletView from 'component-view/mySplitWalletView';
import NumberInputView from 'component-view/numberInputView';
import SplitUtil from 'etc/splitUtil';

var screen = Dimensions.get('window');
//var screen = require('Dimensions').get('window');

/**
 * @protocol MoneyInputView
 * @date 2019/04/19
 * @brief 금액 입력 화면
 */
export default class MoneyInputView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            inputValue: '',     // 송금 입력 금액
        }

        this.inputView = 'inputView';

        this.initialize = this.initialize.bind(this);
        this.onInputChanged = this.onInputChanged.bind(this);
        this.onTransferAllPressed = this.onTransferAllPressed.bind(this);
    }

    initialize() {
        this.setState({ inputValue: '' });
        this.refs.inputView.initialize();
    }
    
    /**
     * 송금 금액 입력시 호출
     * @param value 입력 금액
     */
    onInputChanged(value) {
        this.setState({ inputValue: value });

        if( this.props.method != null )
            this.props.method(value);
    }

    /**
     * 모두 송금 버튼 클릭시 호출
     */
    onTransferAllPressed() {
        if( this.props.methodAll != null )
            this.props.methodAll(this.props.balance);
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <MySplitWalletView
                    balance={SplitUtil.numberWithCommas(this.props.balance)}
                    value={SplitUtil.numberWithCommas(Number(this.state.inputValue))}
                    methodAll={this.onTransferAllPressed}/>
                <View style={styles.container_numberpad}>
                    <NumberInputView
                        ref={this.inputView}
                        method={this.onInputChanged}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    container_numberpad: {
        flex: 1,
    }
});