/**
 * 校园空兼 - GoodsDetail
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

import NavigationBar from '../../component/common/NavigationBar'
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


export default class GoodsDetail extends Component {
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
        this.page = 1;
    }

    componentDidMount() {
    }

    componentWillUnmount(){
        let timers = [this.timer1, this.timer2];
        // console.log(global.ClearTimer);
        ClearTimer(timers);
    }

    renderNavigationBarView = () => {
        return (
            <View style={styles.headerView}>
                <TouchableOpacity
                    style={styles.headerTitleView}
                    onPress={() => RouterHelper.navigate('搜索', 'Search')}
                >
                    <Image source={Images.icon_search} style={[CusTheme.headerIcon, styles.headerSearchIcon]} />
                    <Text style={[CusTheme.headerIconTitle, styles.headerSearchTitle]}>搜索商品</Text>
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
        this.timer1 = setTimeout(() => {
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
        this.timer2 = setTimeout(() => {
            // 调用停止刷新
            this.flatList.stopRefresh()
        }, 2000);
    };

    _renderSeparator = () => {
        return <HorizontalLine style={styles.horLine} />;
    };

    _renderHeaderComponent = () => {
        return (

            <View style={styles.headerComponentView}>
                <View style={styles.navContentView}>
                    {this.renderNavigationContentView()}
                </View>
                <ListRow
                    style={styles.contentTitleView}
                    title={'热门换购'}
                    titleStyle={CusTheme.contentTitle}
                    icon={<Image source={Images.icon_shop_package} style={[CusTheme.contentTitleIcon, {tintColor: '#ed3126'}]} />}
                    detail={'更多 >>'}
                    accessory={'none'}
                    onPress={() => alert('Press!')}
                />
            </View>
        );
    };

    _renderListItem = (info) => {
        return (
            <GoodsItem />
        );
    };

    render() {
        let {loading, listData} = this.state;
        // listData = [];
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '商品详情';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <ScrollView style={styles.content}>
                    <View style={styles.contentTopView}>
                        <Carousel
                            style={styles.headBackCarousel}
                            control={
                                <Carousel.Control
                                    style={styles.carouselControlView}
                                    dot={<View style={styles.carouselControl}/>}
                                    activeDot={<View style={[styles.carouselControl, styles.carouselControlCur]}/>}
                                />
                            }
                        >
                            <TouchableWithoutFeedback>
                                <ImageBackground
                                    style={styles.headBackImage}
                                    resizeMode={'contain'}
                                    source={Images.img_goods1}
                                />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <ImageBackground
                                    style={styles.headBackImage}
                                    resizeMode={'contain'}
                                    source={Images.img_goods1}
                                />
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback>
                                <ImageBackground
                                    style={styles.headBackImage}
                                    resizeMode={'contain'}
                                    source={Images.img_goods1}
                                />
                            </TouchableWithoutFeedback>

                        </Carousel>
                    </View>
                    <View style={[styles.contentItemView, styles.goodsInfoView]}>
                        <View style={[styles.goodsInfoTopView]}>
                            <View style={[styles.goodsInfoTitleView]}>
                                <Text style={styles.goodsTitle}>苹果 iPhone X 64G 黑色</Text>
                                <View style={styles.goodsInfoTagsView}>
                                    <View style={styles.goodsInfoTagItemView}>
                                        <Text style={styles.goodsInfoTagItemName}>急招</Text>
                                    </View>
                                    <View style={[styles.goodsInfoTagItemView, styles.goodsInfoTagIconView]}>
                                        <Image source={Images.icon_hot} style={[styles.goodsInfoIcon]} />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.goodsInfoPriceView}>
                                <Text style={styles.goodsInfoPriceTips}>¥</Text>
                                <Text style={styles.goodsInfoPriceValue}>8999</Text>
                                <Text style={styles.goodsInfoPriceTips}>元</Text>
                            </View>
                        </View>
                        <View style={styles.goodsInfoWorkPointsView}>
                            <Text style={styles.goodsInfoWorkPoints}>折算工分：</Text>
                            <Text style={styles.goodsInfoWorkPoints}>2200</Text>
                        </View>
                    </View>
                    <View style={[styles.contentItemView, styles.goodsUserInfoView]}>
                        <View style={[styles.contentTitleView]}>
                            <Text style={styles.contentTitle}>【商品介绍】</Text>
                        </View>
                        <View style={styles.goodsUserInfoCon}>
                            <View style={styles.goodsUserInfoConItem}>
                                <Text style={[styles.goodsUserInfoTitle]}>主屏尺寸：</Text>
                                <Text style={[styles.goodsUserInfoText]}>5.8英寸</Text>
                            </View>
                            <View style={styles.goodsUserInfoConItem}>
                                <Text style={[styles.goodsUserInfoTitle]}>主屏尺寸：</Text>
                                <Text style={[styles.goodsUserInfoText]}>5.8英寸</Text>
                            </View>
                            <View style={styles.goodsUserInfoConItem}>
                                <Text style={[styles.goodsUserInfoTitle]}>主屏尺寸：</Text>
                                <Text style={[styles.goodsUserInfoText]}>5.8英寸</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.multiBtnView}>
                        <Button
                            title={'余额换购'}
                            style={[CusTheme.btnView, styles.btnView]}
                            titleStyle={[CusTheme.btnName, styles.btnName]}
                            onPress={() => RouterHelper.navigate('', 'WorkPunchCard')}
                        />
                        <Button
                            title={'工分换购'}
                            style={[CusTheme.btnView, styles.btnView]}
                            titleStyle={[CusTheme.btnName, styles.btnName]}
                            onPress={() => RouterHelper.navigate('', 'WorkPunchCard')}
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
        // backgroundColor: '#123',
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
        width: (SCREEN_WIDTH - 30) / 2,
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
    goodsUserPhone: {},

    goodsInfoView: {
    },
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