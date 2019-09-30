//
//  appContainer.js
//  Split
//
//  Created by Mumakil on 2019. 1. 18..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
  Image,
  Text,
} from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';

// register screen
import IntroScreen from 'screen/register/introScreen';
import WalkthroughScreen from 'screen/register/walkthroughScreen';
import TermsScreen from 'screen/register/termScreen';
import PhoneAuthScreen from 'screen/register/phoneAuthScreen';
import PasswordSettingScreen from 'screen/register/pwSettingScreen';

// main screen
import AlbumAddScreen from 'screen/main/albumAddScreen';
import AlbumListScreen from 'screen/main/albumListScreen';
import AlbumViewScreen from 'screen/main/albumViewScreen';
import RegAlbumInfoScreen from 'screen/main/regAlbumInfoScreen';
import RegTrackInfoScreen from 'screen/main/regTrackInfoScreen';
import RegTeamInfoScreen from 'screen/main/regTeamInfoScreen';
import RegRatioInfoScreen from 'screen/main/regRatioInfoScreen';
import RegConfirmInfoScreen from 'screen/main/regConfirmInfoScreen';
import RegContractInfoScreen from 'screen/main/regContractInfoScreen';
import SelCalculateScreen from 'screen/main/selCalculateScreen';
import RegPerfTypeScreen from 'screen/main/regPerfTypeScreen';
import RegPerfInfoScreen from 'screen/main/regPerfInfoScreen';
import RegPerfRatioInfoScreen from 'screen/main/regPerfRatioInfoScreen';
import RegPerfConfirmInfoScreen from 'screen/main/regPerfConfirmInfoScreen';
import RegPerfContractInfoScreen from 'screen/main/regPerfContractInfoScreen';
import PerfListScreen from 'screen/main/perfListScreen';
import PerfViewScreen from 'screen/main/perfViewScreen';

// transfer screen
import TransferInputScreen from 'screen/transfer/transferInputScreen';
import TransferAccountScreen from 'screen/transfer/transferAccountScreen';
import SelBankScreen from 'screen/transfer/selBankScreen';
import RegBankAccountScreen from 'screen/transfer/regBankAccountScreen';
import TransferConfirmScreen from 'screen/transfer/transferConfirmScreen';
import TransferCompleteScreen from 'screen/transfer/transferCompleteScreen';

// etc
import EmptyScreen from 'screen/emptyScreen';

/**
 * 화면별 탭바 표시 여부 설정
 * @param navigation 탭바 네비게이션
 */
const tabbarVisible = (navigation) => {
    const { routes } = navigation.state;
    
    if( routes == null )
        return true;

    let showTabbar = true;
    routes.forEach((route) => {
        // 목록에 포함된 화면에서는 탭바 표시 안함
        var viewList = ['RegAlbumInfo', 
            'RegTrackInfo', 
            'RegTeamInfo', 
            'RegRatioInfo',
            'RegConfirmInfo', 
            'RegContractInfo',
            'RegPerfType',
            'RegPerfInfo',
            'RegPerfRatioInfo',
            'RegPerfConfirmInfo',
            'RegPerfContractInfo',
        ];
        viewList.some((viewName) => {
            if( route.routeName === viewName ) {
                showTabbar = false;
            }
            
            return ( route.routeName === viewName);
        });
    });
  
    return showTabbar;
};

// 회원가입단 스택 네비게이터
const AuthStack = createStackNavigator(
    {
        //PhoneAuth: PhoneAuthScreen,
         Walkthrough: WalkthroughScreen,
        //PasswordSetting: PasswordSettingScreen,
        //Terms: TermsScreen,

        Intro: IntroScreen,
        Walkthrough: WalkthroughScreen,
        Terms: TermsScreen,
        PhoneAuth: PhoneAuthScreen,
        PasswordSetting: PasswordSettingScreen,
    },
    {
        headerMode: 'none',
    }
);

// 계약등록단 스택 네비게이터
const AlbumAddStack = createStackNavigator(
    {
        // FIXME: 임시 화면 테스트
        // RegAlbumInfo: RegAlbumInfoScreen,
        // RegTrackInfo: RegTrackInfoScreen,
        // RegTeamInfo: RegTeamInfoScreen,
        // RegRatioInfo: RegRatioInfoScreen,
        // RegConfirmInfo: RegConfirmInfoScreen,
        // RegContractInfo: RegContractInfoScreen,
        // RegPerfType: RegPerfTypeScreen,
        // RegPerfInfo: RegPerfInfoScreen,
        // RegPerfRatioInfo: RegPerfRatioInfoScreen,
        // RegPerfConfirmInfo: RegPerfConfirmInfoScreen,
        // perfListScreen: PerfListScreen,
        // RegPerfContractInfo: RegPerfContractInfoScreen,


        SelCalculate: SelCalculateScreen,
        AlbumList: AlbumListScreen,
        AlbumView: AlbumViewScreen,
        PerfList: PerfListScreen,
        PerfView: PerfViewScreen,
        AlbumAdd: AlbumAddScreen,
        RegAlbumInfo: RegAlbumInfoScreen,
        RegTrackInfo: RegTrackInfoScreen,
        RegTeamInfo: RegTeamInfoScreen,
        RegRatioInfo: RegRatioInfoScreen,
        RegConfirmInfo: RegConfirmInfoScreen,
        RegContractInfo: RegContractInfoScreen,
        RegPerfType: RegPerfTypeScreen,
        RegPerfInfo: RegPerfInfoScreen,
        RegPerfRatioInfo: RegPerfRatioInfoScreen,
        RegPerfConfirmInfo: RegPerfConfirmInfoScreen,
        RegPerfContractInfo: RegPerfContractInfoScreen,
    },
    {
        headerMode: 'none',
    }
);

// 대시보드 스택 네비게이터
const StatementStack = createStackNavigator(
    {
        // FIXME: 임시 화면 테스트
        // AlbumView: AlbumViewScreen,

        Empty: EmptyScreen,
    },
    {
        headerMode: 'none',
    }
);

// 송금하기 스택 네비게이터
const TransferStack = createStackNavigator(
    {
        // FIXME: 임시 화면 테스트
        // TransferAccount: TransferAccountScreen,
        // SelBank: SelBankScreen,
        // RegBankAccount: RegBankAccountScreen,
        // TransferConfirm: TransferConfirmScreen,
        // TransferComplete: TransferCompleteScreen,

        
        TransferInput: TransferInputScreen,
        TransferAccount: TransferAccountScreen,
        SelBank: SelBankScreen,
        RegBankAccount: RegBankAccountScreen,
        TransferConfirm: TransferConfirmScreen,
        TransferComplete: TransferCompleteScreen,
    },
    {
        headerMode: 'none',
    }
);

// 대시보드 스택 네비게이터
const TimelineStack = createStackNavigator(
    {
        Empty: EmptyScreen,
    },
    {
        headerMode: 'none',
    }
);

// 홈화면 탭바 네비게이터
const HomeStack = createBottomTabNavigator(
    {
        AlbumAdd: AlbumAddStack,
        Statement: StatementStack,
        Transfer: TransferStack,
        Timeline: TimelineStack,
    },
    {
        headerMode: 'none',
        initialRouteName: 'AlbumAdd',
        
        // 탭바 관련 옵션 설정
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarLabel: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                if( routeName == 'AlbumAdd') {
                    return <Text style={[TextStyle.default, TextStyle.size_14, TextStyle.weigth_medium, TextStyle.color_niceblue2]}>계약관리</Text>;
                }
                else if( routeName == 'Statement') {
                    return <Text style={[TextStyle.default, TextStyle.size_14, TextStyle.weigth_medium, TextStyle.color_niceblue2]}>정산내역서</Text>;
                }
                else if( routeName == 'Transfer') {
                    return <Text style={[TextStyle.default, TextStyle.size_14, TextStyle.weigth_medium, TextStyle.color_niceblue2]}>송금하기</Text>;
                }
                else if( routeName == 'Timeline') {
                    return <Text style={[TextStyle.default, TextStyle.size_14, TextStyle.weigth_medium, TextStyle.color_niceblue2]}>타임라인</Text>;
                }
                else if( routeName == 'Dashboard') {
                    return <Text style={[TextStyle.default, TextStyle.size_14, TextStyle.weigth_medium, TextStyle.color_niceblue2]}>대시보드</Text>;
                }
                else if( routeName == 'Empty1' || routeName == 'Empty2') {
                    return <Text style={[TextStyle.default, TextStyle.size_14, TextStyle.weigth_medium, TextStyle.color_niceblue2]}>(준비중)</Text>;
                }
                return null;
            },
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                if( routeName == 'AlbumAdd') {
                    if( focused )
                        return <Image source={Images.TabRegisterContract}/>
                    else 
                        return <Image source={Images.TabRegisterContract}/>
                }
                else if( routeName == 'Statement') {
                    if( focused )
                        return <Image source={Images.TabDocument}/>
                    else 
                        return <Image source={Images.TabDocument}/>
                }
                else if( routeName == 'Transfer' ) {
                    if( focused )
                        return <Image source={Images.TabTransfer}/>
                    else 
                        return <Image source={Images.TabTransfer}/>
                }
                else if( routeName == 'Timeline' ) {
                    if( focused )
                        return <Image source={Images.TabTimeline}/>
                    else 
                        return <Image source={Images.TabTimeline}/>
                }
                else if( routeName == 'Dashboard' ) {
                    if( focused )
                        return <Image source={Images.TabDashboard}/>
                    else 
                        return <Image source={Images.TabDashboard}/>
                }
                else if( routeName == 'Empty1' || routeName == 'Empty2' ) {
                    if( focused )
                        return <Image source={Images.TabEmpty}/>
                    else 
                        return <Image source={Images.TabEmpty}/>
                }
            },
            tabBarVisible: tabbarVisible(navigation),
        }),
        tabBarOptions: {
            activeTintColor: ColorStyle.NiceBlue2,
            labelStyle: {
              fontSize: 14,
            },
            style: {
                height: 80,
              backgroundColor: ColorStyle.GreyF8,
            },
        }
    }
);

// 스위치 네비게이터
const AppNavigator = createSwitchNavigator(
    {
        Auth: StatementStack,    // 회원가입 관련 Stack Navigator
      //  Home: HomeStack,    // 홈화면 Bottom Tab Navigator
    },
    {
        headerMode: 'none',
        initialRouteName: 'Auth',   // FIXME: 배포전 확인
    }
);

/**
 * @protocol AppContainer
 * @date 2019/02/28
 * @brief 화면 컨테이너
 */
export default AppContainer = createAppContainer(AppNavigator);