//
//  titleInputField.js
//  Split
//
//  Created by Mumakil on 2019. 1. 29..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
} from 'react-native';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';
import DatePicker from 'react-native-datepicker';

// 입력필드 속성값
export const INPUT_THEME_DEFAULT    = 'default';
export const INPUT_THEME_GREY       = 'grey';
export const INPUT_THEME_WHITE      = 'white';
export const INPUT_TYPE_NORMAL      = 'normal';
export const INPUT_TYPE_DATE        = 'date';
export const INPUT_KEYBOARDTYPE_NUMBER = 'number-pad';
/**
 * @protocol TitleInputField
 * @date 2019/01/29
 * @brief 타이틀이 있는 입력 필드
 */
export default class TitleInputField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,     // 날짜
        }

        this.onDateChange = this.onDateChange.bind(this);
    }

    /**
     *  필드 값 변경 이벤트 발생시 호출
     */
    onChange = event => {
        this.props.method(this.props.id, event.nativeEvent.text);
    }

    /**
     * 날짜 변경시 호출
     * @param date 변경된 날짜
     */
    onDateChange(date) {
        this.props.method(this.props.id, date);
        this.setState({date: date})
    }

    /**
     *  테마별 입력필드 렌더링
     */
    renderTextInput() {
        if( this.props.theme == INPUT_THEME_GREY ) {
            if( this.props.type == INPUT_TYPE_DATE ) {
                return <DatePicker
                    style={{width:'100%'}}
                    date={this.state.date}
                    mode="date"
                    placeholder="YYYY.MM.DD"
                    format="YYYY.MM.DD"
                    minDate="1980-01-01"
                    maxDate={new Date()}
                    confirmBtnText="확인"
                    cancelBtnText="취소"
                    showIcon={false}
                    customStyles={{
                        dateInput: [styles.container_grey, 
                            {width: '100%',}],
                        dateText: [TextStyle.default, 
                                TextStyle.align_left, 
                                TextStyle.size_15, 
                                TextStyle.color_grey69,
                                {width:'100%',},
                            ],
                        placeholderText: [TextStyle.default, 
                            TextStyle.align_left, 
                            TextStyle.size_15, 
                            TextStyle.color_greyC3,
                            {width:'100%',},
                        ],
                    }}
                    onDateChange={this.onDateChange}
                />;
            }
            else {
                return <TextInput style={[styles.container_grey, TextStyle.color_grey38]}
                placeholder={this.props.placeholder}
                keyboardType={this.props.keyboardType?this.props.keyboardType:'default'}
                maxLength={this.props.maxLength?this.props.maxLength:1000}
                onChange={this.onChange}
                editable={this.props.editable}
                value={this.props.value}>
            </TextInput>;
            }
            
        }
        else if( this.props.theme == INPUT_THEME_WHITE ) {
            return  <View style={styles.container_white}>
                        <TextInput style={[styles.white_input, TextStyle.color_grey38]}
                            placeholder={this.props.placeholder}
                            keyboardType={this.props.keyboardType?this.props.keyboardType:'default'}
                            maxLength={this.props.maxLength?this.props.maxLength:1000}
                            onChange={this.onChange}
                            editable={this.props.editable}
                            value={this.props.value}>
                        </TextInput>
                        <View style={styles.underline}/>
                    </View>
        }
        else {
            return <TextInput style={[styles.container_input, TextStyle.color_grey38, TextStyle.size_18, TextStyle.weigth_light]}
                placeholder={this.props.placeholder}
                keyboardType={this.props.keyboardType?this.props.keyboardType:'default'}
                maxLength={this.props.maxLength?this.props.maxLength:1000}
                onChange={this.onChange}
                editable={this.props.editable}
                value={this.props.value}>
            </TextInput>;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.container_title, TextStyle.default, TextStyle.weigth_bold, TextStyle.size_18, TextStyle.color_niceblue2, TextStyle.align_left]}>
                    {this.props.title}
                </Text>
                {this.renderTextInput()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height:49,
    },
    container_title: {
        marginBottom: 3,
    },
    container_input: {
        height:29,
        paddingTop: -5,
        paddingBottom: -5,
        paddingLeft:9,
        paddingRight:9,
        backgroundColor:ColorStyle.GreyEF,
    },
    container_grey: {
        height:29,
        // marginTop:5,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:ColorStyle.GreyEF,
        borderWidth:1,
        borderColor:ColorStyle.GreyEF,
    },
    container_white: {
        height:49,
        marginTop:12,
        backgroundColor:ColorStyle.White,
        borderRadius: 5,
    },
    date_text: {

    },
    date_placeholder: {
        
    },
    white_input: {
        flex: 1,
        paddingLeft:21,
        paddingRight:21,
    },
    underline: {
        height: 1,
        backgroundColor: ColorStyle.NiceBlue2,
    }
});