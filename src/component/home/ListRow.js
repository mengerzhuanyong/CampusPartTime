//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types'

// create a component
class ListRow extends React.PureComponent {

    static propTypes = {
        type: PropTypes.oneOf(['人才', '职位']),
        item: PropTypes.object,
        index: PropTypes.number,
        onPress: PropTypes.func,
        visibleBottom: PropTypes.bool
    }

    static defaultProps = {
        type: '人才',
        visibleBottom: true
    }

    _onPress = () => {
        const { item, onPress } = this.props
        onPress && onPress(item)
    }

    renderItemUser = () => {
        const { item, type } = this.props
        return (
            <View style={styles.itemUserContainer}>
                <View style={styles.realnameContainer}>
                    <Text style={styles.realnameText}>{item.name}</Text>
                    {type === '人才' ? (
                        <View style={styles.position}>
                            <Text style={styles.positionText}>{item.position}</Text>
                        </View>
                    ) : null}
                </View>
                <Text style={styles.salarText}>{item.salary}</Text>
            </View>
        )
    }

    renderItemSub = () => {
        const { item, type } = this.props
        console.log(item);
        return (
            <View style={styles.itemSubContainer}>
                <View style={styles.itemExp}>
                    <Image style={styles.cityImage} resizeMode={'contain'} source={Images.icon_home_location} />
                    <Text style={styles.expText}>{item.city}</Text>
                    <Image style={styles.exeImage} resizeMode={'contain'} source={Images.icon_home_time} />
                    <Text style={styles.expText}>{item.years}</Text>
                    <Image style={styles.educationImage} resizeMode={'contain'} source={Images.icon_home_exp} />
                    <Text style={styles.educationText}>{item.education}</Text>
                </View>
                <Text style={styles.updateTimeText}>{item.publish_time}</Text>
            </View>
        )
    }

    renderTags = () => {
        const { item, type } = this.props
        console.log('renderTags', item.tags)
        if (!item.tags) {
            return null
        }
        return (
            <View style={styles.tagsContainer}>
                {item.tags.map((item, index) => {
                    return (
                        <View style={styles.tagTextContainer} key={`tag_${index}`}>
                            <Text style={styles.tagText}>{item}</Text>
                        </View>
                    )
                })}
            </View>
        )
    }

    renderBottomItem = () => {
        const { item, type } = this.props
        return (
            type === '人才' ? (
                <Text style={styles.profileText}>{item.profile}</Text>
            ) : (
                    <View style={styles.entContainer}>
                        <Image style={styles.entImage} />
                        <Text style={styles.entNameText}>{item.enterprise.name}</Text>
                        <View style={styles.vipContainer}>
                            <Text style={styles.vipText}>{item.enterprise.qualification}</Text>
                        </View>
                    </View>
                )
        )
    }

    render() {
        const { item, type, index, visibleBottom } = this.props
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={this._onPress}>
                {type === '人才' ? (
                    <Image style={styles.itemHeader} />
                ) : null}
                <View style={styles.itemInfoContainer}>
                    {this.renderItemUser()}
                    {this.renderItemSub()}
                    {type === '人才' ? null : this.renderTags()}
                    {visibleBottom ? this.renderBottomItem() : null}
                </View>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginBottom: ScaleSize(22),
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#dadae4',
    },
    itemHeader: {
        width: ScaleSize(118),
        height: ScaleSize(118),
        borderRadius: ScaleSize(59),
        backgroundColor: 'red',
        marginLeft: ScaleSize(30),
        marginVertical: ScaleSize(40),
    },
    itemInfoContainer: {
        flex: 1,
        marginTop: ScaleSize(40),
        marginLeft: ScaleSize(30),
        // backgroundColor: 'blue',
    },
    realnameContainer: {
        flexDirection: 'row',
    },
    itemUserContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    realnameText: {
        fontSize: FontSize(16),
        color: "#3f3f48",
        fontWeight: 'bold',
    },
    position: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#2883ff",
        // paddingVertical: ScaleSize(1),
        paddingHorizontal: ScaleSize(7),
        marginLeft: ScaleSize(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    positionText: {
        fontSize: FontSize(11),
        color: "#2883ff",
    },
    salarText: {
        fontSize: FontSize(15),
        color: "#ff5151",
        fontWeight: 'bold',
        alignSelf: 'center',
        marginRight: ScaleSize(30),
    },
    itemSubContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: ScaleSize(10),
    },
    itemExp: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    expText: {
        fontSize: FontSize(12),
        color: "#a3a4a6",
        marginLeft: ScaleSize(8),
    },
    educationText: {
        fontSize: FontSize(12),
        color: "#a3a4a6",
        marginLeft: ScaleSize(8),
    },
    updateTimeText: {
        fontSize: FontSize(13),
        color: "#a3a4a6",
        marginRight: ScaleSize(30),
    },
    profileText: {
        fontSize: FontSize(14),
        lineHeight: 21,
        color: "#63666b",
        marginTop: ScaleSize(7),
    },
    itemExpContainer: {
        flexDirection: 'row',
    },
    exeImage: {
        width: ScaleSize(15),
        height: ScaleSize(15),
        marginLeft: ScaleSize(28),
    },
    educationImage: {
        width: ScaleSize(15),
        height: ScaleSize(15),
        marginLeft: ScaleSize(28),
    },
    cityImage: {
        width: ScaleSize(15),
        height: ScaleSize(15),
    },
    entContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: ScaleSize(20),
    },
    entImage: {
        width: ScaleSize(35),
        height: ScaleSize(35),
        backgroundColor: 'red',
        borderRadius: ScaleSize(35 / 2),
    },
    entNameText: {
        fontSize: FontSize(13),
        lineHeight: 26,
        color: "#808799",
        marginLeft: ScaleSize(10),
    },
    vipContainer: {
        borderRadius: 3,
        backgroundColor: "#eba440",
        paddingVertical: ScaleSize(5),
        paddingHorizontal: ScaleSize(10),
        marginLeft: ScaleSize(10),
    },
    vipText: {
        fontSize: FontSize(10),
        color: "#ffffff"
    },
    tagsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: ScaleSize(20),
    },
    tagTextContainer: {
        borderRadius: 2,
        backgroundColor: "#eef3ff",
        padding: 5,
        marginRight: 10,
    },
    tagText: {
        fontSize: 11,
        color: "#709ad3"
    }
});

//make this component available to the app
export default ListRow;
