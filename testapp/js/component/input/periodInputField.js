//
//  periodInputField.js
//  Split
//
//  Created by Mumakil on 2019. 3. 14..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';
import DatePicker from 'react-native-datepicker';


/**
 * @protocol PeriodInputField
 * @date 2019/03/14
 * @brief 기간 입력 필드
 */
export default class PeriodInputField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: this.props.startDate,
            endDate: this.props.endDate,
        }

        this.onStartDateChanged = this.onStartDateChanged.bind(this);
        this.onEndDateChanged = this.onEndDateChanged.bind(this);
    }

    /**
     * 시작일 변경시 호출
     * @param date 시작일
     */
    onStartDateChanged(date) {
        this.props.methodStartDate(this.props.id, date);
        this.setState({startDate: date})
    }

    /**
     * 종료일 변경시 호출
     * @param date 종료일
     */
    onEndDateChanged(date) {
        this.props.methodEndDate(this.props.id, date);
        this.setState({endDate: date})
    }

    getTextStyle() {
        if( this.props.editable ) {
            return [TextStyle.default, 
                TextStyle.align_left, 
                TextStyle.size_15, 
                TextStyle.color_grey69,
                {width:'100%',},
            ];
        }
        else
            return [TextStyle.default, 
                TextStyle.align_left, 
                TextStyle.size_15, 
                TextStyle.color_greyCC,
                {width:'100%',},
            ];
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Text style={[TextStyle.default, TextStyle.weigth_medium, TextStyle.size_19, TextStyle.color_niceblue2, TextStyle.align_left]}>
                    {this.props.title}
                </Text>
                <View style={[styles.container_horizontal, {marginTop:10}]}>
                    <View style={styles.container_side}>
                        <Text style={[TextStyle.default, TextStyle.weigth_medium, TextStyle.size_14, TextStyle.color_niceblue2, TextStyle.align_left]}>
                            {this.props.startstr}
                        </Text>
                    </View>
                    <View style={styles.container_center}>
                    </View>
                    <View style={styles.container_side}>
                        <Text style={[TextStyle.default, TextStyle.weigth_medium, TextStyle.size_14, TextStyle.color_niceblue2, TextStyle.align_left]}>
                            {this.props.endstr}
                        </Text>
                    </View>
                </View>
                <View style={styles.container_horizontal}>
                    <View style={styles.container_side}>
                        <DatePicker
                            style={{width:'100%'}}
                            date={this.state.startDate}
                            mode="date"
                            placeholder="YYYY.MM.DD"
                            format="YYYY.MM.DD"
                            minDate="1980-01-01"
                            confirmBtnText="확인"
                            cancelBtnText="취소"
                            showIcon={false}
                            customStyles={{
                                dateInput: [styles.container_grey, 
                                    {width: '100%',}],
                                dateText: this.getTextStyle(),
                                placeholderText: [TextStyle.default, 
                                    TextStyle.align_left, 
                                    TextStyle.size_15, 
                                    TextStyle.color_greyC3,
                                    {width:'100%',},
                                ],
                            }}
                            onDateChange={this.onStartDateChanged}
                            date={this.state.startDate}
                            disabled={!this.props.editable}/>
                    </View>
                    <View style={styles.container_center}>
                        <Text style={[TextStyle.default, TextStyle.weigth_bold, TextStyle.size_18, TextStyle.color_niceblue2, TextStyle.align_left]}>
                            ~
                        </Text>
                    </View>
                    <View style={styles.container_side}>
                        <DatePicker
                            style={{width:'100%'}}
                            date={this.state.endDate}
                            mode="date"
                            placeholder="YYYY.MM.DD"
                            format="YYYY.MM.DD"
                            minDate="1980-01-01"
                            confirmBtnText="확인"
                            cancelBtnText="취소"
                            showIcon={false}
                            customStyles={{
                                dateInput: [styles.container_grey, 
                                    {width: '100%',}],
                                dateText: this.getTextStyle(),
                                placeholderText: [TextStyle.default, 
                                    TextStyle.align_left, 
                                    TextStyle.size_15, 
                                    TextStyle.color_greyC3,
                                    {width:'100%',},
                                ],
                            }}
                            onDateChange={this.onEndDateChanged}
                            date={this.state.endDate}
                            disabled={!this.props.editable}
                            allowFontScaling={true}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        
    },
    container_horizontal: {
        width: '100%',
        flexDirection: 'row',
    },
    container_side: {
        flex: 0.5,
    },
    container_center: {
        width: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_grey: {
        height:38,
        marginTop:5,
        paddingLeft:10,
        paddingRight:10,
        backgroundColor:ColorStyle.GreyEF,
        borderWidth:1,
        borderColor:ColorStyle.GreyEF,
    },
});