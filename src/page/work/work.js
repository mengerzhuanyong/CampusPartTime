/**
 * 校园空兼 - Work
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
import Container from '../../component/common/Container'
import Countdown from '../../component/common/Countdown'
import {action} from 'mobx';
import SyanImagePicker from 'react-native-syan-image-picker'
import ImagePicker from 'react-native-image-picker';
import PayManager from '../../config/PayManager'
import Stepper from '../../component/common/Stepper'
import {QRscanner} from 'react-native-qr-scanner'
import {Carousel, ListRow} from 'teaset'
import {HorizontalLine, VerticalLine} from '../../component/common/commonLine'
import JobItem from "../../component/item/jobItem";



export default class Work extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            listData: [1,2,3],
        };
        this.page = 0
    }

    async componentDidMount() {
        let url = ServicesApi.index;
        let data = {
            id: 1,
        };
        let result = await Services.post(url, data, true, 'index');
        console.log(result);
    }

    componentWillUnmount(){
        let timers = [this.timer1, this.timer2];
        ClearTimer(timers);
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
                <Text style={[Theme.headerTitle, styles.headerTitle]}>工作</Text>
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
            <View style={styles.listHeaderComponent}>
                <ScrollView style={styles.contentTopView}>
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
                </ScrollView>
                <View style={styles.listSortBtnView}>
                    <TouchableOpacity style={styles.sortBtnItemView}>
                        <Text style={styles.sortBtnItemName}>全部职位</Text>
                        <Image source={Images.icon_arrow_down} style={styles.sortBtnIcon} />
                    </TouchableOpacity>
                    <VerticalLine lineStyle={styles.sortVerLine} />
                    <TouchableOpacity style={styles.sortBtnItemView}>
                        <Text style={styles.sortBtnItemName}>全部职位</Text>
                        <Image source={Images.icon_arrow_down} style={styles.sortBtnIcon} />
                    </TouchableOpacity>
                    <VerticalLine lineStyle={styles.sortVerLine} />
                    <TouchableOpacity style={styles.sortBtnItemView}>
                        <Text style={styles.sortBtnItemName}>全部职位</Text>
                        <Image source={Images.icon_arrow_down} style={styles.sortBtnIcon} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    _renderListItem = ({item}) => {
        return (
            <JobItem
                onPress={() => this.onPushToNextPage('兼职详情', 'WorkDetail')}
            />
        );
    };

    _renderSeparator = () => {
        return <HorizontalLine lineStyle={styles.horLine} />
    };

    render() {
        let {loading, listData} = this.state;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.renderNavigationBarView()}
                    style={{
                        backgroundColor: '#fff',
                    }}
                    statusBarStyle={'default'}
                    leftView={null}
                    backgroundImage={null}
                />
                <FlatListView
                    style={styles.listContent}
                    initialRefresh={false}
                    ref={this._captureRef}
                    removeClippedSubviews={false}
                    data={this.state.listData}
                    renderItem={this._renderListItem}
                    keyExtractor={this._keyExtractor}
                    onEndReached={this._onEndReached}
                    onRefresh={this._onRefresh}
                    ItemSeparatorComponent={this._renderSeparator}
                    ListHeaderComponent={this._renderHeaderComponent}
                />
                <TouchableOpacity
                    style={styles.btnView}
                    onPress={() => this.onPushToNextPage('平台分配工作', 'AutoGetWork')}
                >
                    <Image source={Images.img_platform} style={styles.btnIcon} />
                </TouchableOpacity>
            </View>
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
        position: 'absolute',
    },
    leftViewBar: {
        color: '#fff',
        fontSize: FontSize(17),
        paddingLeft: ScaleSize(25),
    },

    listContent: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listHeaderComponent: {},
    horLine: {
        marginVertical: 5,
        backgroundColor: '#d9d9d9',
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

    listSortBtnView: {
        marginVertical: 10,
        // padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: '#eee',
        borderBottomColor: '#d9d9d9',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        borderTopWidth: 10,
        borderBottomWidth: Theme.minPixel,
    },
    sortVerLine: {
        height: 20,
        backgroundColor: '#d9d9d9',
    },
    sortBtnItemView: {
        flex: 1,
        height: 55,
        // backgroundColor: '#123',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sortBtnItemName: {
        color: '#666',
        fontSize: FontSize(12),
    },
    sortBtnIcon: {
        marginLeft: 5,
        height: ScaleSize(30),
        resizeMode: 'contain',
    },
    btnView: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    btnIcon: {
        width: ScaleSize(110),
        height: ScaleSize(110),
        resizeMode: 'contain',
    },
});