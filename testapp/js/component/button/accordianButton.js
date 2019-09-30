//
//  accordianButton.js
//  Split
//
//  Created by Mumakil on 2019. 3. 5..
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
 * @protocol AccordianButton
 * @date 2019/03/18
 * @brief 아코디언 버튼
 */
export default class AccordianButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFolding: false,   // 접힘 여부
        }

        this.onButtonPressed = this.onButtonPressed.bind(this);
    }

    /**
     * 버튼 클릭시 호출
     */
    onButtonPressed() {
        var currentFolding = this.state.isFolding;
        this.setState({isFolding:!currentFolding});
    }

    /**
     * 하위 화면 렌더링
     * @return 하위 화면
     */
    renderSubView() {
        if( this.state.isFolding && this.props.subview != null ) {
            if( this.props.showFoldingButton ) {
                var subviewList = [this.props.subview];
                subviewList.push(
                    <TouchableOpacity
                        style={[styles.foldingbutton, this.props.styleFoldingButton]}
                        onPress={this.onButtonPressed}>
                        <Text style={[TextStyle.default, TextStyle.size_15, TextStyle.weigth_medium, TextStyle.color_niceblue2, TextStyle.align_right]}>
                            접기
                        </Text>
                        <Image style={[styles.dropdown, this.props.styleImage]} source={Images.DropdownUp}/>
                    </TouchableOpacity>);
                return subviewList;
            }
            else
                return this.props.subview;
        }
        else 
            return;
    }
    
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={[styles.button, this.props.styleButton]}
                    onPress={this.onButtonPressed}>
                    <Text style={[styles.title, TextStyle.default, TextStyle.size_21, TextStyle.weigth_medium, TextStyle.color_niceblue2, TextStyle.align_left, this.props.styleText]}>
                        {this.props.title}
                    </Text>
                    <Image style={[styles.dropdown, this.props.styleImage]} source={(this.state.isFolding?Images.DropdownUp:Images.DropdownDown)}/>
                </TouchableOpacity>
                { this.renderSubView() }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        
    },
    button: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        zIndex: 10,
    },
    title: {
        marginLeft: 11,
    },
    dropdown: {
        marginRight: 11,
        height: '30%',
        aspectRatio: 1/1,
    },
    foldingbutton: {
        backgroundColor: 'red',
        marginRight: 12,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
    },
});