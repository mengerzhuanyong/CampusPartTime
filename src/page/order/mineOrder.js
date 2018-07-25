/**
 * 校园空兼 - MineOrder
 * https://menger.me
 * @大梦
 */

'use strict';

import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Alert,
    Animated,
    TextInput,
    ScrollView,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import NavigationBar from '../../component/common/NavigationBar'
import SegmentedView from '../../component/segmentedView'
import LRComponent from '../login/LRComponent'
import SpinnerLoading from '../../component/common/SpinnerLoading';
import dismissKeyboard from 'dismissKeyboard' // 键盘miss的方法
import { observer, inject } from 'mobx-react';
import SegmentedControlTab from '../../component/common/SegmentedControlTab'

import MineOrderList from './mineOrderList'

export default class MineOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listData: [1,2,3,4],
        };
    }

    onPushToNextPage = (pageTitle, component, params = {}) => {
        RouterHelper.navigate(component, {
            pageTitle: pageTitle,
            ...params
        })
    };

    render() {
        let {loading, listData} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '我的订单';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <SegmentedControlTab
                    values={['换购订单', '积分订单']}
                    tabStyle={styles.tab}
                    activeTabStyle={styles.activeTabStyle}
                    tabTextStyle={styles.tabTextStyle}
                    activeTabTextStyle={styles.activeTabTextStyle}
                    tabsContainerStyle={styles.tabContainer}
                    onTabPress={(index) => {
                        // console.log(index);
                    }}
                />
                <SegmentedView
                    ref={v => this.segmentedView = v}
                    style={styles.segmentedView}
                    barStyle={styles.segmentedBar}
                    indicatorLineColor={CusTheme.themeColor}
                    indicatorPositionPadding={ScaleSize(-4)}
                    scrollEnabled={true}
                    lazy={false}
                    keyboardShouldPersistTaps={'always'}
                >
                    <MineOrderList
                        title={'全部'}
                        style={styles.navBarItemView}
                        titleStyle={styles.sheetTitle}
                        activeTitleStyle={styles.sheetActiveTitle}
                    />
                    <MineOrderList
                        title={'待收货'}
                        style={styles.navBarItemView}
                        titleStyle={styles.sheetTitle}
                        activeTitleStyle={styles.sheetActiveTitle}
                    />
                    <MineOrderList
                        title={'已收货'}
                        style={styles.navBarItemView}
                        titleStyle={styles.sheetTitle}
                        activeTitleStyle={styles.sheetActiveTitle}
                    />
                    <MineOrderList
                        title={'退换货'}
                        style={styles.navBarItemView}
                        titleStyle={styles.sheetTitle}
                        activeTitleStyle={styles.sheetActiveTitle}
                    />
                </SegmentedView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    tabContainer: {
        borderWidth: 0,
        height: ScaleSize(90),
        borderRadius: ScaleSize(45),
        marginVertical: ScaleSize(30),
        marginHorizontal: ScaleSize(30),
    },
    tab: {
        borderWidth: 0,
    },
    activeTabStyle: {
        backgroundColor: CusTheme.themeColor,
    },
    tabTextStyle: {
        color: '#999',
        borderWidth: 0,
        fontSize: FontSize(15),
    },
    activeTabTextStyle: {},


    segmentedView: {
    },
    segmentedBar: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
        height: ScaleSize(90),
    },
    sheetActiveTitle: {
        color: CusTheme.themeColor,
        fontSize: FontSize(14),
    },
    sheetTitle: {
        color: '#999',
        fontSize: FontSize(14),
    },
    navBarItemView: {
        width: SCREEN_WIDTH,
        backgroundColor: '#123',
    },
});