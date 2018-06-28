/**
 * 校园空兼 - 
 * https://menger.me
 * @大梦
 */
 
'use strict';

import React, { Component } from 'react'
import { Platform, } from 'react-native'
import './src/config/Global'
import { Provider } from 'mobx-react'
import stores from './src/store/index'
import Navigation from './src/router/Navigation'

class App extends Component {

    render() {
        return (
            <Provider {...stores}>
                <Navigation />
            </Provider>
        );
    }
}

export default App;