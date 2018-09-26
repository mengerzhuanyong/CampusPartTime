/**
 * 校园空兼 - WorkDetail
 * https://menger.me
 * @大梦
 */

'use strict';

import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    Alert,
    Animated,
    TextInput,
    ScrollView,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import NavigationBar from '../../component/navigation/NavigationBar'
import SegmentedView from '../../component/segmentedView'
import LRComponent from '../login/LRComponent'
import SpinnerLoading from '../../component/common/SpinnerLoading';
import dismissKeyboard from 'dismissKeyboard' // 键盘miss的方法
import {observer, inject} from 'mobx-react';
import SegmentedControlTab from '../../component/common/SegmentedControlTab'
import {Button} from 'teaset'
import WorkPunchCard from "./workPunchCard";
import JobTagComponent from "../../component/job/jobTagComponent";

@inject('loginStore', 'workStore', 'resourceStore')
@observer
export default class WorkDetail extends Component {

    constructor(props) {
        super(props);
        let {params} = this.props.navigation.state;
        this.state = {
            item: params && params.item ? params.item : {id: 1},
            listData: [1, 2, 3, 4],
        };
    }

    componentDidMount() {
        this.loadNetData();
    }

    loadNetData = async () => {
        const {workStore} = this.props;
        let url = ServicesApi.jobDetails;
        let data = {
            id: this.state.item.id,
        };

        let result = await workStore.requestWorkDetail(url, data);
        // console.log(result);
    };

    renderHeaderRightView = () => {
        return (
            <TouchableOpacity
                style={[CusTheme.headerButtonView, styles.headerRightView]}
                onPress={() => RouterHelper.navigate('异常申诉', 'WorkAbnormalAppeal', {})}
            >
                <Text style={CusTheme.headerBtnName}>异常申诉</Text>
            </TouchableOpacity>
        )
    };

    renderWorKDescription = (data) => {
        if (!data || data.length < 1) {
            return;
        }
        let descriptions = data.map((item, index) => {
            return (
                <View style={styles.orderUserInfoConItem} key={'desc_' + index}>
                    <Text style={[styles.orderUserInfoConItemTitle]}>【{item.name}】</Text>
                    <Text style={[styles.orderUserInfoConItemValue]}>{item.value}</Text>
                </View>
            )
        });
        return descriptions;
    };

    signUpWork = () => {
        let {item} = this.state;
        RouterHelper.navigate('选择时间', 'WorkSignUpStepOne', {item});
    };

    render() {
        let {loading, listData} = this.state;
        const {workStore} = this.props;
        let {workDetail} = workStore;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '工作详情';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                    // rightView={this.renderHeaderRightView()}
                />
                <ScrollView style={styles.content}>
                    <View style={[styles.contentItemView,]}>
                        <View style={[styles.contentTitleView, styles.orderGoodsInfoView]}>
                            <Text style={styles.orderGoodsTitle}>{workDetail.name}</Text>
                            <JobTagComponent
                                style={styles.tagsContainer}
                                tagsData={workDetail.tags}
                                {...this.props}
                            />
                        </View>
                        <Text style={styles.orderGoodsPrices}>{workDetail.price}工分/h</Text>
                        <Text style={styles.orderGoodsNum}>报名人数：{workDetail.sign_count}/{workDetail.total_count}</Text>
                    </View>

                    <View style={[styles.contentItemView, styles.orderUserInfoView]}>
                        <View style={[styles.contentTitleView]}>
                            <Text style={styles.contentTitle}>职位描述</Text>
                        </View>
                        <View style={styles.orderUserInfoCon}>
                            {this.renderWorKDescription(workDetail.description)}

                            {/*<View style={styles.orderUserInfoConItem}>
                                <Text style={[styles.orderUserInfoConItemTitle]}>【入职要求】</Text>
                                <Text style={[styles.orderUserInfoConItemValue]}>形象好、气质佳、阳光开朗、男女不限！</Text>
                            </View>*/}
                        </View>
                    </View>
                    <View style={[styles.contentItemView, styles.orderStatusInfoView]}>
                        <View style={[styles.contentTitleView]}>
                            <Text style={styles.contentTitle}>工作时间</Text>
                        </View>
                        <Text style={styles.orderStatusInfoItem}>开始时间：{workDetail.time_start}</Text>
                        <Text style={styles.orderStatusInfoItem}>结束时间：{workDetail.time_end}</Text>
                        <Text style={styles.orderStatusInfoItem}>工作时间段：{workDetail.time_dur}</Text>
                    </View>
                </ScrollView>
                <Button
                    title={workDetail.sign_available === 1 ? '报名' : '已报名'}
                    style={[CusTheme.btnView, styles.btnView]}
                    titleStyle={[CusTheme.btnName, styles.btnName]}
                    onPress={() => {
                        workDetail.sign_available === 1 && this.signUpWork();
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    headerRightView: {
        top: -22,
        right: 10,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#123',
    },

    contentItemView: {
        padding: 15,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    contentTitleView: {
        // height: 30,
        // justifyContent: 'center',
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
        // flex: 1,
        color: '#333',
        fontSize: FontSize(16),
    },
    tagsContainer: {
        marginLeft: 10,
        marginBottom: 0,
        // backgroundColor: '#123',
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

    btnView: {
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 15,
    },
    btnName: {},


    jobInfoTagsView: {
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    jobInfoTagItemView: {
        marginRight: 3,
        borderRadius: 2,
        paddingVertical: 2,
        paddingHorizontal: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: CusTheme.minPixel,
    },
    jobInfoTagIconView: {
        borderWidth: 0,
        padding: 0,
    },
    jobInfoTagItemName: {
        color: CusTheme.themeColor,
        fontSize: FontSize(10),
    },
    jobInfoTagIcon: {
        width: ScaleSize(28),
        height: ScaleSize(28),
        resizeMode: 'contain',
    },

    orderUserInfoConItem: {
        marginTop: 10,
    },
    orderUserInfoConItemTitle: {
        color: '#333',
        marginBottom: 5,
        fontSize: FontSize(15),
    },
    orderUserInfoConItemValue: {
        color: '#666',
        fontSize: FontSize(13),
        lineHeight: FontSize(20),
    },
});