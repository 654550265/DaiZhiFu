import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpService} from '../http.service';

@Component({
    selector: 'app-operation-instructions',
    templateUrl: './operation-instructions.page.html',
    styleUrls: ['./operation-instructions.page.scss'],
})
export class OperationInstructionsPage implements OnInit {
    tasknum: string;
    taskType: string;

    constructor(public activeRoute: ActivatedRoute, public http: HttpService, public router: Router) {
    }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            console.log(params);
            this.tasknum = params.taskNum;
            this.taskType = params.taskType;
        });
    }

    gotoLookTaskPage() {
        let routerStr = this.taskType === '1' ? 'taobao-task' : 'look-task';
        this.router.navigate([routerStr], {
            queryParams: {
                taskNum: this.tasknum
            }
        });
    }

}
