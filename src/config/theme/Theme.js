'use strict';
import { Dimensions, Platform, Text, StyleSheet, StatusBar, TextInput } from 'react-native'
import { Theme, Label } from 'teaset'
import DefaultTheme from './DefaultTheme';
import DefaultColor from './DefaultColor';
import { fontSize, scaleSize, addCustomProps } from '../../util/Tool';

//  更改三个文件控件字体大小随系统改变的属性,如果想更改其它第三方的默认属性也可以这样改
addCustomProps(Text, { allowFontScaling: false });
addCustomProps(Label, { allowFontScaling: false });
addCustomProps(TextInput, { allowFontScaling: false });

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

    tvBarBtnWidth: 60,
    tvBarBtnIconSize: scaleSize(50),
    tvBarBtnTextFontSize: fontSize(11),
    tvBarBtnActiveTextFontSize: fontSize(11),
    tvBarPaddingBottom: scaleSize(10),
    tvBarBtnTitleColor: '#898989',
    tvBarBtnActiveTitleColor: '#3483dc',
});

export default {

    // 设置
    set: (object) => {
        Object.assign(this, object)
    },

    ...DefaultTheme,
    ...DefaultColor,

    get statusBarHeight() {
        if (Platform.OS === 'ios') {
            if (DefaultTheme.isIPhoneX) {
                return DefaultTheme.fitIPhoneXTop
            } else {
                return 20
            }
        } else if (Platform.OS === 'android') {
            if (Platform.Version > 20) {
                return StatusBar.currentHeight
            }
            return 0;
        }
        return 0
    },
    get screenWidth() {
        return Dimensions.get('screen').width
    },
    get screenHeight() {
        return Dimensions.get('screen').height
    },
    get screenInset() {
        return Theme.screenInset
    },
    get isLandscape() {
        return Dimensions.get('screen').width > Dimensions.get('screen').height
    },

}