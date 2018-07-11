/**
 * 校园空兼 - InputRightButton
 * https://menger.me
 * @大梦
 */

import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

export default class InputRightButton extends Component {

    static defaultProps = {
        btnViewStyle: null,
        btnStyle: null,
        submitFoo: () => {},
    };

    renderBtnIcon = () => {
        let {type, btnStyle} = this.props;
        if (type === 'clear') {
            return <Image source={Images.icon_close} style={[styles.inputBtnIcon, btnStyle]} />;
        } else if (type === 'password') {
            return <Image source={Images.icon_eye_close} style={[styles.inputBtnIcon, btnStyle]} />;
        } else {
            return <Image source={Images.icon_eye} style={[styles.inputBtnIcon, btnStyle]} />;
        }
    };

    render(){
        let {submitFoo, btnViewStyle} = this.props;
        return (
            <TouchableOpacity
                style = {[styles.inputBtnView, btnViewStyle]}
                onPress = {submitFoo}
            >
                {this.renderBtnIcon()}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    inputBtnView: {
        width: ScaleSize(34),
        height: ScaleSize(34),
    },
    inputBtnIcon: {
        width: ScaleSize(34),
        height: ScaleSize(34),
        tintColor: '#999',
        resizeMode: 'contain',
    },
});