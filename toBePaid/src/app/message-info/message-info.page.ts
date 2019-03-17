import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {HttpService} from '../http.service';

@Component({
    selector: 'app-message-info',
    templateUrl: './message-info.page.html',
    styleUrls: ['./message-info.page.scss'],
})
export class MessageInfoPage implements OnInit {
    obj: Object = {};

    constructor(public acvRouter: ActivatedRoute, public http: HttpService) {
    }

    ngOnInit() {
        this.acvRouter.queryParams.subscribe((parm: Params) => {
            this.http.get('/api/home/index/noticeDetail', {
                id: parm.id
            }).then(res => {
                if (res['code'] === 1) {
                    this.obj = res['data'];
                }
            });
        });
    }

}
