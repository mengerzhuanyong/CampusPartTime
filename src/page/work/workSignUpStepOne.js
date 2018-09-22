/**
 * 校园空兼 - WorkSignUpStepOne
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
import SpinnerLoading from "../../component/common/SpinnerLoading";
import RouterHelper from "../../router/RouterHelper";
import WorkSignUpStepTwo from "./workSignUpStepTwo";

@inject('loginStore', 'workStore', 'resourceStore')
@observer
export default class WorkSignUpStepOne extends Component {

    constructor(props) {
        super(props);
        let {params} = this.props.navigation.state;
        this.state = {
            item: params && params.item ? params.item : {id: 1},
        };
        this.page = 1;
    }

    componentDidMount() {
        this.loadNetData();
    }

    componentWillUnmount() {
        let timers = [this.timer1, this.timer2];
        ClearTimer(timers);
    }

    _captureRef = (v) => {
        this.flatListRef = v;
    };

    _keyExtractor = (item, index) => {
        return `z_${index}`
    };

    loadNetData = async () => {
        const {workStore} = this.props;
        let data = {
            id: this.state.item.id,
        };

        let result = await workStore.requestWorkTimes(ServicesApi.job_application_time, data);
        this.flatList && this.flatListRef.stopRefresh();
    };

    // 下拉刷新
    _onRefresh = () => {
        this.loadNetData();
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

    _renderSeparator = () => {
        return <HorizontalLine lineStyle={styles.horLine}/>;
    };

    _renderHeaderComponent = () => {
        return (
            <View style={styles.headerComponentView}>
                <View style={[styles.contentItemView, styles.contentSignStepView]}>
                    <Image source={Images.img_bg_step1} style={CusTheme.signUpStepImg}/>
                    <View style={styles.contentSignStepConView}>
                        <Text style={[styles.contentSignStepContext, styles.contentSignStepContextCur]}>选择时间</Text>
                        <Text style={styles.contentSignStepContext}>确认信息</Text>
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

    _renderListItem = ({index, item}) => {
        let selectVisible = item.optional === 1;
        let selectStatus = item.selected === 2;
        let selected = !selectVisible && !selectStatus;
        const params = {
            title: '温馨提示',
            detail: '当前时间您已有工作，无法选择',
            actions: [
                {title: '确定',}
            ]
        };
        return (
            <View style={[styles.timeItemView]}>
                <View style={[styles.timeItemTitleView]}>
                    <Image source={selectStatus ? Images.icon_checked : Images.icon_check}
                           style={[styles.timeItemIcon, selected && styles.timeItemIconGray]}/>
                    <Text style={[styles.timeItemTitle]}>{item.date}</Text>
                </View>
                <View style={[styles.timeItemDetailView]}>
                    <Button
                        title={selectStatus ? '已选' : '选择'}
                        style={[styles.timeBtnView, selectStatus && styles.timeBtnViewCur, selected && styles.timeBtnViewGray]}
                        titleStyle={[styles.timeBtnName, selectStatus && styles.timeBtnNameCur, selected && styles.timeBtnNameGray]}
                        onPress={() => {
                            if (selectVisible) {
                                this.onSelectTimeItem(index, item);
                            } else {
                                AlertManager.show(params)
                            }
                        }}
                    />
                </View>
            </View>
        );
    };

    onSelectTimeItem = (index, item) => {
        const {onSelectTimeItem} = this.props.workStore;
        onSelectTimeItem(index, item);
    };

    onSubmitTimes = async () => {
        const {onSubmitTimes, sign_id, work_time} = this.props.workStore;
        let {item: {id}} = this.state;
        let url = ServicesApi.job_application_submit;
        let data = {
            id,
            sign_id,
            work_time,
        };
        let result = await onSubmitTimes(url, data);
        if (result.code === 1) {
            RouterHelper.navigate('确认信息', 'WorkSignUpStepTwo');
        }
    };

    render() {
        let {loading, listData} = this.state;
        const {workStore} = this.props;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '选择时间';
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
                        data={workStore.getOnSelectTimeItem}
                        extraData={workStore.getOnSelectTimeItem}
                        enableLoadMore={false}
                        onRefresh={this._onRefresh}
                        removeClippedSubviews={false}
                        renderItem={this._renderListItem}
                        keyExtractor={this._keyExtractor}
                        ItemSeparatorComponent={this._renderSeparator}
                        ListHeaderComponent={this._renderHeaderComponent}
                    />
                </View>
                <Button
                    title={'下一步'}
                    style={[CusTheme.btnView, styles.btnView]}
                    titleStyle={[CusTheme.btnName, styles.btnName]}
                    onPress={this.onSubmitTimes}
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
        paddingVertical: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    timeItemTitleView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeItemIcon: {
        width: ScaleSize(46),
        height: ScaleSize(46),
        resizeMode: 'contain',
        marginRight: 10,
    },
    timeItemIconGray: {
        tintColor: '#ccc',
    },
    timeItemTitle: {
        color: '#333',
        fontSize: FontSize(15),
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
        // width: ScaleSize(140),
        borderColor: CusTheme.themeColor,
    },
    timeBtnViewCur: {
        backgroundColor: CusTheme.themeColor,
    },
    timeBtnViewGray: {
        borderColor: '#ccc',
    },
    timeBtnName: {
        color: CusTheme.themeColor,
        fontSize: FontSize(14),
    },
    timeBtnNameCur: {
        color: '#fff',
    },
    timeBtnNameGray: {
        color: '#ccc',
    },

    btnView: {
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 15,
    },
    btnName: {},
});