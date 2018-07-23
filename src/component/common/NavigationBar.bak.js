'use strict';

import React, {PureComponent} from 'react'
import {View, Image, ImageBackground, StyleSheet, TouchableOpacity, Text} from 'react-native'
import {NavigationBar} from 'teaset'

class CusNavigationBar extends PureComponent {
    static propTypes = {
        ...NavigationBar.propTypes
    };

    static defaultProps = {
        ...NavigationBar.defaultProps
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    _rightViewOnPress = (p) => {
        this.props.rightViewOnPress && this.props.rightViewOnPress({event: p, rightView: this.rightView})
    };

    _backOnPress = (p) => {
        if (this.props.backOnPress) {
            this.props.backOnPress({event: p, backButton: this.leftView})
        } else {
            RouterHelper.goBack()
        }
    };

    render() {
        const {style, statusBarStyle, leftView, rightViewOnPress, backgroundImage, titleStyle, title, ...others} = this.props;
        return (
            <NavigationBar
                style={[styles.navBarStyle, style]}
                statusBarStyle={statusBarStyle}
                title={
                    <Text style={[styles.navTitle, titleStyle]}>{title}</Text>
                }
                background={ backgroundImage &&
                    <ImageBackground
                        style={styles.navBackImage}
                        source={Images.img_bg_navbar}
                    />
                }
                leftView={
                    <TouchableOpacity
                        ref={v => this.leftView = v}
                        style={styles.navLeft}
                        onPress={this._backOnPress}
                    >
                        <Image
                            source={Images.icon_nav_left}
                            style={styles.leftImage}
                        />
                    </TouchableOpacity>
                }
                rightView={rightViewOnPress}
                {...others}
            />
        );
    }
}

const styles = StyleSheet.create({
    navBarStyle: {
        zIndex: 999,
        position: 'relative',
        backgroundColor: Theme.themeColor,
    },
    navBackImage: {
        flex: 1,
    },
    navRight: {
        width: 30,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navTitle: {
        color: '#fff',
        fontSize: FontSize(15),
    },
    leftImage: {
        width: ScaleSize(55),
        height: ScaleSize(55),
        resizeMode: 'contain',
    },
    navLeft: {}
});

export default CusNavigationBar;
