/**
 * 校园空兼 - MineWorkSpace
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
import NavigationBar from '../../component/navigation/NavigationBar'
import SegmentedView from '../../component/segmentedView'
import LRComponent from '../login/LRComponent'
import SpinnerLoading from '../../component/common/SpinnerLoading';
import dismissKeyboard from 'dismissKeyboard' // 键盘miss的方法
import SegmentedControlTab from '../../component/common/SegmentedControlTab'

import MineOrderList from '../order/mineOrderList'
import MineWorkList from "../work/mineWorkList";
import {inject, observer} from "mobx-react/index";

@inject('loginStore', 'workStore')
@observer
export default class MineWorkSpace extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 1,
        };
    }

    componentDidMount() {
        this.requestDataSource();
    }

    requestDataSource = async () => {
        let {workStore} = this.props;
        let url = ServicesApi.workNavigation;
        let result = await workStore.requestWorkNavigation(url);
    };

    render() {
        let {loading, type} = this.state;
        let {workStore} = this.props;
        let {work_nav_arr, getWorkNavigation} = workStore;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '工作台';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <SegmentedControlTab
                    values={getWorkNavigation}
                    tabStyle={styles.tab}
                    showSeparator={true}
                    separatorStyle={styles.separatorStyle}
                    activeTabStyle={styles.activeTabStyle}
                    tabTextStyle={styles.tabTextStyle}
                    activeTabTextStyle={styles.activeTabTextStyle}
                    tabsContainerStyle={styles.tabContainer}
                    onTabPress={(index) => {
                        type = index + 1;
                        this.setState({type});
                        // console.log(index);
                    }}
                />
                <MineWorkList
                    type={type}
                    {...this.props}
                />
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
        height: ScaleSize(120),
        borderBottomWidth: CusTheme.minPixel,
    },
    tab: {
        borderWidth: 0,
        borderColor: '#fff',
        borderBottomWidth: 1,
    },
    separatorStyle: {
        backgroundColor: '#ccc',
    },
    activeTabStyle: {
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        borderColor: CusTheme.themeColor,
    },
    tabTextStyle: {
        color: '#999',
        // borderWidth: 0,
        fontSize: FontSize(15),
    },
    activeTabTextStyle: {
        color: CusTheme.themeColor,
    },


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