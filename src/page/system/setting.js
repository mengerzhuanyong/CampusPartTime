/**
 * 校园空兼 - Setting
 * https://menger.me
 * @大梦
 */

'use strict';

import React, { Component } from 'react'
import {
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    Linking,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'

import NavigationBar from '../../component/navigation/NavigationBar'
import {ListRow, Button} from 'teaset'
import {observer, inject} from "mobx-react";

@inject('loginStore', 'systemStore')
@observer
export default class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cacheSize: '21.6M',
            customerMobile: '400-500-6666',
        };
    }

    componentDidMount() {
        this.requestDataSource();
    }

    requestDataSource = async () => {
        const {systemStore} = this.props;
        let url = ServicesApi.systemSetting;
        let data = await systemStore.getSystemInfomation(url);
        this.setState({loading: true});
    };

    clearCache = () => {
        this.setState({
            cacheSize: '',
        });
    };

    makeCall = (mobile) => {
        let url = 'tel: ' + mobile;
        Linking.canOpenURL(url)
            .then(supported => {
                if (!supported) {
                    // console.log('Can\'t handle url: ' + url);
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err)=>{
                // console.log('An error occurred', err)
            });
    };

    _exitLogin = async () => {
        const {loginStore} = this.props;
        loginStore.cleanUserInfo();
        RouterHelper.reset('', 'Login');
    };

    _onPressExit = () => {
        const params = {
            title: '温馨提示',
            detail: '是否退出登陆？',
            actions: [
                {
                    title: '取消',
                    onPress: () => {},
                },
                {
                    title: '确定',
                    onPress: this._exitLogin,
                }
            ]
        };
        AlertManager.show(params);
    };

    render() {
        const {systemStore} = this.props;
        let {systemInfo} = systemStore;
        let {cacheSize, customerMobile} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '设置';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <ScrollView style={styles.contentContainer}>
                    <View style={styles.contentItemView}>
                        <ListRow
                            style={styles.contentTitleView}
                            title={'修改密码'}
                            titleStyle={CusTheme.contentTitle}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[CusTheme.contentRightIcon, {}]} />}
                            onPress={() => RouterHelper.navigate('修改密码', 'MineSettingPassWord', {})}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'我的地址'}
                            titleStyle={CusTheme.contentTitle}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[CusTheme.contentRightIcon, {}]} />}
                            onPress={() => RouterHelper.navigate('我的地址', 'Address', {})}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'关于我们'}
                            titleStyle={CusTheme.contentTitle}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[CusTheme.contentRightIcon, {}]} />}
                            onPress={() => RouterHelper.navigate('关于我们', 'CommonWebPage', {url: systemInfo.link_about})}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'帮助中心'}
                            titleStyle={CusTheme.contentTitle}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[CusTheme.contentRightIcon, {}]} />}
                            onPress={() => RouterHelper.navigate('帮助中心', 'CommonWebPage', {url: systemInfo.link_help})}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'联系客服'}
                            titleStyle={CusTheme.contentTitle}
                            detail={systemInfo.customer_mobile}
                            accessory={null}
                            onPress={() => this.makeCall(systemInfo.customer_mobile)}
                            bottomSeparator={'none'}
                        />
                    </View>
                    <View style={[styles.contentItemView, styles.lastContentItemView]}>
                        {/*<ListRow
                            style={styles.contentTitleView}
                            title={'清理缓存'}
                            titleStyle={CusTheme.contentTitle}
                            detail={systemInfo.cache_size}
                            accessory={null}
                            onPress={this.clearCache}
                        />*/}
                        <ListRow
                            style={styles.contentTitleView}
                            title={'当前版本'}
                            titleStyle={CusTheme.contentTitle}
                            detail={systemInfo.version_code}
                            // accessory={<Image source={Images.icon_arrow_right} style={[CusTheme.contentRightIcon, {}]} />}
                            // onPress={() => RouterHelper.navigate('检查更新', 'ShareApp', {})}
                            bottomSeparator={'none'}
                        />
                    </View>
                    <Button
                        title={'退出登录'}
                        onPress={this._onPressExit}
                        style={[CusTheme.btnView, styles.btnView]}
                        titleStyle={[CusTheme.btnName, styles.btnName]}
                    />
                </ScrollView>
            </View>
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
        color: CusTheme.themeColor,
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
        marginTop: CusTheme.systemNavHeight,
    },
    lastContentItemView: {
        marginBottom: 30,
    },
    contentTopView: {
        marginTop: CusTheme.systemNavHeight,
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
    btnView: {
        marginHorizontal: 15,
    },
    btnName: {},
});