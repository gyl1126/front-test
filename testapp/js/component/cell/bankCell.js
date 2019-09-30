//
//  bankCell.js
//  Split
//
//  Created by Mumakil on 2019. 4. 23..
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
import TextStyle from 'style/text';
import ColorStyle from 'style/color';


/**
 * @protocol BankCell
 * @date 2019/04/23
 * @brief 은행 셀
 */
export default class BankCell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }

        this.onCellPressed = this.onCellPressed.bind(this);
    }

    /**
     * 셀 클릭시 호출
     */
    onCellPressed() {
        if( this.props.method != null )
            this.props.method(this.props.data.id);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onCellPressed}>
                    <View style={styles.container_content}>
                        <Image style={styles.icon}
                            source={this.props.data.url}
                            resizeMode='contain'/>
                        <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_13, TextStyle.color_greyishbrown, TextStyle.align_center]}
                            numberOfLines={1}
                            ellipsizeMode='tail'>
                            {this.props.data.name}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '33%',
        aspectRatio: 1.2/1,
    },
    container_content: {
        flex: 1,
        flexDirection: 'column',
        borderWidth:1,
        borderColor:ColorStyle.GreyF7,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 24,
        paddingBottom: 24,
    },
    button: {
        width: '100%',
        height: '100%',
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 4,
        paddingBottom: 4,
    },
    icon: {
        width: 50,
        height: 50,
    }
});