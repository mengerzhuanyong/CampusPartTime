/**
 * 校园空兼 - CertificationMobile
 * https://menger.me
 * @大梦
 */

'use strict';

import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native'
import {Button} from 'teaset'
import NavigationBar from '../../component/navigation/NavigationBar'
import DropDownMenu from '../../component/common/DropDownMenu';
import Container from '../../component/common/Container';
import RouterHelper from "../../router/RouterHelper";
import {inject, observer} from "mobx-react/index";

@inject('loginStore', 'mineStore')
@observer
export default class CertificationMobile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            realname: '', // '马运东',
            mobile: '', // '15066886007',
            id_number: '', // '370826199009223238',
        };
    }

    componentWillUnmount() {
        let timers = [this.timer];
        ClearTimer(timers);
    }

    onCertificationMobile = async () => {
        const {mineStore} = this.props;
        let {realname, mobile, id_number} = this.state;
        let {onCertificationMobile} = mineStore;
        let url = ServicesApi.mobile_verify;
        let data = {
            realname,
            mobile,
            id_number,
        };
        if (!CheckMobile(mobile)) {
            ToastManager.show('您输入的手机号错误，请检查后重新输入！');
            return;
        }
        let result = await onCertificationMobile(url, data);
        // console.log(result);
        ToastManager.show(result.msg);
        if (result && result.code === 1) {
            this.timer = setTimeout(() => {
                RouterHelper.goBack();
            }, 600);
        }
    };

    render() {
        let {mineStore} = this.props;
        let {myProfile} = mineStore;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '手机号实名认证';
        let status = myProfile.mobile_status === 1;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <KeyboardAvoidingView style={styles.content}>
                    <ScrollView
                        style={styles.scrollContent}
                        keyboardShouldPersistTaps={'handled'}
                    >
                        <View style={styles.userInfoItemView}>
                            <Image source={Images.icon_user_line} style={styles.userInfoItemIcon}/>
                            <Text style={styles.userInfoItemTitle}>姓名：</Text>
                            <TextInput
                                style={styles.userInfoItemInput}
                                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                placeholder={'请输入姓名'}
                                // keyboardType={'numeric'}
                                returnKeyType={'done'}
                                editable={status}
                                defaultValue={myProfile.mobile_detail.username}
                                onChangeText={(text) => {
                                    this.setState({
                                        realname: text
                                    });
                                }}
                            />
                        </View>
                        <View style={styles.userInfoItemView}>
                            <Image source={Images.icon_telephone} style={styles.userInfoItemIcon}/>
                            <Text style={styles.userInfoItemTitle}>手机号：</Text>
                            <TextInput
                                style={styles.userInfoItemInput}
                                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                placeholder={'请输入手机号'}
                                keyboardType={'numeric'}
                                returnKeyType={'done'}
                                maxLength={11}
                                editable={status}
                                defaultValue={myProfile.mobile_detail.mobile}
                                onChangeText={(text) => {
                                    this.setState({
                                        mobile: text,
                                    });
                                }}
                            />
                        </View>
                        <View style={styles.userInfoItemView}>
                            <Image source={Images.icon_user_card} style={styles.userInfoItemIcon}/>
                            <Text style={styles.userInfoItemTitle}>身份证号码：</Text>
                            <TextInput
                                style={styles.userInfoItemInput}
                                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                placeholder={'请输入身份证号码'}
                                // keyboardType={'numeric'}
                                returnKeyType={'done'}
                                maxLength={18}
                                editable={status}
                                defaultValue={myProfile.mobile_detail.id_number}
                                onChangeText={(text) => {
                                    this.setState({
                                        id_number: text,
                                    });
                                }}
                            />
                        </View>
                        {status && <Button
                            title={'立即认证'}
                            style={styles.submitBtnView}
                            titleStyle={styles.submitBtnName}
                            onPress={this.onCertificationMobile}
                        />}
                        <View style={[CusTheme.contentTipsView, CusTheme.contentTipsViewMargin]}>
                            <Text style={CusTheme.contentTipsCon}>{mineStore.certificationTips}</Text>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        flex: 1,
        padding: 15,
    },
    uploadItemView: {
        padding: 20,
        borderRadius: 4,
        marginVertical: 10,
        // marginHorizontal: 10,
        alignItems: 'center',
        height: ScaleSize(360),
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    uploadIcon: {
        marginVertical: 15,
        resizeMode: 'contain',
        width: ScaleSize(120),
        height: ScaleSize(120),
    },
    uploadBtnName: {
        color: '#999',
        fontSize: FontSize(15),
    },
    userInfoTipsView: {
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    userInfoTipsIcon: {
        width: ScaleSize(50),
        height: ScaleSize(50),
        resizeMode: 'contain',
        marginRight: 10,
    },
    userInfoTipsText: {
        color: '#333',
        fontSize: FontSize(14),
    },
    userInfoItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 3,
    },
    userInfoItemIcon: {
        width: ScaleSize(40),
        height: ScaleSize(40),
        resizeMode: 'contain',
        marginRight: 10,
    },
    userInfoItemTitle: {
        color: '#333',
        fontSize: FontSize(14),
    },
    userInfoItemInput: {
        flex: 1,
        height: 45,
    },
    submitBtnView: {
        height: 45,
        borderWidth: 0,
        marginTop: 40,
        marginBottom: 20,
        backgroundColor: CusTheme.themeColor,
    },
    submitBtnName: {
        color: '#fff',
        fontSize: FontSize(15),
    }
});