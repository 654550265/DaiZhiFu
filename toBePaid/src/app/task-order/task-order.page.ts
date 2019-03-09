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
    title: string;
    timeText: string;
    inter: any;

    constructor(public activeRoute: ActivatedRoute, public http: HttpService, public router: Router, public comm: CommentService) {
        this.taskData = {};
        this.inter = null;
        this.timeText = '';
    }

    ngOnInit() {
        let time = 3600;
        this.inter = setInterval(() => {
            if (time > 0) {
                time--;
                this.timeText = this.http.formatSeconds(time);
            } else {
                //放弃任务了
                clearInterval(this.inter);
            }
        }, 1000);
        this.activeRoute.queryParams.subscribe((params: Params) => {
            this.tasknum = params.taskNum;
            this.taskType = params.taskType;
            this.toid = params.toid;
            this.title = params.taskType === '2' ? '浏览' : '淘宝';
            this.http.get('api/home/index/taskOrderDetail', {
                toid: this.toid,
                uid: this.http.getUid()
            }).then(res => {
                this.taskData = res['data'];
            });
        });
    }


    takeTaskPage() {
        let routerStr = this.taskType === '1' ? 'taobao-task' : 'look-task';
        this.router.navigate([routerStr], {
            queryParams: {
                taskNum: this.tasknum,
                taskType: this.taskType,
                toid: this.toid
            }
        });
    }
}
