/**
 * 校园空兼 - MineOrder
 * http://menger.me
 * @大梦
 */

'use strict';

import React, {Component} from 'react';
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
import LRComponent from '../login/LRComponent'
import SpinnerLoading from '../../component/common/SpinnerLoading';
import dismissKeyboard from 'dismissKeyboard' // 键盘miss的方法
import {observer, inject} from 'mobx-react';
import SegmentedControlTab from '../../component/common/SegmentedControlTab'

import MineOrderList from './mineOrderList'
import ResourceStore from "../../store/resourceStore";
import SegmentedView from "../../component/segmented/SegmentedView";

@inject('loginStore', 'mineStore', 'resourceStore')
@observer
export default class MineOrder extends React.Component {

    constructor(props) {
        super(props);
        let {params} = this.props.navigation.state;
        this.state = {
            type: params && params.type ? params.type : 1,
            curIndex: 0,
            nav_arr: [
                {title: '全部', status: 0},
                {title: '待收货', status: 1},
                {title: '已收货', status: 2},
                {title: '退换货', status: 4},
            ]
        };
    }

    componentDidMount() {
        this.requestNavigationArray();
    }

    requestNavigationArray = async () => {
        const {resourceStore} = this.props;
        let url = ServicesApi.navigation_arr;
        let result = await resourceStore.requestNavigationArray(url);
    };

    renderSegmentedTabView = (data) => {
        let {type} = this.state;
        // if (!data || data.length < 1) {
        //     return;
        // }
        // console.log(data);
        let tabView = data.map((item, index) => {
            return (
                <View
                    key={item.status}
                    title={item.title}
                    style={styles.navBarItemView}
                    titleStyle={styles.sheetTitle}
                    activeTitleStyle={styles.sheetActiveTitle}
                >
                    <MineOrderList
                        type={type}
                        status={item.status}
                        {...this.props}
                    />
                </View>
            );
        });
        return tabView;
    };

    render() {
        let {loading, nav_arr, type} = this.state;
        let {resourceStore} = this.props;
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
                    selectedIndex={type - 1}
                    activeTabStyle={styles.activeTabStyle}
                    tabTextStyle={styles.tabTextStyle}
                    activeTabTextStyle={styles.activeTabTextStyle}
                    tabsContainerStyle={styles.tabContainer}
                    onTabPress={(index) => {
                        let type = index + 1;
                        this.setState({type});
                    }}
                />
                {resourceStore.navigationArray.length > 0 ?
                    <SegmentedView
                        ref={v => this.segmentedView = v}
                        style={styles.segmentedView}
                        barStyle={styles.segmentedBar}
                        indicatorLineColor={CusTheme.themeColor}
                        indicatorPositionPadding={ScaleSize(-4)}
                        scrollEnabled={true}
                        // lazy={false}
                        keyboardShouldPersistTaps={'always'}
                    >
                        {this.renderSegmentedTabView(resourceStore.navigationArray)}
                    </SegmentedView>
                    : <SpinnerLoading isVisible={true}/>
                }
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


    segmentedView: {},
    segmentedBar: {
        borderBottomWidth: 1,
        borderColor: '#ddd',
        height: ScaleSize(90),
    },
    sheetActiveTitle: {
        color: CusTheme.themeColor,
        fontSize: FontSize(13),
    },
    sheetTitle: {
        color: '#999',
        fontSize: FontSize(13),
    },
    navBarItemView: {
        flex: 1,
        width: SCREEN_WIDTH,
        // height: SCREEN_HEIGHT,
        // backgroundColor: '#123',
    },
});