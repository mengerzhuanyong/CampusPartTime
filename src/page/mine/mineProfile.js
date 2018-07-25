/**
 * 校园空兼 - MineProfile
 * https://menger.me
 * @大梦
 */


'use strict';

import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    StyleSheet,
    ImageBackground,
} from 'react-native'
import NavigationBar from '../../component/common/NavigationBar'
import {Button, Carousel, ListRow} from 'teaset'

import {HorizontalLine, VerticalLine} from "../../component/common/commonLine";

export default class MineProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stu_cer_uri: 'https://h5.apix.cn/degrees?signature=64392c4592131eee29c24579e5d6bd65',
        };
    }

    onPushToNextPage = (pageTitle, component, params = {}) => {
        RouterHelper.navigate(component, {
            pageTitle: pageTitle,
            ...params
        })
    };

    render() {
        let {stu_cer_uri} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '我的资料';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                    style={{
                        backgroundColor: 'transparent'
                    }}
                />
                <ScrollView style={styles.content}>
                    <ImageBackground
                        style={styles.contentTopView}
                        source={Images.img_bg_mine}
                        resizeMode={'cover'}
                    >
                        <View style={[styles.contentTopItemView, styles.userAvatarView]}>
                            <Image source={Images.img_avatar_default} style={styles.userAvatar}/>
                        </View>
                        <View style={[styles.contentTopItemView, styles.userInfoView]}>
                            <Text style={styles.userName}>大梦</Text>
                            <View style={styles.studentInfoView}>
                                <Text style={styles.studentInfoText}>已毕业</Text>
                                <Text style={styles.studentInfoText}>临沂大学</Text>
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={styles.contentItemView}>
                        <ListRow
                            style={styles.contentTitleView}
                            title={'身份证认证'}
                            detail={'未认证'}
                            titleStyle={CusTheme.contentTitle}
                            icon={<Image source={Images.icon_user_card} style={[CusTheme.contentTitleIcon, {}]} />}
                            accessory={<Image source={Images.icon_arrow_right} style={[CusTheme.contentRightIcon, {}]} />}
                            onPress={() => this.onPushToNextPage('身份证认证', 'CertificationIDCard', {})}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'学籍资料认证'}
                            detail={'未认证'}
                            titleStyle={CusTheme.contentTitle}
                            icon={<Image source={Images.icon_school_roll} style={[CusTheme.contentTitleIcon, {}]} />}
                            accessory={<Image source={Images.icon_arrow_right} style={[CusTheme.contentRightIcon, {}]} />}
                            onPress={() => this.onPushToNextPage('学籍资料认证', 'CommonWebPage', {url: stu_cer_uri, style: styles.webViewStyle})}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'绑定紧急联系人'}
                            detail={'未认证'}
                            titleStyle={CusTheme.contentTitle}
                            icon={<Image source={Images.icon_user_contact} style={[CusTheme.contentTitleIcon, {}]} />}
                            accessory={<Image source={Images.icon_arrow_right} style={[CusTheme.contentRightIcon, {}]} />}
                            onPress={() => this.onPushToNextPage('绑定紧急联系人', 'EmergencyContact', {})}
                        />
                        <ListRow
                            style={styles.contentTitleView}
                            title={'手机号实名认证'}
                            detail={'未认证'}
                            titleStyle={CusTheme.contentTitle}
                            icon={<Image source={Images.icon_mobile} style={[CusTheme.contentTitleIcon, {}]} />}
                            accessory={<Image source={Images.icon_arrow_right} style={[CusTheme.contentRightIcon, {}]} />}
                            bottomSeparator={'none'}
                            onPress={() => this.onPushToNextPage('手机号实名认证', 'CertificationMobile', {})}
                        />
                    </View>
                </ScrollView>
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
        marginTop: -64,
    },
    contentTopView: {
        paddingTop: ScaleSize(150),
        width: SCREEN_WIDTH,
        alignItems: 'center',
        height: ScaleSize(510),
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
        backgroundColor: '#f50'
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
    webViewStyle: {
        marginTop: -46,
    },
});