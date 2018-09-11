'use strict';
import React from 'react';
import { View, Text, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import Theme from '../../config/theme/Theme'
import NavigationTitle from './NavigationTitle'
import NavigationAction from './NavigationAction';

// NavigationAction 左视图或右视图最外层的组件，承载左右视图
// NavigationActionItem  左视图或右视图里的每一个按钮
class NavigationBar extends React.PureComponent {

    static propTypes = {
        title: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.element]),
        titleStyle: Text.propTypes.style,

        renderLeftAction: PropTypes.oneOfType([PropTypes.array, PropTypes.func, PropTypes.element]),
        renderRightAction: PropTypes.oneOfType([PropTypes.array, PropTypes.func, PropTypes.element]),

        backgroundImage: PropTypes.number,

        statusBarStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content',]),
        statusBarColor: PropTypes.string,
        statusBarHidden: PropTypes.bool,
    };

    static defaultProps = {

        statusBarStyle: 'light-content',
        statusBarColor: 'rgba(0, 0, 0, 0)',
        statusBarHidden: false,
    };

    constructor(props) {
        super(props);
        this.state = {navLeftWidth: 0, navRightWidth: 0};
        this.backAction = [
            {
                icon: Images.icon_nav_left,
                iconStyle: { width: 25, height: 25 },
                onPress: this._onPressBack
            }
        ]
    };

    _onPressBack = () => {
        requestAnimationFrame(() => {
            const {onPressBack} = this.props;
            if (onPressBack) {
                onPressBack();
            } else {
                RouterHelper.goBack();
            }
        })
    };

    renderLeftAction = () => {
        const {renderLeftAction} = this.props;
        let newLeftAction;
        if (renderLeftAction) {
            newLeftAction = renderLeftAction;
        } else if (renderLeftAction === undefined) {
            newLeftAction = this.backAction;
        } else {
            return null;
        }
        return (
            <NavigationAction
                onLayout={this._onLayoutLeft}
                style={styles.navLeftContainer}
                renderAction={newLeftAction}
            />
        )
    };

    renderTitle = () => {
        const {title, titleStyle} = this.props;
        const {navLeftWidth, navRightWidth} = this.state;
        if (title) {
            return (
                <NavigationTitle
                    style={styles.navTitleContainer}
                    title={title}
                    titleStyle={titleStyle}
                    maxWidth={Math.max(navLeftWidth, navRightWidth) + Theme.navBarPadding * 2}
                />
            )
        }
        return null;
    };

    renderRightAction = () => {
        const {renderRightAction} = this.props;
        if (renderRightAction) {
            return (
                <NavigationAction
                    onLayout={this._onLayoutRight}
                    style={styles.navRightContainer}
                    renderAction={renderRightAction}
                />
            )
        }
        return null;
    };

    renderImageBackground = () => {
        const {backgroundImage} = this.props;
        if (backgroundImage) {
            return (
                <ImageBackground style={styles.navImageBack} source={backgroundImage}/>
            )
        }
        return null;
    };

    _onLayoutLeft = (event) => {
        const {navLeftWidth} = this.state;
        const width = event.nativeEvent.layout.width;
        if (width !== navLeftWidth) {
            this.setState({navLeftWidth: width});
        }
    };

    _onLayoutRight = (event) => {
        const {navRightWidth} = this.state;
        const width = event.nativeEvent.layout.width;
        if (width !== navRightWidth) {
            this.setState({navRightWidth: width});
        }
    };

    render() {
        const {style, statusBarColor, statusBarStyle, animated, statusBarHidden} = this.props;
        return (
            <View style={[styles.container, style]}>
                <StatusBar
                    translucent={true}
                    backgroundColor={statusBarColor}
                    barStyle={statusBarStyle}
                    animated={animated}
                    hidden={statusBarHidden}
                />
                {this.renderImageBackground()}
                <View style={styles.navContent}>
                    {this.renderLeftAction()}
                    {this.renderTitle()}
                    {this.renderRightAction()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        zIndex: 999,
        width: '100%',
        height: Theme.navBarHeight + Theme.statusBarHeight,
        backgroundColor: Theme.navBarBackgroundColor,
        // borderBottomWidth: 1,
        // borderBottomColor: '#e0e0e0',
    },
    navContent: {
        marginTop: Theme.statusBarHeight,
        height: Theme.navBarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    navTitleContainer: {
        // backgroundColor: 'red',
    },
    navLeftContainer: {
        position: 'absolute',
        left: Theme.navBarPadding,
        justifyContent: 'center',
        // backgroundColor: 'red',
    },
    navRightContainer: {
        position: 'absolute',
        right: Theme.navBarPadding,
        justifyContent: 'center',
        // backgroundColor: 'red',
    },
    navImageBack: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
});

export default NavigationBar