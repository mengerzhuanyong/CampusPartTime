/**
 * 校园空兼 - EmergencyContact
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
import {inject, observer} from "mobx-react/index";

@inject('loginStore', 'mineStore')
@observer
export default class EmergencyContact extends Component {

    constructor(props) {
        super(props);
        this.state = {
            realname1: '',
            relationship1: '',
            mobile1: '',
            realname2: '',
            relationship2: '',
            mobile2: '',
        };
    }

    submitFoo = async () => {
        const {mineStore} = this.props;
        let {realname1, relationship1, mobile1, realname2, relationship2, mobile2} = this.state;
        let url = ServicesApi.bind_emergency;
        let data = {
            realname1, relationship1, mobile1, realname2, relationship2, mobile2,
        };
        if (!realname1 || realname1 === '') {
            ToastManager.show('请输入联系人姓名');
            return;
        }
        if (!relationship1 || relationship1 === '') {
            ToastManager.show('请输入与联系人的关系');
            return;
        }
        if (!mobile1 || mobile1 === '') {
            ToastManager.show('请输入联系人手机号');
            return;
        }
        try {
            let result = await mineStore.onSubmitEmergency(url, data);
            ToastManager.show(result.msg);
            if (result.code === 1) {
                let _url = ServicesApi.my_details;
                let result = await mineStore.requestMyProfile(_url);
                RouterHelper.goBack();
            }
        } catch (e) {
            ToastManager.show('error');
        }
    }

    render() {
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '绑定紧急联系人';
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
                        <View style={styles.userInfoTipsView}>
                            <Text style={styles.userInfoTipsText}>紧急联系人1：</Text>
                        </View>
                        <View style={styles.userInfoItemView}>
                            <Image source={Images.icon_user_line} style={styles.userInfoItemIcon}/>
                            <Text style={styles.userInfoItemTitle}>姓名：</Text>
                            <TextInput
                                style={styles.userInfoItemInput}
                                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                placeholder={'请输入联系人姓名'}
                                // keyboardType={'numeric'}
                                returnKeyType={'done'}
                                onChangeText={(text) => {
                                    this.setState({
                                        realname1: text,
                                    });
                                }}
                            />
                        </View>
                        <View style={styles.userInfoItemView}>
                            <Image source={Images.icon_relationship} style={styles.userInfoItemIcon}/>
                            <Text style={styles.userInfoItemTitle}>关系：</Text>
                            <TextInput
                                style={styles.userInfoItemInput}
                                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                placeholder={'父亲/母亲/老师/班长等'}
                                // keyboardType={'numeric'}
                                returnKeyType={'done'}
                                onChangeText={(text) => {
                                    this.setState({
                                        relationship1: text,
                                    });
                                }}
                            />
                        </View>
                        <View style={styles.userInfoItemView}>
                            <Image source={Images.icon_telephone} style={styles.userInfoItemIcon}/>
                            <Text style={styles.userInfoItemTitle}>联系方式：</Text>
                            <TextInput
                                style={styles.userInfoItemInput}
                                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                placeholder={'请输入紧急联系方式'}
                                keyboardType={'numeric'}
                                returnKeyType={'done'}
                                maxLength={11}
                                onChangeText={(text) => {
                                    this.setState({
                                        mobile1: text,
                                    });
                                }}
                            />
                        </View>
                        <View style={styles.userInfoTipsView}>
                            <Text style={styles.userInfoTipsText}>紧急联系人2：</Text>
                        </View>
                        <View style={styles.userInfoItemView}>
                            <Image source={Images.icon_user_line} style={styles.userInfoItemIcon}/>
                            <Text style={styles.userInfoItemTitle}>姓名：</Text>
                            <TextInput
                                style={styles.userInfoItemInput}
                                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                placeholder={'请输入联系人姓名'}
                                // keyboardType={'numeric'}
                                returnKeyType={'done'}
                                onChangeText={(text) => {
                                    this.setState({
                                        realname2: text,
                                    });
                                }}
                            />
                        </View>
                        <View style={styles.userInfoItemView}>
                            <Image source={Images.icon_relationship} style={styles.userInfoItemIcon}/>
                            <Text style={styles.userInfoItemTitle}>关系：</Text>
                            <TextInput
                                style={styles.userInfoItemInput}
                                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                placeholder={'父亲/母亲/老师/班长等'}
                                // keyboardType={'numeric'}
                                returnKeyType={'done'}
                                onChangeText={(text) => {
                                    this.setState({
                                        relationship2: text,
                                    });
                                }}
                            />
                        </View>
                        <View style={styles.userInfoItemView}>
                            <Image source={Images.icon_telephone} style={styles.userInfoItemIcon}/>
                            <Text style={styles.userInfoItemTitle}>联系方式：</Text>
                            <TextInput
                                style={styles.userInfoItemInput}
                                underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                placeholder={'请输入紧急联系方式'}
                                keyboardType={'numeric'}
                                returnKeyType={'done'}
                                maxLength={11}
                                onChangeText={(text) => {
                                    this.setState({
                                        mobile2: text,
                                    });
                                }}
                            />
                        </View>
                        <Button
                            title={'立即绑定'}
                            style={styles.submitBtnView}
                            titleStyle={styles.submitBtnName}
                            onPress={this.submitFoo}
                        />
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
        paddingTop: 20,
        paddingHorizontal: 15,
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
        marginVertical: 40,
        borderWidth: 0,
        backgroundColor: CusTheme.themeColor,
    },
    submitBtnName: {
        color: '#fff',
        fontSize: FontSize(15),
    }
});