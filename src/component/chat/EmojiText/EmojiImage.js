'use strict';/**
 * 校园空兼 - 
 * http://menger.me
 * @大梦
 */
 
'use strict';

import React from 'react'
import { StyleSheet, Image } from 'react-native';

class EmojiImage extends React.PureComponent {

    static propTypes = {
        ...Image.propTypes
    };

    static defaultProps = {
        ...Image.defaultProps
    };


    render() {
         // console.log('EmojiImage')
        return (
            <Image {...this.props} />
        );
    }
}

const styles = StyleSheet.create({

});

export default EmojiImage