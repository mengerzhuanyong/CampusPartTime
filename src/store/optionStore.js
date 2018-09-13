/**
 * 校园空兼 - OptionStore
 * https://menger.me
 * @大梦
 */

'use strict';

import { observable, action, computed, runInAction } from 'mobx'
import BaseStore from './baseStore'

export default class OptionStore extends BaseStore {

    constructor(params) {
        super(params);
        this.options = null;
    }

    @observable options;

    @action
    requestDataSource = async (url, data) => {
        const result = await Services.post(url, data);
        const dataSource = result;
        // console.log(dataSource);
        if (dataSource.code === 1) {
            runInAction(() => {
                this.options = dataSource.data;
            })
        }
        return dataSource;
    }
}