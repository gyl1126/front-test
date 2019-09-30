//
//  bankListView.js
//  Split
//
//  Created by Mumakil on 2019. 4. 23..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

import BankCell from 'component-cell/bankCell';

var screen = Dimensions.get('window');
//var screen = require('Dimensions').get('window');

/**
 * @protocol BankListView
 * @date 2019/04/23
 * @brief 은행 선택 화면
 */
export default class BankListView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            
        };

        this.onCellPressed = this.onCellPressed.bind(this);
    }

    onCellPressed(id) {
        if( this.props.method != null ) 
            this.props.method(id);
    }

    /**
     * 셀 렌더링
     */
    renderCell() {
        var viewList = [];
        
        if( this.props.data != null ) {
            var cellList = [];

            for( var i = 0; i < this.props.data.length; i++ ) {
                var cellKey = 'cell' + i;
                cellList.push(  <BankCell 
                    key={cellKey}
                    style={styles.nameCell}
                    method={this.onCellPressed}
                    data={this.props.data[i]}/>);
                
                // 3개마다 셀 컨테이너로 묶어줌
                if( i%3 == 2 ) {
                    var viewKey = 'view' + i;
                    viewList.push(
                        <View style={styles.container_row}
                            key={viewKey}>
                            {cellList}
                        </View>
                    );
                    cellList = [];
                }
            }
        }
        
        return viewList;
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderCell()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
    },
    container_row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});