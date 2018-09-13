/**
 * 校园空兼 - MineProfile
 * https://menger.me
 * @大梦
 */


'use strict';

import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    StyleSheet,
    ImageBackground,
} from 'react-native'
import NavigationBar from '../../component/navigation/NavigationBar'
import {Button, Carousel, ListRow} from 'teaset'

import {HorizontalLine, VerticalLine} from "../../component/common/commonLine";
import {inject, observer} from "mobx-react/index";
import SpinnerLoading from "../../component/common/SpinnerLoading";


@inject('loginStore', 'mineStore')
@observer
export default class MineProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        this.loadNetData();
        this.timer = setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 600);
    }

    loadNetData = async () => {
        const {mineStore} = this.props;
        let result = await mineStore.requestMyProfile(ServicesApi.my_details);
    };

    renderStatusView = (status) => {
        return (
            <View style={styles.statusViewStyle}>
                {status === 2 && <Image source={Images.icon_checked} style={styles.statusIcon}/>}
                <Text style={styles.statusTitle}>{status === 2 ? '已认证' : '未认证'}</Text>
            </View>
        );
    };

    render() {
        let {mineStore} = this.props;
        let {myProfile} = mineStore;
        let {loading} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '我的资料';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                    style={{backgroundColor: 'transparent'}}
                    backgroundImage={Images.img_bg_nav_bar}
                />
                <View style={styles.content}>
                    <ImageBackground
                        style={styles.contentTopView}
                        source={Images.img_bg_mine}
                        resizeMode={'cover'}
                    >
                        <View style={[styles.contentTopItemView, styles.userAvatarView]}>
                            <Image
                                source={myProfile.user_info.avatar ? {uri: myProfile.user_info.avatar} : Images.img_avatar_default}
                                style={styles.userAvatar}/>
                        </View>
                        <View style={[styles.contentTopItemView, styles.userInfoView]}>
                            <Text style={styles.userName}>{myProfile.user_info.username}</Text>
                            <View style={styles.studentInfoView}>
                                <Text style={styles.studentInfoText}>{myProfile.user_info.grade || '已毕业'}</Text>
                                <Text style={styles.studentInfoText}>{myProfile.user_info.school}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={styles.contentItemView}>
                        <ListRow
                            style={styles.contentTitleView}
                            title={'身份证认证'}
                            detail={this.renderStatusView(myProfile.id_card_status)}
                            titleStyle={CusTheme.contentTitle}
                            icon={<Image source={Images.icon_user_card} style={[CusTheme.contentTitleIcon, {}]}/>}
                            accessory={<Image source={Images.icon_arrow_right}
                                              style={[CusTheme.contentRightIcon, {}]}/>}
                            onPress={() => myProfile.id_card_status === 1 && RouterHelper.navigate('身份证认证', 'CertificationIDCard', {})}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'学籍资料认证'}
                            detail={this.renderStatusView(myProfile.student_status)}
                            titleStyle={CusTheme.contentTitle}
                            icon={<Image source={Images.icon_school_roll} style={[CusTheme.contentTitleIcon, {}]}/>}
                            accessory={<Image source={Images.icon_arrow_right}
                                              style={[CusTheme.contentRightIcon, {}]}/>}
                            onPress={() => myProfile.student_status === 1 && RouterHelper.navigate('学籍资料认证', 'CommonWebPage', {
                                url: myProfile.student_url,
                                style: styles.webViewStyle
                            })}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'绑定紧急联系人'}
                            detail={this.renderStatusView(myProfile.contact_status)}
                            titleStyle={CusTheme.contentTitle}
                            icon={<Image source={Images.icon_user_contact}
                                         style={[CusTheme.contentTitleIcon, {}]}/>}
                            accessory={<Image source={Images.icon_arrow_right}
                                              style={[CusTheme.contentRightIcon, {}]}/>}
                            onPress={() => myProfile.contact_status === 1 && RouterHelper.navigate('绑定紧急联系人', 'EmergencyContact', {})}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'手机号实名认证'}
                            detail={this.renderStatusView(myProfile.mobile_status)}
                            titleStyle={CusTheme.contentTitle}
                            icon={<Image source={Images.icon_mobile} style={[CusTheme.contentTitleIcon, {}]}/>}
                            accessory={<Image source={Images.icon_arrow_right}
                                              style={[CusTheme.contentRightIcon, {}]}/>}
                            onPress={() => myProfile.mobile_status === 1 && RouterHelper.navigate('手机号实名认证', 'CertificationMobile', {})}
                            bottomSeparator={'none'}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        marginTop: CusTheme.systemNavHeight,
    },
    contentTopView: {
        paddingTop: 74,
        width: SCREEN_WIDTH,
        alignItems: 'center',
        height: __IOS__ ? ScaleSize(510) : ScaleSize(560),
    },
    contentTopItemView: {
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userAvatarView: {
        // marginTop: 60,
        width: ScaleSize(160),
        height: ScaleSize(160),
        borderRadius: ScaleSize(80),
        overflow: 'hidden',
        // backgroundColor: '#f50'
    },
    userAvatar: {
        width: ScaleSize(160),
        height: ScaleSize(160),
        borderRadius: ScaleSize(80),
        resizeMode: 'cover',
    },
    userInfoView: {
        marginVertical: ScaleSize(30),
    },
    userName: {
        color: '#fff',
        fontSize: FontSize(16),
    },
    studentInfoView: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    studentInfoText: {
        color: '#fff',
        marginHorizontal: 5,
        fontSize: FontSize(14),
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
    statusViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusIcon: {
        width: 15,
        height: 15,
        marginRight: 5,
        resizeMode: 'contain',
    },
    statusTitle: {
        color: '#888',
        fontSize: FontSize(11),
    },
    webViewStyle: {
        marginTop: -46,
    },
});