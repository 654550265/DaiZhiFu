import {Component, OnInit} from '@angular/core';
import {ENV} from '../../config/ENV';

@Component({
    selector: 'app-bindcard',
    templateUrl: './bindcard.page.html',
    styleUrls: ['./bindcard.page.scss'],
})
export class BindcardPage implements OnInit {
    bankName: Array<any>;
    isShowPop: boolean;
    bName: string;

    constructor() {
        this.bankName = ENV.BankNames;
        this.isShowPop = false;
        this.bName = '';
    }

    ngOnInit() {
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
