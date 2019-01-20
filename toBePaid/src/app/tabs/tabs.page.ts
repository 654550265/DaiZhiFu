import {Component} from '@angular/core';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {
    tabType: string;
    color: string;
    acvcolor: string;

    constructor() {
        this.tabType = 'tab1';
        this.color = '#333333';
        this.acvcolor = '#fe5a51';
    }

    change(e) {
        this.tabType = e.detail.tab;
    }
}
