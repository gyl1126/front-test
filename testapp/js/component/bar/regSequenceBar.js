//
//  regSequenceBar.js
//  Split
//
//  Created by Mumakil on 2019. 3. 5..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import TextStyle from 'style/text';

import SequenceBar from 'component-bar/sequenceBar';

/**
 * @protocol RegSequenceBar
 * @date 2019/03/05
 * @brief 앨범 등록 순서 진행 바
 */
export default class RegSequenceBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container_title}>
                    <Text style={[TextStyle.default, TextStyle.size_20, TextStyle.weigth_medium, TextStyle.color_niceblue2, TextStyle.align_left]}>
                        {this.props.title}
                    </Text>
                </View>
                
                <View style={styles.container_sequencebar}>
                    <SequenceBar total={this.props.total} highlight={this.props.highlight}/>
                </View>
                
                <View style={styles.container_subtitle}>
                    <Text style={[TextStyle.default, TextStyle.size_34, TextStyle.weigth_bold, TextStyle.color_niceblue2, TextStyle.align_left, this.props.titleStyle]}>
                        {this.props.subtitle}
                        <Text style={[TextStyle.default, TextStyle.size_25, TextStyle.weigth_bold, TextStyle.color_niceblue2, TextStyle.align_left, TextStyle.align_bottom]}>
                            {this.props.subtitleadd}
                        </Text>
                    </Text>
                    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 37,
    },
    container_title: {
    },
    container_sequencebar: {
        height: 30,
    },
    container_subtitle: {
    },
});