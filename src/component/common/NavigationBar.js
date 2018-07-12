'use strict'
import React, { PureComponent } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native';
import { NavigationBar } from 'teaset';
// create a component
class CusNavigationBar extends PureComponent {
    static propTypes = {
        ...NavigationBar.propTypes
    }

    static defaultProps = {
        ...NavigationBar.defaultProps
    }
    _rightViewOnPress = (p) => {
        this.props.rightViewOnPress && this.props.rightViewOnPress({ event: p, rightView: this.rightView })
    }
    _backOnPress = (p) => {
        if (this.props.backOnPress) {
            this.props.backOnPress({ event: p, backButton: this.leftView })
        } else {
            RouteHelper.goBack()
        }
    }
    render() {
        const { style, backgroundImage, leftIconStyle, title, ...others } = this.props;
        return (
            <NavigationBar
                style={[styles.navBarStyle, style]}
                title={
                    <Text style={styles.navTitle}>{title}</Text>
                }
                background={backgroundImage !== null ?
                    <ImageBackground
                        style={styles.navBackImage}
                        source={Images.img_bg_navbar}
                    /> : null
                }
                rightView={null}
                leftView={
                    <TouchableOpacity
                        ref={v => this.leftView = v}
                        style={styles.navLeft}
                        onPress={this._backOnPress}
                    >
                        <Image
                            source={Images.icon_nav_left}
                            style={[styles.leftImage, leftIconStyle]}
                        />
                    </TouchableOpacity>
                }
                {...others}
            />
        );
    }
}

// define your styles
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

//make this component available to the app
export default CusNavigationBar;
