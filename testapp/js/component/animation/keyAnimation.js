//
//  keyAnimation.js
//  Split
//
//  Created by Mumakil on 2019. 2. 1..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import { 
    StyleSheet,
    Image, 
    View 
} from 'react-native';
import image from 'asset-image';

/**
 * @protocol KeyAnimation
 * @date 2019/02/01
 * @brief Key 애니메이션
 */
export default class KeyAnimation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fps: 30,        // 기본 프레임
            imageIndex: 0,  // 이미지 인덱스
        };

        this.isPlaying = true;      // 재생 중 여부
        this.isSetTarget = false;   // 타겟 이미지 인덱스 설정 여부
        this.loopCount = this.props.loopCount>0?this.props.loopCount:1; // 반복 재생 횟수
        this.targetIndex = this.props.targetIndex;  // 타겟 이미지 인덱스

        this.calculateImage = this.calculateImage.bind(this);  
        this.setTargetImageIndex = this.setTargetImageIndex.bind(this);
    }

    /**
     * 애니메이션 이후 최종 표시될 타겟 이미지 인덱스 설정
     * @param index 타겟 이미지 인덱스
     */
    setTargetImageIndex(index) {
        this.targetIndex = index;
        this.isSetTarget = true;
    }

    /**
     * 이미지 계산
     */
    calculateImage() {
        if( !this.isSetTarget ) {
            this.props.methodError();
            return;
        }
        var index = this.state.imageIndex;
        var fps = this.props.fps>0?this.props.fps:30;
        
        if( this.isPlaying ) {
            index++;

            if( this.loopCount >= 1 ) {
                if( index > image.KeyList.length ) {
                    this.loopCount--;
                    index = 0;
                }
            }
            
            if( this.loopCount == 0 && index == this.targetIndex ) {
                this.isPlaying = false;
            }
            
            this.setState( {imageIndex: index} );
            
            if( this.isPlaying ) {
                setTimeout( () => { this.calculateImage() }, 1000/fps);
            }
            else {
                this.props.method();
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={image.KeyList[this.state.imageIndex]}>
                </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
  });