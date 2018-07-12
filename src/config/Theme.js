import { Dimensions, Platform, Text, StyleSheet, PixelRatio } from 'react-native'
import { Theme } from 'teaset'
import { fontSize, scaleSize } from '../util/Tool';

//  更改三个文件控件字体大小随系统改变的属性,如果想更改其它第三方的默认属性也可以这样改
// addCustomProps(Text, { allowFontScaling: false });
// addCustomProps(TextInput, { allowFontScaling: false });
// addCustomProps(TouchableOpacity, { activeOpacity: 0.7 });
// addCustomProps(ListRow, {activeOpacity: 0.7});

// 配置全局的teaset的Theme
Theme.set({
    // 开启iphoneX适配
    fitIPhoneX: true,

    // 设置ActionsManager的颜色和字体大小
    asItemFontSize: fontSize(16),

    // 设置MenuManager的颜色和字体大小
    menuItemTitleColor: '#53812f',
    menuItemFontSize: fontSize(14),
    menuItemSeparatorColor: '#d8d8d8',

    // 设置ToastManager的颜色和字体大小
    toastTextColor: '#fff',
    toastFontSize: fontSize(16),
});

// 通过系统API获得屏幕宽高
const { height, width } = Dimensions.get('window');

// 全局样式
const globalStyles = StyleSheet.create({
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
});

const themeColor = '#1ab588';

const CusTheme = {
    isIPhoneX: Theme.isIPhoneX,
    fitIPhoneXTop: 44,
    fitIPhoneXBottom: 34,
    screen_width: width,
    screen_height: height,
    minPixel: 1 / PixelRatio.get(),
    themeColor: themeColor,
    pageBackgroundColor: '#f6f6f6',
    // 全局公用样式表 ,感觉不是很合理
    // 居中样式
    centerStyle: globalStyles.centerStyle,
    // 背景透明样式
    bgTransparentStyle: globalStyles.bgTransparentStyle,

    headerButtonView: globalStyles.headerButtonView,
    headerLeftView: globalStyles.headerLeftView,
    headerRightView: globalStyles.headerRightView,
    headerIcon: globalStyles.headerIcon,
    headerBtnName: {
        color: '#fff',
        fontSize: fontSize(13),
    },
    // 弹窗提示组件的样式
    alertWidth: 260,
    alertMinHeight: 52,
    alertTitleMaxWidth: 200,
    alertDetailMaxWidth: 280,
    alertActionHeight: 42,
    alertActionColor: '#348fe4',
    alertSeparatorColor: '#eaeaea',

    // 分享组件的样式
    shareBackColor: '#eee',
    shareActionWidth: scaleSize(100),
    shareActionHeight: scaleSize(100),
    shareActionRadius: 7,
    shareActionTextColor: '#000',
    shareCancelActionHeight: scaleSize(90),
    shareCancelBackColor: '#fff',
    shareCancelTextColor: '#000',

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
        contentStyle: {
            backgroundColor: '#123',
        },
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
};

export default CusTheme;