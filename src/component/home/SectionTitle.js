/**
 * 校园空兼 - SectionTitle
 * http://menger.me
 * @大梦
 */


'use strict';

import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {VerticalLine} from "../common/commonLine";

export default class SectionTitle extends PureComponent {


    _onPress = (index) => {
        this.props.onPress && this.props.onPress(index)
    };

    renderStaticSectionTitle = (data) => {
        return (
            <View>
                <TouchableOpacity
                    style={styles.sortBtnItemView}
                    onPress={() => this._onPress(0)}
                >
                    <Text style={styles.sortBtnItemName}>全部职位</Text>
                </TouchableOpacity>
                <VerticalLine lineStyle={styles.sortVerLine}/>
                <TouchableOpacity
                    style={[styles.sortBtnItemView]}
                    onPress={() => this._onPress(1)}
                >
                    <Text style={styles.sortBtnItemName}>按剩余人数排序</Text>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.sortBtnIcon}
                            resizeMode={'contain'}
                            source={Images.icon_sort}
                        />
                    </View>
                </TouchableOpacity>
                <VerticalLine lineStyle={styles.sortVerLine}/>
                <TouchableOpacity
                    style={styles.sortBtnItemView}
                    onPress={() => this._onPress(2)}
                >
                    <Text style={styles.sortBtnItemName}>按工分排序</Text>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.sortBtnIcon}
                            resizeMode={'contain'}
                            source={Images.icon_sort}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    };

    renderSectionTitle = (data) => {
        if (!data || data.length < 1) {
            return;
        }
        let titles = data.map((item, index) => {
            let verLine = <VerticalLine lineStyle={styles.sortVerLine}/>;
            if (index === 0) {
                verLine = null
            }
            return (
                <TouchableOpacity
                    key={`sectionTitle_${index}`}
                    style={styles.sortBtnItemView}
                    onPress={() => this._onPress(index)}
                >
                    <Text style={styles.sortBtnItemName}>{item}</Text>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.sortBtnIcon}
                            resizeMode={'contain'}
                            source={Images.icon_sort}
                        />
                    </View>
                </TouchableOpacity>
            )
        });
        return titles;
    };

    render() {
        const {sectionTitles} = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.sortBtnItemView}
                    onPress={() => this._onPress(0)}
                >
                    <Text style={styles.sortBtnItemName}>{sectionTitles[0]}</Text>
                </TouchableOpacity>
                <VerticalLine lineStyle={styles.sortVerLine}/>
                <TouchableOpacity
                    style={[styles.sortBtnItemView]}
                    onPress={() => this._onPress(1)}
                >
                    <Text style={styles.sortBtnItemName}>{sectionTitles[1]}</Text>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.sortBtnIcon}
                            resizeMode={'contain'}
                            source={Images.icon_sort}
                        />
                    </View>
                </TouchableOpacity>
                <VerticalLine lineStyle={styles.sortVerLine}/>
                <TouchableOpacity
                    style={styles.sortBtnItemView}
                    onPress={() => this._onPress(2)}
                >
                    <Text style={styles.sortBtnItemName}>{sectionTitles[2]}</Text>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.sortBtnIcon}
                            resizeMode={'contain'}
                            source={Images.icon_sort}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: ScaleSize(90),
        paddingHorizontal: 15,
        borderColor: '#eef0f2',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        borderBottomWidth: CusTheme.minPixel,
    },

    sortVerLine: {
        height: 20,
        backgroundColor: '#d9d9d9',
    },
    sortBtnItemView: {
        // flex: 1,
        height: 55,
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#f60',
    },
    sortBtnItemName: {
        color: '#666',
        fontSize: FontSize(12),
    },
    imageContainer: {
        alignItems: 'center',
        width: ScaleSize(25),
        height: ScaleSize(25),
        justifyContent: 'center',
    },
    sortBtnIcon: {
        marginLeft: 5,
        height: ScaleSize(25),
        resizeMode: 'contain',
    },
});