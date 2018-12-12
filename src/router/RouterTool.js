/**
 * 校园空兼 - RouterTool
 * http://menger.me
 * @大梦
 */

'use strict';
import React from 'react'
import {Image, StyleSheet} from 'react-native'
import RouterHelper from './RouterHelper'
import hoistNonReactStatics from 'hoist-non-react-statics'

export const tabOptions = (params) => {
    return {
        title: params.title,
        tabBarIcon: ({focused, tintColor}) => (
            <Image
                resizeMode="contain"
                style={[styles.iconStyle]}
                source={!focused ? params.normalIcon : params.selectedIcon}
            />
        )
    }
};

export const configRouter = (routeConfig) => {
    for (let name in routeConfig) {
        let Component = routeConfig[name].screen;
        routeConfig[name].screen = createNavigationContainer(Component)
    }
    return routeConfig
}

// 高阶组件
export const createNavigationContainer = (OldComponent) => {

    class NewComponent extends React.PureComponent {

        static displayName = `todoNavigationContainer(${OldComponent.displayName ||
            OldComponent.name})`;

        constructor(props) {
            super(props)
            this.subscriptions = []
        }

        componentDidMount() {
            requestAnimationFrame(() => {
                this._addNavigation()
            })
        };

        componentWillUnmount() {
            requestAnimationFrame(() => {
                this._removeNavigation()
            })
        };

        _addNavigation = () => {
            const { navigation } = this.props
            RouterHelper.addStack(navigation);
            this.subscriptions = [
                navigation.addListener('willBlur', (payload) => {
                    this._oldComponentRef && this._oldComponentRef.componentWillBlur && this._oldComponentRef.componentWillBlur(payload)
                }),
                navigation.addListener('willFocus', (payload) => {
                    this._oldComponentRef && this._oldComponentRef.componentWillFocus && this._oldComponentRef.componentWillFocus(payload)
                }),
                navigation.addListener('didFocus', (payload) => {
                    this._oldComponentRef && this._oldComponentRef.componentDidFocus && this._oldComponentRef.componentDidFocus(payload)
                }),
                navigation.addListener('didBlur', (payload) => {
                    this._oldComponentRef && this._oldComponentRef.componentDidBlur && this._oldComponentRef.componentDidBlur(payload)
                }),
            ]
        }

        _removeNavigation = () => {
            const { navigation } = this.props
            RouterHelper.remove(navigation);
            this.subscriptions.forEach(listener => listener && listener.remove());
        }

        _captureRef = (v) => {
            this._oldComponentRef = v
        };

        render() {
            return (
                <OldComponent
                    ref={this._captureRef}
                    {...this.props}
                />
            )
        }
    }

    return hoistNonReactStatics(NewComponent, OldComponent)
};

const styles = StyleSheet.create({
    iconStyle: {
        width: ScaleSize(40),
        height: ScaleSize(40),
    }
});