import {Component} from '@angular/core';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    subList: Array<any>;

    constructor() {
        this.subList = [{
            text: '全部订单',
            type: '1',
            isAcv: true
        }, {
            text: '待操作',
            type: '2',
            isAcv: false
        }, {
            text: '待返款',
            type: '3',
            isAcv: false
        }, {
            text: '已发货',
            type: '4',
            isAcv: false
        }];
    }

    chooseOne(index) {
        for (let values of this.subList) {
            values.isAcv = false;
        }
        this.subList[index].isAcv = true;
    }
}
