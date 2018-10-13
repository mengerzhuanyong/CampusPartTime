/**
 * 校园空兼 - SubmitSummerJobs
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
    KeyboardAvoidingView,
} from 'react-native';
import NavigationBar from '../../component/navigation/NavigationBar'
import SegmentedView from '../../component/segmentedView'
import LRComponent from '../login/LRComponent'
import SpinnerLoading from '../../component/common/SpinnerLoading';
import dismissKeyboard from 'dismissKeyboard' // 键盘miss的方法
import SegmentedControlTab from '../../component/common/SegmentedControlTab'
import {Button} from 'teaset'
import {observer, inject} from 'mobx-react';

@inject('loginStore', 'mineStore', 'workStore')
@observer
export default class SubmitSummerJobs extends Component {

    constructor(props) {
        super(props);
        let {params} = this.props.navigation.state;
        this.state = {
            listData: [1, 2, 3, 4],
            item: params && params.item ? params.item : {},
            work_name: '',
            mobile: '',
            description: '',
            uploading: false,
        };
    }

    componentDidMount() {
        // console.log(this.state.item)
    }

    submitFoo = async () => {
        let {item, work_name, mobile, description} = this.state;
        const {workStore} = this.props;
        let url = ServicesApi.submitSummerJobs;
        let data = {
            work_name,
            mobile,
            description,
        };
        try {
            let result = await workStore.onSubmitAbnormalAppeal(url, data);
            ToastManager.show(result.msg);
            if (result && result.code === 1) {
                RouterHelper.goBack();
            }
        } catch (e) {
            // console.log(e);
        }
    };

    render() {
        let {loading, listData, uploading, item, photos} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '暑假工报名';
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
                                onChangeText={(text) => {
                                    this.setState({
                                        work_name: text
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
                                onChangeText={(text) => {
                                    this.setState({
                                        mobile: text,
                                    });
                                }}
                            />
                        </View>
                        <View style={[styles.contentItemView, styles.orderUserInfoView]}>
                            <View style={[styles.contentTitleView]}>
                                <Text style={styles.contentTitle}>备注</Text>
                            </View>
                            <View style={[styles.contentConView]}>
                                <TextInput
                                    multiline={true}
                                    style={styles.inputItem}
                                    ref={v => this.input = v}
                                    underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                                    placeholder={'请输入'}
                                    placeholderTextColor={'#999'}
                                    returnKeyType={'done'}
                                    onChangeText={(text) => {
                                        this.setState({
                                            description: text
                                        });
                                    }}
                                />
                            </View>
                        </View>
                        <Button
                            title={'提交'}
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
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginVertical: 5,
        borderRadius: 8,
    },
    orderUserInfoView: {
        padding: 15,
        marginVertical: 5,
        borderRadius: 8,
        backgroundColor: '#fff',
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
    contentTitleView: {
        height: 30,
        // justifyContent: 'center',
    },
    contentTitle: {
        color: '#333',
        fontSize: FontSize(14),
    },
    userInfoItemInput: {
        flex: 1,
        height: 45,
        color: '#555',
    },
    orderUserInfoCon: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
    contentConView: {},
    inputItem: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        height: ScaleSize(190),
        textAlignVertical: 'top',
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