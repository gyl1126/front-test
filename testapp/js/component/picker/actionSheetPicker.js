//
//  actionSheetPicker.js
//  Split
//
//  Created by Mumakil on 2019. 1. 29..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import ActionSheet from 'react-native-actionsheet';

// data array내에 name 필드가 옵션 명에 표시됨
// array 마지막에는 취소 옵션이 필

/**
 * @protocol ActionSheetPicker
 * @date 2019/01/29
 * @brief 커스텀 피커
 */
export default class ActionSheetPicker extends Component {
    constructor(props) {
        super(props);
    }

    /**
     *  액션시트 선택시 호출
     *
     *  @param index 액션시트 선택한 인덱스
     */
    onActionSheetPressed(index) {
        this.props.method(index);
    }
    
    /**
     *  화면 터치시 호출
     */
    showActionSheet = () => {
        // 액션시트 표시
        this.ActionSheet.show()
    }

    getDestructiveButtonIndex() {
        for( var i = 0; i < this.props.data.length; i++ ) {
            if( this.props.data[i].id == 'delete' )
                return i;
        }
        return -1;
    }

    getCancelButtonIndex() {
        for( var i = 0; i < this.props.data.length; i++ ) {
            if( this.props.data[i].id == 'cancel' )
                return i;
        }
        return -1;
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.container}
                        onPress={() => { this.showActionSheet() }}>
                </TouchableOpacity>

                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={this.props.title}
                    options={ this.props.data.map((data, i) => {return data.name}) }
                    destructiveButtonIndex={ this.getDestructiveButtonIndex() }
                    cancelButtonIndex={ this.getCancelButtonIndex() }
                    onPress={(index) => { this.onActionSheetPressed(index) }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});