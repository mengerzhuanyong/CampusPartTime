/**
 * 校园空兼 - WorkSignUpStepTwo
 * http://menger.me
 * @大梦
 */


'use strict';

import React, {Component} from 'react'
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
import FlatListView from '../../component/common/FlatListView'
import {ListRow, Button} from 'teaset'
import {HorizontalLine} from "../../component/common/commonLine";
import {inject, observer} from "mobx-react/index";
import RouterHelper from "../../router/RouterHelper";

@inject('loginStore', 'workStore', 'resourceStore')
@observer
export default class WorkSignUpStepTwo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            navigation: [
                {id: 1, title: '手机', icon: Images.icon_nav_mobile,},
                {id: 2, title: '电脑', icon: Images.icon_nav_pc,},
                {id: 3, title: '平板', icon: Images.icon_nav_pad,},
                {id: 4, title: '外设', icon: Images.icon_nav_mouse,},
                {id: 5, title: '单反', icon: Images.icon_nav_camera,},
            ],
            listData: [
                {id: 1, title: '手机', icon: Images.icon_nav_mobile,},
                {id: 2, title: '电脑', icon: Images.icon_nav_pc,},
                {id: 3, title: '平板', icon: Images.icon_nav_pad,},
                {id: 4, title: '外设', icon: Images.icon_nav_mouse,},
                {id: 5, title: '单反', icon: Images.icon_nav_camera,},
            ],
        };
        this.page = 1;
    }

    componentWillUnmount() {
        let timers = [this.timer1, this.timer2];
        ClearTimer(timers);
    }

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
            .catch((err) => {
                // console.log('An error occurred', err)
            });
    };

    _captureRef = (v) => {
        this.flatListRef = v;
    };

    _keyExtractor = (item, index) => {
        return `z_${index}`
    };

    // 上拉加载
    _onEndReached = () => {
        this.timer1 = setTimeout(() => {
            let dataTemp = this.state.listData;
            let allLoad = false;
            //模拟数据加载完毕,即page > 0,
            if (this.page < 2) {
                this.setState({data: dataTemp.concat(this.state.listData)});
            }
            // allLoad 当全部加载完毕后可以设置此属性，默认为false
            this.flatListRef.stopEndReached({allLoad: this.page === 2});
            this.page++;
        }, 500);
    };

    // 下拉刷新
    _onRefresh = () => {
        this.timer2 = setTimeout(() => {
            // 调用停止刷新
            this.flatListRef.stopRefresh()
        }, 500);
    };

    _renderSeparator = () => {
        return <HorizontalLine lineStyle={styles.horLine}/>;
    };

    _renderHeaderComponent = () => {
        return (
            <View style={styles.headerComponentView}>
                <View style={[styles.contentItemView, styles.contentSignStepView]}>
                    <Image source={Images.img_bg_step2} style={CusTheme.signUpStepImg}/>
                    <View style={styles.contentSignStepConView}>
                        <Text style={[styles.contentSignStepContext, styles.contentSignStepContextCur]}>选择时间</Text>
                        <Text style={[styles.contentSignStepContext, styles.contentSignStepContextCur]}>确认信息</Text>
                        <Text style={styles.contentSignStepContext}>报名审核</Text>
                        <Text style={styles.contentSignStepContext}>完成工作</Text>
                    </View>
                </View>
                <View style={[styles.contentItemView, styles.lastContentItemView]}>
                    <View style={[styles.contentTitleView, styles.contentTitleViewCur]}>
                        <Text style={[styles.contentTitle, styles.contentTitleCur]}>请选择您的可工作时间</Text>
                    </View>
                </View>
            </View>
        );
    };

    _renderListItem = (info) => {
        return (
            <View style={[styles.timeItemView]}>
                <View style={[styles.timeItemTitleView]}>
                    <Text style={[styles.timeItemTitle]}>2018.06.10 周日</Text>
                </View>
                <View style={[styles.timeItemDetailView]}>
                    <Button
                        title={'12:00'}
                        style={[styles.timeBtnView]}
                        titleStyle={[styles.timeBtnName]}
                    />
                    <Text style={[styles.timeItemTitle, styles.timeItemDetailTips]}>至</Text>
                    <Button
                        title={'16:00'}
                        style={[styles.timeBtnView]}
                        titleStyle={[styles.timeBtnName]}
                    />
                </View>
            </View>
        );
    };

    onSubmitApply = async () => {
        const {onSubmitApply, sign_id} = this.props.workStore;
        let url = ServicesApi.job_application_result;
        let data = {
            sign_id,
        };
        let result = await onSubmitApply(url, data);
        if (result.code === 1) {
            RouterHelper.navigate('确认信息', 'WorkSignUpStepThree');
        }
    };

    render() {
        let {loading, listData} = this.state;
        const {workStore} = this.props;
        let {userInfo, jobInfo, remark} = workStore;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '确认信息';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <ScrollView style={styles.content}>
                    <View style={[styles.contentItemView, styles.contentSignStepView]}>
                        <Image source={Images.img_bg_step2} style={CusTheme.signUpStepImg}/>
                        <View style={styles.contentSignStepConView}>
                            <Text style={[styles.contentSignStepContext, styles.contentSignStepContextCur]}>选择时间</Text>
                            <Text style={[styles.contentSignStepContext, styles.contentSignStepContextCur]}>确认信息</Text>
                            <Text style={styles.contentSignStepContext}>报名审核</Text>
                            <Text style={styles.contentSignStepContext}>完成工作</Text>
                        </View>
                    </View>

                    <View style={[styles.contentItemView, styles.orderUserInfoView]}>
                        <View style={styles.orderUserInfoCon}>
                            <View style={styles.orderUserInfoConItem}>
                                <Text style={[styles.orderUserInfoConItemTitle]}>姓名：</Text>
                                <Text style={[styles.orderUserInfoConItemValue]}>{userInfo.username}</Text>
                            </View>
                            <View style={styles.orderUserInfoConItem}>
                                <Text style={[styles.orderUserInfoConItemTitle]}>学校：</Text>
                                <Text style={[styles.orderUserInfoConItemValue]}>{userInfo.school}</Text>
                            </View>
                            <View style={styles.orderUserInfoConItem}>
                                <Text style={[styles.orderUserInfoConItemTitle]}>专业：</Text>
                                <Text style={[styles.orderUserInfoConItemValue]}>{userInfo.major}</Text>
                            </View>
                            <View style={styles.orderUserInfoConItem}>
                                <Text style={[styles.orderUserInfoConItemTitle]}>年级：</Text>
                                <Text style={[styles.orderUserInfoConItemValue]}>{userInfo.grade}</Text>
                            </View>
                            <View style={styles.orderUserInfoConItem}>
                                <Text style={[styles.orderUserInfoConItemTitle]}>学号：</Text>
                                <Text style={[styles.orderUserInfoConItemValue]}>{userInfo.student_id}</Text>
                            </View>
                            <View style={styles.orderUserInfoConItem}>
                                <Text style={[styles.orderUserInfoConItemTitle]}>联系电话：</Text>
                                <Text style={[styles.orderUserInfoConItemValue]}>{userInfo.mobile}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.contentItemView, styles.orderStatusInfoView]}>
                        <Text style={styles.orderStatusInfoItem}>工作名称：{jobInfo.name}</Text>
                        <Text style={styles.orderStatusInfoItem}>工作地点：{jobInfo.address}</Text>
                        <Text style={styles.orderStatusInfoItem}>提交工分：{jobInfo.work_point}</Text>
                        <Text style={styles.jobRemarkText}>{remark}</Text>
                    </View>
                </ScrollView>
                <Button
                    title={'下一步'}
                    style={[CusTheme.btnView, styles.btnView]}
                    titleStyle={[CusTheme.btnName, styles.btnName]}
                    onPress={this.onSubmitApply}
                />
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
    },
    contentSignStepView: {
        paddingHorizontal: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentSignStepConView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contentSignStepContext: {
        flex: 1,
        color: '#999',
        textAlign: 'center',
        fontSize: FontSize(13),
    },
    contentSignStepContextCur: {
        flex: 1,
        color: CusTheme.themeColor,
        textAlign: 'center',
        fontSize: FontSize(13),
    },

    contentItemView: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    lastContentItemView: {
        marginBottom: 10,
    },
    contentTitle: {
        color: '#333',
        fontSize: FontSize(16),
        lineHeight: FontSize(25),
    },
    orderGoodsInfoView: {
        paddingVertical: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderGoodsPicView: {
        marginRight: 15,
        width: ScaleSize(280),
    },
    orderGoodsPic: {
        width: ScaleSize(280),
        height: ScaleSize(230),
        resizeMode: 'contain',
    },
    orderGoodsTitleView: {
        flex: 1,
        height: ScaleSize(230),
        justifyContent: 'space-around',
    },
    orderGoodsTitle: {
        fontSize: FontSize(16),
        color: '#333',
    },
    orderGoodsPrices: {
        color: '#ed3126',
        fontSize: FontSize(15),
    },
    orderGoodsNum: {
        marginTop: 8,
        fontSize: FontSize(13),
    },
    orderUserInfoView: {},
    orderUserInfoCon: {
        marginBottom: 10,
        // flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
    },
    orderUserInfoText: {
        color: '#333',
        fontSize: FontSize(14),
        lineHeight: FontSize(20),
    },
    orderUserName: {},
    orderUserPhone: {},
    orderUserAddress: {},
    orderStatusInfoView: {},
    orderStatusInfoItem: {
        color: '#333',
        fontSize: FontSize(14),
        lineHeight: FontSize(25),
    },
    orderUserInfoConItem: {
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    orderUserInfoConItemTitle: {
        color: '#333',
        fontSize: FontSize(14),
    },
    orderUserInfoConItemValue: {
        color: '#666',
        fontSize: FontSize(14),
    },
    jobRemarkText: {
        color: '#ff5d3e',
        fontSize: FontSize(11),
        lineHeight: FontSize(18),
    },

    btnView: {
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 15,
    },
    btnName: {},
});