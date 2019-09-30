//
//  infoLabel.js
//  Split
//
//  Created by Mumakil on 2019. 4. 9..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import Images from 'asset-image';
import TextStyle from 'style/text';
import ColorStyle from 'style/color';


/**
 * @protocol InfoLabel
 * @date 2019/04/09
 * @brief 정보 표시 문구
 */
export default class InfoLabel extends Component {
    constructor(props) {
        super(props);
    }

    getTitleDefaultStyle() {
        return [styles.container_title, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_19, TextStyle.color_niceblue2, TextStyle.align_left];
    }

    getDescriptionDefaultStyle() {
        return [styles.container_title, TextStyle.default, TextStyle.weigth_medium, TextStyle.size_10, TextStyle.color_niceblue2, TextStyle.align_left];
    }

    renderDescriptionWithShow() {
        if( this.props.showInfoIcon ) {
            return  <View style={styles.container_description}>
                        <Image style={styles.question}
                            source={Images.IconQuestion}/>
                        <Text style={[this.getDescriptionDefaultStyle(), this.props.styleDescription]}>
                            {this.props.description}
                        </Text>
                    </View>
        }
        else
            return  <Text style={[this.getDescriptionDefaultStyle(), this.props.styleDescription]}>
                        {this.props.description}
                    </Text>
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Text style={[this.getTitleDefaultStyle(), this.props.styleTitle]}>
                    {this.props.title}
                </Text>
                {this.renderDescriptionWithShow()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'space-between',
    },
    container_description: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    question: {
        width: 11,
        height: 11,
        marginRight: 3,
    }
});