/**
 * 校园空兼 - BaseStore
 * https://menger.me
 * @大梦
 */

 'use strict';
import { action, observable, runInAction, configure } from 'mobx'

configure({ enforceActions: true });

class BaseStore {

    constructor(params) {

    }

    @observable loading = true;
    @observable error = { isError: '', errorMsg: '' };

}

export default BaseStore;