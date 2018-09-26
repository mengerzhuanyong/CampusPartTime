/**
 * 校园空兼 - MessageButton
 * https://menger.me
 * @大梦
 */

'use strict';

import React, {PureComponent} from 'react'
import {
    Text,
    View,
    Image,
	Platform,
    StyleSheet,
    TouchableOpacity,
    PermissionsAndroid,
} from 'react-native'
import {Geolocation} from 'react-native-baidu-map'
import {VerticalLine} from '../common/commonLine'
import {checkFloat, checkMobile} from "../../util/Tool";

export default class MessageButton extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            lng: '',
            lat: '',
            district: '',
            hasPermission: undefined, //是否获取权限
        };
    }

    static defaultProps = {
        style: null,
        titleStyle: null,
    };

    componentDidMount() {
        this.getLocation();
    }

    render() {
        let {type, style, titleStyle, lineStyle} = this.props;
        let {district} = this.state;
        return (
            <TouchableOpacity
                style={styles.headerRightView}
                onPress={() => RouterHelper.navigate('消息', 'SystemMessage')}
            >
                <View style={styles.headerRightViewCon}>
                    <Image source={Images.icon_message} style={[CusTheme.headerIcon, {tintColor: '#fff'}]}/>
                    {status === 1 && <View style={CusTheme.pointView} />}
                </View>
            </TouchableOpacity>
        );
    
    }
}

const styles = StyleSheet.create({
    
    headerRightView: {
        right: 15,
        width: 30,
        height: 35,
        position: 'absolute',
        alignItems: 'flex-end',
        justifyContent: 'center',
        // backgroundColor: '#123',
    },
    headerRightViewCon: {},
});