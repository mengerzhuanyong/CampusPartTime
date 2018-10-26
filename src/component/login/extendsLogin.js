/**
 * 校园空兼 - ExtendsLogin
 * https://menger.me
 * @大梦
 */

import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
    TextInput,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'

import {HorizontalLine} from '../../component/common/commonLine'

export default class ExtendsLogin extends Component {

    static defaultProps = {
        weChatLogin: null,
        qqLogin: null,
    };

    render(){
        let {weChatLogin, qqLogin, style} = this.props;
        return (
            <View style={[styles.extendsLoginView, style]}>
                <View style={styles.extendsLoginTitle}>
                    <HorizontalLine lineStyle={styles.horLine} />
                    <Text style={styles.extendsLoginTitleName}>其他账号登录</Text>
                    <HorizontalLine lineStyle={styles.horLine} />
                </View>
                <View style={styles.extendsLoginCon}>
                    {weChatLogin && weChatLogin !== null &&<TouchableOpacity
                        style = {styles.extendsLoginBtn}
                        onPress = {weChatLogin}
                    >
                        <Image source={Images.icon_wechat} style={styles.extendsLoginIcon} />
                    </TouchableOpacity>}
                    {qqLogin && qqLogin !== null && <TouchableOpacity
                        style = {styles.extendsLoginBtn}
                        onPress = {qqLogin}
                    >
                        <Image source={Images.icon_qq} style={styles.extendsLoginIcon} />
                    </TouchableOpacity>}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    extendsLoginView: {
        marginTop: 40,
        alignItems: 'center',
    },
    extendsLoginTitle: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    horLine: {
        height: 1,
        backgroundColor: '#eee',
        width: SCREEN_WIDTH * 0.25,
    },
    extendsLoginTitleName: {
        fontSize: 14,
        color: '#eee',
        marginHorizontal: 15,
    },
    extendsLoginCon: {
        marginBottom: 60,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    extendsLoginBtn: {
        width: 45,
        height: 45,
        marginTop: 10,
        marginHorizontal: 40,
    },
    extendsLoginIcon: {
        width: 45,
        height: 45,
        tintColor: '#eee',
        resizeMode: 'contain',
    },
});