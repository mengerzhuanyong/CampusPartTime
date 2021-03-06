/**
 * 校园空兼 - SystemStore
 * http://menger.me
 * @大梦
 */

'use strict';

import { observable, action, computed, runInAction, toJS } from 'mobx'
import BaseStore from './baseStore'

export default class SystemStore extends BaseStore {

    constructor(params) {
        super(params);

        this.dataSource = [];
        this.appShareParams = '';
        this.systemInfo = '';
    }

    @observable dataSource;
    @observable appShareParams;
    @observable systemInfo;

    @computed
    get getDataSource() {
        return toJS(this.dataSource);
    }

    // 分享APP
    @action
    getSystemInfomation = async (url) => {
        const result = await this.getRequest(url, true);
        if (result && result.code === 1) {
            runInAction(() => {
                this.systemInfo = result.data;
            });
        }
        return result;
    };

    // 请求数据列表
    @action
    requestDataSource = async (url, data) => {

        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                if (data.page === 1) {
                    this.dataSource = result.data.list_data;
                } else {
                    if (result.data.list_data.length !== 0) {
                        this.dataSource = this.dataSource.concat(result.data.list_data)
                    }
                }
            })
        } else {
            runInAction(() => {
                this.dataSource = [];
            })
        }
        return result;
    };

    // 清空信息
    @action
    emptyMessage = async (url, data) => {
        const result = await this.postRequest(url, data, true);
        return result;
    };

    // 图片上传
    @action
    uploadImages = async (url, data) => {
        const result = await this.postRequest(url, data, true);
        return result;
    };

    // 分享APP
    @action
    getAppShareParams = async (url) => {
        const result = await this.getRequest(url, true);
        if (result && result.code === 1) {
            runInAction(() => {
                this.appShareParams = result.data;
            });
        }
        return result;
    };

    // 获取分享APP积分
    @action
    getSharePoints = async (url, data) => {
        const result = await this.postRequest(url, data, true);
        return result;
    };
}