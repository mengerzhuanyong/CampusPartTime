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
import {scaleSize} from "../../util/Tool"
import {HorizontalLine, VerticalLine} from '../../component/common/commonLine'



@inject('testStore111111')
@observer
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

    renderNavigationBarView = () => {
        return (
            <View style={styles.headerView}>
                <TouchableOpacity style={styles.headerLeftView}>
                    <Image source={Images.icon_place} style={Theme.headerIcon} />
                    <Text style={[Theme.headerIconTitle, styles.headerIconTitle]}>黄岛区</Text>
                </TouchableOpacity>
                <Text style={[Theme.headerTitle, styles.headerTitle]}>工作</Text>
                <TouchableOpacity style={styles.headerRightView}>
                    <Image source={Images.icon_message} style={Theme.headerIcon}/>
                    <View style={Theme.pointView} />
                </TouchableOpacity>
            </View>
        );
    };


    _keyExtractor = (item, index) => {
        return `list_${index}`;
    };

    _captureRef = (v) => {
        this.flatListRef = v;
    };

    renderHeaderComponent = () => {
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
                        onPress={() => {
                            RouteHelper.navigate('SysNotify')
                        }}
                        style={styles.noticeContainer}
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

    renderListItem = ({item}) => {
        return (
            <TouchableOpacity style={styles.jobItemView}>
                <View style={styles.jobItemPicView}>
                    <Image
                        style={styles.jobItemPic}
                        resizeMode={'cover'}
                        source={Images.img_jobs1}
                    />
                </View>
                <View style={styles.jobInfoView}>
                    <View style={[styles.jobInfoItemView, styles.jobInfoTitleView]}>
                        <Text style={styles.jobInfoTitle}>花海地产新盘传单派发</Text>
                        <View style={styles.jobInfoTagsView}>
                            <View style={styles.jobInfoTagItemView}>
                                <Text style={styles.jobInfoTagItemName}>急招</Text>
                            </View>
                            <View style={[styles.jobInfoTagItemView, styles.jobInfoTagIconView]}>
                                <Image source={Images.icon_hot} style={[styles.jobInfoIcon]} />
                            </View>
                        </View>
                    </View>
                    <View style={[styles.jobInfoItemView, styles.marginVerticalView]}>
                        <View style={styles.jobInfoLeftView} />
                        <View style={styles.jobInfoRightView}>
                            <Text style={styles.jobInfoPrice}>12元/h</Text>
                        </View>
                    </View>
                    <View style={styles.jobInfoItemView}>
                        <View style={styles.jobInfoLeftView}>
                            <Image source={Images.icon_user} style={[styles.jobInfoIcon]} />
                            <Text style={styles.jobInfoContext}>报名人数</Text>
                            <Text style={styles.jobInfoContext}>7/20</Text>
                        </View>
                        <View style={styles.jobInfoRightView}>
                            <Text style={styles.jobInfoContext}>0.8工分/h</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    renderSeparator = () => {
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
                />
                <FlatListView
                    style={styles.listContent}
                    ref={this._captureRef}
                    data={listData}
                    enableRefresh={false}
                    enableLoadMore={false}
                    keyExtractor={this._keyExtractor}
                    onRefresh={this._onRefresh}
                    renderItem={this.renderListItem}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent = {this.renderHeaderComponent}
                />
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
        width: scaleSize(25),
        height: scaleSize(10),
        marginRight: 5,
        borderRadius: scaleSize(8),
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    carouselControlCur: {
        backgroundColor: '#fff',
    },
    noticeIcon: {
        width: scaleSize(30),
        height: scaleSize(30),
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
        height: headBackImageW * 0.485,
        marginTop: ScaleSize(12),
        marginLeft: ScaleSize(14),
        borderRadius: ScaleSize(10),
        overflow: 'hidden',
    },
    headBackImage: {
        width: headBackImageW,
        height: headBackImageW * 0.485,
    },
    
    listSortBtnView: {
        marginVertical: 10,
        // padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: '#e5e5e5',
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
        height: scaleSize(30),
        resizeMode: 'contain',
    },


    jobItemView: {
        paddingHorizontal: 15,
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
        width: scaleSize(28),
        height: scaleSize(28),
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