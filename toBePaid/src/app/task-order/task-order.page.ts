import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpService} from '../http.service';
import {CommentService} from '../comment.service';

@Component({
    selector: 'app-task-order',
    templateUrl: './task-order.page.html',
    styleUrls: ['./task-order.page.scss'],
})
export class TaskOrderPage implements OnInit {
    tasknum: string;
    taskType: string;
    toid: string;
    taskData: Object;

    constructor(public activeRoute: ActivatedRoute, public http: HttpService, public router: Router, public comm: CommentService) {
        this.taskData = {};
    }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            this.tasknum = params.taskNum;
            this.taskType = params.taskType;
            this.toid = params.toid;
            this.http.get('api/home/index/taskOrderDetail', {
                toid: this.toid,
                uid: this.http.getUid()
            }).then(res => {
                this.taskData = res['data'];
            });
        });
    }

}
