//
//  sealGenerator.js
//  Split
//
//  Created by Mumakil on 2019. 3. 20..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import ColorStyle from 'style/color';

import ViewShot from "react-native-view-shot";

// 도장 스타일
export const SealStyle = {
    ROUND: 0,       // 기본형(원형)
    SQUARE: 1,      // 사각(미구현)
}

/**
 * @protocol SealGenerator
 * @date 2019/03/20
 * @brief 도장 이미지 생성기
 */
export default class SealGenerator extends Component {
    constructor(props) {
        super(props);

        // 이름 글자 분리
        var name = this.props.name;
        var charList = [];
        var maxIndex = (name.length>3?3:name.length);
        for( var i = 0; i < maxIndex; i++ ) {
            var char = name.slice(i, i+1);
            if( char != null ) {
                charList.push(char);
            }
        }

        this.state = {
            name: charList,
            sealStyle: (this.props.sealStyle>SealStyle.ROUND?this.props.ealStyle:SealStyle.ROUND),
            enable: this.props.enable,
        };
    }

    componentDidMount () {
        this.refs.viewShot.capture().then(uri => {
            this.props.method(uri);
        });
    }

    /**
     * 도장 ui(도장 스타일, 글자수에 따라 구분)
     */
    renderSeal() {
        switch( this.state.sealStyle ) {
            case SealStyle.ROUND: {
                switch( this.state.name.length ) {
                    case 1: {
                        return (
                            <View style={[styles.container_round, 
                                this.state.enable?{borderColor:ColorStyle.Tomato}:{borderColor:ColorStyle.BlueyGrey}]}>
                                <Text style={[this.state.enable?styles.text_enable:styles.text_disable, 
                                        styles.text_big, styles.text_alignright]}>
                                    {this.state.name[0]}
                                </Text>
                            </View>);
                    }
                    case 2: {
                        return (
                            <View style={[styles.container_round, 
                                this.state.enable?{borderColor:ColorStyle.Tomato}:{borderColor:ColorStyle.BlueyGrey}]}>
                                <View style={styles.container_dividerow}>
                                    <View style={styles.container_half}>
                                        <Text style={[this.state.enable?styles.text_enable:styles.text_disable, 
                                                styles.text_middle, styles.text_alignright]}>
                                            {this.state.name[0]}
                                        </Text>
                                    </View>
                                    <View style={styles.container_half}>
                                        <Text style={[this.state.enable?styles.text_enable:styles.text_disable, 
                                                styles.text_middle, styles.text_alignleft]}>
                                            {this.state.name[1]}
                                        </Text>
                                    </View>
                                </View>
                            </View>);
                    }
                    case 3: {
                        return (
                        <View style={[styles.container_round, 
                            this.state.enable?{borderColor:ColorStyle.Tomato}:{borderColor:ColorStyle.BlueyGrey}]}>
                            <View style={styles.container_dividerow}>
                                <View style={styles.container_half}>
                                    <Text style={[this.state.enable?styles.text_enable:styles.text_disable, 
                                            styles.text_middle, styles.text_alignright]}>
                                        {this.state.name[0]}
                                    </Text>
                                </View>
                                <View style={styles.container_half}>
                                    <View style={[styles.container_quater, {justifyContent: 'flex-end'}]}>
                                        <Text style={[this.state.enable?styles.text_enable:styles.text_disable, 
                                                styles.text_small, {marginBottom:-15}]}>
                                            {this.state.name[1]}
                                        </Text>
                                    </View>
                                    
                                    <View style={[styles.container_quater, {justifyContent: 'flex-start'}]}>
                                        <Text style={[this.state.enable?styles.text_enable:styles.text_disable, 
                                                styles.text_small, {marginTop:-15}]}>
                                            {this.state.name[2]}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>);
                    }
                }
            }
            case SealStyle.SQUARE: {
                return;
            }
        }
    }

    render() {
        return (
            <ViewShot ref="viewShot" options={{ format: "png", quality: 1.0, width:200, height:200, }}>
                <View style={styles.container}>
                    { this. renderSeal() }
                </View>
            </ViewShot>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
    },
    container_round: {
        flex:1,
        borderWidth:10,
        borderRadius: 150,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_dividerow: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_dividecol: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_half: {
        width:100,
        height:200,
        justifyContent: 'center',
    },
    container_quater: {
        width:100,
        height:100,
    },
    text_enable:{
        fontFamily: 'BMKIRANGHAERANG-OTF',
        color: ColorStyle.Tomato,
    },
    text_disable:{
        fontFamily: 'BMKIRANGHAERANG-OTF',
        color: ColorStyle.BlueyGrey,
    },
    text_big:{
        fontSize: 150,
    },
    text_middle:{
        fontSize: 120,
    },
    text_small:{
        fontSize: 90,
    },
    text_alignleft: {
        textAlign: 'left'
    },
    text_alignright: {
        textAlign: 'right'
    },
});

// 사용 예시

// import SealGenerator, {SealStyle} from 'component-image/sealGenerator';

// 화면의 최상단에 표시
// 회색/붉은색으로 enable 옵션에 따라 2개 생성
{/* <View style={styles.container_seal1}>
    <SealGenerator
        name='테스트'
        sealStyle={SealStyle.ROUND}
        enable={true}
        method={this.onSealEnableImageGenerated}/>
</View>
<View style={styles.container_seal2}>
    <SealGenerator
        name='테스트'
        sealStyle={SealStyle.ROUND}
        enable={false}
        method={this.onSealDisableImage2Generated}/>
</View> */}

// 사이즈 200,200으로 화면 최상단 넘어서 보이지 않게 표시
// container_seal1: {
//     marginTop:-400,
//     width:200,
//     height:200,
// },
// container_seal2: {
//     marginTop:0,
//     width:200,
//     height:200,
// },

// this.onSealEnableImageGenerated = this.onSealEnableImageGenerated.bind(this);
// this.onSealDisableImage2Generated = this.onSealDisableImage2Generated.bind(this);

// uri가 정상적으로 전달되면 생성 완료
// onSealEnableImageGenerated(uri) {
//     console.log(uri);
// }
// onSealDisableImage2Generated(uri) {
//     console.log(uri);
// }