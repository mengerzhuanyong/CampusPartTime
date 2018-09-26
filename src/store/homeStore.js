/**
 * 校园空兼 - HomeStore
 * https://menger.me
 * @大梦
 */

'use strict';

import { observable, action, computed, runInAction, toJS } from 'mobx'
import BaseStore from './baseStore'

export default class HomeStore extends BaseStore {

    constructor(params) {
        super(params);
        this.dataSource = '';
    }

    @observable dataSource;

    @computed
    get getDataSource() {
        return toJS(this.dataSource);
    }

    @action
    requestDataSource = async (url, data) => {

        const result = await this.postRequest(url, data);
        if (result.code === 1) {
            runInAction(() => {
                this.dataSource = result.data;
            });
        }
        return result;
    };
}