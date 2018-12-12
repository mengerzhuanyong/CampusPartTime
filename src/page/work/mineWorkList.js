/**
 * 校园空兼 - MineWorkList
 * http://menger.me
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
import MineJobItem from "../../component/item/mineJobItem";
import {inject, observer} from "mobx-react/index";

@inject('loginStore', 'workStore')
@observer
export default class MineWorkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            listData: [1,2,3],
            type: this.props.type,
            ready: false,
        };
        this.page = 1;
        this.pageSize = 10;
    }

    static defaultProps = {
        type: 1,
    };

    componentDidMount() {
        let {type} = this.props;
        this.requestDataSource(this.page, type);
    }

    componentWillReceiveProps(nextProps) {
        // console.log('componentWillReceiveProps---->', nextProps);
        if (nextProps.type !== this.props.type) {
            this.page = 1;
            this.requestDataSource(this.page, nextProps.type);
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     // console.log(nextProps, nextState);
    //     if (nextProps.type === this.props.type && nextProps.status === this.props.status) {
    //         // console.log('shouldComponentUpdate----> false');
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

    requestDataSource = async (page, type) => {
        let {workStore} = this.props;
        let url = ServicesApi.work_bench;
        let data = {
            type,
            page,
            page_size: this.pageSize,
        };
        let result = await workStore.requestWorkBenchData(url, data);
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

    _onRefresh = async (stopRefresh) => {
        this.page = 1;
        let {type, workStore} = this.props;
        this.requestDataSource(this.page, type);
        let url = ServicesApi.workNavigation;
        let result = await workStore.requestWorkNavigation(url);
    };

    _onEndReached = (stopEndReached) => {
        this.page++;
        let {type} = this.props;
        this.requestDataSource(this.page, type);
    };

    _renderSeparator = () => {
        return <HorizontalLine lineStyle={styles.horLine} />;
    };

    _renderEmptyComponent = () => {
        return (
            <View style={CusTheme.emptyComponentView}>
                <Image
                    style={CusTheme.listEmptyTipsImg}
                    source={Images.img_bg_empty_order}
                />
                <Text style={CusTheme.emptyText}>亲！您还没有参加过兼职哦</Text>
                <Button
                    title={'去看看'}
                    style={[CusTheme.btnView, styles.btnView]}
                    titleStyle={[CusTheme.btnName, styles.btnName]}
                    onPress={() => RouterHelper.navigate('', 'Work')}
                />
            </View>
        );
    };

    _renderListItem = ({item, index}) => {
        return (
            <MineJobItem
                item={item}
                onPushToDetail={() => this.onPushToDetail(item)}
                onCallBack={() => this._onRefresh()}
                {...this.props}
            />
        );
    };

    onPushToDetail = (item) => {
        // if (item.status === 2) {
            RouterHelper.navigate('工作详情', 'MineWorkDetail', {item, onCallBack: () => this._onRefresh()});
        // } else {
        //     RouterHelper.navigate('确认信息', 'WorkSignUpStepThree', {item, flag: 'workspace', onCallBack: () => this._onRefresh()});
        // }
    };

    render() {
        const {workStore, type} = this.props;
        let {loading, ready} = this.state;
        let {workBenchData} = workStore;
        if (!workBenchData) {
            return <SpinnerLoading isVisible={true}/>;
        }
        return (
            <View style={styles.container}>
                {ready ?
                    <FlatListView
                        style={styles.listContent}
                        initialRefresh={true}
                        ref={this._captureRef}
                        data={workBenchData}
                        removeClippedSubviews={false}
                        renderItem={this._renderListItem}
                        keyExtractor={this._keyExtractor}
                        onEndReached={this._onEndReached}
                        onRefresh={this._onRefresh}
                        ItemSeparatorComponent={this._renderSeparator}
                        ListEmptyComponent={this._renderEmptyComponent}
                    />
                    : <SpinnerLoading isVisible={true}/>
                }
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
        width: SCREEN_WIDTH,
        backgroundColor: '#fff',
    },
    horLine: {
        marginVertical: 5,
    },
    btnView: {
        height: 45,
        marginTop: 20,
        borderWidth: 0,
        width: SCREEN_WIDTH / 2,
        backgroundColor: CusTheme.themeColor,
    },
    btnName: {
        color: '#fff',
    },
});