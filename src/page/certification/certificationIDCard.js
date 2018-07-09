/**
 * 校园空兼 - CertificationIDCard
 * https://menger.me
 * @大梦
 */

'use strict';

import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import {Button} from 'teaset'
import NavigationBar from '../../component/common/NavigationBar'

export default class CertificationIDCard extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handlerImages = (type) => {

    };

    render() {
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '身份证认证';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <ScrollView style={styles.content}>
                    <TouchableOpacity
                        style={styles.uploadItemView}
                        onPress={() => this.handlerImages()}
                    >
                        <Image source={Images.icon_plus} style={styles.uploadIcon} />
                        <Text style={styles.uploadBtnName}>手持证件照</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.uploadItemView}
                        onPress={() => this.handlerImages()}
                    >
                        <Image source={Images.icon_plus} style={styles.uploadIcon} />
                        <Text style={styles.uploadBtnName}>身份证正面照</Text>
                    </TouchableOpacity>
                    <View style={styles.userInfoTipsView}>
                        <Image source={Images.icon_notice} style={styles.userInfoTipsIcon} />
                        <Text style={styles.userInfoTipsText}>请输入您的身份信息</Text>
                    </View>
                    <View style={styles.userInfoItemView}>
                        <Image source={Images.icon_user_line} style={styles.userInfoItemIcon} />
                        <Text style={styles.userInfoItemTitle}>姓名：</Text>
                        <TextInput
                            style={styles.userInfoItemInput}
                            underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                            placeholder={'请输入您的姓名'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            onChangeText={(text) => {
                                this.setState({});
                            }}
                        />
                    </View>
                    <View style={styles.userInfoItemView}>
                        <Image source={Images.icon_user_card} style={styles.userInfoItemIcon} />
                        <Text style={styles.userInfoItemTitle}>身份证号：</Text>
                        <TextInput
                            style={styles.userInfoItemInput}
                            underlineColorAndroid={'rgba(0, 0, 0, 0)'}
                            placeholder={'请输入您的身份证号'}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            onChangeText={(text) => {
                                this.setState({});
                            }}
                        />
                    </View>
                    <Button
                        title={'提交认证'}
                        style={styles.submitBtnView}
                        titleStyle={styles.submitBtnName}
                    />
                </ScrollView>
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
        width: ScaleSize(50),
        height: ScaleSize(50),
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
        backgroundColor: Theme.themeColor,
    },
    submitBtnName: {
        color: '#fff',
        fontSize: FontSize(15),
    }
});