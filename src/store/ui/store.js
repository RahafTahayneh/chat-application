import {
    action, observable, observe, when,
} from 'mobx';
import { UserStore } from '@gamiphy/gamix-store/user';
import { ProductStore } from '@gamiphy/gamix-store/products';
import { NotificationStore, WELCOME_NOTIFICATION_CONFIG } from '@gamiphy/gamix-store/notification';
import { CoreStore } from '@gamiphy/gamix-store/core';
import _ from 'lodash';
import { getLocalStorageItem, setLocalStorageItem } from '@gamiphy/utils/storage';
import { AppStore } from '@gamiphy/gamix-store/app';
import { OnboardingAnalytics } from '@gamiphy/gamix-store/analytics';
import { GA } from '@gamiphy/analytics';
import { RewardStore } from '@gamiphy/gamix-store/reward';
import { PromotionPopupStore } from '@gamiphy/gamix-store/ui/main/popups/promotion';
import { UI_LOCAL_STORAGE, URL_PARAMS } from './constants';
import { MainStore, Pages, Tabs } from './main';
import { BarStore } from './bar';

class UiStore {
    @observable main = MainStore;

    @observable bar = BarStore;

    @observable entered = false;

    @observable opened = false;

    @observable fullBar = false;

    @observable visible = true;

    @observable barHidden = false;

    @observable loadingProductPage = false;

    @observable floatingWidgetVisible = false;

    constructor() {
        const urlParams = new URLSearchParams(window.parent.location.search);

        when(() => UserStore.isRealUser, () => {
            this.opened = getLocalStorageItem(UI_LOCAL_STORAGE.automaticallyOpen) !== 'false';
            setLocalStorageItem(UI_LOCAL_STORAGE.automaticallyOpen, 'false');
        });

        when(() => AppStore.initialized && this.opened && MainStore.selectedPage === Pages.landing, () => {
            OnboardingAnalytics.trackWelcomeScreenViewed();
        });

        observe(this, 'opened', () => {
            const code = urlParams.get('code');
            const source = urlParams.get('source');
            if (code && source) {
                void UserStore.socialConnect({
                    type: source,
                    code,
                    redirectUri: 'https://static.gamiphy.co/fe/utils/natv2/index.html',
                });
            }

            if (this.opened) {
                NotificationStore.closeNotification();
            }
        });

        observe(CoreStore, 'initialized', () => {
            when(() => !this.opened, () => {
                if (!UserStore.isLoggedIn && !CoreStore.config?.hideNotification) {
                    NotificationStore.openWelcomeNotification({
                        autoClose: WELCOME_NOTIFICATION_CONFIG.AUTO_CLOSE,
                    });
                }
            });
        });

        observe(MainStore, 'selectedTab', () => {
            GA.pageView(MainStore.selectedTab);
        });

        observe(MainStore, 'selectedPage', () => {
            if (MainStore.selectedPage !== Pages.main) {
                GA.pageView(MainStore.selectedPage);
            }
        });

        when(() => CoreStore.initialized, () => {
            void (async () => {
                const isAutoOpenParam = Boolean(urlParams.get(URL_PARAMS.gamiphyOpen));
                const autoRegisterDraftUser = Boolean(urlParams.get(URL_PARAMS.gamiphyAutoRegisterDraftUser));
                const firstName = urlParams.get(URL_PARAMS.gamiphyFirstName) || undefined;
                const email = urlParams.get(URL_PARAMS.gamiphyEmail) || undefined;
                const defaultTab = urlParams.get(URL_PARAMS.gamiphyTab);

                if (CoreStore.config) {
                    if (_.isNil(CoreStore.config.visible) || CoreStore.config.visible) {
                        this.show();

                        if (CoreStore.config.openByDefault || isAutoOpenParam) {
                            this.open();
                        }
                        if (CoreStore.config.barHidden) {
                            this.hideBar();
                        }
                        if (autoRegisterDraftUser && !UserStore.isLoggedIn) {
                            await UserStore.registerDraftUser({
                                email,
                                firstName,
                            });
                        }
                        if (defaultTab && Object.values(Tabs).includes(defaultTab as Tabs)) {
                            this.main.setTab(defaultTab as Tabs);
                        }
                    } else {
                        this.hide();
                    }
                }
            })();
        });

        observe(CoreStore, 'initialized', () => {
            when(() => !this.opened && !!RewardStore.promotion.activePopupPromotion, () => {
                // @fixme for demo
                // if (PromotionPopupStore.shouldAutoOpen) {
                NotificationStore.closeNotification();
                this.showFullBar();
                PromotionPopupStore.openPromotionPopup();
                // }
            });
        });

        // Live promotion
        when(() => CoreStore.initialized && !!RewardStore.promotion.livePromotion, () => {
            void (async () => {
                if (!UserStore.isLoggedIn) {
                    await UserStore.registerDraftUser();
                }
                this.main.setTab(Tabs.livePromotion);
            })();

            this.floatingWidgetVisible = !this.opened;
            observe(this, 'opened', () => {
                this.floatingWidgetVisible = !this.opened;
            });
        });
    }

    @action enter(): void {
        this.entered = true;
    }

    @action open(): void {
        this.opened = true;
        PromotionPopupStore.closePromotion();
        this.showFullBar();
    }

    @action showFullBar(): void {
        this.fullBar = true;
    }

    @action close(): void {
        this.opened = false;
    }

    @action toggle(): void {
        this.opened = !this.opened;
    }

    @action hide(): void {
        this.visible = false;
    }

    @action show(): void {
        this.visible = true;
    }

    @action hideBar(): void {
        this.barHidden = true;
    }

    @action showBar(): void {
        this.barHidden = false;
    }

    @action toggleFloatingWidget(): void {
        this.floatingWidgetVisible = !this.floatingWidgetVisible;
    }

    @action setLoadingOfProductPage(loading: boolean): void {
        this.loadingProductPage = loading;
    }

    @action setRedeemPageContent(): void {
        if (this.loadingProductPage) {
            this.setLoadingOfProductPage(false);
            window.open(ProductStore.viewedProduct ? ProductStore.viewedProduct.url : '');
        } else {
            this.main.setTab(Tabs.redeem);
        }
    }
}

export default new UiStore();
