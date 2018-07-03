/**
 * 校园空兼 - TabNavigation
 * https://menger.me
 * @大梦
 */

'use strict';

import React from 'react'
import {Image, StyleSheet} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation'
import Home from '../page/home/home'
import Mine from '../page/mine/mine'
import Work from '../page/work/work'
import Shop from '../page/shop/shop'

// import TabBarBottom from '../component/TabBarBottom'

const tabOptions = (params) => {
    return {
        title: params.title,
        tabBarIcon: ({focused, tintColor}) => (
            <Image
                resizeMode="contain"
                style={styles.tabBarIcon}
                source={!focused ? params.normalIcon : params.selectedIcon}
            />
        )
    }
};

const Tab = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: tabOptions({
            title: '首页',
            normalIcon: Images.icon_tabbar_home,
            selectedIcon: Images.icon_tabbar_home_cur
        })
    },
    Work: {
        screen: Work,
        navigationOptions: tabOptions({
            title: '工作',
            normalIcon: Images.icon_tabbar_work,
            selectedIcon: Images.icon_tabbar_work_cur
        })
    },
    Shop: {
        screen: Shop,
        navigationOptions: tabOptions({
            title: '换购',
            normalIcon: Images.icon_tabbar_shop,
            selectedIcon: Images.icon_tabbar_shop_cur
        })
    },
    Mine: {
        screen: Mine,
        navigationOptions: tabOptions({
            title: '我的',
            normalIcon: Images.icon_tabbar_mine,
            selectedIcon: Images.icon_tabbar_mine_cur
        })
    },
}, {
    initialRouteName: 'Mine',
    tabBarOptions: {
        showIcon: true,
        indicatorStyle: {height: 0},
        activeTintColor: Theme.themeColor,
        style: {
            backgroundColor: "#fff"
        },
        tabStyle: {
            margin: 2,
        },
    },
    lazy: true, //懒加载
    swipeEnabled: false,
    animationEnabled: false, //关闭安卓底栏动画
    tabBarPosition: "bottom",
    // tabBarComponent: TabBarBottom,
});


const styles = StyleSheet.create({
    tabBarIcon: {
        height: ScaleSize(40),
        width: ScaleSize(40)
    }
});

export default Tab;
