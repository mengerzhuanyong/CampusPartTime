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
        this.goodsNavigation = [];
        this.pointGoodsCategory = [];
        this.dataSource = [];
        this.pointDataSource = [];
        this.goodsList = [];
        this.goodsDetail = {};
        this.cartGoodsInfo = {};
        this.orderTips = {};
    }

    @observable goodsNavigation;
    @observable pointGoodsCategory;
    @observable dataSource;
    @observable pointDataSource;
    @observable goodsList;
    @observable goodsDetail;
    @observable cartGoodsInfo;
    @observable orderTips;

    @computed
    get getDataSource() {
        return toJS(this.dataSource);
    }

    @computed
    get getPointDataSource() {
        return toJS(this.pointDataSource);
    }

    @computed
    get getGoodsDetail() {
        return toJS(this.goodsDetail);
    }

    @computed
    get getCartGoodsInfo() {
        return toJS(this.cartGoodsInfo);
    }

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

    // 换购首页
    @action
    requestDataSource = async (url, data) => {

        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                if (data.page === 1) {
                    this.dataSource = result.data.list_data;
                } else {
                    if (result.data.list_data.length !== 0) {
                        this.dataSource = this.dataSource.concat(result.data.list_data);
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

    // 商品分类
    getPointGoodsCategory = async (url, data) => {

        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.pointGoodsCategory = result.data;
            })
        }
        return result;
    };

    // 积分列表
    @action
    requestPointDataSource = async (url, data) => {

        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                if (data.page === 1) {
                    this.pointDataSource = result.data.list_data;
                } else {
                    let temp = this.pointDataSource;
                    if (result.data.list_data.length !== 0) {
                        this.pointDataSource = temp.concat(result.data.list_data);
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

    // 商品列表
    @action
    requestGoodsList = async (url, data) => {

        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                if (data.page === 1) {
                    this.goodsList = result.data.list_data;
                } else {
                    let temp = this.goodsList;
                    if (result.data.list_data.length !== 0) {
                        this.goodsList = temp.concat(result.data.list_data)
                    }
                }
            })
        }
        return result;
    };

    // 商品详情页
    @action
    requestGoodsDetail = async (url, data) => {

        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.goodsDetail = result.data;
            })
        } else {
            runInAction(() => {
                this.goodsDetail = {};
            })
        }
        return result;
    };

    // 加入购物车
    @action
    onSubmitOrderToCart = async (url, data) => {

        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.cartGoodsInfo = result.data;
            })
        } else {
            runInAction(() => {
                this.cartGoodsInfo = {};
            })
        }
        return result;
    };

    // 确认换购
    @action
    onSubmitOrderConfirm = async (url, data) => {

        const result = await this.postRequest(url, data, true);

        return result;
    };

    // 提交订单
    @action
    onSubmitOrder = async (url, data) => {

        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                // this.cartGoodsInfo = result.data;
            })
        } else {
            runInAction(() => {
                // this.cartGoodsInfo = {};
            })
        }
        return result;
    };
}