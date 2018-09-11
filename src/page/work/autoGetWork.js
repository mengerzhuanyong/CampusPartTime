/**
 * 校园空兼 - AutoGetWork
 * https://menger.me
 * @大梦
 */


'use strict';

import React, { Component } from 'react'
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
export default class AutoGetWork extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        this.page = 1;
    }

    componentDidMount() {
        this.loadNetData();
    }

    componentWillUnmount(){
        let timers = [this.timer1, this.timer2];
        ClearTimer(timers);
    }

    loadNetData = async () => {
        const {workStore} = this.props;
        let result = await workStore.requestPlatformTimes(ServicesApi.job_platform_time);
        console.log(result);
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
            .catch((err)=>{
                // console.log('An error occurred', err)
            });
    };

    onSelectedTimeItem = (item, index) => {
        console.log(item);
        const {workStore} = this.props;
        let {getTimesOption, onSelectPlatformTimeItem} = workStore;
        let start = item.select_start_time || '05:00';
        let end = item.select_end_time || '05:00';
        ActionsManager.showTime(getTimesOption, start, end, (info) => {
            item.select_start_time = info[0];
            item.select_end_time = info[1];
            onSelectPlatformTimeItem(item, index);
        });
    };

    onSubmitForm = async () => {
        const {workStore} = this.props;
        let {getTimesArray, onSubmitPlatformTimes} = workStore;
        let url = ServicesApi.job_submit_platform_time;
        let data = {
            getTimesArray
        };
        let result = await onSubmitPlatformTimes(url, data);
        console.log(result);
        if (result && result.code === 1) {
            Toast.toastShort(result.msg);
            RouterHelper.goBack();
        }
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
                this.setState({ data: dataTemp.concat(this.state.listData) });
            }
            // allLoad 当全部加载完毕后可以设置此属性，默认为false
            this.flatList.stopEndReached({ allLoad: this.page === 2 });
            this.page++;
        }, 500);
    };

    // 下拉刷新
    _onRefresh = () => {
        this.timer2 = setTimeout(() => {
            // 调用停止刷新
            this.loadNetData();
            this.flatList && this.flatList.stopRefresh();
        }, 500);
    };

    _renderSeparator = () => {
        return <HorizontalLine style={styles.horLine} />;
    };

    _renderHeaderComponent = () => {
        const {workStore} = this.props;
        let {platform_work_tips} = workStore;
        return (

            <View style={styles.headerComponentView}>
                <View style={styles.contentItemView}>
                    <View style={styles.contentTitleView}>
                        <Text style={styles.contentTitle}>{platform_work_tips.title}</Text>
                    </View>
                    <View style={styles.contentConView}>
                        <Text style={styles.contentConText}>{platform_work_tips.content}</Text>
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
        let {item, index} = info;
        return (
            <View style={[styles.timeItemView]}>
                <View style={[styles.timeItemTitleView]}>
                    <Text style={[styles.timeItemTitle]}>{item.date} {item.day}</Text>
                </View>
                <View style={[styles.timeItemDetailView]}>
                    <Button
                        title={item.select_start_time || '请选择'}
                        style={[styles.timeBtnView]}
                        titleStyle={[styles.timeBtnName]}
                        onPress={() => this.onSelectedTimeItem(item, index)}
                    />
                    <Text style={[styles.timeItemTitle, styles.timeItemDetailTips]}>至</Text>
                    <Button
                        title={item.select_end_time || '请选择'}
                        style={[styles.timeBtnView]}
                        titleStyle={[styles.timeBtnName]}
                        onPress={() => this.onSelectedTimeItem(item, index)}
                    />
                </View>
            </View>
        );
    };

    render() {
        let {loading, listData} = this.state;
        const {workStore} = this.props;
        let {getTimesArray, getTimesOption, platform_work_tips} = workStore;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '平台分配工作';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <View style={styles.content}>
                    <FlatListView
                        style={styles.listContent}
                        initialRefresh={false}
                        ref={this._captureRef}
                        data={getTimesArray}
                        removeClippedSubviews={false}
                        renderItem={this._renderListItem}
                        keyExtractor={this._keyExtractor}
                        // onEndReached={this._onEndReached}
                        enableLoadMore={false}
                        onRefresh={this._onRefresh}

                        ItemSeparatorComponent={this._renderSeparator}
                        ListHeaderComponent={this._renderHeaderComponent}
                    />
                </View>
                <Button
                    title={'提交'}
                    style={[CusTheme.btnView, styles.btnView]}
                    titleStyle={[CusTheme.btnName, styles.btnName]}
                    onPress={this.onSubmitForm}
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

    contentItemView: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
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
        fontSize: FontSize(14),
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

    timeItemView: {
        height: 60,
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    timeItemTitleView: {},
    timeItemTitle: {
        color: '#333',
        fontSize: FontSize(14),
    },
    timeItemDetailView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeItemDetailTips: {
        marginHorizontal: 10,
    },
    timeBtnView: {
        width: ScaleSize(150),
        borderColor: '#eee',
    },
    timeBtnName: {
        color: '#555',
        fontSize: FontSize(13),
    },

    btnView: {
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 15,
    },
    btnName: {},
});