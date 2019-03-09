import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {CommentService} from '../comment.service';

@Component({
    selector: 'app-bindtaobao',
    templateUrl: './bindtaobao.page.html',
    styleUrls: ['./bindtaobao.page.scss'],
})
export class BindtaobaoPage implements OnInit {
    name: string;
    lxr: string;
    area: string;
    addr: string;
    sex: number;
    taoqi: string;
    provice: string;
    huabei: boolean;
    proviceList: Array<any>;

    constructor(public http: HttpService, public comm: CommentService) {
        this.sex = 1;

    }

    ngOnInit() {
        this.http.get('api/home/index/get_area', {}).then(res => {
            res['data'].unshift({name: '请选择', id: '0'});
            this.proviceList = res['data'];
        });
    }

    proviceChange(e) {
        console.log(this.provice);
    }

    subMiteData() {
        console.log(this.huabei);
        if (this.name === '') {
            this.comm.showToast('请输入淘宝账号');
        } else if (this.lxr) {
            this.comm.showToast('请输入收货人');
        } else if (this.addr) {
            this.comm.showToast('请输入详细地址');
        } else if (this.taoqi) {
            this.comm.showToast('请输入淘气值');
        } else {
            this.http.get('api/home/index/editTaobao', {
                uid: this.http.getUid(),
                name: this.name,
                lxr: this.lxr,
                addr: this.addr,
                sex: this.sex,
                taoqi: this.taoqi,
                huabei: this.huabei ? 1 : 2
            }).then(res => {
            });
        }
    }

    chooseOne(num) {
        this.sex = num;
    }
}
