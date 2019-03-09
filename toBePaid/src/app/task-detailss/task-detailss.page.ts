import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpService} from '../http.service';
import {CommentService} from '../comment.service';

@Component({
    selector: 'app-task-detailss',
    templateUrl: './task-detailss.page.html',
    styleUrls: ['./task-detailss.page.scss'],
})
export class TaskDetailssPage implements OnInit {

    color: string;
    tasknum: string;
    taskType: string;
    init: boolean;
    taskObj: Object;

    constructor(public activeRoute: ActivatedRoute, public http: HttpService, public router: Router, public comm: CommentService) {
        this.color = '#fe5a51';
    }

    ionViewDidEnter() {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            console.log(params);
            this.tasknum = params.tasknum;
            this.taskType = params.taskType;
            this.http.get('api/home/index/getTaskDetail', {
                tasknum: params.tasknum,
                uid: this.http.getUid()
            }).then(res => {
                res['data'].yaoqiu = JSON.parse(res['data'].yaoqiu);
                this.taskObj = res['data'];
            }).catch(err => {
                this.comm.showToast(err.msg);
            });
        });
    }

}
