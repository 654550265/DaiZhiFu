import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-task-details',
    templateUrl: './task-details.page.html',
    styleUrls: ['./task-details.page.scss'],
})
export class TaskDetailsPage implements OnInit {
    color: string;

    constructor() {
        this.color = '#fe5a51';
    }

    ngOnInit() {
    }

}
