/**
 * 校园空兼 - Mine
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
    TouchableWithoutFeedback, RefreshControl,
} from 'react-native'

import NavigationBar from '../../component/navigation/NavigationBar'
import {inject, observer} from 'mobx-react'
import {Button, Carousel, ListRow} from 'teaset'
import {HorizontalLine, VerticalLine} from '../../component/common/commonLine'
import ActionsManager from "../../config/manager/ActionsManager";
import SpinnerLoading from "../../component/common/SpinnerLoading";


const options = {
    imageCount: 1,             // 最大选择图片数目，默认6
    isCamera: true,            // 是否允许用户在内部拍照，默认true
    isCrop: true,             // 是否允许裁剪，默认false
    CropW: ~~(SCREEN_WIDTH * 0.6),    // 裁剪宽度，默认屏幕宽度60%
    CropH: ~~(SCREEN_WIDTH * 0.6),    // 裁剪高度，默认屏幕宽度60%
    showCropFrame: true,       // 是否显示裁剪区域，默认true
    showCropGrid: false,       // 是否隐藏裁剪区域网格，默认false
    quality: 70,                // 压缩质量
    enableBase64: true,
};

@inject('loginStore', 'mineStore', 'systemStore', 'homeStore')
@observer
export default class Mine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            refreshing: false,
        };
        this.page = 0;
    }

    componentDidMount() {
        this.requestDataSource();
    }

    componentWillUnmount() {
        let timers = [this.timer1];
        ClearTimer(timers);
    }

    requestDataSource = async () => {
        const {mineStore} = this.props;
        let url = ServicesApi.mine;
        let data = await mineStore.requestDataSource(url);
        this.setState({loading: true});
    };

    onRefresh = () => {
        this.setState({refreshing: true});
        this.requestDataSource();
        this.timer1 = setTimeout(() => {
            this.setState({refreshing: false});
        }, 1000);
    };

    renderNavigationBarView = (status) => {
        return (
            <View style={styles.headerView}>
                <View style={styles.headerLeftView} />
                <TouchableOpacity
                    style={styles.headerRightView}
                    onPress={() => RouterHelper.navigate('消息', 'SystemMessage')}
                >
                    <View style={styles.headerRightViewCon}>
                        <Image source={Images.icon_message} style={[CusTheme.headerIcon, {tintColor: '#fff'}]}/>
                        {status === 1 && <View style={CusTheme.pointView} />}
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    onSignIn = async () => {
        const {mineStore} = this.props;
        let url = ServicesApi.check_in;
        let result = await mineStore.onSubmitSingIn(url);
        ToastManager.show(result.msg);
        if (result && result.code === 1) {
            this.requestDataSource();
        }
    };

    onShare = async () => {
        const {systemStore} = this.props;
        let {appShareParams} = systemStore;
        let url = ServicesApi.get_app_share;
        if (appShareParams !== '') {
            ActionsManager.showShareModule(appShareParams);
            return;
        }
        try {
            let result = await systemStore.getAppShareParams(url);
            if (result && result.code === 1) {
                ActionsManager.showShareModule(result.data);
            } else {
                ToastManager.show(result.msg);
            }
        } catch (e) {
            // console.log(e);
            ToastManager.show('error');
        }
    };

    handleImage = async () => {
        let result = await ImagePickerManager.showMultipleImagePicker(options);
        if (result.code === 1) {
            let url = ServicesApi.updateAvatar;
            let data = result.data[0].path;
            try {
                let upRes = await FetchData.upload(url, data);
                if (upRes && upRes.code === 1) {
                    this.onRefresh();
                } else {
                    ToastManager.show(result.msg);
                }
            } catch (e) {
                ToastManager.show('error');
            }
        }
    };

    render() {
        let {loading, refreshing} = this.state;
        let {mineStore, homeStore} = this.props;
        let {dataSource} = mineStore;

        // if (mineStore.loading) {
        //     return <SpinnerLoading isVisible={mineStore.loading}/>
        // }
        return (
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        title='Loading...'
                        refreshing={refreshing}
                        onRefresh={this.onRefresh}
                        tintColor="#0398ff"
                        colors={['#0398ff']}
                        progressBackgroundColor="#fff"
                    />
                }
            >
                <NavigationBar
                    title={this.renderNavigationBarView(homeStore.has_message)}
                    style={styles.navigationBarStyle}
                    statusBarStyle={'dark-content'}
                    renderLeftAction={null}
                    backgroundImage={Images.img_bg_nav_bar}
                />
                <ImageBackground
                    style={styles.contentTopView}
                    source={Images.img_bg_mine}
                    resizeMode={'cover'}
                >
                    <TouchableOpacity
                        style={[styles.contentTopItemView, styles.userAvatarView]}
                        onPress={this.handleImage}
                    >
                        <Image source={dataSource.avatar !== '' ? {uri: dataSource.avatar} : Images.img_avatar_default} style={styles.userAvatar}/>
                    </TouchableOpacity>
                    <View style={[styles.contentTopItemView, styles.userNameView]}>
                        <Text style={styles.userName}>{dataSource.nickname}</Text>
                        {dataSource.is_signend === 2 ?
                            <TouchableOpacity
                                style={styles.signInView}
                                onPress={this.onSignIn}
                            >
                                <Text style={styles.signInTips}>签到 +{dataSource.sign_point}</Text>
                                <Image source={Images.icon_points_symbol} style={styles.pointsIcon}/>
                            </TouchableOpacity>
                            :
                            <View style={styles.signInView}>
                                <Text style={styles.signInTips}>已签到</Text>
                            </View>
                        }
                    </View>
                    <View style={[styles.contentTopItemView, styles.userAccountView]}>
                        <Text style={styles.userAccountInfo}>应还工分: {dataSource.work_point}</Text>
                        <VerticalLine lineStyle={styles.verLine} />
                        <Text style={styles.userAccountInfo}>我的余额: {dataSource.balance}</Text>
                    </View>
                </ImageBackground>

                <View style={styles.contentContainer}>
                    <View style={styles.contentItemView}>
                        <ListRow
                            style={styles.contentTitleView}
                            title={'我的资料'}
                            titleStyle={CusTheme.contentTitle}
                            icon={<Image source={Images.icon_files} style={[CusTheme.contentTitleIcon, {}]} />}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[CusTheme.contentRightIcon, {}]} />}
                            // onPress={() => RouterHelper.navigate('我的资料', 'OrderReturn', {})}
                            onPress={() => RouterHelper.navigate('我的资料', 'MineProfile', {})}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'我的账户'}
                            titleStyle={CusTheme.contentTitle}
                            icon={<Image source={Images.icon_cloud} style={[CusTheme.contentTitleIcon, {}]} />}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[CusTheme.contentRightIcon, {}]} />}
                            onPress={() => RouterHelper.navigate('我的账户', 'MineAccount', {})}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'我的积分'}
                            titleStyle={CusTheme.contentTitle}
                            icon={<Image source={Images.icon_points} style={[CusTheme.contentTitleIcon, {}]} />}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[CusTheme.contentRightIcon, {}]} />}
                            onPress={() => RouterHelper.navigate('我的积分', 'MinePoints', {})}
                            // bottomSeparator={'none'}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'我的订单'}
                            titleStyle={CusTheme.contentTitle}
                            icon={<Image source={Images.icon_order_list} style={[CusTheme.contentTitleIcon, {}]} />}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[CusTheme.contentRightIcon, {}]} />}
                            onPress={() => RouterHelper.navigate('我的订单', 'MineOrder', {})}
                            bottomSeparator={'none'}
                        />
                    </View>
                    <View style={styles.contentItemView}>
                        <ListRow
                            style={styles.contentTitleView}
                            title={'诚信体系'}
                            titleStyle={CusTheme.contentTitle}
                            icon={<Image source={Images.icon_medal} style={[CusTheme.contentTitleIcon, {}]} />}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[CusTheme.contentRightIcon, {}]} />}
                            onPress={() => RouterHelper.navigate('诚信体系', 'MineIntegritySystem', {})}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'工作台'}
                            titleStyle={CusTheme.contentTitle}
                            icon={<Image source={Images.icon_work_space} style={[CusTheme.contentTitleIcon, {}]} />}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[CusTheme.contentRightIcon, {}]} />}
                            onPress={() => RouterHelper.navigate('工作台', 'MineWorkSpace', {})}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'分享APP'}
                            titleStyle={CusTheme.contentTitle}
                            icon={<Image source={Images.icon_share} style={[CusTheme.contentTitleIcon, {}]} />}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[CusTheme.contentRightIcon, {}]} />}
                            onPress={this.onShare}
                            bottomSeparator={'none'}
                        />
                    </View>
                    <View style={[styles.contentItemView, styles.lastContentItemView]}>
                        <ListRow
                            style={styles.contentTitleView}
                            title={'设置'}
                            titleStyle={CusTheme.contentTitle}
                            icon={<Image source={Images.icon_setting} style={[CusTheme.contentTitleIcon, {}]} />}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[CusTheme.contentRightIcon, {}]} />}
                            onPress={() => RouterHelper.navigate('设置', 'Setting', {})}
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
        // backgroundColor: 'transparent',
        backgroundColor: '#73d39a00',
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
        color: CusTheme.themeColor,
    },
    headerRightView: {
        right: 15,
        width: 30,
        height: 35,
        position: 'absolute',
        alignItems: 'flex-end',
        justifyContent: 'center',
        // backgroundColor: '#123',
    },
    headerRightViewCon: {},
    leftViewBar: {
        color: '#fff',
        fontSize: FontSize(17),
        paddingLeft: ScaleSize(25),
    },

    contentView: {
        marginTop: CusTheme.systemNavHeight,
    },
    lastContentItemView: {
        marginBottom: 30,
    },
    contentTopView: {
        paddingTop: 74,
        width: SCREEN_WIDTH,
        alignItems: 'center',
        // justifyContent: 'center',
        marginTop: CusTheme.systemNavHeight,
        height: __IOS__ ? ScaleSize(510) : ScaleSize(560),
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
        backgroundColor: 'transparent'
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
        minWidth: 80,
        height: 24,
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