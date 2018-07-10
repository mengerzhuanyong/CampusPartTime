/**
 * 校园空兼 - MineOrderList
 * https://menger.me
 * @大梦
 */


'use strict';

import React, {PureComponent} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView
} from 'react-native';
import FlatListView from '../../component/common/FlatListView'
import {Button, ListRow} from 'teaset';
import PropTypes from 'prop-types'
import SpinnerLoading from '../../component/common/SpinnerLoading'
import moduleName from 'jshare-react-native';
import {checkMobile, checkPassword} from '../../util/Tool';
import GoodsItem from '../../component/item/goodsItem'
import {HorizontalLine, VerticalLine} from "../../component/common/commonLine";
import OrderItem from "../../component/item/orderItem";

export default class MineOrderList extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            navigation: [
                {id: 1, title: '手机', icon: Images.icon_nav_mobile,},
                {id: 2, title: '电脑', icon: Images.icon_nav_pc,},
                {id: 3, title: '平板', icon: Images.icon_nav_pad,},
                {id: 4, title: '外设', icon: Images.icon_nav_mouse,},
                {id: 5, title: '单反', icon: Images.icon_nav_camera,},
            ],
            listData: [
                {id: 1, title: '手机', icon: Images.icon_nav_mobile,},
                {id: 2, title: '电脑', icon: Images.icon_nav_pc,},
                {id: 3, title: '平板', icon: Images.icon_nav_pad,},
                {id: 4, title: '外设', icon: Images.icon_nav_mouse,},
                {id: 5, title: '单反', icon: Images.icon_nav_camera,},
            ],
        };
        this.page = 0;
    }

    componentDidMount() {
    }

    renderNavigationBarView = () => {
        return (
            <View style={styles.headerView}>
                <TouchableOpacity style={styles.headerTitleView}>
                    <Image source={Images.icon_search} style={[Theme.headerIcon, styles.headerSearchIcon]} />
                    <Text style={[Theme.headerIconTitle, styles.headerSearchTitle]}>搜索商品</Text>
                </TouchableOpacity>
            </View>
        );
    };

    renderNavigationContentView = () => {
        let data = this.state.navigation;
        if (!data || data.length < 1) {
            return;
        }
        let navigation = data.map((item, index) => {
            return (
                <TouchableOpacity
                    key={item.id}
                    style={styles.navItemView}
                >
                    <Image source={item.icon} style={styles.navIcon}/>
                    <Text style={styles.navTitle}>{item.title}</Text>
                </TouchableOpacity>
            );
        });
        return navigation;
    };

    _captureRef = (v) => {
        this.flatList = v;
    };

    _keyExtractor = (item, index) => {
        return `z_${index}`
    };

    // 上拉加载
    _onEndReached = () => {
        setTimeout(() => {
            let dataTemp = this.state.listData;
            let allLoad = false;
            //模拟数据加载完毕,即page > 0,
            if (this.page < 2) {
                this.setState({ data: dataTemp.concat(this.state.listData) });
            }
            // allLoad 当全部加载完毕后可以设置此属性，默认为false
            this.flatList.stopEndReached({ allLoad: this.page === 2 });
            this.page++;
        }, 2000);
    };

    // 下拉刷新
    _onRefresh = () => {
        setTimeout(() => {
            // 调用停止刷新
            this.flatList.stopRefresh()
        }, 2000);
    };

    _renderSeparator = () => {
        return <HorizontalLine style={styles.horLine} />;
    };

    _renderEmptyComponent = () => {
        return (
            <View style={Theme.emptyComponentView}>
                <Image
                    style={Theme.listEmptyTipsImg}
                    source={Images.img_bg_empty_order}
                />
                <Text style={Theme.emptyText}>亲！您还没有相关的订单哦</Text>
                {/*<Button*/}
                    {/*title={'去看看'}*/}
                    {/*style={styles.btnView}*/}
                    {/*titleStyle={styles.btnName}*/}
                    {/*onPress={() => this.onPushToNextPage('', 'Work')}*/}
                {/*/>*/}
            </View>
        );
    };

    _renderListItem = (info) => {
        return (
            <OrderItem />
        );
    };

    render() {
        let {loading, listData} = this.state;
        listData = [];
        return (
            <FlatListView
                style={styles.listContent}
                initialRefresh={false}
                ref={this._captureRef}
                data={listData}
                removeClippedSubviews={false}
                renderItem={this._renderListItem}
                keyExtractor={this._keyExtractor}
                onEndReached={this._onEndReached}
                onRefresh={this._onRefresh}
                ItemSeparatorComponent={this._renderSeparator}
                ListEmptyComponent={this._renderEmptyComponent}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // 内容区
    content: {
        flex: 1,
    },
    headerComponentView: {},
    // 列表区
    listContent: {
        paddingHorizontal: 10,
        width: SCREEN_WIDTH,
        backgroundColor: '#fff',
    },
});