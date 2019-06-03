import {Component} from '@angular/core';

import {LoadingController, NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {CommentService} from './comment.service';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import {Router} from '@angular/router';
import {CodePush} from '@ionic-native/code-push/ngx';
import {DEBUG, CODE_PUSH_DEPLOYMENT_KEY} from '../config/ENV';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private keyboard: Keyboard,
        public comm: CommentService,
        public router: Router,
        public nav: NavController,
        public codePush: CodePush,
        public loading: LoadingController
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // this.sync();
            this.statusBar.backgroundColorByHexString('#fe5a51');
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
            let timePeriodToExit = 3000;
            let lastTimeBackPress;
            this.platform.backButton.subscribeWithPriority(9999, () => {
                // this.comm.showToast('单击了返回按钮');
                if (this.keyboard && this.keyboard.isVisible) {
                    this.keyboard.hide();
                    return;
                }
                let url = this.router.url;
                console.log(url);
                let pageArr = ['/tabs/tab1', '/tabs/tab2', '/tabs/tab3', '/tabs/tab4', '/login', '', ''];
                if (pageArr.includes(url)) {
                    if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
                        navigator['app'].exitApp();
                    } else {
                        this.comm.showToast('再按一次返回键退出应用', () => {
                            lastTimeBackPress = new Date().getTime();
                        });
                    }
                } else {
                    this.nav.goBack();
                }
            });
        });
    }

    sync() {
        let that = this;
        //如果不是真机环境return
        // if (!this.isMobile()) return;
        //发布的key
        let deploymentKey = '';
        //如果是Android环境 并且是 debug模式
        if (this.isAndroid() && DEBUG.IS_DEBUG) {
            deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.ANDROID.Staging;
        }
        if (this.isAndroid() && !DEBUG.IS_DEBUG) {
            deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.ANDROID.Production;
        }
        if (this.isIos() && DEBUG.IS_DEBUG) {
            deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.IOS.Staging;
        }
        if (this.isIos() && !DEBUG.IS_DEBUG) {
            deploymentKey = CODE_PUSH_DEPLOYMENT_KEY.IOS.Production;
        }
        //热更新同步
        this.comm.presentLoadingWithOptions(this.loading, '更新中...');
        this.codePush.sync({
            deploymentKey: deploymentKey
        }).subscribe((syncStatus) => {
            that.loading.dismiss();
            this.comm.showToast('更新成功,请重启APP');
            console.log(syncStatus);
        });
    }

    /**
     * 是否是真机环境
     * @returns {boolean}
     * @memberof NativeService
     */
    isMobile(): boolean {
        return this.platform.is('mobile');
    }

    /**
     * 是否android真机环境
     * @returns {boolean}
     * @memberof NativeService
     */
    isAndroid(): boolean {
        return this.platform.is('android');
    }

    /**
     * 是否是ios真机环境
     * @returns {boolean}
     * @memberof NativeService
     */
    isIos(): boolean {
        return this.platform.is('ios');
    }
}
