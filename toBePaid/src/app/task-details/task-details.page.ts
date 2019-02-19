import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-task-details',
    templateUrl: './task-details.page.html',
    styleUrls: ['./task-details.page.scss'],
})
export class TaskDetailsPage implements OnInit {
    color: string;

    constructor(public nav: NavController) {
        this.color = '#fe5a51';
    }

    ngOnInit() {
    }

    nextStep() {
        //taobao-task
        //look-task
        this.nav.navigateForward('look-task');
    }
}
