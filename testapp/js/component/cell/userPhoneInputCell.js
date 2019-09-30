//
//  userPhoneInputCell.js
//  Split
//
//  Created by Mumakil on 2019. 4. 9..
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
import InputField, {INPUT_THEME_GREY, INPUT_TYPE_NORMAL} from 'component-input/inputField';

/**
 * @protocol UserPhoneInputCell
 * @date 2019/04/09
 * @brief 2개 입력 셀
 */
export default class UserPhoneInputCell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }

        this.onButtonPressed = this.onButtonPressed.bind(this);
    }

    /**
     * 버튼 클릭시 호출된다.
     */
    onButtonPressed(id) {
        if( this.props.editable && this.props.method != null ) {
            this.props.method(id);
        }
    }

    /**
     * 삭제 버튼 렌더링
     */
    renderDeleteButton() {
        if( this.props.enableRemove ) {
            return( <TouchableOpacity
                        style={styles.removebutton}
                        activeOpacity = { .5 }
                        onPress={() => this.props.methodRemove(this.props.id)}>
                        <Text style={[styles.container_title, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_16, TextStyle.color_lightgreyblue, TextStyle.align_center]}>
                            삭제
                        </Text>
                        <Image style={styles.removeicon} source={Images.IconRemove}/>
                    </TouchableOpacity>);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.container_input, {flex: this.props.leftFlex}]}>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity = { .5 }
                        onPress={() => this.onButtonPressed(this.props.leftInputId)}>
                        <Text style={[styles.container_title, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_16, TextStyle.color_brownishgrey, TextStyle.align_center]}
                            numberOfLines={1}
                            ellipsizeMode='tail'>
                            {this.props.leftInputValue}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.container_input, {flex: this.props.rightFlex}]}>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity = { .5 }
                        onPress={() => this.onButtonPressed(this.props.rightInputId)}>
                        <Text style={[styles.container_title, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_16, TextStyle.color_brownishgrey, TextStyle.align_center]}
                            numberOfLines={1}
                            ellipsizeMode='tail'>
                            {this.props.rightInputValue}
                        </Text>
                    </TouchableOpacity>
                </View>
                {this.renderDeleteButton()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 33,
    },
    container_input: {
        marginRight: 9,
    },
    container_delete: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: ColorStyle.GreyEF,
        height: '100%',
        justifyContent: 'center',
    },
    removebutton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    removeicon: {
        marginLeft: 4,
        width: 20,
        height: 20,
    },
});