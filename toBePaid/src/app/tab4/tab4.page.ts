import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-tab4',
    templateUrl: './tab4.page.html',
    styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
    isShow: boolean;

    constructor(public nav: NavController) {
        this.isShow = false;
    }

    ngOnInit() {
    }

    gotoPage(url: string) {
        this.nav.navigateForward(url);
    }

    showPop() {
        this.isShow = true;
    }

    hidePop() {
        this.isShow = false;
    }
}
