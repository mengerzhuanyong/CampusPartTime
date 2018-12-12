/**
 * 校园空兼 - AddressStore
 * http://menger.me
 * @大梦
 */

'use strict';

import { observable, action, computed, runInAction, toJS } from 'mobx'
import BaseStore from './baseStore'

export default class AddressStore extends BaseStore {

    constructor(params) {
        super(params);
        this.dataSource = [];
        this.addressManageStatus = false;
    }

    @observable dataSource;
    @observable addressManageStatus;

    @computed
    get getDataSource() {
        return toJS(this.dataSource);
        // return this.dataSource.slice();
    }

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

    // 地址管理状态
    @action
    onChangeMangeStatus = () => {
        runInAction(() => {
            this.addressManageStatus = !this.addressManageStatus;
        });
        return this.addressManageStatus;
    };

    // 新增/修改/删除 地址
    @action
    onSubmitAddress = async (url, data) => {
        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {

            })
        } else {
            runInAction(() => {

            })
        }
        return result;
    };
}