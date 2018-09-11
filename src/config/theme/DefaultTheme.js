'use strict';
import {Dimensions, Platform, Text, StyleSheet, StatusBar, PixelRatio} from 'react-native';
import {Theme} from 'teaset'
import {fontSize, scaleSize, addCustomProps} from '../../util/Tool';

const themeColor = '#1ab588';
const {width, height} = Dimensions.get('window');
const __IOS__ = Platform.OS === 'ios';

export default {

    isIPhoneX: Theme.isIPhoneX,
    fitIPhoneXTop: 44,
    fitIPhoneXBottom: 34,
    pageBackgroundColor: '#f7f7f7',
    themeColor: themeColor,
    minPixel: 1 / PixelRatio.get(),
    systemNavHeight: __IOS__ ? -64 : -70,

    screen_width: width,
    screen_height: height,

    // 弹窗提示组件的样式
    alertWidth: 260,
    alertMinHeight: 52,
    alertTitleMaxWidth: 200,
    alertDetailMaxWidth: 230,
    alertActionHeight: 42,
    alertActionColor: '#348fe4',
    alertSeparatorColor: '#eaeaea',
    alertTitleFontSize: fontSize(16),
    alertTitleColor: '#000',
    alertDetailFontSize: fontSize(13),
    alertDetailColor: '#000',
    alertActionFontSize: fontSize(14),

    // action组件
    actionMaxHeight: 230,
    actionTitleFontSize: fontSize(14),
    actionTitleColor: '#000',
    cancelTitleFontSize: fontSize(14),
    cancelTitleColor: '#000',
    titleFontSize: fontSize(12),
    titleColor: '#999',

    // 分享组件的样式
    shareBackColor: '#eeeeee',
    shareActionWidth: scaleSize(100),
    shareActionHeight: scaleSize(100),
    shareActionRadius: 7,
    shareActionTextColor: '#000000',
    shareCancelActionHeight: scaleSize(90),
    shareCancelBackColor: '#fff',
    shareCancelTextColor: '#000000',

    // 地区选择组件的样式
    areaActionTitleColor: '#5d7f3b',

    // 设置MenuManager的初始化配置，有些样式请去上方teaset里配置，目前因为时间原因先用teaset自带的组件，后续将自定义组件。
    menuOptions: {
        menuAlign: 'end',
        menuPopoverStyle: {backgroundColor: '#fff',},
        menuShowArrow: true,
        menuAnimated: true,
        menuOverlayOpacity: 0.3,
        menuShadow: false,
    },
    // 设置toastManager的初始化配置，有些样式请去上方teaset里配置，目前因为时间原因先用teaset自带的组件，后续将自定义组件。
    toastOptions: {
        position: 'center',
    },

    sbColor: '#fff',
    sbHeight: 40,
    sbBtnPaddingTop: 8,
    sbBtnPaddingBottom: 8,
    sbBtnPaddingLeft: 8,
    sbBtnPaddingRight: 8,
    sbBtnTitleColor: '#989898',
    sbBtnTextFontSize: fontSize(13),
    sbBtnActiveTitleColor: '#337ab7',
    sbBtnActiveTextFontSize: fontSize(13),
    sbIndicatorLineColor: '#337ab7',
    sbIndicatorLineWidth: 2,
    sbIndicatorPositionPadding: 0,


    scTabColor: '#fff',
    scActiveTabColor: '#337ab7',
    scTabTextColor: '#337ab7',
    scActiveTabTextColor: '#fff',
    scTabTextFontSize: fontSize(14),
    scActiveTabTextFontSize: fontSize(14),
    scBorderWidth: StyleSheet.hairlineWidth,

    navBarPadding: 0,
    navBarBackgroundColor: themeColor,
    navBarTitleColor: '#fff',
    navBarTitleFontSize: fontSize(15),
    navBarHeight: 44,

    centerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgTransparentStyle: {
        backgroundColor: 'transparent',
    },
    headerButtonView: {
        position: 'absolute',
        height: 44,
        top: 24,
    },
    headerLeftView: {
        left: 15,
    },
    headerRightView: {
        right: 10,
    },
    headerIcon: {
        width: scaleSize(35),
        height: scaleSize(35),
        resizeMode: 'contain',
    },

    emptyComponentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listEmptyTipsImg: {
        marginTop: scaleSize(40),
        resizeMode: 'contain',
        width: width / 1.5,
    },
    emptyText: {
        color: '#666',
        fontSize: fontSize(14),
    },

    btnView: {
        height: 45,
        borderWidth: 0,
        backgroundColor: themeColor,
    },
    btnName: {
        color: '#fff',
        fontSize: fontSize(15),
    },
    inputBtnView: {
        width: scaleSize(34),
        height: scaleSize(34),
    },
    inputBtnIcon: {
        width: scaleSize(34),
        height: scaleSize(34),
        tintColor: '#999',
        resizeMode: 'contain',
    },
    signUpStepImg: {
        width: width - 60,
        resizeMode: 'contain',
    },
    containerBackgroundImage: {
        flex: 1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        resizeMode: 'contain',
    },
    contentTitleIcon: {
        width: scaleSize(35),
        height: scaleSize(35),
        resizeMode: 'contain',
    },
    contentTitle: {
        marginLeft: 10,
        color: '#333',
        fontSize: fontSize(14),
    },
    contentRightView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    contentRightIcon: {
        width: scaleSize(25),
        height: scaleSize(25),
        resizeMode: 'contain',
    },
    contentRightText: {
        color: '#999',
        fontSize: fontSize(13),
    },
    pointView: {
        width: 5,
        height: 5,
        borderRadius: 3,
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: '#f00',
    },
    flexCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    defaultFont: {
        color: '#333',
        fontSize: fontSize(20),
    },
}