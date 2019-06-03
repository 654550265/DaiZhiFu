import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {HttpService} from '../http.service';
import {CommentService} from '../comment.service';
import {AlertController} from '@ionic/angular';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';

@Component({
    selector: 'app-task-order',
    templateUrl: './task-order.page.html',
    styleUrls: ['./task-order.page.scss'],
})
export class TaskOrderPage implements OnInit {
    tasknum: string;
    taskType: string;
    toid: string;
    taskData: Object = {};
    title: string;
    timeText: string;
    inter: any;
    num: number;
    url: string = '';

    constructor(public activeRoute: ActivatedRoute, public http: HttpService, public router: Router, public comm: CommentService, public alertController: AlertController, public photoViewer: PhotoViewer) {
        this.taskData = {};
        this.inter = null;
        this.timeText = '';
        this.num = 1;
    }


    ngOnInit() {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            this.tasknum = params.taskNum;
            this.url = params.url;
            this.taskType = params.taskType;
            this.toid = params.toid;
            this.title = params.taskType === '2' ? '浏览' : '淘宝';
            let time = params.count ? this.http.sec_to_time(params.count) : 3600;
            this.inter = setInterval(() => {
                if (time > 0) {
                    time--;
                    this.timeText = this.http.formatSeconds(time);
                } else {
                    //放弃任务了
                    clearInterval(this.inter);
                }
            }, 1000);
            this.http.get('api/home/index/taskOrderDetail', {
                toid: this.toid,
                uid: this.http.getUid()
            }).then(res => {
                this.num++;
                if (res['data'].data4.pic !== '') {
                    res['data'].data4.pic = res['data'].data4.pic.split(',');
                } else {
                    res['data'].data4.pic = [];
                }
                this.taskData = res['data'];
            });
        });
    }

    async talkMessage(num) {
        if (num === 2 || num === 3 || num === 4) {
            const alert = await this.alertController.create({
                header: '温馨提示',
                subHeader: '1.请确认物流已签收',
                message: '2.超过7天无发货或者物流信息（物流截图就是实际信息）符合以上一种情况，可收货评价。提前收货按违规处理（商家特殊要求除外）在平台确认好评价，再去收货评价！付款10天不收货评价将取消任务',
                buttons: [{
                    text: '确认',
                    handler: (blah) => {
                        this.router.navigate(['/talk'], {
                            queryParams: {
                                num: num,
                                pic: this.taskData['tb_pic'],
                                toid: this.toid
                            }
                        });
                    }
                }]
            });
            await alert.present();
        }
    }

    back() {
        if (this.url) {
            this.router.navigate([this.url]);
        }
    }

    showShopPic(src) {
        this.router.navigate(['show-pic'], {
            queryParams: {
                pic: src,
            }
        });
    }

    privetPic(str, index) {
        this.photoViewer.show(this.taskData[str].pic.split(',')[index]);
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: '温馨提示',
            message: '请勿将此截图用于拍立得，否则将处罚',
            buttons: ['确认']
        });

        await alert.present();
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

    lookMore() {
        this.router.navigate(['/task-detailss'], {
            queryParams: {
                tasknum: this.tasknum,
                taskType: this.taskType,
                init: 123
            }
        });
    }
}
