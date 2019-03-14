import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpService} from '../http.service';

@Component({
    selector: 'app-commission',
    templateUrl: './commission.page.html',
    styleUrls: ['./commission.page.scss'],
})
export class CommissionPage implements OnInit {
    types: string = '';
    title: string = '';

    constructor(public nav: NavController, public router: Router, public activeRoute: ActivatedRoute, public http: HttpService) {
    }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            this.types = params.type;
            this.title = params.type==='1'?"佣金":"本金"
        });
    }

    gotoGetMoney() {
        this.router.navigate(['/get-money'], {
            queryParams: {
                type: this.types
            }
        });
    }

    back(url: string) {
        this.router.navigate([url]);
    }
}
