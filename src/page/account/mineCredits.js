/**
 * 校园空兼 - MineCredits
 * https://menger.me
 * @大梦
 */

'use strict';

import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    Alert,
    Easing,
    Animated,
    TextInput,
    ScrollView,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native'
import NavigationBar from '../../component/navigation/NavigationBar'
import {Button, Carousel, ListRow} from 'teaset'
import {HorizontalLine, VerticalLine} from '../../component/common/commonLine'

export default class MineCredits extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rotateValue: new Animated.Value(0),
            setRotateValue: 0,
        };
    }

    componentDidMount() {
        let TIMES = 1;
        // this.state.rotateValue.setValue(1);
        Animated.timing(this.state.rotateValue, {
            toValue: 360 * TIMES,
            duration: 1000 * TIMES,
            easing: Easing.linear
        }).start(); // 开始spring动画
    }

    render() {
        let {rotateValue, setRotateValue} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '信用额度';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                    style={{
                        backgroundColor: 'transparent'
                    }}
                    // backgroundImage={true}
                />
                <ScrollView style={styles.content}>
                    <ImageBackground
                        style={styles.contentTopView}
                        source={Images.img_bg_credits}
                        resizeMode={'cover'}
                    >
                        <ImageBackground
                            style={styles.creditsDialView}
                            source={Images.img_bg_dial}
                            resizeMode={'contain'}
                        >
                            <View style={[styles.contentTopItemView, styles.creditsDialHandView]}>
                                <Animated.Image
                                    style = {[
                                        styles.creditsDialHand,
                                        {transform:[
                                            {translateY: ScaleSize(222)/2},
                                            {
                                                rotateZ: this.state.rotateValue.interpolate({
                                                    inputRange: [0, 360],
                                                    outputRange: ['-126deg', `${setRotateValue}deg`,]
                                                })
                                            },
                                            {translateY: -ScaleSize(222)/2}
                                        ]}
                                    ]}
                                    source = {Images.img_hand}
                                    resizeMode = "contain"
                                />
                            </View>
                            <View style={[styles.contentTopItemView, styles.creditsInfoView]}>
                                <Text style={styles.creditsInfoValue}>9999</Text>
                                <Text style={styles.creditsInfoTitle}>我的额度</Text>
                            </View>
                        </ImageBackground>                        
                        <View style={[styles.contentTopItemView, styles.userAccountView]}>
                            <View style={[styles.userAccountItemView]}>
                                <Text style={styles.userAccountInfo}>剩余工分: </Text>
                                <Text style={[styles.userAccountInfo, styles.userAccountInfoCur]}>732</Text>
                            </View>
                            <VerticalLine lineStyle={styles.verLine} />
                            <View style={[styles.userAccountItemView]}>
                                <Text style={styles.userAccountInfo}>我的余额: </Text>
                                <Text style={[styles.userAccountInfo, styles.userAccountInfoCur]}>350</Text>
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={styles.contentItemView}>
                        <ListRow
                            style={styles.contentTitleView}
                            title={'芝麻信用认证'}
                            detail={'未认证'}
                            titleStyle={CusTheme.contentTitle}
                            accessory={<Image source={Images.icon_arrow_right} style={[CusTheme.contentRightIcon, {}]} />}
                            bottomSeparator={'none'}
                            onPress={() => RouterHelper.navigate('芝麻信用认证', 'CertificationMobile', {})}
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
        marginTop: CusTheme.systemNavHeight,
    },
    contentTopView: {
        paddingTop: ScaleSize(150),
        width: SCREEN_WIDTH,
        alignItems: 'center',
        height: ScaleSize(720),
    },
    creditsDialView: {
        alignItems: 'center',
        height: ScaleSize(430),
        width: SCREEN_WIDTH * 0.8,
        // backgroundColor: '#123'
    },
    creditsDialHandView: {
        height: ScaleSize(330),
    },
    creditsDialHand: {
        height: ScaleSize(310),
        resizeMode: 'contain',
        // transform: [{rotateZ:'-145deg'}]
    },
    creditsInfoView: {
        // marginTop: 5,
    },
    creditsInfoValue: {
        color: '#fff',
        fontWeight: '800',
        fontSize: FontSize(20),
    },
    creditsInfoTitle: {
        color: '#fff',
        fontSize: FontSize(15),
    },
    contentTopItemView: {
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
    userAccountView: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
    },
    userAccountItemView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    verLine: {
        height: 20,
        marginHorizontal: 30,
    },
    userAccountInfo: {
        color: '#fff',
        fontSize: FontSize(13),
    },
    userAccountInfoCur: {
        fontWeight: '600',
        fontSize: FontSize(18),
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