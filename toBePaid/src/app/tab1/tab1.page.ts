import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';
import {HttpService} from '../http.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    bgColor: string;
    subList: Array<any>;
    taskList: Array<any>;

    constructor(public nav: NavController, public http: HttpService, public router: Router) {
        this.bgColor = '#f7f7f7';
        this.subList = [{
            text: '垫付任务',
            type: '1',
            isAcv: true,
            isUrl: false
        }, {
            text: '浏览任务',
            type: '2',
            isAcv: false,
            isUrl: false
        }, {
            text: '推广赚钱',
            type: '3',
            isAcv: false,
            isUrl: true
        }];
    }

    ngOnInit() {
        let user = localStorage.getItem('userInfo');
        if (!user) {
            this.nav.navigateForward('/login');
        }
        let type = '';
        for (let value of this.subList) {
            if (value.isAcv) {
                type = value.type;
                break;
            }
        }
        this.init(type);
    }

    init(type) {
        this.http.get('api/home/index/getTaskList', {
            taskType: type
        }).then(res => {
            this.taskList = res['data'];
        });
    }

    chooseOne(index) {
        let isUrl = this.subList[index].isUrl;
        if (isUrl) {
            this.router.navigate(['/money-making']);
        } else {
            for (let values of this.subList) {
                values.isAcv = false;
            }
            this.subList[index].isAcv = true;
            this.init(this.subList[index].type);
        }
    }

    gotoTaskDteailsPage(taskNum) {
        let taskType = '';
        for (let value of this.subList) {
            if (value.isAcv) {
                taskType = value.type;
                break;
            }
        }
        this.router.navigate(['/task-details'], {
            queryParams: {
                taskNum: taskNum,
                taskType: taskType
            }
        });
    }

    gotoLoginPage() {
        this.nav.navigateForward('/login');
    }
}
