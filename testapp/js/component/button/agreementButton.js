//
//  agreementButton.js
//  Split
//
//  Created by Mumakil on 2019. 3. 18..
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
 * @protocol AgreementButton
 * @date 2019/03/18
 * @brief 동의 버튼
 */
export default class AgreementButton extends Component {
    constructor(props) {
        super(props);
        this.state = { isAgreement: false };
    }

    componentWillReceiveProps(props) {
        this.setState({ isAgreement: props.agreement })
    }

    /**
     * 버튼 클릭시 호출
     */
    onButtonPressed() {
        var agreement = this.state.isAgreement;
        this.props.method(this.props.id, !agreement);
        this.setState({ isAgreement : !agreement});
    }

    render() {
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => { this.onButtonPressed() }}>
                    <Image 
                        style={styles.image}
                        source={this.state.isAgreement?Images.BtnAgreementSelected:Images.BtnAgreement}
                    />
                    <Text
                        style={[styles.text, TextStyle.default, TextStyle.size_14, TextStyle.weigth_bold, TextStyle.color_brownishgrey, TextStyle.align_left]}>
                        {this.props.title}
                    </Text>
                    
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 7,
    },
    image: {
        
    },
});