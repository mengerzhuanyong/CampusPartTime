/**
 * 校园空兼 - OrderSubmit
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
export default class OrderSubmit extends Component {

    constructor(props) {
        super(props);
        const {shopStore} = this.props;
        let {getCartGoodsInfo} = shopStore;
        let {params} = this.props.navigation.state;
        this.state = {
            flag: params && params.flag ? params.flag : 'work',
            address: getCartGoodsInfo && getCartGoodsInfo.address ? getCartGoodsInfo.address : {
                id: '',
                username: '',
                mobile: '',
                area: [],
                address: '',
            },
            message: '',
        };
    }

    updateContent = (data) => {
        // console.log(data);
        this.setState({
            address: data
        });
    };

    selectedAddress = () => {
        let params = {
            id: this.state.address.id,
            PAGE_FLAG: 'CART',
            updateContent: this.updateContent,
        };
        RouterHelper.navigate('选择地址', 'Address', params);
    };

    onSubmitOrder = async (type) => {
        const {shopStore} = this.props;
        let {message, flag, address} = this.state;
        let receiver_info = address;
        receiver_info.address = address.area + address.address;
        let url = flag === 'point' ? ServicesApi.point_goods_payment : ServicesApi.work_goods_payment;
        let data = {
            goods_id: shopStore.getCartGoodsInfo.id,
            type: shopStore.getCartGoodsInfo.type,
            receiver_info,
            message,
        };
        try {
            let result = await shopStore.onSubmitOrder(url, data);
            // console.log(result);
            if (result && result.code === 1) {
                RouterHelper.navigate('换购完成', 'OrderCompleted');
            } else {
                ToastManager.show(result.msg);
            }
        } catch (e) {
            ToastManager.show('网络请求失败，请稍后重试');
        }
    };

    render() {
        const {shopStore} = this.props;
        let {getCartGoodsInfo} = shopStore;
        let {loading, address} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '订单详情';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <ScrollView style={styles.content}>
                    <View style={[styles.contentItemView, styles.orderGoodsInfoView]}>
                        <View style={styles.orderGoodsPicView}>
                            <Image source={getCartGoodsInfo.illustration.length > 0 ? {uri: getCartGoodsInfo.illustration[0]} : Images.img_goods1} style={styles.orderGoodsPic}/>
                        </View>
                        <View style={styles.orderGoodsTitleView}>
                            <Text style={styles.orderGoodsTitle}>{getCartGoodsInfo.name}</Text>
                            <Text style={styles.orderGoodsPrices}>{getCartGoodsInfo.cart_price}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={[styles.contentItemView, styles.orderUserInfoView]}
                        onPress={this.selectedAddress}
                    >
                        <View style={styles.selectAddressView}>
                            <View style={styles.orderUserInfoCon}>
                                <Text style={[styles.orderUserInfoText, styles.orderUserName]}>收货人：{address.username}</Text>
                                <Text style={[styles.orderUserInfoText, styles.orderUserPhone]}>{address.mobile}</Text>
                            </View>
                            <Text style={[styles.orderUserInfoText, styles.orderUserAddress]}>{address.area}{address.address}</Text>
                        </View>
                        <Image source={Images.icon_arrow_right} style={styles.iconArrowStyle} />
                    </TouchableOpacity>
                    <View style={[styles.contentItemView, styles.orderStatusInfoView]}>
                        {/*<Text style={styles.orderStatusInfoItem}>交易状态：等待收货</Text>*/}
                        <Text style={styles.orderStatusInfoItem}>用户留言：</Text>
                        <TextInput
                            style={styles.inputItem}
                            ref={v => this.input = v}
                            // keyboardType={'numeric'}
                            multiline={true}
                            underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                            placeholder={'请输入留言信息'}
                            placeholderTextColor={'#888'}
                            returnKeyType={'done'}
                            clearButtonMode='while-editing'
                            onChangeText={(text) => {
                                this.setState({
                                    message: text,
                                });
                            }}
                        />
                    </View>
                    <Button
                        title={'提交订单'}
                        style={[CusTheme.btnView, styles.btnView]}
                        titleStyle={[CusTheme.btnName, styles.btnName]}
                        onPress={this.onSubmitOrder}
                    />
                </ScrollView>
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
    orderUserInfoView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectAddressView: {
        flex: 1,
    },
    orderUserInfoCon: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
    },
    orderUserInfoText: {
        color: '#333',
        fontSize: FontSize(14),
        lineHeight: FontSize(20),
    },
    orderUserName: {
    },
    orderUserPhone: {
        color: '#666',
        marginLeft: 10,
        fontSize: FontSize(13),
    },
    orderUserAddress: {
        color: '#666',
        fontSize: FontSize(12),
    },
    iconArrowStyle: {
        width: 20,
        marginLeft: 10,
        resizeMode: 'contain',
    },
    orderStatusInfoView: {},
    orderStatusInfoItem: {
        color: '#444',
        fontSize: FontSize(13),
        lineHeight: FontSize(25),
    },
    inputItem: {
        padding: 5,
        borderWidth: 1,
        minHeight: 100,
        borderRadius: 3,
        borderColor: '#eee',
        textAlignVertical: 'top',
    },
    btnView: {
        marginVertical: 40,
        marginHorizontal: 15,
    },
    btnName: {},
});