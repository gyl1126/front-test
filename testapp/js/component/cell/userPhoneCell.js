//
//  userPhoneCell.js
//  Split
//
//  Created by Mumakil on 2019. 4. 11..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';


/**
 * @protocol UserPhoneCell
 * @date 2019/04/11
 * @brief 유저 전화번호 셀
 */
export default class UserPhoneCell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,      // 이름
            phone: this.props.phone,    // 휴대폰 번호
        }

        this.onCellPressed = this.onCellPressed.bind(this);
    }

    /**
     * 셀 클릭시 호출
     */
    onCellPressed() {
        if( this.props.method != null )
            this.props.method(this.state.name, this.state.phone);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onCellPressed}>
                    <Text style={[styles.name, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_18, TextStyle.color_brownishgrey, TextStyle.align_left]}
                        numberOfLines={1}
                        ellipsizeMode='tail'>
                        {this.props.name}
                    </Text>
                    <Text style={[styles.phone, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_15, TextStyle.color_brownishgrey, TextStyle.align_left]}
                        numberOfLines={1}
                        ellipsizeMode='tail'>
                        {this.props.phone}
                    </Text>
                    <Image 
                        style={styles.arrow}
                        source={Images.Arrow}
                    />
                </TouchableOpacity>
                { (this.props.showLine?<View style={styles.line}/>:null) }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        
    },
    button: {
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 17,
        paddingRight: 30,
    },
    profileimage: {
        width: 37,
        height: 37,
    },
    name: {
        marginLeft: 10,
        flex: 1,
    },
    phone: {
        marginRight: 20,
    },
    arrow: {
        width: 7,
        height: 10,
    },
    line: {
        height: 1,
        marginLeft: 12,
        marginRight: 12,
        backgroundColor: ColorStyle.GreyCC,
    }
});