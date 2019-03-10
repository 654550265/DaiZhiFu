import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {HttpService} from '../http.service';
import {CommentService} from '../comment.service';

@Component({
    selector: 'app-get-money',
    templateUrl: './get-money.page.html',
    styleUrls: ['./get-money.page.scss'],
})
export class GetMoneyPage implements OnInit {
    cardName: string = '';
    bank: string = '';
    getHowMoney: string = '';
    pwd: string = '';
    money: number = 0;

    constructor(public nav: NavController, public http: HttpService, public comm: CommentService) {
    }

    ngOnInit() {
        this.http.get('api/home/index/getWdcashInfo', {
            uid: this.http.getUid()
        }).then(res => {
            this.cardName = res['data'].name;
            this.bank = res['data'].bank;
            this.money = res['data'].money;
        });
    }

    gotoGetMoneyDetail() {
        this.nav.navigateForward('get-money-detail');
    }

    tiajioo() {
        this.http.get('api/home/index/getWdcashApply', {
            uid: this.http.getUid(),
            type: 1,
            pass: this.pwd,
            money: this.money
        }).then(res => {
            this.comm.showToast('提现成功', () => {
                this.nav.goBack();
            });
        }).catch(err => {
            this.comm.showToast(err.msg);
        });
    }
}
