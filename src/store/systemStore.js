/**
 * 校园空兼 - SystemStore
 * https://menger.me
 * @大梦
 */

'use strict';

import { observable, action, computed, runInAction, toJS } from 'mobx'
import BaseStore from './baseStore'

export default class SystemStore extends BaseStore {

    constructor(params) {
        super(params);
        this.loading = true;
        this.dataSource = [];
    }

    @observable dataSource;

    @computed
    get getDataSource() {
        return toJS(this.dataSource);
    }

    // 请求数据列表
    @action
    requestDataSource = async (url, data) => {
        this.loading = true;
        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.loading = false;
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
                this.loading = false;
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
}