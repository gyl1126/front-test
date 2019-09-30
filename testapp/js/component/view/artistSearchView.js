//
//  artistSearchView.js
//  Split
//
//  Created by Mumakil on 2019. 4. 10..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

import TitleCloseBar from 'component-bar/titleCloseBar';
import SearchInputField from 'component-input/searchInputField';
import UserNameCell from 'component-cell/userNameCell';
import UserPhoneCell from 'component-cell/userPhoneCell';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Contacts from 'react-native-contacts';

var screen = Dimensions.get('window');
//var screen = require('Dimensions').get('window');

export const ARTISTSEARCHTYPE_USER      = 'type_user';
export const ARTISTSEARCHTYPE_CONTACT   = 'type_contact';

/**
 * @protocol ArtistSearchView
 * @date 2019/04/10
 * @brief 아티스트 검색 화면
 */
export default class ArtistSearchView extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            opacityValue: new Animated.Value(0),
            allUserList: {data: null},
            userList: {data: null},
        };

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.onClosePressed = this.onClosePressed.bind(this);
        this.onSearchPressed = this.onSearchPressed.bind(this);
        this.onContactPressed = this.onContactPressed.bind(this);
        this.onUserPressed = this.onUserPressed.bind(this);
        this.renderCell = this.renderCell.bind(this);
    }

    componentDidMount() {
        this.show();

        var list = [];

        Contacts.getAll((err, contacts) => {
            if (err) {
              throw err;
            }
            
            for( var i = 0; i < contacts.length; i++ ) {
                var phoneNumber;
                if( contacts[i].phoneNumbers != null ) {
                    for( var j = 0; j < contacts[i].phoneNumbers.length; j++ ) {
                        if( contacts[i].phoneNumbers[j].label == 'mobile' )
                            phoneNumber = contacts[i].phoneNumbers[j].number;
                    }
                }

                // 이름 조합
                var fullName;

                if( contacts[i].givenName != null || contacts[i].givenName.length > 0 ) 
                    fullName = contacts[i].givenName;
                
                if( contacts[i].middleName != null || contacts[i].middleName.length > 0 ) {
                    if( fullName.length > 0 ) {
                        fullName += ' ';
                    }

                    fullName += contacts[i].middleName;
                }

                if( contacts[i].familyName != null || contacts[i].familyName.length > 0 ) {
                    if( fullName.length > 0 ) {
                        fullName += ' ';
                    }

                    fullName += contacts[i].familyName;
                }
                
                list.push({
                    name: fullName,
                    number: phoneNumber,
                });
            };

            this.setState({userList: {data: list},
                allUserList: {data: list}});
        });
    }

    show() {
        Animated.timing(
            this.state.opacityValue,
            {
                toValue: 1,
                duration: 300,
            }).start();  
    }

    hide() {
        Animated.timing(
            this.state.opacityValue,
            {
                toValue: 0,
                duration: 300,
            }).start(()=>{
                this.props.methodClose();
            });
    }

    onClosePressed() {
        this.hide();
    }

    onSearchPressed(text) {
        var userList = this.state.allUserList.data;

        var filterList = userList.filter((item) => {
            return item.name.toUpperCase().includes(text.toUpperCase());
        });
        
        this.setState({userList: {data: filterList}});
    }

    onContactPressed(name, phone) {
        this.props.methodSelect(name, phone);
        this.hide();
    }

    onUserPressed(name) {
        this.props.methodSelect(name, '');
        this.hide();
    }

    renderTitleBar() {
        if( this.props.type == ARTISTSEARCHTYPE_USER )
            return  <View style={styles.container_titlebar}>
                        <TitleCloseBar title='아티스트 검색'
                            methodClose={this.onClosePressed}/>
                    </View>
        else if( this.props.type == ARTISTSEARCHTYPE_CONTACT )
            return  <View style={styles.container_titlebar}>
                        <TitleCloseBar title='연락처 검색'
                            methodClose={this.onClosePressed}/>
                    </View>
    }

    renderCell() {
        var cellList = [];
        
        if( this.state.userList.data != null ) {
            for( var i = 0; i < this.state.userList.data.length; i++ ) {
                var cellKey = 'cell' + i;
                if( this.props.type == ARTISTSEARCHTYPE_USER ) {
                    cellList.push(  <UserNameCell 
                                        key={cellKey}
                                        style={styles.nameCell}
                                        method={this.onUserPressed}
                                        name={this.state.userList.data[i].name}
                                        showLine={true}/>);
                }
                else if( this.props.type == ARTISTSEARCHTYPE_CONTACT ) {
                    cellList.push(  <UserPhoneCell 
                                        key={cellKey}
                                        style={styles.nameCell}
                                        method={this.onContactPressed}
                                        name={this.state.userList.data[i].name}
                                        phone={this.state.userList.data[i].number}
                                        showLine={true}/>);
                }
            }
        }
        

        return cellList;
    }

    render() {
        return (
            <Animated.View
                style={[styles.container, {
                opacity: this.state.opacityValue,
            }]}>
                <View style={[styles.container_background, this.props.style]}>
                    {this.renderTitleBar()}
                    <SearchInputField
                        method={this.onSearchPressed}/>
                    <ScrollView style={[styles.scrollview]}
                        horizontal={false}>
                        { this.renderCell() }
                    </ScrollView>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: screen.width,
        height: screen.height,
    },
    container_background: {
        backgroundColor: ColorStyle.GreyF7,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    container_titlebar: {
        marginTop: getStatusBarHeight(),
        width: '100%',
    },
    scrollview: {
        width: '100%',
    },
    nameCell: {
        height: 55,
    }
});