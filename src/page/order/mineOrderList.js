/**
 * 校园空兼 - MineOrderList
 * https://menger.me
 * @大梦
 */


'use strict';

import React, {Component} from 'react';
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
import {inject, observer} from "mobx-react/index";

@inject('loginStore', 'orderStore')
@observer
export default class MineOrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            listData: [1,2,3],
            type: this.props.type,
            status: this.props.status,
        };
        this.page = 1;
        this.pageSize = 10;
    }

    static defaultProps = {
        type: 1,
        status: 0,
    };

    componentDidMount() {
        let {type, status} = this.props;
        this.requestDataSource(this.page, type, status);
    }

    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps---->', nextProps);
        if (nextProps.type !== this.props.type) {
            this.requestDataSource(this.page, nextProps.type, nextProps.status);
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextProps, nextState);
    //     if (nextProps.type === this.props.type && nextProps.status === this.props.status) {
    //         console.log('shouldComponentUpdate----> false');
    //         return false;
    //     }
    //     return true;
    // }

    componentWillUnmount() {
        let timers = [this.timer1, this.timer2];
        ClearTimer(timers);
    }

    _captureRef = (v) => {
        this.flatListRef = v;
    };

    _keyExtractor = (item, index) => {
        return `z_${index}`
    };

    requestDataSource = async (page, type, status) => {
        let {orderStore} = this.props;
        // let {type, status} = this.state;
        console.log('---->',type);
        let url = ServicesApi.my_orders;
        let data = {
            type,
            status,
            page,
            page_size: this.pageSize,
        };
        let result = await orderStore.requestDataSource(url, data, status);
        let endStatus = false;
        if (result && result.code === 1) {
            endStatus = result.data.list_data.length < data.page_size;
        } else {
            endStatus = true;
        }
        this.setState({
            ready: true
        });
        this.flatListRef && this.flatListRef.stopRefresh();
        this.flatListRef && this.flatListRef.stopEndReached({allLoad: endStatus});
    };

    _onRefresh = (stopRefresh) => {
        this.page = 1;
        let {type, status} = this.props;
        this.requestDataSource(this.page, type, status);
    };

    _onEndReached = (stopEndReached) => {
        this.page++;
        let {type, status} = this.props;
        this.requestDataSource(this.page, type, status);
    };

    _renderSeparator = () => {
        return <HorizontalLine style={styles.horLine} />;
    };

    _renderEmptyComponent = () => {
        return (
            <View style={CusTheme.emptyComponentView}>
                <Image
                    style={CusTheme.listEmptyTipsImg}
                    source={Images.img_bg_empty_order}
                />
                <Text style={CusTheme.emptyText}>亲！您还没有相关的订单哦</Text>
                {/*<Button*/}
                {/*title={'去看看'}*/}
                {/*style={styles.btnView}*/}
                {/*titleStyle={styles.btnName}*/}
                {/*onPress={() => RouterHelper.navigate('', 'Work')}*/}
                {/*/>*/}
            </View>
        );
    };

    _renderListItem = ({item, index}) => {
        return (
            <OrderItem
                item={item}
                onPushToDetail={() => this.onPushToDetail(item)}
                {...this.props}
            />
        );
    };

    onPushToDetail = (item) => {
        RouterHelper.navigate('订单详情', 'OrderDetail', {item});
    }

    render() {
        const {orderStore, type, status} = this.props;
        let {loading, listData} = this.state;

        let dataSource = orderStore.dataSource[`${status}`];
        if (!dataSource) {
            return <SpinnerLoading isVisible={true}/>;
        }
        return (
            <View style={styles.container}>
                <FlatListView
                    style={styles.listContent}
                    initialRefresh={true}
                    ref={this._captureRef}
                    data={dataSource}
                    removeClippedSubviews={false}
                    renderItem={this._renderListItem}
                    keyExtractor={this._keyExtractor}
                    onEndReached={this._onEndReached}
                    onRefresh={this._onRefresh}
                    ItemSeparatorComponent={this._renderSeparator}
                    ListEmptyComponent={this._renderEmptyComponent}
                />
            </View>
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
        flex: 1,
        paddingHorizontal: 10,
        width: SCREEN_WIDTH,
        backgroundColor: '#fff',
    },
});