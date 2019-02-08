import {Component, OnInit} from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
    selector: 'app-complaint-center',
    templateUrl: './complaint-center.page.html',
    styleUrls: ['./complaint-center.page.scss'],
})
export class ComplaintCenterPage implements OnInit {
    subList: Array<any>;

    constructor(public nav: NavController) {
        this.subList = [{
            text: "我收到的申诉",
            isacv: true
        }, {
            text: "我发起的申诉",
            isacv: false
        }];
    }

    ngOnInit() {
    }

    chooseOne(index: number) {
        for (let value of this.subList) {
            value.isacv = false;
        }
        this.subList[index].isacv = true;
    }
}
