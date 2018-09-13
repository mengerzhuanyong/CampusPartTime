'use strict';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, } from 'react-native';
import PropTypes from 'prop-types';

class NavigationActionItem extends React.PureComponent {

    static propTypes = {
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]),
        titleStyle: Text.propTypes.style,
        icon: PropTypes.number,
        iconStyle: Image.propTypes.style,
        onPress: PropTypes.func,
    };

    static defaultProps = {

    };

    _onPress = () => {
        requestAnimationFrame(() => {
            const {title, onPress} = this.props;
            onPress && onPress(title);
        })
    };

    render() {
        const {title, titleStyle, icon, iconStyle} = this.props;
        return (
            <TouchableOpacity
                style={styles.actionTouch}
                onPress={this._onPress}>
                {icon ? <Image resizeMode={'contain'} style={[styles.actionImage, iconStyle]} source={icon} /> : null}
                {title ? <Text style={[styles.actionTitle, titleStyle]}>{title}</Text> : null}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    actionTouch: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 7,
    },
    actionTitle: {
        color: '#fff',
        fontSize: FontSize(11),
    },
    actionImage: {
        width: 25,
        height: 25,
    }
});

export default NavigationActionItem;