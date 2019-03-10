import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpService} from '../http.service';
import {CommentService} from '../comment.service';


@Component({
    selector: 'app-task-details',
    templateUrl: './task-details.page.html',
    styleUrls: ['./task-details.page.scss'],
})
export class TaskDetailsPage implements OnInit {
    color: string;
    tasknum: string;
    TaobaoName: string = '';
    taskType: string;
    init: boolean;
    taskObj: Object = {
        uaoqiu: []
    };

    constructor(public activeRoute: ActivatedRoute, public http: HttpService, public router: Router, public comm: CommentService) {
        this.color = '#fe5a51';
    }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            this.tasknum = params.taskNum;
            this.taskType = params.taskType;
            this.http.get('api/home/index/getTaskDetail', {
                tasknum: params.taskNum,
                uid: this.http.getUid()
            }).then(res => {
                res['data'].yaoqiu = JSON.parse(res['data'].yaoqiu);
                this.taskObj = res['data'];
            }).catch(err => {
                this.comm.showToast(err.msg);
            });
        });
        this.http.get('api/home/index/getTaobaoName', {
            uid: this.http.getUid()
        }).then(res => {
            this.TaobaoName = res['data'];
        });
    }

    nextStep() {
        //taobao-task
        //look-task
        this.router.navigate(['operation-instructions'], {
            queryParams: {
                taskNum: this.tasknum,
                taskType: this.taskType
            }
        });
    }
}
