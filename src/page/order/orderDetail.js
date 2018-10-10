/**
 * 校园空兼 - OrderDetail
 * https://menger.me
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
import SegmentedView from '../../component/segmentedView'
import LRComponent from '../login/LRComponent'
import SpinnerLoading from '../../component/common/SpinnerLoading';
import dismissKeyboard from 'dismissKeyboard' // 键盘miss的方法
import {observer, inject} from 'mobx-react';
import SegmentedControlTab from '../../component/common/SegmentedControlTab'
import {Button} from 'teaset'

import MineOrderList from './mineOrderList'

@inject('loginStore', 'mineStore', 'orderStore')
@observer
export default class OrderDetail extends Component {

    constructor(props) {
        super(props);
        let {params} = this.props.navigation.state;
        this.state = {
            listData: [1, 2, 3, 4],
            item: params && params.item ? params.item : {
                order_data: {},
                goods_data: {},
            },
            ready: false,
        };
    }
    
    componentDidMount() {
        this.requestOrderDetail();
        this.timer1 = setTimeout(() => {
            this.setState({ready: true});
        }, 200);
    }

    componentWillUnmount() {
        let timers = [this.timer1, this.timer2];
        ClearTimer(timers);
    }

    requestOrderDetail = async () => {
        const {orderStore} = this.props;
        let {item} = this.state;
        let url = ServicesApi.order_details;
        let data = {
            type: item.type,
            order_id: item.id,
        };
        let result = await orderStore.requestOrderDetail(url, data);
    };

    confirmPickUpOrder = (item) => {
        const params = {
            title: '温馨提示',
            detail: '您确认收到货物了吗',
            actions: [
                {
                    title: '取消',
                    onPress: () => {
                    },
                },
                {
                    title: '确定',
                    onPress: () => this.submitPickUpOrder(item),
                }
            ]
        };
        AlertManager.show(params);
    };

    submitPickUpOrder = async (item) => {
        const {orderStore} = this.props;
        let url = ServicesApi.receipt;
        let data = {
            type: item.type,
            order_id: item.id,
        };
        let result = await orderStore.submitPickUpOrder(url, data);
        if (result && result.code === 1) {
            this.requestOrderDetail();
        }
    };
    
    render() {
        let {loading, item, ready} = this.state;
        const {orderStore} = this.props;
        let {orderDetail} = orderStore;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '订单详情';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                {ready ?
                    <ScrollView style={styles.content}>
                        <View style={[styles.contentItemView, styles.orderGoodsInfoView]}>
                            <View style={styles.orderGoodsPicView}>
                                <Image source={orderDetail.goods_data.img_url ? {uri: orderDetail.goods_data.img_url} : Images.img_goods1} style={styles.orderGoodsPic}/>
                            </View>
                            <View style={styles.orderGoodsTitleView}>
                                <Text style={styles.orderGoodsTitle}>{orderDetail.goods_data.name}</Text>
                                <Text style={styles.orderGoodsPrices}>{orderDetail.goods_data.price}</Text>
                            </View>
                        </View>
                        <View style={[styles.contentItemView, styles.orderUserInfoView]}>
                            <View style={styles.orderUserInfoCon}>
                                <Text style={[styles.orderUserName, styles.orderUserInfoText]}>收货人：{orderDetail.order_data.member_name}</Text>
                                <Text style={[styles.orderUserPhone, styles.orderUserInfoText]}>{orderDetail.order_data.mobile}</Text>
                            </View>
                            <Text style={[styles.orderUserAddress, styles.orderUserInfoText]}>{orderDetail.order_data.address}</Text>
                        </View>
                        <View style={[styles.contentItemView, styles.orderStatusInfoView]}>
                            <Text style={styles.orderStatusInfoItem}>交易状态：{orderDetail.order_data.status_name}</Text>
                            <Text style={styles.orderStatusInfoItem}>下单时间：{orderDetail.order_data.create_time}</Text>
                            {orderDetail.order_data.pay_balance > 0 && <Text style={styles.orderStatusInfoItem}>支付金额：¥{parseFloat(orderDetail.order_data.pay_balance).toFixed(2)}</Text>}
                            {item.type === 1 && <Text style={styles.orderStatusInfoItem}>还需偿还工分：{orderDetail.order_data.pay_work_point}</Text>}
                        </View>
                        <Button
                            title={orderDetail.order_data.status === 1 ? '确认收货' : '申请退换货'}
                            style={[CusTheme.btnView, styles.btnView]}
                            titleStyle={[CusTheme.btnName, styles.btnName]}
                            onPress={() => {
                                if (orderDetail.order_data.status === 1) {
                                    this.confirmPickUpOrder(item);
                                } else {
                                    RouterHelper.navigate('申请退换货', 'MineRepayment', {flag: 'order'});
                                }
                            }}
                        />
                    </ScrollView>
                    : <SpinnerLoading isVisible={true} />
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

    contentItemView: {
        padding: 15,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    orderGoodsInfoView: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    orderGoodsPicView: {
        marginRight: 15,
        width: ScaleSize(280),
    },
    orderGoodsPic: {
        width: ScaleSize(280),
        height: ScaleSize(230),
        resizeMode: 'contain',
    },
    orderGoodsTitleView: {
        flex: 1,
        height: ScaleSize(230),
        justifyContent: 'space-around',
    },
    orderGoodsTitle: {
        color: '#333',
        fontSize: FontSize(15),
    },
    orderGoodsPrices: {
        color: '#ed3126',
        fontSize: FontSize(15),
    },
    orderUserInfoView: {},
    orderUserInfoCon: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    orderUserInfoText: {
        color: '#333',
        fontSize: FontSize(14),
        lineHeight: FontSize(20),
    },
    orderUserName: {},
    orderUserPhone: {},
    orderUserAddress: {},
    orderStatusInfoView: {},
    orderStatusInfoItem: {
        color: '#333',
        fontSize: FontSize(14),
        lineHeight: FontSize(25),
    },

    btnView: {
        marginVertical: 40,
        marginHorizontal: 15,
    },
    btnName: {},
});