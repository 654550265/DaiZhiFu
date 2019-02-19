import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-get-money',
    templateUrl: './get-money.page.html',
    styleUrls: ['./get-money.page.scss'],
})
export class GetMoneyPage implements OnInit {

    constructor(public nav: NavController) {
    }

    ngOnInit() {
    }

    gotoGetMoneyDetail() {
        this.nav.navigateForward('get-money-detail');
    }
}
