/**
 * 校园空兼 - WorkSignUpStepThree
 * https://menger.me
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
export default class WorkSignUpStepThree extends Component {

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
            customerMobile: '800-820-8820',
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

    makeCall = () => {
        const {workStore} = this.props;
        let {server_mobile} = workStore;
        let url = 'tel: ' + server_mobile;
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
        this.flatList = v;
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
            this.flatList.stopEndReached({allLoad: this.page === 2});
            this.page++;
        }, 500);
    };

    // 下拉刷新
    _onRefresh = () => {
        this.timer2 = setTimeout(() => {
            // 调用停止刷新
            this.flatList.stopRefresh()
        }, 500);
    };

    _renderSeparator = () => {
        return <HorizontalLine style={styles.horLine}/>;
    };

    _renderHeaderComponent = () => {
        return (
            <View style={styles.headerComponentView}>
                <View style={[styles.contentItemView, styles.contentSignStepView]}>
                    <Image source={Images.img_bg_step3} style={CusTheme.signUpStepImg}/>
                    <View style={styles.contentSignStepConView}>
                        <Text style={[styles.contentSignStepContext, styles.contentSignStepContextCur]}>选择时间</Text>
                        <Text style={[styles.contentSignStepContext, styles.contentSignStepContextCur]}>确认信息</Text>
                        <Text style={[styles.contentSignStepContext, styles.contentSignStepContextCur]}>报名审核</Text>
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

    onCancelApply = async () => {
        const {onCancelApply, sign_id} = this.props.workStore;
        let url = ServicesApi.job_application_cancel;
        let data = {
            sign_id,
        };
        let result = await onCancelApply(url, data);
        if (result.code === 1) {
            RouterHelper.goBack('WorkDetail');
        }
    };

    confirm = () => {
        RouterHelper.goBack('WorkDetail');
    };

    render() {
        let {loading, listData, customerMobile} = this.state;
        const {workStore} = this.props;
        let {server_mobile, sign_status, remark} = workStore;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '报名审核';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <View style={styles.content}>
                    <View style={[styles.contentItemView, styles.contentSignStepView]}>
                        <Image source={Images.img_bg_step3} style={CusTheme.signUpStepImg}/>
                        <View style={styles.contentSignStepConView}>
                            <Text style={[styles.contentSignStepContext, styles.contentSignStepContextCur]}>选择时间</Text>
                            <Text style={[styles.contentSignStepContext, styles.contentSignStepContextCur]}>确认信息</Text>
                            <Text style={[styles.contentSignStepContext, styles.contentSignStepContextCur]}>报名审核</Text>
                            <Text style={styles.contentSignStepContext}>完成工作</Text>
                        </View>
                    </View>
                    <View style={[styles.contentItemView, styles.contentContextView]}>
                        <Text style={styles.contentTitle}>您的报名已被受理，请等待工作人员与您联系，您也可点击拨打服务热线咨询审核情况</Text>
                        <TouchableOpacity
                            style={styles.mobileView}
                            onPress={this.makeCall}
                        >
                            <Text style={[styles.mobileTitle,]}>立即拨打：</Text>
                            <Text style={[styles.mobileTitle, styles.mobileValue]}>{server_mobile}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.multiBtnView}>
                    <Button
                        title={'取消报名'}
                        style={[CusTheme.btnView, styles.btnView]}
                        titleStyle={[CusTheme.btnName, styles.btnName]}
                        onPress={this.onCancelApply}
                    />
                    <Button
                        title={'确认'}
                        style={[CusTheme.btnView, styles.btnView]}
                        titleStyle={[CusTheme.btnName, styles.btnName]}
                        onPress={this.confirm}
                    />
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
    contentTitleView: {
        // height: 60,
        justifyContent: 'center',
    },
    contentTitleViewCur: {
        height: 45,
    },
    contentTitle: {
        color: '#333',
        textAlign: 'center',
        fontSize: FontSize(14),
        lineHeight: FontSize(22),
    },
    contentTitleCur: {
        fontSize: FontSize(15),
    },
    contentConView: {
        marginTop: 10,
    },
    contentConText: {
        color: '#f84',
        lineHeight: FontSize(20),
        textAlign: 'justify',
        fontSize: FontSize(13),
    },
    contentContextView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    mobileView: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mobileTitle: {
        textAlign: 'center',
        fontSize: FontSize(18),
        color: CusTheme.themeColor,
    },
    mobileValue: {
        fontSize: FontSize(20),
    },

    multiBtnView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btnView: {
        flex: 1,
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 15,
    },
    btnName: {},
});