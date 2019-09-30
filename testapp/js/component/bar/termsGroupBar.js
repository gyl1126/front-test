//
//  termsGroupBar.js
//  Split
//
//  Created by Mumakil on 2019. 1. 21..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';

/**
 * @protocol TermsGroupBar
 * @date 2019/01/21
 * @brief 약관 그룹핑 바
 */
export default class TermsGroupBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            agreementState: false,  // 동의 여부
        };
    }
    
    componentWillReceiveProps(props) {
        this.setState({ agreementState: props.agreement })
    }

    /**
     * 동의 버튼 클릭시 호출
     */
    onAgreementPressed() {
        var agreement = this.state.agreementState;
        this.props.method(this.props.id, !agreement);
        this.setState({ agreementState : !agreement});
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => { this.onAgreementPressed() }}>
                    <Image 
                        style={styles.image}
                        source={this.state.agreementState?Images.BtnAgreementSelected:Images.BtnAgreement}/>
                    <Text
                        style={[styles.text, TextStyle.default, TextStyle.size_14, TextStyle.weigth_bold, TextStyle.color_brownishgrey]}>
                        {this.props.title}
                    </Text>
                    
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    height:34,
    width:'100%',
  },
  button: {
    height:'100%',
    alignItems:'flex-start',
    justifyContent: 'center',
  },
  text: {
    position:'absolute',
    left:"23.4%",
  },
  image: {
    position:'absolute',
    left:"12.5%",
  },
});