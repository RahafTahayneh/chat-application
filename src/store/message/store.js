import {
    action, observable,
} from 'mobx';
import {MESSAGES} from './constants'

class MessagesStore {
    @observable messages = MESSAGES;
    @observable loading = false;

    constructor() {
        this.init()
    }

    @action init(){
        this.loading = true
        this.messages = JSON.parse(localStorage.getItem('messages')) || MESSAGES
        this.loading=false
    }

    @action addNewMessage(messageData){
        this.messages.push(messageData);
        localStorage.setItem('messages', JSON.stringify(this.messages));
        this.messages = JSON.parse(localStorage.getItem('messages'))
    }


}

export default new MessagesStore();
