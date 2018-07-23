/**
 * 校园空兼 - Home
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
import PayManager from '../../config/PayManager'
import Stepper from '../../component/common/Stepper'
import {QRscanner} from 'react-native-qr-scanner'
import {Carousel, ListRow} from 'teaset';
import JobItem from "../../component/item/jobItem";


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.page = 0
    }

    componentDidMount() {
    }

    onPushToNextPage = (pageTitle, component, params = {}) => {
        RouteHelper.navigate(component, {
            pageTitle: pageTitle,
            ...params
        })
    };

    renderNavigationBarView = () => {
        return (
            <View style={styles.headerView}>
                <TouchableOpacity style={styles.headerLeftView}>
                    <Image source={Images.icon_place} style={Theme.headerIcon} />
                    <Text style={[Theme.headerIconTitle, styles.headerIconTitle]}>黄岛区</Text>
                </TouchableOpacity>
                <Text style={[Theme.headerTitle, styles.headerTitle]}>首页</Text>
                <TouchableOpacity
                    style={styles.headerRightView}
                    onPress={() => this.onPushToNextPage('消息', 'SystemMessage')}
                >
                    <Image source={Images.icon_message} style={Theme.headerIcon}/>
                    <View style={Theme.pointView} />
                </TouchableOpacity>
            </View>
        );
    };

    renderListView = (type, data) => {
        if (!data || data.length < 1) {
            return;
        }
        let listView = null;
        if (type === 1) {
            listView = data.map((item, index) => {
                let itemView = <TouchableOpacity style={styles.goodsItemView} key={index}>
                    <ImageBackground
                        style={styles.goodsItemPic}
                        resizeMode={'cover'}
                        source={Images.img_goods1}
                    >
                        <View style={styles.goodsInfoView}>
                            <Text style={styles.goodsTitle}>iPhone X</Text>
                            <Image source={Images.icon_shop_package} style={[Theme.contentTitleIcon]} />
                        </View>
                    </ImageBackground>
                </TouchableOpacity>;
                return itemView;
            });
        }
        if (type === 2) {
            listView = data.map((item, index) => {
                return <JobItem key={index} {...this.props}/>;
            });
        }
        if (type === 3) {
            listView = data.map((item, index) => {
                let itemView = <TouchableOpacity style={styles.goodsItemView} key={index}>
                    <ImageBackground
                        style={styles.goodsItemPic}
                        resizeMode={'cover'}
                        source={Images.img_banner}
                    >
                        <Text>1111</Text>
                        <Image source={Images.icon_shop_package} style={[Theme.contentTitleIcon]} />
                    </ImageBackground>
                </TouchableOpacity>;
                return itemView;
            });
        }
        return listView;
    };

    render() {
        let {loading} = this.state;
        return (
            <Container fitIPhoneX={false} keyboardShouldPersistTaps={true}>
                <NavigationBar
                    title={this.renderNavigationBarView()}
                    style={{
                        backgroundColor: '#fff',
                    }}
                    statusBarStyle={'default'}
                    leftView={null}
                    backgroundImage={null}
                />
                {!loading ? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
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
                                        source={Images.img_banner}
                                    />
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback>
                                    <ImageBackground
                                        style={styles.headBackImage}
                                        resizeMode={'contain'}
                                        source={Images.img_banner}
                                    />
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback>
                                    <ImageBackground
                                        style={styles.headBackImage}
                                        resizeMode={'contain'}
                                        source={Images.img_banner}
                                    />
                                </TouchableWithoutFeedback>

                            </Carousel>
                            <TouchableOpacity
                                style={styles.noticeContainer}
                                onPress={() => this.onPushToNextPage('消息', 'SystemMessage')}
                            >
                                <Image
                                    style={styles.noticeIcon}
                                    source={Images.icon_bell}
                                />
                                <Carousel
                                    style={styles.noticeContainer}
                                    control={false}
                                    horizontal={false}
                                    interval={5000}
                                >
                                    <Text style={styles.noticeContext}>通知公告：校园空兼APP正式内测啦！</Text>
                                    <Text style={styles.noticeContext}>通知公告：校园空兼APP正式内测啦！</Text>
                                </Carousel>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.contentContainer}>
                            <View style={styles.contentItemView}>
                                <ListRow
                                    style={styles.contentTitleView}
                                    title={'热门换购'}
                                    titleStyle={Theme.contentTitle}
                                    icon={<Image source={Images.icon_shop_package} style={[Theme.contentTitleIcon, {tintColor: '#ed3126'}]} />}
                                    detail={'更多 >>'}
                                    accessory={'none'}
                                    onPress={() => this.onPushToNextPage('热门换购', 'GoodsList')}
                                />
                                <View style={[styles.contentItemConView, styles.contentExchangeShopView]}>
                                    <ScrollView style={styles.listRowContent} horizontal={true}>
                                        {this.renderListView(1, [1,2,3])}
                                    </ScrollView>
                                    <View style={styles.contentRightIconView}>
                                        <Image source={Images.icon_arrow_right_list} style={styles.arrowIcon}/>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.contentItemView}>
                                <ListRow
                                    style={styles.contentTitleView}
                                    title={'热门工作推荐'}
                                    titleStyle={Theme.contentTitle}
                                    icon={<Image source={Images.icon_category} style={[Theme.contentTitleIcon, {tintColor: '#2f91eb'}]} />}
                                    detail={'更多 >>'}
                                    accessory={'none'}
                                    onPress={() => this.onPushToNextPage('热门工作推荐', 'Work')}
                                />
                                <View style={styles.contentItemConView}>
                                    {this.renderListView(2, [1,2,3])}
                                </View>
                            </View>
                            <View style={styles.contentItemView}>
                                <ListRow
                                    style={styles.contentTitleView}
                                    title={'积分兑换热榜'}
                                    titleStyle={Theme.contentTitle}
                                    icon={<Image source={Images.icon_points} style={[Theme.contentTitleIcon, {tintColor: '#ffb04a'}]} />}
                                    detail={'更多 >>'}
                                    accessory={'none'}
                                    onPress={() => this.onPushToNextPage('积分兑换热榜', 'GoodsList')}
                                />
                                <View style={[styles.contentItemConView, styles.contentExchangeShopView]}>
                                    <ScrollView style={styles.listRowContent} horizontal={true}>
                                        {this.renderListView(1, [1,2,3])}
                                    </ScrollView>
                                    <View style={styles.contentRightIconView}>
                                        <Image source={Images.icon_arrow_right_list} style={styles.arrowIcon}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>) : null}
            </Container>
        );
    }
}

const headBackImageW = SCREEN_WIDTH - ScaleSize(14) * 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    headerView: {
        flex: 1,
        paddingHorizontal: 15,
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#123'
    },
    headerLeftView: {
        left: 15,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        color: '#333',
        fontSize: FontSize(14),
    },
    headerIconTitle: {
        fontSize: FontSize(11),
        color: Theme.themeColor,
    },
    headerRightView: {
        right: 15,
        // height: 40,
        position: 'absolute',
    },
    leftViewBar: {
        color: '#fff',
        fontSize: FontSize(17),
        paddingLeft: ScaleSize(25),
    },

    noticeContainer: {
        flex: 1,
        height: ScaleSize(35),
        marginLeft: ScaleSize(20),
        marginVertical: ScaleSize(20),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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
    noticeIcon: {
        width: ScaleSize(30),
        height: ScaleSize(30),
        resizeMode: 'contain',
    },
    noticeContext: {
        color: '#f4954e',
        fontSize: FontSize(12),
    },
    contentTopView: {
        backgroundColor: '#fff',
    },
    headBackCarousel: {
        width: headBackImageW,
        height: headBackImageW * 0.452,
        marginTop: ScaleSize(12),
        marginLeft: ScaleSize(14),
        borderRadius: ScaleSize(10),
        overflow: 'hidden',
    },
    headBackImage: {
        width: headBackImageW,
        height: headBackImageW * 0.452,
    },

    contentItemView: {
        marginTop: 10,
    },
    contentTitleView: {
        height: 60,
        alignItems: 'center',
    },
    contentTitle: {
        marginLeft: 10,
        color: '#333',
        fontSize: FontSize(14),
    },
    contentItemConView: {
        padding: 15,
        backgroundColor: '#fff',
    },
    contentExchangeShopView: {
        paddingRight: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    goodsItemView: {
        marginRight: 10,
        borderRadius: 5,
        overflow: 'hidden',
        width: (SCREEN_WIDTH - 50) / 2,
        height: (SCREEN_WIDTH - 150) / 2,
        // backgroundColor: '#123',
    },
    goodsItemPic: {
        justifyContent: 'flex-end',
        width: (SCREEN_WIDTH - 40) / 2,
        height: (SCREEN_WIDTH - 150) / 2,
    },
    goodsInfoView: {
        marginBottom: 10,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    goodsTitle: {
        color: '#fff',
        fontSize: FontSize(13),
    },

    contentRightIconView: {
        width: ScaleSize(35),
        alignItems: 'center',
    },
    arrowIcon: {
        // width: ScaleSize(20),
        height: ScaleSize(40),
        resizeMode: 'contain',
    },
    
    jobItemView: {
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    jobItemPicView: {
        width: 80,
        height: 70,
        marginRight: 10,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f60',
    },
    jobItemPic: {
        width: 80,
        height: 70,
        resizeMode: 'contain',
    },
    jobInfoView: {
        flex: 1,
    },
    marginVerticalView: {
        marginVertical: 5,
    },
    jobInfoItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    jobInfoTitleView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        // backgroundColor: '#123',
    },
    jobInfoTitle: {
        color: '#333',
        fontSize: FontSize(14),
    },
    jobInfoIcon: {
        width: ScaleSize(28),
        height: ScaleSize(28),
        resizeMode: 'contain',
    },
    jobInfoTagsView: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    jobInfoTagItemView: {
        marginRight: 3,
        borderRadius: 2,
        paddingVertical: 2,
        paddingHorizontal: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: Theme.minPixel,
    },
    jobInfoTagIconView: {
        borderWidth: 0,
        padding: 0,
    },
    jobInfoTagItemName: {
        color: Theme.themeColor,
        fontSize: FontSize(10),
    },
    jobInfoLeftView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    jobInfoRightView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // backgroundColor: '#f60',
    },
    jobInfoPrice: {
        color: '#ed3126',
        fontSize: FontSize(15),
    },
    jobInfoContext: {
        color: '#999',
        marginLeft: 5,
        fontSize: FontSize(12),
    },
});