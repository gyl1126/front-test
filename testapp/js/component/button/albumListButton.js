//
//  albumListButton.js
//  Split
//
//  Created by Mumakil on 2019. 3. 25..
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
import ColorStyle from 'style/color';

/**
 * @protocol AgreementButton
 * @date 2019/03/18
 * @brief 동의 버튼
 */
export default class AlbumListButton extends Component {
    constructor(props) {
        super(props);
        
    }

    /**
     * 버튼 클릭시 호출
     */
    onButtonPressed() {
        this.props.method(this.props.id);
    }

    render() {
        return (
            <View style={[styles.container, this.props.containerStyle]}>
                <Image
                    style={styles.coverimage} 
                    source={{uri:this.props.data.albumInfo.coverImage?this.props.data.albumInfo.coverImage:''}}>
                </Image>
                <View style={styles.container_bar}>
                    <View style={styles.container_info}>
                        <View style={[styles.container_infocomp, {marginBottom:8}]}>
                            <Image style={styles.icon}
                                source={Images.IconAlbum}/>
                            <Text style={[styles.text, TextStyle.default, TextStyle.size_14, TextStyle.weigth_medium, TextStyle.color_pinkishgrey, TextStyle.align_left]}
                                numberOfLines={2}
                                ellipsizeMode='tail'>
                                {this.props.data.albumInfo.albumName}
                            </Text>
                        </View>
                        <View style={styles.container_infocomp}>
                            <Image style={styles.icon}
                                source={Images.IconUser}/>
                            <Text style={[styles.text, TextStyle.default, TextStyle.size_14, TextStyle.weigth_medium, TextStyle.color_pinkishgrey, TextStyle.align_left]}
                                numberOfLines={1}
                                ellipsizeMode='tail'>
                                {this.props.data.teamList[0].name}
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => { this.onButtonPressed() }}>
                        <Text
                            style={[TextStyle.default, TextStyle.size_14, TextStyle.weigth_bold, TextStyle.color_white, TextStyle.align_center]}>
                            계약서 보기
                        </Text>
                        
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
    },
    container_bar: {
        backgroundColor: ColorStyle.VeryLightPinkTwo,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container_info: {
        flex: 1,
    },
    container_infocomp: {
        marginLeft: 19,
        flexDirection: 'row',
    },
    coverimage: {
        aspectRatio: 1/1,
        width: '100%',
    },
    button: {
        width: 80,
        height: 30,
        marginRight: 17,
        borderRadius: 6,
        backgroundColor: ColorStyle.CoolGrey,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginRight: 8,
    },
    text: {
        flex: 1,
    }
});