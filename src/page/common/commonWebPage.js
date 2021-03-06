/**
 * 校园空兼 - CommonWebPage
 * http://menger.me
 * @大梦
 */

'use strict';

import React, {Component, PureComponent} from 'react'
import {
    Text,
    View,
    WebView,
    ScrollView,
    StyleSheet,
} from 'react-native'
import NavigationBar from '../../component/navigation/NavigationBar'
import SpinnerLoading from '../../component/common/SpinnerLoading'

export default class CommonWebPage extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        this.timer = setTimeout(() => {
            this.setState({
                loading: false,
            });
        }, 1000);
    }

    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer);
    }

    render() {
        let {loading} = this.state;
        let {params} = this.props.navigation.state;
        let url = params && params.url ? params.url : '';
        let style = params && params.style ? params.style : '';
        let pageTitle = params && params.pageTitle ? params.pageTitle : '详情页';
        // console.log(url);
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                {!loading ?
                    <WebView
                        source={{uri: url}}
                        startInLoadingState={false}
                        style={[styles.webContainer, style]}
                    />
                    : <SpinnerLoading isVisible={loading}/>
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f2f3',
    },
    webContainer: {
        flex: 1,
        backgroundColor: '#f1f2f3',
    },
});