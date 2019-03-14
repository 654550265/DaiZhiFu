import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpService} from '../http.service';

@Component({
    selector: 'app-message-list',
    templateUrl: './message-list.page.html',
    styleUrls: ['./message-list.page.scss'],
})
export class MessageListPage implements OnInit {
    msgList: Array<any> = [];

    constructor(public router: Router, public http: HttpService) {
    }

    ngOnInit() {
        this.http.get('/api/home/index/notice', {}).then(res => {
            if (res.code === 1) {
                this.msgList = res['data'];
            }
        });
    }

    gotoMessageInfoPage() {
        this.router.navigate(['message-info'], {
            queryParams: {
                id: 1
            }
        });
    }

}
