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
import CusTheme from '../../config/Theme'

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
        width: CusTheme.minPixel,
        backgroundColor: '#eee'
    },
    horLine: {
        height: CusTheme.minPixel,
        backgroundColor: '#eee'
    },
});