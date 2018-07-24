/**
 * 校园空兼 - HomeStore
 * https://menger.me
 * @大梦
 */

'use strict';
import { observable, action, computed, runInAction, toJS } from 'mobx'
import BaseStore from './baseStore'

class HomeStore extends BaseStore {

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
        this.loading = true;
        const result = await Services.post(url, data);
        if (result.code === 1) {
            runInAction(() => {
                this.loading = false;
                this.dataSource = result.data;
            })
        }
        return result;
    };
}

export default HomeStore;