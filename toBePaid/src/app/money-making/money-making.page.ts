import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
    selector: 'app-money-making',
    templateUrl: './money-making.page.html',
    styleUrls: ['./money-making.page.scss'],
})
export class MoneyMakingPage implements OnInit {
    url: string = '';

    constructor(public activeRoute: ActivatedRoute, public route: Router) {
    }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            console.log(params);
            this.url = params['type'] === '1' ? '/tabs/tab1' : '/tabs/tab4';
        });
    }

    back() {
        this.route.navigate([this.url]);
    }

}
