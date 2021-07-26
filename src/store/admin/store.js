import {
    observable,
} from 'mobx';
import { ADMIN } from './constant'

class AdminStore {
    @observable admin = ADMIN;

    constructor() {
        this.admin= ADMIN
    }
}

export default new AdminStore();
