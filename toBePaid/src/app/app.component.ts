import {Component} from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {CommentService} from './comment.service';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import {Router} from '@angular/router';

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
        public nav: NavController
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
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
}
