/**
 * 校园空兼 - OrderConfirm
 * https://menger.me
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
import GoodsTagComponent from "../../component/shop/goodsTagComponent";


@inject('loginStore', 'shopStore')
@observer
export default class OrderConfirm extends Component {

    constructor(props) {
        super(props);
        let {params} = this.props.navigation.state;
        this.state = {
            item: params && params.item ? params.item : {id: 1},
            flag: params && params.flag ? params.flag : 'work',
            listData: [1, 2, 3, 4],
        };
    }

    componentDidMount() {
        // this.loadNetData();
    }

    loadNetData = async () => {
        let {flag} = this.state;
        const {shopStore} = this.props;
        let url = flag === 'point' ? ServicesApi.point_goods_details : ServicesApi.workGoodsDetails;
        let data = {
            id: this.state.item.id,
        };
        let result = await shopStore.requestGoodsDetail(url, data);
        // console.log(result);
    };

    onSubmitOrderConfirm = async (type) => {
        let {flag} = this.state;
        let {shopStore} = this.props;
        let {cartGoodsInfo} = shopStore;

        if (cartGoodsInfo.buy_available !== 1) {
            ToastManager.show(cartGoodsInfo.reason);
            return;
        }
        RouterHelper.navigate('', 'OrderSubmit');
    };

    renderDescription = (data) => {
        if (!data || data.length < 1) {
            return;
        }
        let descriptions = data.map((item, index) => {
            let iconView = null;
            if (item.icon === 1) {
                iconView = <Image source={Images.icon_checked} style={styles.iconCheck}/>
            }
            if (item.icon === 2) {
                iconView = <Image source={Images.icon_checked} style={[styles.iconCheck, styles.iconCheckGray]}/>
            }
            return (
                <View style={styles.goodsUserInfoConItem} key={'desc_' + index}>
                    <Text style={[styles.goodsUserInfoTitle]}>{item.name}：</Text>
                    <Text style={[styles.goodsUserInfoText]}>{item.value}</Text>
                    {iconView}
                </View>
            )
        });
        return descriptions;
    };

    render() {
        let {loading, listData} = this.state;
        const {shopStore} = this.props;
        let {cartGoodsInfo} = shopStore;
        // console.log(cartGoodsInfo.illustration);
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '订单确认';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <ScrollView style={styles.content}>
                    <View style={styles.contentTopView}>
                        <GoodsCarousel
                            bannerData={cartGoodsInfo.illustration}
                            {...this.props}
                        />
                    </View>
                    <View style={[styles.contentItemView, styles.goodsInfoView]}>
                        <View style={[styles.goodsInfoTopView]}>
                            <View style={[styles.goodsInfoTitleView]}>
                                <Text style={styles.goodsTitle}>{cartGoodsInfo.name}</Text>
                                <GoodsTagComponent
                                    tagsData={cartGoodsInfo.tags}
                                    {...this.props}
                                />
                            </View>
                            <View style={styles.goodsInfoPriceView}>
                                <Text style={styles.goodsInfoPriceTips}>¥</Text>
                                <Text style={styles.goodsInfoPriceValue}>{cartGoodsInfo.price}</Text>
                                <Text style={styles.goodsInfoPriceTips}>元</Text>
                            </View>
                        </View>
                        <View style={styles.goodsInfoWorkPointsView}>
                            <Text style={styles.goodsInfoWorkPoints}>折算工分：</Text>
                            <Text style={styles.goodsInfoWorkPoints}>{cartGoodsInfo.work_point}</Text>
                        </View>
                    </View>
                    <View style={[styles.contentItemView, styles.goodsUserInfoView]}>
                        <View style={styles.goodsUserInfoCon}>
                            {this.renderDescription(cartGoodsInfo.payment_info)}
                        </View>
                    </View>
                    <View style={styles.multiBtnView}>
                        <Button
                            title={'确认换购'}
                            style={[CusTheme.btnView, styles.btnView]}
                            titleStyle={[CusTheme.btnName, styles.btnName]}
                            onPress={() => this.onSubmitOrderConfirm(1)}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const headBackImageW = SCREEN_WIDTH - ScaleSize(14) * 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentTopView: {
        backgroundColor: '#fff',
    },
    headBackCarousel: {
        width: headBackImageW,
        height: headBackImageW * 0.735,
        marginTop: ScaleSize(12),
        marginLeft: ScaleSize(14),
        borderRadius: ScaleSize(10),
        overflow: 'hidden',
    },
    headBackImage: {
        width: headBackImageW,
        height: headBackImageW * 0.735,
        // backgroundColor: '#f60',
    },
    carouselControlView: {
        marginBottom: 10,
        alignItems: 'flex-end',
    },
    carouselControl: {
        width: ScaleSize(25),
        height: ScaleSize(10),
        marginRight: 5,
        borderRadius: ScaleSize(8),
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    carouselControlCur: {
        backgroundColor: '#fff',
    },


    // 内容区
    content: {
        flex: 1,
    },

    contentItemView: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    goodsTitle: {
        color: '#333',
        marginRight: 5,
        fontSize: FontSize(15),
    },
    goodsUserInfoView: {},
    contentTitleView: {
        // height: 30,
        // justifyContent: 'center',
    },
    contentTitle: {
        color: '#333',
        fontSize: FontSize(16),
        lineHeight: FontSize(25),
    },
    goodsUserInfoCon: {
        marginBottom: 10,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    goodsUserInfoConItem: {
        marginTop: 10,
        width: SCREEN_WIDTH - 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    goodsUserInfoTitle: {
        color: '#333',
        fontSize: FontSize(13),
        lineHeight: FontSize(20),
    },
    goodsUserInfoText: {
        color: '#555',
        fontSize: FontSize(13),
        lineHeight: FontSize(20),
    },
    iconCheck: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginLeft: 5,
    },
    iconCheckGray: {
        tintColor: '#ddd',
    },
    goodsUserPhone: {},

    goodsInfoView: {},
    goodsInfoTopView: {
        flex: 1,
        // height: 100,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: '#f44'
    },
    marginVerticalView: {
        marginVertical: 5,
    },
    goodsInfoItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    goodsInfoTitleView: {
        flex: 1,
        flexWrap: 'wrap',
        marginVertical: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // backgroundColor: '#123',
    },
    goodsInfoTitle: {
        color: '#333',
        lineHeight: 20,
        marginRight: 10,
        marginBottom: 5,
        fontSize: FontSize(14),
    },
    goodsInfoIcon: {
        width: ScaleSize(28),
        height: ScaleSize(28),
        resizeMode: 'contain',
    },
    goodsInfoTagsView: {
        // marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    goodsInfoTagItemView: {
        marginRight: 3,
        borderRadius: 2,
        paddingVertical: 2,
        paddingHorizontal: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: CusTheme.minPixel,
        borderColor: CusTheme.themeColor,
    },
    goodsInfoTagIconView: {
        borderWidth: 0,
        padding: 0,
    },
    goodsInfoTagItemName: {
        color: CusTheme.themeColor,
        fontSize: FontSize(10),
    },
    goodsInfoPriceView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    goodsInfoPriceTips: {
        color: '#f00',
        fontSize: FontSize(14),
    },
    goodsInfoPriceValue: {
        color: '#f00',
        marginHorizontal: 2,
        fontSize: FontSize(20),
        marginBottom: FontSize(3),
    },
    goodsInfoWorkPointsView: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    goodsInfoWorkPoints: {
        color: '#666',
        fontSize: FontSize(13),
    },

    multiBtnView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btnView: {
        flex: 1,
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 10,
    },
    btnName: {},
});