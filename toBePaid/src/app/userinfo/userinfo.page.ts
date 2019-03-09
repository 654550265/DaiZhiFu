import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-userinfo',
    templateUrl: './userinfo.page.html',
    styleUrls: ['./userinfo.page.scss'],
})
export class UserinfoPage implements OnInit {
    /*id: 62
level: 0
tel: "12312312312"*/
    id: string;
    level: string;
    tel: string;

    constructor(public http: HttpService, public router: Router) {
    }

    ngOnInit() {
        this.http.get('api/home/index/getUserInfo', {
            uid: this.http.getUid()
        }).then(res => {
            this.id = res['data'].id;
            this.level = res['data'].level;
            this.tel = res['data'].tel;
        });
    }

    gotoPages(url: string) {
        this.router.navigate([url]);
    }

    gotoidCardInfoPages() {
        // this.nav.navigateForward('id-card-info');
        this.http.get('api/home/index/editIdStatus', {
            uid: this.http.getUid()
        }).then(res => {
            let type = res['data'];
            switch (type) {
                case '0':
                    this.router.navigate(['id-card-info-sure']);
            }
        });

    }

}
