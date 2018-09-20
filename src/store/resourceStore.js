/**
 * 校园空兼 - ResourceStore
 * https://menger.me
 * @大梦
 */

'use strict';

import { observable, action, computed, runInAction, toJS } from 'mobx'
import BaseStore from './baseStore'

export default class ResourceStore extends BaseStore {

    constructor(params) {
        super(params);
        this.navigationArray = [];
        this.dataSource = {};
        this.customerService = {};
    }

    @observable navigationArray;
    @observable dataSource;
    @observable customerService;

    @computed
    get getNavigationArray() {
        return toJS(this.navigationArray);
    }

    @computed
    get getDataSource() {
        return toJS(this.dataSource);
    }

    @action
    requestNavigationArray = async (url) => {
        this.loading = true;
        const result = await this.getRequest(url);
        if (result.code === 1) {
            runInAction(() => {
                this.loading = false;
                this.navigationArray = result.data;
            })
        }
        return result;
    };

    @action
    requestDataSource = async (url, data) => {
        this.loading = true;
        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.loading = false;
                this.dataSource = result.data;
            })
        }
        return result;
    };

    @action
    requestCustomerService = async (url, data) => {
        this.loading = true;
        const result = await this.postRequest(url, data);
        if (result.code === 1) {
            runInAction(() => {
                this.loading = false;
                this.customerService = result.data;
            })
        }
        return result;
    };
}