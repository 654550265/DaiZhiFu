import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

    constructor(public http: HttpService, public router: Router,
        public alertController: AlertController) {
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

    async logout() {
        const alert = await this.alertController.create({
            header: '消息',
            message: '确定退出？',
            buttons: [
                {
                    text: '取消',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: blah => {
                    }
                },
                {
                    text: '确定',
                    handler: () => {
                        localStorage.removeItem('userInfo');
                        this.router.navigate(['/login']);
                    }
                }
            ]
        });
        await alert.present();
    }

}
