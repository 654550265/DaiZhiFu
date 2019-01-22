import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {HttpService} from '../http.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    bgColor: string;
    subList: Array<any>;

    constructor(public nav: NavController, public http: HttpService) {
        this.bgColor = '#f7f7f7';
        this.subList = [{
            text: '垫付任务',
            type: '1',
            isAcv: true,
            isUrl: false
        }, {
            text: '浏览任务',
            type: '2',
            isAcv: false,
            isUrl: false
        }, {
            text: '推广赚钱',
            type: '3',
            isAcv: false,
            isUrl: true
        }];
        http.get('test', {
            name: 'lianghui'
        }).subscribe(res => {

        });
    }

    chooseOne(index) {
        for (let values of this.subList) {
            values.isAcv = false;
        }
        this.subList[index].isAcv = true;
    }

    gotoTaskDteailsPage() {
        this.nav.navigateForward('/task-details');
    }

    gotoLoginPage() {
        this.nav.navigateForward('/login');
    }
}
