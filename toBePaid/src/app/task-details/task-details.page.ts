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
    taskType: string;
    tasknum: string;
    benjin: string;
    yongjin: string;
    yaodian: string;
    lasttasknum: string;
    yaoqiu: Array<any>;

    constructor(public activeRoute: ActivatedRoute, public http: HttpService, public router: Router, public comm: CommentService) {
        this.color = '#fe5a51';
    }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            this.tasknum = params.taskNum;
            this.taskType = params.taskType;
            this.http.get('portal/index/getTaskDetail', {
                tasknum: params.taskNum,
                uid: this.http.getUid()
            }).then(res => {
                this.tasknum = res['data'].tasknum;
                this.benjin = res['data'].benjin;
                this.yongjin = res['data'].yongjin;
                this.yaodian = res['data'].yaodian;
                this.lasttasknum = res['data'].lasttasknum;
                this.yaoqiu = JSON.parse(res['data'].yaoqiu);
            }).catch(err => {
                this.comm.showToast(err.msg);
            });
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
