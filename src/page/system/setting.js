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

import NavigationBar from '../../component/common/NavigationBar'
import {ListRow, Button} from 'teaset'

export default class Setting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cacheSize: '21.6M',
            customerMobile: '400-500-6666',
        };
    }

    onPushToNextPage = (pageTitle, component, params = {}) => {
        RouteHelper.navigate(component, {
            pageTitle: pageTitle,
            ...params
        })
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

    render() {
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
                            titleStyle={Theme.contentTitle}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[Theme.contentRightIcon, {}]} />}
                            onPress={() => this.onPushToNextPage('修改密码', 'MineSettingPassWord', {})}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'关于我们'}
                            titleStyle={Theme.contentTitle}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[Theme.contentRightIcon, {}]} />}
                            onPress={() => this.onPushToNextPage('关于我们', 'CommonWebPage', {})}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'帮助中心'}
                            titleStyle={Theme.contentTitle}
                            detail={''}
                            accessory={<Image source={Images.icon_arrow_right} style={[Theme.contentRightIcon, {}]} />}
                            onPress={() => this.onPushToNextPage('帮助中心', 'CommonWebPage', {})}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'联系客服'}
                            titleStyle={Theme.contentTitle}
                            detail={customerMobile}
                            accessory={<Image source={Images.icon_arrow_right} style={[Theme.contentRightIcon, {}]} />}
                            onPress={() => this.makeCall(customerMobile)}
                            bottomSeparator={'none'}
                        />
                    </View>
                    <View style={[styles.contentItemView, styles.lastContentItemView]}>
                        <ListRow
                            style={styles.contentTitleView}
                            title={'清理缓存'}
                            titleStyle={Theme.contentTitle}
                            detail={cacheSize}
                            accessory={<Image source={Images.icon_arrow_right} style={[Theme.contentRightIcon, {}]} />}
                            onPress={this.clearCache}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'检查更新'}
                            titleStyle={Theme.contentTitle}
                            detail={'当前版本：1.0.0'}
                            accessory={<Image source={Images.icon_arrow_right} style={[Theme.contentRightIcon, {}]} />}
                            onPress={() => this.onPushToNextPage('检查更新', 'ShareApp', {})}
                            bottomSeparator={'none'}
                        />
                    </View>
                    <Button
                        title={'退出登录'}
                        style={[Theme.btnView, styles.btnView]}
                        titleStyle={[Theme.btnName, styles.btnName]}
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
    btnView: {
        marginHorizontal: 15,
    },
    btnName: {},
});