import {
    action, observable,
} from 'mobx';

class UiStore {
    @observable opened = false;

    @action open() {
        this.opened = true;
    }

    @action close() {
        this.opened = false;
    }
}

export default new UiStore();
