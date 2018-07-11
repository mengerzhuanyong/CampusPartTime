/**
 * 校园空兼 - MineAccount
 * https://menger.me
 * @大梦
 */

'use strict';

import React, { Component } from 'react'
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
} from 'react-native'
import NavigationBar from '../../component/common/NavigationBar'
import {Button, Carousel, ListRow} from 'teaset'

export default class MineAccount extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    onPushToNextPage = (pageTitle, component, params = {}) => {
        RouteHelper.navigate(component, {
            pageTitle: pageTitle,
            ...params
        })
    };

    render() {
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '设置';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <ScrollView style={styles.content}>
                    <ListRow
                        title={'我的余额'}
                        detail={'25350.00元'}
                        style={styles.contentTitleView}
                        titleStyle={Theme.contentTitle}
                        accessory={<Image source={Images.icon_arrow_right} style={[Theme.contentRightIcon, {}]} />}
                        onPress={() => this.onPushToNextPage('我的余额', 'MineIntegritySystem', {})}
                    />
                    <ListRow
                        title={'信用额度'}
                        detail={''}
                        style={styles.contentTitleView}
                        titleStyle={Theme.contentTitle}
                        accessory={<Image source={Images.icon_arrow_right} style={[Theme.contentRightIcon, {}]} />}
                        onPress={() => this.onPushToNextPage('信用额度', 'MineCredits', {})}
                    />
                    <ListRow
                        title={'工分明细'}
                        detail={''}
                        style={styles.contentTitleView}
                        titleStyle={Theme.contentTitle}
                        accessory={<Image source={Images.icon_arrow_right} style={[Theme.contentRightIcon, {}]} />}
                        onPress={() => this.onPushToNextPage('工分明细', 'MineWorkPoints', {})}
                    />
                    <ListRow
                        title={'兼职收入明细'}
                        detail={''}
                        style={styles.contentTitleView}
                        titleStyle={Theme.contentTitle}
                        accessory={<Image source={Images.icon_arrow_right} style={[Theme.contentRightIcon, {}]} />}
                        onPress={() => this.onPushToNextPage('兼职收入明细', 'MinePartTimeIncome', {})}
                    />
                    <ListRow
                        title={'我的订单'}
                        detail={''}
                        style={styles.contentTitleView}
                        titleStyle={Theme.contentTitle}
                        accessory={<Image source={Images.icon_arrow_right} style={[Theme.contentRightIcon, {}]} />}
                        onPress={() => this.onPushToNextPage('我的订单', 'MineOrder', {})}
                    />
                    <ListRow
                        title={'提前还款'}
                        detail={''}
                        style={styles.contentTitleView}
                        titleStyle={Theme.contentTitle}
                        accessory={<Image source={Images.icon_arrow_right} style={[Theme.contentRightIcon, {}]} />}
                        bottomSeparator={'none'}
                        onPress={() => this.onPushToNextPage('提前还款', 'MineIntegritySystem', {})}
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
        // backgroundColor: '#fff',
    },

    contentItemView: {
        marginTop: 10,
    },
    contentTitleView: {
        height: 60,
        alignItems: 'center',
    },
    contentTitle: {
        marginLeft: 10,
        color: '#333',
        fontSize: FontSize(14),
    },
});