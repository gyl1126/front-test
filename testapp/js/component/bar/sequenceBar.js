//
//  sequenceBar.js
//  Split
//
//  Created by Mumakil on 2019. 3. 4..
//  Copyright © 2019년 Melephant. All rights reserved.
//

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import SequenceBarNumber from 'component-bar/sequenceBarNumber';
import SequenceBarLine from 'component-bar/sequenceBarLine';

/**
 * @protocol SequenceBar
 * @date 2019/03/04
 * @brief 순서 진행 바
 */
export default class SequenceBar extends Component {
    constructor(props) {
        super(props);
    }

    /**
     *  내부 구성요소 렌더링
     */
    renderComponent() {
        var component = [];

        for( var i = 1; i <= this.props.total; i++ ) {
            var containerId = 'container' + i;
            var numberId = 'number' + i;
            var isHighlight = (i == this.props.highlight?true:false);
            component.push( <View key={containerId} style={styles.container_number}>
                                <SequenceBarNumber key={numberId} number={i} highlight={isHighlight}/>
                            </View> );

            if( i < this.props.total ) {
                var lineContainerId = 'linecontainer' + i;
                var lineId = 'line' + i;
                component.push( <View key={lineContainerId} style={styles.container_line}>
                                    <SequenceBarLine key={lineId}/>
                                </View> );
            }
        }

        return component;
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderComponent()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row',
  },
  container_number: {
      height: 27,
      width: 27,
  },
  container_line: {
      height: 27,
      width: 23,
  },
});