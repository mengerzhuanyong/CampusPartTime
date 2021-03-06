/**
 * 校园空兼 - ShareApp
 * http://menger.me
 * @大梦
 */

'use strict';

import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import NavigationBar from '../../component/navigation/NavigationBar'
import DropDownMenu from '../../component/common/DropDownMenu';
import Container from '../../component/common/Container';

export default class ShareApp extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '设置';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <View style={CusTheme.flexCenter}>
                    <Text style={CusTheme.defaultFont}>敬请期待</Text>
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
    },
});