/**
 * 校园空兼 - MineRepayment
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
import NavigationBar from '../../component/common/NavigationBar'


export default class MineRepayment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customerMobile: '400-500-6666',
        };
    }

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

    render() {
        let {customerMobile} = this.state;
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '提前还款';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <View style={styles.content}>
                    <View style={styles.contentImgView}>
                        <Image source={Images.icon_customer_service} style={styles.contentImg}/>
                    </View>
                    <View style={styles.contentTitleView}>
                        <Text style={styles.contentTitle}>请拨打客服电话联系还款</Text>
                        <TouchableOpacity
                            style={styles.mobileView}
                            onPress={() => this.makeCall(customerMobile)}
                        >
                            <Text style={styles.contentTitle}>{customerMobile}</Text>
                        </TouchableOpacity>
                        <Text style={styles.contentSubtitle}>还款说明：还款说明还款说明还款说明还款说明</Text>
                    </View>
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
        alignItems: 'center',
        // justifyContent: 'center',
    },
    contentImgView: {
        marginTop: ScaleSize(200),
    },
    contentImg: {
        width: ScaleSize(380),
        height: ScaleSize(380),
        resizeMode: 'contain',
    },
    contentTitleView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    mobileView: {},
    contentTitle: {
        color: '#333',
        marginTop: 10,
        fontSize: FontSize(15),
    },
    contentSubtitle: {
        color: '#999',
        marginTop: 10,
        fontSize: FontSize(13),
    },
});