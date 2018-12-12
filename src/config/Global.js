/**
 * 校园空兼 - Global
 * http://menger.me
 * @大梦
 */


'use strict';

// 项目中的图片可以通过Images.xxx 获取
import { Platform, Text } from 'react-native'
import {
    scaleSize, fontSize, checkMobile, checkPassword, isEmpty, containsChinese,
    clearTimer
} from '../util/Tool'
import CusTheme from './theme/Theme'
import Images from './manager/ImageManager'
import FetchData from '../util/Services'
import Services from '../util/utilRequest'
import MenuManager from './manager/MenuManager'
import ToastManager from './manager/ToastManager'
import * as Toast from '../util/utilToast'
import ActionsManager from './manager/ActionsManager'
import AlertManager from './manager/AlertManager';
import ImagePickerManager from './manager/ImagePickerManager';
import InteractionManager from './manager/InteractionManager';
import RouterHelper from '../router/RouterHelper'
import ServicesApi from './ServicesApi'
import Constant from './Constant'
import StatusCode from './StatusCode'
import moment from 'moment'
import 'moment/locale/zh-cn'
import StorageManager from "./manager/StorageManager"

// 本地化
moment.locale('zh-cn');

// 发布版屏蔽日志打印
if (!__DEV__) {
    global.console = {
        info: () => { },
        log: () => { },
        warn: () => { },
        debug: () => { },
        error: () => { }
    };
}

// 屏蔽调试警告
console.disableYellowBox = true;
// console.ignoredYellowBox = ['Remote debugger is in', 'Warning: isMounted(...)'];

// 系统是iOS
global.__IOS__ = (Platform.OS === 'ios');

// 系统是安卓
global.__ANDROID__ = (Platform.OS === 'android');

// 获取屏幕宽度
global.SCREEN_WIDTH = CusTheme.screen_width;

// 获取屏幕高度
global.SCREEN_HEIGHT = CusTheme.screen_height;

// 图片加载
global.Images = Images;

// 图片选择
global.ImagePickerManager = ImagePickerManager;

// 存储
global.StorageManager = StorageManager;

// 网络请求
global.Services = new Services();

// 网络请求
global.FetchData = FetchData;

// 网络接口
global.ServicesApi = ServicesApi;

// 系统常量
global.Constant = Constant;

// 状态码
global.StatusCode = StatusCode;

// 事件处理
global.Moment = moment;

// 路由管理
global.RouterHelper = RouterHelper;

// 菜单管理
global.MenuManager = MenuManager;

// 轻提示
global.ToastManager = ToastManager;

// 轻提示
global.Toast = Toast;

// 操作管理
global.ActionsManager = ActionsManager;

// 弹窗
global.AlertManager = AlertManager;

// 交互管理，系统的有bug,https://github.com/facebook/react-native/issues/8624
global.InteractionManager = InteractionManager;

// 全局的主题和控件的配置以及样式
global.CusTheme = CusTheme;

// 适配字体
global.FontSize = fontSize;

// 屏幕适配
global.ScaleSize = scaleSize;

// 清楚定时器
global.ClearTimer = clearTimer;

// 验证手机号
global.CheckMobile = checkMobile;