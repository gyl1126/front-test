//
//  walkthroughScreen.js
//  Split
//
//  Created by Mumakil on 2019. 1. 18..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    Dimensions,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';
import PageControl from 'react-native-page-control';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import NormalButton, {NORMALBUTTON_THEHE_WHITE, NORMALBUTTON_THEHE_MELON} from 'component-button/normalButton';

var screen = Dimensions.get('window');
//var screen = require('Dimensions').get('window');

/**
 * @protocol WalkthroughScreen
 * @date 2019/01/18
 * @brief 워크쓰루 화면
 */
export default class WalkthroughScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentPage: 0, // 현재 페이지 번호
        };
    }

    /**
     * 스크롤 이벤트 발생시 호출
     * @param event 스크롤 이벤트
     */
    onScroll=event=>{
        // scrollview의 offset으로 현재 페이지 번호 설정
        var offsetX = event.nativeEvent.contentOffset.x,
        pageWidth = screen.width - 10;
        this.setState({
            currentPage: Math.floor((offsetX - pageWidth / 2) / pageWidth) + 1
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref="ad"
                    pagingEnabled
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    onScroll={this.onScroll}
                    scrollEventThrottle={16}
                    >
                    <View style={styles.container_page}>
                        <View style={styles.container_title}>
                            <Text style={[TextStyle.default, TextStyle.size_30, TextStyle.color_white, TextStyle.weight_bold]}>
                                간편 분할 송금
                            </Text>
                        </View>
                        <View style={styles.container_image}>
                            <Image source={Images.Walkthorugh01}/>
                        </View>
                        <View style={styles.container_description}>
                            <Text style={[TextStyle.default, TextStyle.size_18, TextStyle.color_white, TextStyle.weigth_bold]}>
                                밴드 멤버/ 공동 작업자간{"\n"}복잡한 송금을 간편하게 합니다
                            </Text>
                        </View>
                    </View>
                    <View style={styles.container_page}>
                        <View style={styles.container_title}>
                            <Text style={[TextStyle.default, TextStyle.size_30, TextStyle.color_white, TextStyle.weigth_bold]}>
                                자동 정산
                            </Text>
                        </View>
                        <View style={styles.container_image}>
                            <Image source={Images.Walkthorugh02}/>
                        </View>
                        <View style={styles.container_description}>
                            <Text style={[TextStyle.default, TextStyle.size_18, TextStyle.color_white, TextStyle.weigth_bold]}>
                                자동 정산은 내역서를 만들{"\n"}시간과 비용을 절약합니다
                            </Text>
                        </View>
                    </View>
                    <View style={styles.container_page}>
                        <View style={styles.container_title}>
                            <Text style={[TextStyle.default, TextStyle.size_30, TextStyle.color_white, TextStyle.weigth_bold]}>
                                정확한 입금
                            </Text>
                        </View>
                        <View style={styles.container_image}>
                            <Image source={Images.Walkthorugh03}/>
                        </View>
                        <View style={styles.container_description}>
                            <Text style={[TextStyle.default, TextStyle.size_18, TextStyle.color_white, TextStyle.weigth_bold]}>
                                약속된 시간에{"\n"}약속된 금액을 입금 받습니다.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
                <PageControl
                    style={styles.pagecontrol}
                    numberOfPages={3}
                    currentPage={this.state.currentPage}
                    hidesForSinglePage
                    pageIndicatorTintColor='gray'
                    currentPageIndicatorTintColor='white'
                    indicatorStyle={{borderRadius: 5.5}}
                    currentIndicatorStyle={{borderRadius: 5.5}}
                    indicatorSize={{width:11, height:11}}
                    indicatorStyle={{marginLeft: 37,}}
                    onPageIndicatorPress={this.onItemTap}
                />
                <View style={styles.container_bottombutton}>
                    <NormalButton containerStyle={styles.button}
                        title='둘러보기'
                        theme={NORMALBUTTON_THEHE_WHITE}
                        method={() => this.props.navigation.navigate('Home')}/>
                    <NormalButton containerStyle={styles.button}
                        title='가입하기'
                        theme={NORMALBUTTON_THEHE_MELON}
                        method={() => this.props.navigation.navigate('PhoneAuth')}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ColorStyle.PeacockBlue,
    },
    container_scrollview: {
        top:0,
    },
    container_page: {
        width:screen.width,
        alignItems:'center',
    },
    container_title: {
        marginTop:58 + getStatusBarHeight(),
        alignItems:'center',
    },
    container_image: {
        marginTop:0,
        alignItems:'center',
        justifyContent: 'center',
        flex:1,
    },
    container_description: {
        marginTop: 0,
        alignItems:'center',
        marginBottom: 38,
    },
    container_bottombutton: {
        marginLeft: 48,
        marginRight: 48,
        alignItems:'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 38,
    },
    pagecontrol: {
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 48,
    },
    button: {
        alignItems:'center',
        height: 48,
        width: 129,
    }
});