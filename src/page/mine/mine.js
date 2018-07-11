/**
 * 校园空兼 - Mine
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
import {Button, Carousel, ListRow} from 'teaset'
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
import {HorizontalLine, VerticalLine} from '../../component/common/commonLine'
import ActionsManager from "../../config/ActionsManager";


@inject('testStore111111')
@observer
export default class Mine extends Component {
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
                <View style={styles.headerLeftView} />
                <TouchableOpacity
                    style={styles.headerRightView}
                    onPress={() => this.onPushToNextPage('消息', 'SystemMessage')}
                >
                    <Image source={Images.icon_message} style={[Theme.headerIcon, {tintColor: '#fff'}]}/>
                    <View style={Theme.pointView} />
                </TouchableOpacity>
            </View>
        );
    };

    onShare = () => {
        const params = {
            type: 'link',
            url: 'https://bbs.hupu.com/22838911.html?share_from=kqapp',
            title: '这是我见过最惨烈的打架了…当然也是最浮夸的演技',
            text: '大清早的看得我笑出了猪叫',
        };
        ActionsManager.showShareModule(params);
    };

    render() {
        let {loading} = this.state;
        return (
            <ScrollView style={styles.container}>
                <NavigationBar
                    title={this.renderNavigationBarView()}
                    style={styles.navigationBarStyle}
                    statusBarStyle={'default'}
                    leftView={null}
                    backgroundImage={null}
                />
                <ImageBackground
                    style={styles.contentTopView}
                    source={Images.img_bg_mine}
                    resizeMode={'cover'}
                >
                    <View style={[styles.contentTopItemView, styles.userAvatarView]}>
                        <Image source={Images.img_avatar_default} style={styles.userAvatar}/>
                    </View>
                    <View style={[styles.contentTopItemView, styles.userNameView]}>
                        <Text style={styles.userName}>大梦</Text>
                        <View style={styles.signInView}>
                            <Text style={styles.signInTips}>签到 +20</Text>
                            <Image source={Images.icon_points_symbol} style={styles.pointsIcon}/>
                        </View>
                    </View>
                    <View style={[styles.contentTopItemView, styles.userAccountView]}>
                        <Text style={styles.userAccountInfo}>剩余工分: {'732工分'}</Text>
                        <VerticalLine lineStyle={styles.verLine} />
                        <Text style={styles.userAccountInfo}>我的余额: {'2350元'}</Text>
                    </View>
                </ImageBackground>

                <View style={styles.contentContainer}>
                    <View style={styles.contentItemView}>
                        <ListRow
                            style={styles.contentTitleView}
                            title={'我的资料'}
                            titleStyle={Theme.contentTitle}
                            icon={<Image source={Images.icon_files} style={[Theme.contentTitleIcon, {}]} />}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[Theme.contentRightIcon, {}]} />}
                            onPress={() => this.onPushToNextPage('我的资料', 'MineProfile', {})}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'我的账户'}
                            titleStyle={Theme.contentTitle}
                            icon={<Image source={Images.icon_cloud} style={[Theme.contentTitleIcon, {}]} />}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[Theme.contentRightIcon, {}]} />}
                            onPress={() => this.onPushToNextPage('我的账户', 'MineAccount', {})}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'我的积分'}
                            titleStyle={Theme.contentTitle}
                            icon={<Image source={Images.icon_points} style={[Theme.contentTitleIcon, {}]} />}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[Theme.contentRightIcon, {}]} />}
                            onPress={() => this.onPushToNextPage('我的积分', 'MinePoints', {})}
                            bottomSeparator={'none'}
                        />
                    </View>
                    <View style={styles.contentItemView}>
                        <ListRow
                            style={styles.contentTitleView}
                            title={'诚信体系'}
                            titleStyle={Theme.contentTitle}
                            icon={<Image source={Images.icon_medal} style={[Theme.contentTitleIcon, {}]} />}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[Theme.contentRightIcon, {}]} />}
                            onPress={() => this.onPushToNextPage('诚信体系', 'MineIntegritySystem', {})}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'工作台'}
                            titleStyle={Theme.contentTitle}
                            icon={<Image source={Images.icon_work_space} style={[Theme.contentTitleIcon, {}]} />}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[Theme.contentRightIcon, {}]} />}
                            onPress={() => this.onPushToNextPage('工作台', 'MineWorkSpace', {})}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'分享APP'}
                            titleStyle={Theme.contentTitle}
                            icon={<Image source={Images.icon_share} style={[Theme.contentTitleIcon, {}]} />}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[Theme.contentRightIcon, {}]} />}
                            onPress={this.onShare}
                            bottomSeparator={'none'}
                        />
                    </View>
                    <View style={[styles.contentItemView, styles.lastContentItemView]}>
                        <ListRow
                            style={styles.contentTitleView}
                            title={'设置'}
                            titleStyle={Theme.contentTitle}
                            icon={<Image source={Images.icon_setting} style={[Theme.contentTitleIcon, {}]} />}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[Theme.contentRightIcon, {}]} />}
                            onPress={() => this.onPushToNextPage('设置', 'Setting', {})}
                            bottomSeparator={'none'}
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    navigationBarStyle: {
        backgroundColor: 'transparent',
        // backgroundColor: '#ff660080',
    },
    headerView: {
        flex: 1,
        paddingHorizontal: 15,
        width: SCREEN_WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
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

    contentView: {
        marginTop: -64,
    },
    lastContentItemView: {
        marginBottom: 30,
    },
    contentTopView: {
        marginTop: -64,
        paddingTop: 64,
        width: SCREEN_WIDTH,
        alignItems: 'center',
        // justifyContent: 'center',
        height: ScaleSize(510),
        // backgroundColor: '#123',
    },
    contentTopItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userAvatarView: {
        // marginTop: 60,
        width: ScaleSize(160),
        height: ScaleSize(160),
        borderRadius: ScaleSize(80),
        overflow: 'hidden',
        backgroundColor: '#f50'
    },
    userAvatar: {
        width: ScaleSize(160),
        height: ScaleSize(160),
        borderRadius: ScaleSize(80),
        resizeMode: 'cover',
    },
    userNameView: {
        marginVertical: ScaleSize(30),
    },
    userName: {
        color: '#fff',
        fontSize: FontSize(15),
    },
    signInView: {
        // width: 115,
        // height: 30,
        paddingVertical: 3,
        paddingHorizontal: 5,
        marginLeft: 20,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f80',
    },
    signInTips: {
        color: '#fff',
        fontSize: FontSize(11),
    },
    pointsIcon: {
        marginLeft: 5,
        width: ScaleSize(35),
        height: ScaleSize(35),
        resizeMode: 'contain',
    },
    userAccountView: {
        // backgroundColor: '#123',
        justifyContent: 'space-between',
    },
    verLine: {
        height: 20,
        marginHorizontal: 30,
    },
    userAccountInfo: {
        color: '#fff',
        fontSize: FontSize(13),
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
});