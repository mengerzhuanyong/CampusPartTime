/**
 * 校园空兼 - ShareContent
 * https://menger.me
 * @大梦
 */


'use strict';

import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Images from '../../config/manager/ImageManager';
import { fontSize, scaleSize } from '../../util/Tool';

import Theme from '../../config/Theme'
import {HorizontalLine} from "./commonLine";

const ShareSource = [
    {actionTitle: '微信好友', actionImage: Images.icon_wechat, type: 1},
    {actionTitle: '朋友圈', actionImage: Images.icon_wechat, type: 2},
    {actionTitle: 'QQ', actionImage: Images.icon_qq, type: 3},
];

const OtherSource = [
    {actionTitle: '复制', actionImage: Images.icon_tabbar_home_cur, type: 5},
];

export default class ShareContent extends React.PureComponent {

    _onPressAction = (type) => {
        const {onPress} = this.props;
        onPress && onPress(type);
        ActionsManager.hide();
    };

    _onPressCancel = () => {
        ActionsManager.hide();
    };

    _renderContent = (dataSource, key) => {
        return (
            <View style={styles.shareContent}>
                {dataSource.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={`${key}_${index}`}
                            style={styles.actionContainer}
                            onPress={() => this._onPressAction(item.type)}
                        >
                            <Image style={styles.actionImage} source={item.actionImage}/>
                            <Text style={styles.actionText}>{item.actionTitle}</Text>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    };
    
    render() {
        const {moduleTitle} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.contentTitleView}>
                    <Text style={styles.contentTitle}>{moduleTitle || '分享APP'}</Text>
                </View>
                {this._renderContent(ShareSource, 'share')}
                <HorizontalLine style={styles.separator} />
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={this._onPressCancel}
                >
                    <Text style={styles.cancelText}>取消</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        height: scaleSize(400),
        backgroundColor: '#fff',
        paddingBottom: Theme.isIPhoneX ? Theme.fitIPhoneXBottom : 0,
    },
    contentTitleView: {
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentTitle: {
        color: '#333',
        fontSize: fontSize(14),
    },
    shareContent: {
        flex: 1,
        paddingVertical: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    actionContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionImage: {
        width: scaleSize(100),
        height: scaleSize(100),
        resizeMode: 'contain',
    },
    actionText: {
        marginTop: 8,
        color: '#555',
        fontSize: fontSize(12),
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#cdcdcd',
    },
    cancelButton: {
        height: Theme.shareCancelActionHeight,
        backgroundColor: Theme.shareCancelBackColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelText: {
        color: '#333',
        fontSize: fontSize(14),
    },
});