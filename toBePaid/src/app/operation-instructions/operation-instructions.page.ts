import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpService} from '../http.service';
import {CommentService} from '../comment.service';

@Component({
    selector: 'app-operation-instructions',
    templateUrl: './operation-instructions.page.html',
    styleUrls: ['./operation-instructions.page.scss'],
})
export class OperationInstructionsPage implements OnInit {
    tasknum: string;
    taskType: string;
    taobaoName: string;

    constructor(public activeRoute: ActivatedRoute, public http: HttpService, public router: Router, public comm: CommentService) {
    }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            this.tasknum = params.taskNum;
            this.taskType = params.taskType;
        });
        this.http.get('api/home/index/getTaobaoName', {
            uid: this.http.getUid()
        }).then(res => {
            this.taobaoName = res['data'];
        });
    }

    gotoLookTaskPage() {
        // let routerStr = this.taskType === '1' ? 'taobao-task' : 'look-task';
        this.http.get('api/home/index/taskIn', {
            tasknum: this.tasknum,
            uid: this.http.getUid()
        }).then(res => {
            this.router.navigate(['task-order'], {
                queryParams: {
                    taskNum: this.tasknum,
                    taskType: this.taskType,
                    toid: res['data'].toid
                }
            });
        }).catch(err => {
            this.comm.showToast(err['msg']);
        });
    }

}
