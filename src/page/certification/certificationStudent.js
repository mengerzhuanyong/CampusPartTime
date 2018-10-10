/**
 * 校园空兼 - CertificationStudent
 * https://menger.me
 * @大梦
 */

'use strict';

import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import NavigationBar from '../../component/navigation/NavigationBar'
import DropDownMenu from '../../component/common/DropDownMenu';
import Container from '../../component/common/Container';
import {ListRow} from 'teaset'
import {inject, observer} from "mobx-react/index";

@inject('loginStore', 'mineStore')
@observer
export default class CertificationStudent extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let {mineStore} = this.props;
        let {myProfile} = mineStore;
        // myProfile.edu_detail = [
        //     {title: '姓名', value: 1},
        //     {title: '学校', value: 2},
        //     {title: '专业', value: 3},
        //     {title: '等级', value: 4},
        //     {title: '入学时间', value: 4},
        //     {title: '预计毕业时间', value: 4},
        // ];
        let {params} = this.props.navigation.state;
        let pageTitle = params && params.pageTitle ? params.pageTitle : '学籍认证';
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={pageTitle}
                />
                <View style={styles.content}>
                    {myProfile.edu_detail.map((item, index) => {
                        return (
                            <View style={styles.contentItemView} key={'student_info_'+index}>
                                <Text style={styles.contentTitle}>{item.title}:</Text>
                                <Text style={styles.contentContext}>{item.value}</Text>
                            </View>
                        );
                    })}
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
    contentItemView: {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 30,
        // backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'space-between',
    },
    contentTitle: {
        // flex: 1,
        fontSize: 15,
        color: '#333',
        marginRight: 15,
        // textAlign: 'right',
        borderRightWidth: 1,
        borderColor: '#ddd',
    },
    contentContext: {
        // flex: 3,
        fontSize: 13,
        color: '#333',
    },
});