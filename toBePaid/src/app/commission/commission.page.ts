import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-commission',
    templateUrl: './commission.page.html',
    styleUrls: ['./commission.page.scss'],
})
export class CommissionPage implements OnInit {

    constructor(public nav: NavController, public router: Router) {
    }

    ngOnInit() {
    }

    gotoGetMoney() {
        this.nav.navigateForward('get-money');
    }

    back(url: string) {
        this.router.navigate([url]);
    }
}
