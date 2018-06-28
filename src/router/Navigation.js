/**
 * 校园空兼 - 
 * https://menger.me
 * @大梦
 */
 
'use strict';

import React from 'react'
import {
    View,
    StyleSheet,
} from 'react-native'

import {createStackNavigator} from 'react-navigation'
import {configRoute} from './addToRouteStack'
import StackViewStyleInterpolator from 'react-navigation/src/views/StackView/StackViewStyleInterpolator'
import SplashScreen from 'react-native-splash-screen'

import TabNavigation from './TabNavigation'

import Login from '../page/login/login'
import Register from '../page/login/register'
import RecoverPwd from '../page/login/recoverPwd'

import Home from '../page/home'
import Mine from '../page/mine'

import Setting from '../page/setting'
import VideoPage from '../page/videoPage';
import Chat from '../page/chat';

const Nav = createStackNavigator(configRoute({
    Tab: {
        screen: TabNavigation
    },
    Login: {
        screen: Login
    },
    Register: {
        screen: Register
    },
    RecoverPwd: {
        screen: RecoverPwd
    },
    Mine: {
        screen: Mine
    },
    Setting: {
        screen: Setting
    },
    VideoPage: {
        screen: VideoPage
    },
    Chat: {
        screen: Chat
    },
}), {
    initialRouteName: 'Login',
    cardStyle: {
        shadowOpacity: 0,
        shadowRadius: 0,
        backgroundColor: Theme.pageBackgroundColor,
    },
    navigationOptions: {
        header: null,
        gesturesEnabled: true
    },
    transitionConfig: () => {
        return {
            screenInterpolator: (sceneProps) => {
                return StackViewStyleInterpolator.forHorizontal(sceneProps)
            },
            // containerStyle: {
            //     backgroundColor: 'black',
            // }
        }
    }
});


class Navigation extends React.PureComponent {

    componentDidMount() {
        SplashScreen.hide();
    }

    render() {
        return (
            <View style={styles.container}>
                <Nav/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.pageBackgroundColor,
    },
});


export default Navigation;