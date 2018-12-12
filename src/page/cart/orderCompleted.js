/**
 * 校园空兼 - OrderCompleted
 * http://menger.me
 * @大梦
 */

'use strict';

import React, {Component} from 'react'
import {
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'

import NavigationBar from '../../component/navigation/NavigationBar'
import SegmentedView from '../../component/segmentedView/index'
import ImageView from '../../component/common/ImageView'
import {inject, observer} from 'mobx-react'
import {Button} from 'teaset'
import FlatListView from '../../component/common/FlatListView'
import AreaContent from '../../component/common/AreaContent'
import Container from '../../component/common/Container';
import Countdown from '../../component/common/Countdown';
import {action} from 'mobx';
import SyanImagePicker from 'react-native-syan-image-picker';
import ImagePicker from 'react-native-image-picker';
import PayManager from '../../config/manager/PayManager'
import Stepper from '../../component/common/Stepper'
import {QRscanner} from 'react-native-qr-scanner'
import {Carousel, ListRow} from 'teaset'
import {HorizontalLine} from '../../component/common/commonLine'
import GoodsItem from "../../component/item/goodsItem";
import GoodsCarousel from "../../component/shop/GoodsCarousel"


@inject('loginStore', 'shopStore')
@observer
export default class OrderCompleted extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            customerMobile: '400-500-6666',
        };
    }

    popToTop = () => {
        RouterHelper.popToTop();
    };

    onSubmitOrder = async (type) => {
        const {shopStore} = this.props;
        let {message} = this.state;
        let url = ServicesApi.work_goods_payment;
        let data = {
            goods_id: this.state.item.id,
            type: 1,
            receiver_info: {
                username: '',
                mobile: '',
                address: '',
            },
            message,
        };
        let result = await shopStore.onSubmitOrder(url, data);
        // console.log(result);
        if (result && result.code === 1) {
            RouterHelper.navigate('', 'OrderSubmit');
        }
    };

    render() {
        const {shopStore} = this.props;
        let {orderTips} = shopStore;
        let {loading, listData, customerMobile} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '订单详情';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <View style={styles.content}>
                    <View style={styles.contentImgView}>
                        <Image source={Images.icon_completed} style={styles.contentImg}/>
                    </View>
                    <View style={styles.contentTitleView}>
                        <Text style={styles.contentTitle}>{orderTips.title || '兑换完成'}</Text>
                        <Text style={styles.contentSubtitle}>{orderTips.context || '线下工作人员将在1-2个工作日与您联系'}</Text>
                    </View>
                    <View style={styles.multiBtnView}>
                        <Button
                            title={'返回'}
                            style={[CusTheme.btnView, styles.btnView]}
                            titleStyle={[CusTheme.btnName, styles.btnName]}
                            onPress={this.popToTop}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    contentImgView: {
        marginTop: ScaleSize(240),
    },
    contentImg: {
        width: ScaleSize(380),
        height: ScaleSize(380),
        resizeMode: 'contain',
    },
    contentTitleView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mobileView: {},
    contentTitle: {
        color: '#333',
        marginTop: 10,
        fontSize: FontSize(15),
    },
    contentSubtitle: {
        color: '#999',
        marginTop: 10,
        fontSize: FontSize(13),
    },

    multiBtnView: {
        margin: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btnView: {
        flex: 1,
    },
    btnName: {},
});