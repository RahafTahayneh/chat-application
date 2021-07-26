import {
    observable,
} from 'mobx';
import { USER } from './constant'

class UserStore {
    @observable user = USER;

    constructor() {
        this.user= USER
    }
}

export default new UserStore();
