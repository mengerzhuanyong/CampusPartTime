/**
 * 校园空兼 - OrderStore
 * http://menger.me
 * @大梦
 */

'use strict';

import { observable, action, computed, runInAction, toJS } from 'mobx'
import BaseStore from './baseStore'

export default class OrderStore extends BaseStore {

    constructor(params) {
        super(params);

        this.orderDetail = {
            order_data: {},
            goods_data: {},
        };
        this.dataSource = {};
    }

    @observable orderDetail;
    @observable dataSource;

    @computed
    get getDataSource() {
        return toJS(this.dataSource);
    }

    // 订单列表
    @action
    requestDataSource = async (url, data, status) => {

        const result = await this.postRequest(url, data, true);
        
        if (result.code === 1) {
            runInAction(() => {
                if (data.page === 1) {
                    this.dataSource[`${status}`] = result.data.list_data;
                } else {
                    let temp = this.dataSource[`${status}`];
                    if (result.data.list_data.length !== 0) {
                        this.dataSource[`${status}`] = temp.concat(result.data.list_data)
                    }
                }
            })
        }
        return result;
    };

    // 订单详情
    @action
    requestOrderDetail = async (url, data) => {
        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.orderDetail = result.data;
            })
        } else {
            runInAction(() => {
                this.orderDetail = {};
            })
        }
        return result;
    };

    // 确认收货
    @action
    submitPickUpOrder = async (url, data) => {
        const result = await this.postRequest(url, data, true);
        // if (result.code === 1) {
        //     runInAction(() => {
        //         let temp = this.orderDetail;
        //         temp.order_data.status = 2;
        //         this.orderDetail = temp;
        //     })
        // }
        return result;
    };
}