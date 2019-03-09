import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {CommentService} from '../comment.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'app-look-task',
    templateUrl: './look-task.page.html',
    styleUrls: ['./look-task.page.scss'],
})
export class LookTaskPage implements OnInit {
    tasknum: string;
    taskType: string;
    toid: string;
    shopName: string;
    taskData: Object;
    liulan_pic: Array<any>;
    shoucang_pic: Array<any>;

    constructor(public http: HttpService, public comm: CommentService, public activeRoute: ActivatedRoute) {
        this.liulan_pic = [];
        this.shoucang_pic = [];
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

    clear() {
        this.shopName = '';
    }

    checkName() {
        if (this.shopName === this.taskData['tb_name']) {
            this.comm.showToast('核对成功');
        } else {
            this.comm.showToast('核对失败');
        }
    }

    subMessage() {
        this.http.get('api/home/index/liulanUp', {
            toid: this.toid,
            uid: this.http.getUid(),
            liulan_pic: this.liulan_pic.join(),
            shoucang_pic: this.shoucang_pic.join()
        }).then(res => {

        }).catch(err => {
            this.comm.showToast(err.msg);
        });
    }

}
