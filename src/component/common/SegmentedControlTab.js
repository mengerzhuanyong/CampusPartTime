/**
 * 校园空兼 -
 * https://menger.me
 * @大梦
 */


'use strict';

import React from 'react'
import {
    View,
    ViewPropTypes,
    TouchableOpacity,
    StyleSheet,
    Text
} from 'react-native';
import PropTypes from 'prop-types'
import {VerticalLine} from "./commonLine";
import {scaleSize} from "../../util/Tool";

class SegmentedControlTab extends React.PureComponent {

    static propTypes = {
        values: PropTypes.array,
        badges: PropTypes.array,
        multiple: PropTypes.bool,
        onTabPress: PropTypes.func,
        selectedIndex: PropTypes.number,
        selectedIndices: PropTypes.arrayOf(PropTypes.number),
        tabsContainerStyle: ViewPropTypes.style,
        tabStyle: ViewPropTypes.style,
        activeTabStyle: ViewPropTypes.style,
        tabTextStyle: Text.propTypes.style,
        activeTabTextStyle: Text.propTypes.style,
        tabBadgeContainerStyle: Text.propTypes.style,
        activeTabBadgeContainerStyle: Text.propTypes.style,
        tabBadgeStyle: Text.propTypes.style,
        activeTabBadgeStyle: Text.propTypes.style,
    };

    static defaultProps = {
        values: ['One', 'Two', 'Three'],
        badges: ['', '', ''],
        multiple: false,
        selectedIndex: null, // 默认为null
        selectedIndices: [],
    };

    constructor(props) {
        super(props);
        this.state = {selectedIndex: 0, selectedIndices: [0]}
    }

    _handleTabPress = (index) => {
        const {multiple, selectedIndex, onTabPress} = this.props;
        if (selectedIndex && selectedIndex !== index) {
            onTabPress && onTabPress(index);
        } else if (!selectedIndex && this.state.selectedIndex !== index) {
            if (multiple) {
                // this.setState({selectedIndices:[]})
            } else {
                this.setState({selectedIndex: index}, () => {
                    onTabPress && onTabPress(index);
                })
            }
        }
    };

    render() {
        const {multiple, selectedIndex, selectedIndices, values, badges, tabsContainerStyle, onTabPress, tabStyle, showSeparator, ...others} = this.props;
        const firstTabStyle = [];
        const lastTabStyle = [];
        const currentIndex = !selectedIndex ? this.state.selectedIndex : selectedIndex;
        return (
            <View
                style={[styles.tabsContainerStyle, tabsContainerStyle]}
                removeClippedSubviews={false}>
                {
                    values.map((item, index) => {
                        return (
                            <TabOption
                                key={index}
                                index={index}
                                badge={badges && badges[index] ? badges[index] : false}
                                isTabActive={multiple ? selectedIndices.includes(index) : currentIndex === index}
                                text={item}
                                onTabPress={this._handleTabPress}
                                firstTabStyle={index === 0 ? [{borderLeftWidth: 0}] : {}}
                                tabStyle={[tabStyle, index !== 0 && index !== values.length - 1 ? {} : {}]}
                                showSeparator={index !== 0 && showSeparator}
                                {...others}
                            />
                        );
                    })
                }
            </View>
        );
    }
}


class TabOption extends React.PureComponent {
    _onPress = () => {
        const {onTabPress, index} = this.props;
        onTabPress && onTabPress(index)
    };

    render() {
        const {
            isTabActive, index, badge, text,
            firstTabStyle,
            tabStyle, activeTabStyle,
            tabTextStyle, activeTabTextStyle,
            tabBadgeContainerStyle, activeTabBadgeContainerStyle,
            tabBadgeStyle, activeTabBadgeStyle, separatorStyle, showSeparator
        } = this.props;
        return (
            <TouchableOpacity
                style={[
                    styles.tabStyle,
                    tabStyle,
                    isTabActive ? [styles.activeTabStyle, activeTabStyle] : {},
                    firstTabStyle
                ]}
                onPress={this._onPress}
                activeOpacity={1}
            >
                {showSeparator ? <VerticalLine lineStyle={[styles.separatorStyle, separatorStyle]}/> : null}
                <View style={{flexDirection: "row"}}>
                    <Text
                        style={[
                            styles.tabTextStyle,
                            tabTextStyle,
                            isTabActive ? [styles.activeTabTextStyle, activeTabTextStyle] : {}
                        ]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {text}
                    </Text>
                    {badge ?
                        <View
                            style={[
                                styles.tabBadgeContainerStyle,
                                tabBadgeContainerStyle,
                                isTabActive ? [styles.activeTabBadgeContainerStyle, activeTabBadgeContainerStyle] : {}
                            ]}>
                            <Text
                                style={[
                                    styles.tabBadgeStyle,
                                    tabBadgeStyle,
                                    isTabActive ? [styles.activeTabBadgeStyle, activeTabBadgeStyle] : {}
                                ]}
                            >
                                {badge}
                            </Text>
                        </View> : null}
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    tabsContainerStyle: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: CusTheme.themeColor,
        overflow: 'hidden',
    },
    tabStyle: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: CusTheme.themeColor,
        backgroundColor: 'white',
        // borderLeftWidth: 1,
    },
    activeTabStyle: {
        backgroundColor: CusTheme.themeColor,
        // paddingRight: 0.5,
    },
    separatorStyle: {
        left: -0.5,
        height: 20,
        position: 'absolute',
        backgroundColor: '#ddd',
    },
    tabTextStyle: {
        color: CusTheme.themeColor
    },
    activeTabTextStyle: {
        color: 'white'
    },
    tabBadgeContainerStyle: {
        borderRadius: 20,
        backgroundColor: 'red',
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: 5,
        marginBottom: 3
    },
    activeTabBadgeContainerStyle: {
        backgroundColor: 'white'
    },
    tabBadgeStyle: {
        color: 'white',
        fontSize: 11,
        fontWeight: 'bold'
    },
    activeTabBadgeStyle: {
        color: 'black'
    }
});

export default SegmentedControlTab;
