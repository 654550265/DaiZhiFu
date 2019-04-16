import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {CommentService} from '../comment.service';
import {NavController} from '@ionic/angular';

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
    city: string;
    qu: string;
    tel: string;
    huabei: boolean;
    proviceList: Array<any>;
    cityList: Array<any>;
    quList: Array<any>;
    isSHowForm: boolean;
    tabbaoInfo: any;

    constructor(public http: HttpService, public comm: CommentService, public nav: NavController) {
        this.sex = 1;
        this.provice = '0';
        this.city = '0';
        this.qu = '0';
    }

    ngOnInit() {
        this.http.get('api/home/index/editTaobaoInfo', {
            uid: this.http.getUid()
        }).then(res => {
            this.isSHowForm = res['data'] === '';
            this.tabbaoInfo = res['data'];
        }).catch(err => {
            this.isSHowForm = err['data'] === '';
            this.tabbaoInfo = err['data'];
        });
        this.http.get('api/home/index/get_area', {}).then(res => {
            this.proviceList = res['data'];
        });
    }

    proviceChange(e) {
        this.http.get('api/home/index/get_area', {
            fid: this.provice
        }).then(res => {
            this.cityList = res['data'];
        });
    }

    cityChange() {
        this.http.get('api/home/index/get_area', {
            fid: this.city
        }).then(res => {
            this.quList = res['data'];
        });
    }

    subMiteData() {
        let arr = [], reg = /^1[34578]\d{9}$/;
        for (let value of this.proviceList) {
            if (value.id === parseInt(this.provice)) {
                arr[0] = value.name;
                break;
            }
        }
        for (let value of this.cityList) {
            if (value.id === parseInt(this.city)) {
                arr[1] = value.name;
                break;
            }
        }
        for (let value of this.quList) {
            if (value.id === parseInt(this.qu)) {
                arr[2] = value.name;
                break;
            }
        }
        if (this.name === '') {
            this.comm.showToast('请输入淘宝账号');
        } else if (this.lxr === '') {
            this.comm.showToast('请输入收货人');
        } else if (this.tel === '') {
            this.comm.showToast('请输入联系方式');
        } else if (!reg.test(this.tel)) {
            this.comm.showToast('请输入正确的联系方式');
        } else if (this.addr === '') {
            this.comm.showToast('请输入详细地址');
        } else if (this.taoqi === '') {
            this.comm.showToast('请输入淘气值');
        } else {
            this.http.get('api/home/index/editTaobao', {
                uid: this.http.getUid(),
                name: this.name,
                area: arr.join(),
                lxr: this.lxr,
                mobile: this.tel,
                addr: this.addr,
                sex: this.sex,
                taoqi: this.taoqi,
                huabei: this.huabei ? 1 : 2
            }).then(res => {
                this.comm.showToast('提交成功，等待审核', () => {
                    this.nav.goBack();
                });
            }).catch(err => {
                this.comm.showToast(err.msg);
            });
        }
    }

    chooseOne(num) {
        this.sex = num;
    }
}
