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
        let {params} = this.props.navigation.state;
        this.state = {
            loading: false,
            item: params && params.item ? params.item : '',
            flag: params && params.flag ? params.flag : '',
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

    onCancelApply = async () => {
        const {workStore} = this.props;
        let {item, flag} = this.state;
        let {onCancelApply, sign_id} = workStore;
        let url = ServicesApi.job_application_cancel;
        if (flag === 'workspace') {
            sign_id = item.id;
        }
        let data = {
            sign_id,
        };
        let result = await onCancelApply(url, data);
        if (result.code === 1) {
            RouterHelper.goBack('WorkDetail');
        }
    };

    confirm = () => {
        RouterHelper.popToTop();
    };

    render() {
        let {item, flag} = this.state;
        const {workStore} = this.props;
        let {server_mobile, sign_status, remark} = workStore;
        if (flag === 'workspace') {
            server_mobile = item.server_mobile;
        }
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