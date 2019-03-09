import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {ActivatedRoute, Params} from '@angular/router';
import {CommentService} from '../comment.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-taobao-task',
    templateUrl: './taobao-task.page.html',
    styleUrls: ['./taobao-task.page.scss'],
})
export class TaobaoTaskPage implements OnInit {
    tasknum: string;
    taskType: string;
    toid: string;
    taskData: Object;
    shopName: string;
    taskOrder: string;
    realMoney: string;
    xiadanPic: string;
    inter: any;
    timeText: string;

    constructor(public http: HttpService, public activeRoute: ActivatedRoute, public comm: CommentService, public nav: NavController) {
        this.taskData = {};
        this.shopName = '';
        this.taskOrder = '';
        this.realMoney = '';
        this.inter = null;
    }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            this.tasknum = params.taskNum;
            this.taskType = params.taskType;
            this.toid = params.toid;
            this.http.get('api/home/index/taskOrderDetail', {
                toid: this.toid,
                uid: this.http.getUid()
            }).then(res => {
                res['data'].yaoqiu = JSON.parse(res['data'].yaoqiu);
                this.taskData = res['data'];
            });
        });
    }


    subTaskMessage() {
        if (this.shopName === '') {
            this.comm.showToast('请输入店铺名称');
        } else if (this.taskOrder === '') {
            this.comm.showToast('请输入淘宝订单编号');
        } else if (this.realMoney === '') {
            this.comm.showToast('请输入实际付款金额');
        } else {
            this.http.get('api/home/index/dianfuUp', {
                toid: this.toid,
                uid: this.http.getUid(),
                tbOrderNum: this.taskOrder,
                tbOrderPrice: this.realMoney,
                xiadanPic: this.realMoney,
            }).then(res => {
                this.comm.showToast('提交成功', () => {
                    this.nav.goBack();
                });
            }).catch(err => {
                this.comm.showToast(err.msg);
            });
        }
    }

    checkIsRight() {
        if (this.shopName === this.taskData['tb_name']) {
            this.comm.showToast('核对成功');
        } else {
            this.comm.showToast('核对失败');
        }
    }
}
