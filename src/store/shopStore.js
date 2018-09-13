/**
 * 校园空兼 - ShopStore
 * https://menger.me
 * @大梦
 */

'use strict';

import { observable, action, computed, runInAction, toJS } from 'mobx'
import BaseStore from './baseStore'

export default class ShopStore extends BaseStore {

    constructor(params) {
        super(params);
        this.dataSource = [];
        this.goodsDetail = {};
        this.cartGoodsInfo = {};
        this.orderTips = {};
    }

    @observable dataSource;
    @observable goodsDetail;
    @observable cartGoodsInfo;
    @observable orderTips;

    @computed
    get getDataSource() {
        return toJS(this.dataSource);
    }
    @computed
    get getGoodsDetail() {
        return toJS(this.goodsDetail);
    }

    // 换购首页
    @action
    requestDataSource = async (url, data) => {
        this.loading = true;
        const result = await this.postRequest(url, data);
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

    // 商品详情页
    @action
    requestGoodsDetail = async (url, data) => {
        this.loading = true;
        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.loading = false;
                this.goodsDetail = result.data;
            })
        } else {
            runInAction(() => {
                this.loading = false;
                this.goodsDetail = {};
            })
        }
        return result;
    };

    // 加入购物车
    @action
    onSubmitOrderToCart = async (url, data) => {
        this.loading = true;
        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.loading = false;
                this.cartGoodsInfo = result.data;
            })
        } else {
            runInAction(() => {
                this.loading = false;
                this.cartGoodsInfo = {};
            })
        }
        return result;
    };

    // 确认换购
    @action
    onSubmitOrderConfirm = async (url, data) => {
        this.loading = true;
        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.loading = false;
                // this.cartGoodsInfo = result.data;
            })
        } else {
            runInAction(() => {
                this.loading = false;
                // this.cartGoodsInfo = {};
            })
        }
        return result;
    };

    // 提交订单
    @action
    onSubmitOrder = async (url, data) => {
        this.loading = true;
        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.loading = false;
                // this.cartGoodsInfo = result.data;
            })
        } else {
            runInAction(() => {
                this.loading = false;
                // this.cartGoodsInfo = {};
            })
        }
        return result;
    };
}