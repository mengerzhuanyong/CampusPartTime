/**
 * 校园空兼 - PointsStore
 * https://menger.me
 * @大梦
 */

'use strict';

import { observable, action, computed, runInAction, toJS } from 'mobx'
import BaseStore from './baseStore'

export default class PointsStore extends BaseStore {

    constructor(params) {
        super(params);

        this.pointsInfo = {};
        this.dataSource = [];
    }

    @observable pointsInfo;
    @observable dataSource;

    @computed
    get getDataSource() {
        return toJS(this.dataSource);
    }

    // 积分历史
    @action
    requestDataSource = async (url, data) => {

        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                if (data.page === 1) {
                    this.pointsInfo = result.data;
                    this.dataSource = result.data.list_data;
                } else {
                    if (result.data.list_data.length !== 0) {
                        this.dataSource = this.dataSource.concat(result.data.list_data)
                    }
                }
            })
        } else {
            runInAction(() => {
                this.pointsInfo = {};
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
}