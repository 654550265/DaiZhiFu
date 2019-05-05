import {Component} from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {CommentService} from './comment.service';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import {Router} from '@angular/router';
import {AppMinimize} from '@ionic-native/app-minimize/ngx';

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
        public appMinimize: AppMinimize
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
            this.platform.backButton.subscribe(() => {
                // this.comm.showToast('单击了返回按钮');
                if (this.keyboard && this.keyboard.isVisible) {
                    this.keyboard.hide();
                    return;
                }
                let url = this.router.url;
                console.log(url);

                if (url === '/tabs/tab1' || url === '/tabs/tab2' || url === '/tabs/tab3' || url === '/tabs/tab4' || url === '/login') {
                    // this.appMinimize.minimize();
                }
            });
        });
    }
}
