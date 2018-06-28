/**
 * 校园空兼 - CommonLine
 * https://menger.me
 * @大梦
 */

import React, {PureComponent} from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'

export class VerticalLine extends PureComponent {

    static defaultProps = {
        lineStyle: {},
    };

    render(){
        let {lineStyle} = this.props;
        return (
            <View style={[styles.verLine, lineStyle]} />
        );
    }
}

export class HorizontalLine extends PureComponent {

    static defaultProps = {
        lineStyle: {},
    };

    render(){
        let {lineStyle} = this.props;
        return (
            <View style={[styles.horLine, lineStyle]} />
        );
    }
}

const styles = StyleSheet.create({
    verLine: {
        width: 1,
        backgroundColor: '#f5f5f5'
    },
    horLine: {
        height: 1,
        backgroundColor: '#f5f5f5'
    },
});