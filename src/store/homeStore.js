/**
 * 校园空兼 - HomeStore
 * http://menger.me
 * @大梦
 */

'use strict';

import { observable, action, computed, runInAction, toJS } from 'mobx'
import BaseStore from './baseStore'

export default class HomeStore extends BaseStore {

    constructor(params) {
        super(params);
        this.dataSource = '';
        this.has_message = 0;
    }

    @observable dataSource;
    @observable has_message;

    @computed
    get getDataSource() {
        return toJS(this.dataSource);
    }

    @action
    requestDataSource = async (url, data) => {

        const result = await this.postRequest(url, data, true);
        if (result.code === 1) {
            runInAction(() => {
                this.dataSource = result.data;
                this.has_message = result.data.has_message;
            });
        }
        return result;
    };
}