/**
 * 校园空兼 - Location
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

export default class Location extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            lng: '',
            lat: '',
            district: '',
            hasPermission: undefined, //是否获取权限
        };
        this.checkPermission()
            .then((hasPermission) => {
                let FINE_LOCATION = hasPermission['android.permission.ACCESS_FINE_LOCATION'];
                let COARSE_LOCATION = hasPermission['android.permission.ACCESS_COARSE_LOCATION'];
                //如果未授权, 则执行下面的代码
                if ( FINE_LOCATION !== 'granted' && COARSE_LOCATION !== 'granted') {
                    // this.setState({
                    //     hasPermission: FINE_LOCATION || COARSE_LOCATION,
                    // });
                    this.getPermission();
                    return;
                }
                this.setState({
                    hasPermission: 'granted',
                });
            })
            .catch(e => {
                // console.log(e);
            });
    }

    static defaultProps = {
        style: null,
        titleStyle: null,
        updateAddress: () => {},
    };

    componentDidMount() {
        this.getLocation();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({});
    }

    componentWillUnmount() {
        let timers = [this.timer1,];
        ClearTimer(timers);
    }

    checkPermission() {
        if (Platform.OS !== 'android') {
            return Promise.resolve(true);
        }
        const permissions = [
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ];

        return PermissionsAndroid.requestMultiple(permissions)
            .then((result) => {
                // console.log(result);     //结果: granted ,    PermissionsAndroid.RESULTS.GRANTED 也等于 granted
                return result;
            })
            .catch(error => {
                // console.log('拒绝授权=====>', error);
                return null;
            })
    }

    getPermission = async () => {
        try {
            let permission = await this.checkPermission();
            let FINE_LOCATION = permission['android.permission.ACCESS_FINE_LOCATION'];
            let COARSE_LOCATION = permission['android.permission.ACCESS_COARSE_LOCATION'];
            if (permission) {
                this.setState({
                    hasPermission: FINE_LOCATION || COARSE_LOCATION,
                });
            }
        } catch (e) {
            // console.log(e);
        }
    };

    getLocation = async () => {
        let {updateAddress} = this.props;
        this.setState({
            canPress: false
        });
        let data = await Geolocation.getCurrentPosition();
        // console.log(data);
        this.timer1 = setTimeout(() =>{
            this.setState({
                canPress: true
            });
        }, 500);
        if (!data) {
            ToastManager.show('定位失败，请稍后重试');
            return;
        }
        let location = checkFloat(data.latitude);
        if (location) {
            global.lat = data.latitude;
            global.lng = data.longitude;
            global.district = data.district || data.city;
            this.setState({
                lat: data.latitude,
                lng: data.longitude,
                district: data.district || data.city,
            });
            this.postLocation(data.latitude, data.longitude);
            updateAddress && updateAddress(data);
        }
    };

    postLocation = async (lat = this.state.lat, lng = this.state.lng) => {
        let url = ServicesApi.location;
        lng = lng < 0 ? -lng : lng;
        let data = {
            lat: lat,
            lng: lng,
        };

    };

    render() {
        let {type, style, titleStyle, lineStyle} = this.props;
        let {district} = this.state;
        return (
            <TouchableOpacity
                style={[styles.headerLeftView, style]}
                onPress={() => this.getLocation()}
            >
                <Image source={Images.icon_place} style={CusTheme.headerIcon}/>
                <Text style={[CusTheme.headerIconTitle, styles.headerIconTitle]} numberOfLines={2}>{district}</Text>
            </TouchableOpacity>
        );
    
    }
}

const styles = StyleSheet.create({
    
    headerLeftView: {
        left: 15,
        // marginRight: 5,
        // position: 'absolute',
        minWidth: 20,
        width: 55,
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#123',
    },
    headerTitle: {
        color: '#333',
        fontSize: FontSize(14),
    },
    headerIconTitle: {
        // flex: 1,
        width: 40,
        // textAlign: 'right',
        // backgroundColor: '#f60',
        fontSize: FontSize(11),
        color: CusTheme.themeColor,
    },
});