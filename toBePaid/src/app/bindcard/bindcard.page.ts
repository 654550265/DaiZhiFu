import {Component, OnInit} from '@angular/core';
import {ENV} from '../../config/ENV';
import {HttpService} from '../http.service';
import {CommentService} from '../comment.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-bindcard',
    templateUrl: './bindcard.page.html',
    styleUrls: ['./bindcard.page.scss'],
})
export class BindcardPage implements OnInit {
    bankName: Array<any>;
    isShowPop: boolean;
    bName: string;
    cardName: string;
    cardNum: string;
    bankInfo: any;
    isSHowForm: boolean;

    constructor(public http: HttpService, public comm: CommentService, public nav: NavController) {
        this.bankName = ENV.BankNames;
        this.isShowPop = false;
        this.bName = '';
    }

    ngOnInit() {
        this.http.get('api/home/index/editBankStatus', {
            uid: this.http.getUid()
        }).then(res => {
            this.isSHowForm = res['data'] === '0';
        });
        this.http.get('api/home/index/editBankInfo', {
            uid: this.http.getUid()
        }).then(res => {
            this.bankInfo = res['data'];
        });
    }

    subMiteData() {
        let boo = true, banktype = '';
        for (let value of this.bankName) {
            if (value.isAcv) {
                boo = false;
                banktype = value.text;
                break;
            }
        }
        if (this.cardName === '') {
            this.comm.showToast('请输入持卡人');
        } else if (this.cardNum === '') {
            this.comm.showToast('请输入银行卡号');
        } else if (boo) {
            this.comm.showToast('请选择银行名称');
        } else {
            this.http.get('api/home/index/editBank', {
                uid: this.http.getUid(),
                bankname: this.cardName,
                banknum: this.cardNum,
                banktype: banktype
            }).then(res => {
                this.comm.showToast('提交成功，正在审核中', () => {
                    this.nav.goBack();
                });
            }).catch(err => {
                this.comm.showToast(err.msg);
            });
        }
    }

    chooseOneBank(index) {
        for (let value of this.bankName) {
            value.isAcv = false;
        }
        this.bankName[index].isAcv = true;
        this.bName = this.bankName[index].text;
        this.isShowPop = false;
    }

    showPop() {
        this.isShowPop = true;
    }
}
