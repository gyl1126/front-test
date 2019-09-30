//
//  listView.js
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
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

import BankAccountCell from 'component-cell/bankAccountCell';
import BankUserNameCell from 'component-cell/bankUserNameCell';

export const LISTVIEWCELLTYPE_ACCOUNT   = 'account';
export const LISTVIEWCELLTYPE_USERNAME  = 'username';

/**
 * @protocol ListHeaderView
 * @date 2019/04/23
 * @brief 리스트 헤더 화면
 */
export default class ListView extends Component {
    constructor(props) {
        super(props);

        var isFolding = false;

        if( !this.props.showFoldingButton )
            isFolding = true;

        this.state = {
            isFolding: isFolding,   // 접힘 여부
        }

        this.onButtonPressed = this.onButtonPressed.bind(this);
        this.onCellPressed = this.onCellPressed.bind(this);
    }

    /**
     * 버튼 클릭시 호출
     */
    onButtonPressed() {
        if( this.props.showFoldingButton ) {
            var currentFolding = this.state.isFolding;
            this.setState({isFolding:!currentFolding});
        }
    }

    onCellPressed(id) {
        console.log(id);
        if( this.props.method != null ) 
            this.props.method(this.props.id, id);
    }

    /**
     * 하위 화면 렌더링
     * @return 하위 화면
     */
    renderSubView() {
        if( this.state.isFolding ) {
            var cellList = [];
            for( var i = 0; i < this.props.data.length; i++ ) {
                var cellKey = 'cell' + i;
                switch( this.props.cellType ) {
                    case LISTVIEWCELLTYPE_ACCOUNT: {
                        cellList.push(
                                <BankAccountCell 
                                    key={cellKey}
                                    method={this.onCellPressed}
                                    data={this.props.data[i]}/>
                            );
                        break;
                    }
                    case LISTVIEWCELLTYPE_USERNAME: {
                        cellList.push(
                            <BankUserNameCell 
                                key={cellKey}
                                method={this.onCellPressed}
                                data={this.props.data[i]}/>
                        );
                    break;
                    }
                }
            }
            return cellList;
        }

        return;
    }
    
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
            {
                (
                    (this.props.data!=null)&&(this.props.data.length>0)?
                    <TouchableOpacity
                        style={[styles.button, 
                            (this.state.isFolding?{backgroundColor: ColorStyle.ReallyLightBlue}:{backgroundColor: ColorStyle.White}), 
                            this.props.styleButton]}
                        onPress={this.onButtonPressed}>
                        <Text style={[styles.header, TextStyle.default, TextStyle.size_17, TextStyle.weigth_bold, TextStyle.color_greyishbrown, TextStyle.align_left, this.props.styleText]}>
                            {this.props.header}
                        </Text>
                        {this.props.showFoldingButton?
                            (<Image style={[styles.dropdown, this.props.styleImage]} source={(this.state.isFolding?Images.DropdownUpGrey:Images.DropdownDownGrey)}/>)
                            :null}
                    </TouchableOpacity>
                    :null
                )
            }
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
        height: 38,
        backgroundColor: ColorStyle.White,
    },
    header: {
        marginLeft: 32,
    },
    dropdown: {
        marginRight: 35,
        width: 15,
        height: 11,
    },
    foldingbutton: {
        backgroundColor: 'red',
        marginRight: 12,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
    },
});