//import liraries
import React, {PureComponent} from 'react';
import {ScrollView, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DropDownRow from './DropDownRow'
import {Button} from 'teaset';

// create a component
class DropDown extends PureComponent {

    constructor(props) {
        super(props);
    }


    _renderItem = (title, items) => {
        const {onPress, selectData} = this.props;
        return (
            <View key={`sub_${title}`}>
                <Text style={styles.itemTitle}>{title}</Text>
                <View style={styles.itemSubContainer}>
                    {items.map((item, index) => {
                        return (
                            <DropDownRow
                                key={`sub_${item}`}
                                item={item}
                                onPress={onPress}
                                selectData={selectData}
                            />
                        )
                    })}
                </View>
            </View>
        )
    }

    render() {
        const {data} = this.props;
        // console.log(data);
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>{'公司性质'}</Text>
                    </View>
                    {data.map((item, index) => {
                        return this._renderItem(item.title, item.data)
                    })}
                </ScrollView>
                <View style={styles.bottomContainer}>
                    <Button style={styles.button} title={'重置'} titleStyle={styles.buttonTitle}/>
                    <Button style={styles.button} title={'确定'} titleStyle={styles.buttonTitle}/>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    headerContainer: {
        flexDirection: 'row',
        marginLeft: 15,
        marginTop: 20,
    },
    headerText: {
        fontSize: FontSize(15),
        color: "#3c3c3c"
    },
    itemSubContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    itemTextContainer: {
        borderRadius: 5,
        backgroundColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#d7d7dc",
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginLeft: 13,
        marginTop: 13,
    },
    itemText: {
        fontSize: FontSize(14),
        color: "#606266"
    },
    itemTitle: {
        fontSize: 14,
        color: "#bfc0c5",
        marginLeft: 13,
        marginTop: 13,
    },
    button: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 0,
        backgroundColor: "#43a4fe",
        height: 30,
        marginHorizontal: ScaleSize(15),
    },
    buttonTitle: {
        fontSize: FontSize(14),
        color: "#fff",
    },
    bottomContainer: {
        flexDirection: 'row',
        marginBottom: ScaleSize(40),
    }
});

//make this component available to the app
export default DropDown;
