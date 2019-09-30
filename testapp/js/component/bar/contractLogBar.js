//
//  contractLogBar.js
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
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';


/**
 * @protocol ContractLogBar
 * @date 2019/03/26
 * @brief 계약 기록 표시 바
 */
export default class ContractLogBar extends Component {
    constructor(props) {
        super(props);

        this.input = 'input_ratio';
    }

    /**
     * date 문자열 반환
     * @param date 날짜
     * @return 날짜 문자열 
     */
    getDateString(date) {
        return date.toLocaleString();
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.icon}
                    source={Images.IconTime}/>
                <Text style={[styles.text, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_16, TextStyle.color_niceblue2, TextStyle.align_left]}
                    numberOfLines={1}
                    ellipsizeMode='tail'>
                    발신
                </Text>
                <Text style={[styles.date, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_16, TextStyle.color_niceblue2, TextStyle.align_left]}>
                    {this.getDateString(new Date())}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
    },
    icon: {
        width: 36,
        height: 36,
        marginLeft: 10,
    },
    text: {
        flex: 1,
        marginRight: 7,
        marginLeft: 10,
    },
    date: {
        marginRight: 10,
    }
});