/**
 * 校园空兼 - AppStore
 * https://menger.me
 * @大梦
 */

 'use strict';
import { observable, action, computed, runInAction } from 'mobx'
import BaseStore from './baseStore'

// app状态和信息
export default class AppStore extends BaseStore {

    constructor(params) {
        super(params);
        this.networkState = null; // 网络状态
        this.deviceInfo = null;  // 设备的所有信息
    }

    @observable networkState;
    @observable deviceInfo;

    @action
    changeNetworkState = (type) => {
        this.networkState = type
    };

    @action
    setDeviceInfo = (info) => {
        this.deviceInfo = info;
    }

}