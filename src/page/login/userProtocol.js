
import React, { Component } from 'react';
import { View, Text, StyleSheet, WebView } from 'react-native';
import NavigationBar from '../../components/NavigationBar';
class UserProtocol extends React.PureComponent {


    render() {
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'用户服务协议'}
                    rightViewOnPress={this.renderHeaderRightView}
                />
                <WebView
                    source={{ uri: '' }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});

export default UserProtocol;
