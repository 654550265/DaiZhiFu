import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {HttpService} from '../http.service';
import {CommentService} from '../comment.service';
import {ActivatedRoute, Params} from '@angular/router';

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
    types: string = '';

    constructor(public nav: NavController, public http: HttpService, public comm: CommentService, public activeRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe((parmes: Params) => {
            this.types = parmes.type;
            this.http.get('api/home/index/getWdcashInfo', {
                uid: this.http.getUid(),
                type: parmes.type
            }).then(res => {
                this.cardName = res['data'].name;
                this.bank = res['data'].bank;
                this.money = res['data'].money;
            });
        });
    }

    gotoGetMoneyDetail() {
        this.nav.navigateForward('get-money-detail');
    }

    tiajioo() {
        let reg = /[0-9]/;
        if (this.getHowMoney === '') {
            this.comm.showToast('请输入提现金额');
        } else if (!reg.test(this.getHowMoney)) {
            this.comm.showToast('请输入正确的提现金额');
        } else if (this.pwd === '') {
            this.comm.showToast('请输入密码');
        } else {
            this.http.get('api/home/index/getWdcashApply', {
                uid: this.http.getUid(),
                type: this.types,
                pass: this.pwd,
                money: this.getHowMoney
            }).then(res => {
                /*, () => {
                    this.nav.goBack();
                }*/
                this.comm.showToast('提现成功');
            }).catch(err => {
                this.comm.showToast(err.msg);
            });
        }
    }
}
