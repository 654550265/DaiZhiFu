import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpService} from '../http.service';
import {CommentService} from '../comment.service';
import {AlertController} from '@ionic/angular';

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
    num: number;

    constructor(public activeRoute: ActivatedRoute, public http: HttpService, public router: Router, public comm: CommentService, public alertController: AlertController) {
        this.taskData = {};
        this.inter = null;
        this.timeText = '';
        this.num = 1;
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
                this.num++;
                this.taskData = res['data'];
            });
        });
    }

    async talkMessage(num) {
        if (num === 4) {
            const alert = await this.alertController.create({
                header: '温馨提示',
                subHeader: '1.请确认物流已签收',
                message: '2.超过7天无发货或者物流信息（物流截图就是实际信息）符合以上一种情况，可收货评价。提前收货按违规处理（商家特殊要求除外）在平台确认好评价，再去收货评价！付款10天不收货评价将取消任务',
                buttons: ['确认']
            });
            await alert.present();
        }
    }

    ionViewDidEnter() {
        if (this.num !== 1) {
            this.http.get('api/home/index/taskOrderDetail', {
                toid: this.toid,
                uid: this.http.getUid()
            }).then(res => {
                this.taskData = res['data'];
            });
        }
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
