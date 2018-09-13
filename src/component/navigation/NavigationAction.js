'use strict';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types'
import NavigationActionItem from './NavigationActionItem'

class NavigationAction extends React.PureComponent {

    static propTypes = {
        renderAction: PropTypes.oneOfType([PropTypes.array, PropTypes.func, PropTypes.element]),
    };

    static defaultProps = {

    };

    renderContent = () => {
        const {renderAction} = this.props;
        if (Array.isArray(renderAction)) {
            return (
                <View style={styles.actionContainer}>
                    {renderAction.map((item, index) => {
                        if (React.isValidElement(item)) {
                            return React.cloneElement(item, {
                                key: `nav_action${index}`
                            })
                        }
                        return (
                            <NavigationActionItem
                                key={`nav_action${index}`}
                                {...item}
                            />
                        )
                    })}
                </View>
            )
        } else if (typeof renderAction === 'function') {
            return renderAction();
        } else if (React.isValidElement(renderAction)) {
            return renderAction;
        }
        return null;
    };

    render() {
        const {style, onLayout} = this.props;
        // console.log('渲染')
        return (
            <View style={[styles.actionContainer, style]} onLayout={onLayout}>
                {this.renderContent()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default NavigationAction;