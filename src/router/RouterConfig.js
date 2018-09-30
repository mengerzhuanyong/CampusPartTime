/**
 * 校园空兼 - RouterConfig
 * https://menger.me
 * @大梦
 */

'use strict';

import {createStackNavigator, createBottomTabNavigator} from 'react-navigation'
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator'
import {configRouter, tabOptions} from './RouterTool'

import Work from "../page/work/work"
import Home from "../page/home/home"
import Mine from "../page/mine/mine"
import Shop from "../page/shop/shop"

import CommonWebPage from '../page/common/commonWebPage'

import Login from '../page/login/login'
import Register from '../page/login/register'
import RecoverPwd from '../page/login/recoverPwd'

import AutoGetWork from '../page/work/autoGetWork'
import WorkSignUpStepOne from '../page/work/workSignUpStepOne'
import WorkSignUpStepTwo from '../page/work/workSignUpStepTwo'
import WorkSignUpStepThree from '../page/work/workSignUpStepThree'
import WorkSignUpStepFour from '../page/work/workSignUpStepFour'

import MineAccount from '../page/mine/mineAccount'
import MineIntegritySystem from '../page/mine/mineIntegritySystem'
import MinePoints from '../page/mine/minePoints'
import MineProfile from '../page/mine/mineProfile'
import MineWorkSpace from '../page/mine/mineWorkSpace'
import MineSettingPassWord from '../page/mine/mineSettingPassWord'

import MineCredits from '../page/account/mineCredits'
import MineWorkPoints from '../page/account/mineWorkPoints'
import MinePartTimeIncome from '../page/account/minePartTimeIncome'
import MineRepayment from '../page/account/mineRepayment'
import MineWithDraw from '../page/account/mineWithDraw'

import MineOrder from '../page/order/mineOrder'
import OrderDetail from '../page/order/orderDetail'

import CertificationIDCard from '../page/certification/certificationIDCard'
import CertificationMobile from '../page/certification/certificationMobile'
import CertificationStudent from '../page/certification/certificationStudent'
import EmergencyContact from '../page/certification/emergencyContact'

import MineWorkDetail from "../page/work/mineWorkDetail"
import WorkAbnormalAppeal from "../page/work/workAbnormalAppeal"

import Setting from '../page/system/setting'
import ShareApp from '../page/system/shareApp'
import SystemMessage from '../page/system/systemMessage'

import WorkPunchCard from "../page/work/workPunchCard"
import Search from "../page/common/search"

import PointShop from "../page/shop/pointShop"
import GoodsList from "../page/shop/goodsList"
import GoodsDetail from "../page/shop/goodsDetail"
import PointGoodsDetail from "../page/shop/pointGoodsDetail"

import OrderConfirm from "../page/cart/orderConfirm"
import OrderSubmit from "../page/cart/orderSubmit"
import OrderCompleted from "../page/cart/orderCompleted"

import Address from "../page/address/address"
import AddressAdd from "../page/address/addressAdd"
import AddressEdit from "../page/address/addressEdit"


import WorkDetail from "../page/work/workDetail"
import OrderReturn from "../page/order/orderReturn"


const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: tabOptions({
            title: '首页',
            normalIcon: Images.icon_tabbar_home,
            selectedIcon: Images.icon_tabbar_home_cur
        })
    },
    Work: {
        screen: Work,
        navigationOptions: tabOptions({
            title: '工作',
            normalIcon: Images.icon_tabbar_work,
            selectedIcon: Images.icon_tabbar_work_cur
        })
    },
    Shop: {
        screen: Shop,
        navigationOptions: tabOptions({
            title: '换购',
            normalIcon: Images.icon_tabbar_shop,
            selectedIcon: Images.icon_tabbar_shop_cur
        })
    },
    Mine: {
        screen: Mine,
        navigationOptions: tabOptions({
            title: '我的',
            normalIcon: Images.icon_tabbar_mine,
            selectedIcon: Images.icon_tabbar_mine_cur
        })
    },
}, {
    initialRouteName: 'Home',
    tabBarOptions: {
        showIcon: true,
        indicatorStyle: {height: 0},
        activeTintColor: CusTheme.themeColor,
        style: {
            backgroundColor: "#fff"
        },
        tabStyle: {
            margin: 2,
        },
    },
    lazy: true, //懒加载
    swipeEnabled: false,
    animationEnabled: false, //关闭安卓底栏动画
    tabBarPosition: "bottom",
});

const StackNavigator = createStackNavigator(configRouter({
    Tab: {screen: TabNavigator},
    CommonWebPage: {screen: CommonWebPage},

    Login: {screen: Login},
    Register: {screen: Register},
    RecoverPwd: {screen: RecoverPwd},

    Search: {screen: Search},

    PointShop: {screen: PointShop},
    GoodsList: {screen: GoodsList},
    GoodsDetail: {screen: GoodsDetail},
    PointGoodsDetail: {screen: PointGoodsDetail},

    AutoGetWork: {screen: AutoGetWork},
    WorkDetail: {screen: WorkDetail},
    WorkSignUpStepOne: {screen: WorkSignUpStepOne},
    WorkSignUpStepTwo: {screen: WorkSignUpStepTwo},
    WorkSignUpStepThree: {screen: WorkSignUpStepThree},
    WorkSignUpStepFour: {screen: WorkSignUpStepFour},

    MineAccount: {screen: MineAccount},
    MineIntegritySystem: {screen: MineIntegritySystem},
    MinePoints: {screen: MinePoints},
    MineProfile: {screen: MineProfile},
    MineWorkSpace: {screen: MineWorkSpace},
    MineWorkDetail: {screen: MineWorkDetail},
    WorkPunchCard: {screen: WorkPunchCard},
    WorkAbnormalAppeal: {screen: WorkAbnormalAppeal},
    MineSettingPassWord: {screen: MineSettingPassWord},
    MineCredits: {screen: MineCredits},
    MineWorkPoints: {screen: MineWorkPoints},
    MinePartTimeIncome: {screen: MinePartTimeIncome},
    MineRepayment: {screen: MineRepayment},
    MineWithDraw: {screen: MineWithDraw},
    
    MineOrder: {screen: MineOrder},
    OrderConfirm: {screen: OrderConfirm},
    OrderSubmit: {screen: OrderSubmit},
    OrderCompleted: {screen: OrderCompleted},
    OrderDetail: {screen: OrderDetail},
    OrderReturn: {screen: OrderReturn},

    Setting: {screen: Setting},
    ShareApp: {screen: ShareApp},
    SystemMessage: {screen: SystemMessage},

    CertificationIDCard: {screen: CertificationIDCard},
    CertificationMobile: {screen: CertificationMobile},
    CertificationStudent: {screen: CertificationStudent},
    EmergencyContact: {screen: EmergencyContact},

    Address: {screen: Address},
    AddressAdd: {screen: AddressAdd},
    AddressEdit: {screen: AddressEdit},
}), {
    // initialRouteName: 'Tab',
    initialRouteName: 'Login',
    // initialRouteName: 'MineProfile',
    cardStyle: {
        shadowOpacity: 0,
        shadowRadius: 0,
        backgroundColor: CusTheme.pageBackgroundColor,
    },
    navigationOptions: {
        header: null,
        gesturesEnabled: true
    },
    transitionConfig: () => {
        return {
            screenInterpolator: (sceneProps) => {
                return StackViewStyleInterpolator.forHorizontal(sceneProps)
            },
        }
    }
});

export {StackNavigator};
