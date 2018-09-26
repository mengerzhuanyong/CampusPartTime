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
        this.workNavigation = [];
        this.homeDataSource = {};
        this.workDataSource = {};
        this.customerService = {};
    }

    @observable navigationArray;
    @observable workNavigation;
    @observable homeDataSource;
    @observable workDataSource;
    @observable customerService;

    @computed
    get getNavigationArray() {
        return toJS(this.navigationArray);
    }

    @computed
    get getHomeDataSource() {
        return toJS(this.homeDataSource);
    }

    @computed
    get getWorkDataSource() {
        return toJS(this.workDataSource);
    }

    @action
    requestNavigationArray = async (url) => {

        const result = await this.getRequest(url);
        if (result.code === 1) {
            runInAction(() => {
                this.navigationArray = result.data;
            })
        }
        return result;
    };

    @action
    requestDataSource = async (url, data) => {

        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                console.log(data);
                if (data.type === 1) {
                    this.homeDataSource = result.data;
                } else {
                    this.workDataSource = result.data;
                }
            })
        }
        return result;
    };

    @action
    requestCustomerService = async (url, data) => {

        const result = await this.postRequest(url, data);
        if (result.code === 1) {
            runInAction(() => {
                this.customerService = result.data;
            })
        }
        return result;
    };

    // 商品分类
    getGoodsCategory = async (url, data) => {

        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.goodsNavigation = result.data;
            })
        }
        return result;
    };

    // 商品分类
    getWorkCategory = async (url, data) => {

        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.workNavigation = result.data;
            })
        }
        return result;
    };
}