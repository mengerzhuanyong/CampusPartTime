//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
class DropdownRow extends React.PureComponent {

    constructor(props) {
        super(props)
        const index = props.selectData.findIndex((sub) => sub === props.item)
        this.state = { isSelected: index !== -1 }
    }

    _onPress = () => {
        const { onPress, item } = this.props
        this.setState({ isSelected: !this.state.isSelected })
        onPress && onPress(item)
    }

    render() {
        const { item } = this.props
        const { isSelected } = this.state
        let backgroundColor = isSelected ? '#d3d3d3' : '#fff'
        let borderColor = isSelected ? '#d3d3d3' : '#d7d7dc'
        // let color = isSelected ? '#fff' : '#606266'
        return (
            <TouchableOpacity onPress={this._onPress} style={[styles.itemTextContainer, { backgroundColor, borderColor }]} key={`sub_${item}`}>
                <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
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
});

//make this component available to the app
export default DropdownRow;
