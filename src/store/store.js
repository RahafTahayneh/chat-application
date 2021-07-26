import { UiStore } from './ui';
import { UserStore } from './user';
import { AdminStore } from "./admin";

/**
 * @desc this list of stores, will be automatically provided to MOBXProvider
 */
export default {
    UiStore,
    UserStore,
    AdminStore
}