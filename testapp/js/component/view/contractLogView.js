//
//  contractLogView.js
//  Split
//
//  Created by Mumakil on 2019. 3. 26..
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

import ContractLogBar from 'component-bar/contractLogBar';

var screen = Dimensions.get('window');
//var screen = require('Dimensions').get('window');

/**
 * @protocol ContractInfoView
 * @date 2019/03/13
 * @brief 계약 정보 화면 버튼
 */
export default class ContractLogView extends Component {
    constructor(props) {
        super(props);
        
    }

    renderUserList() {
        var textList = [];
        for( var i = 0; i < this.props.data.teamList.length; i++ ) {
            var str;
            if( i == 0 )
                str = '발신자 : ';
            else
                str = '수신자 : ';
            str += this.props.data.teamList[i].name;
            textList.push(<Text 
                key={'user'+i}
                style={[styles.user, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_17, TextStyle.color_niceblue2, TextStyle.align_left]}>
                {str}
            </Text>);
        }
        return textList;
    }

    renderLogList() {
        var logList = [];
        for( var i = 0; i < 1; i++ ) {
            logList.push(<ContractLogBar
                key={'logbar'+i}/>);
        }
        return logList;
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.container_user}>
                    {this.renderUserList()}
                </View>
                <View style={styles.container_log}>
                    {this.renderLogList()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom : 22,
    },
    container_user: {
        marginTop: 22,
        marginBottom: 15,
    },
    container_log: {

    },
    user: {
        marginLeft: 17,
        marginBottom: 10,
    },
});