import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-userinfo',
    templateUrl: './userinfo.page.html',
    styleUrls: ['./userinfo.page.scss'],
})
export class UserinfoPage implements OnInit {

    constructor(public nav: NavController) {
    }

    ngOnInit() {
    }

    gotoPages(url: string) {
        this.nav.navigateForward(url);
    }

    gotoidCardInfoPages() {
        // this.nav.navigateForward('id-card-info');
        this.nav.navigateForward('id-card-info-sure');
    }

}
