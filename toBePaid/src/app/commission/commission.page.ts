import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-commission',
    templateUrl: './commission.page.html',
    styleUrls: ['./commission.page.scss'],
})
export class CommissionPage implements OnInit {

    constructor(public nav: NavController) {
    }

    ngOnInit() {
    }

    gotoGetMoney() {
        this.nav.navigateForward('get-money');
    }
}
