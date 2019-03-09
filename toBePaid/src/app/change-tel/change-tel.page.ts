import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {CommentService} from '../comment.service';
import {ENV} from '../../config/ENV';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-change-tel',
    templateUrl: './change-tel.page.html',
    styleUrls: ['./change-tel.page.scss'],
})
export class ChangeTelPage implements OnInit {
    text: string;
    isGetCode: boolean;
    dataObj: Object;
    code: string;
    codeImg: string;
    picCode: string;

    constructor(public http: HttpService, public comm: CommentService, public nav: NavController) {
        let nums = this.http.getMathFour();
        this.isGetCode = true;
        this.text = '获取验证码';
        this.dataObj = {};
        this.codeImg = ENV.host + 'user/login/getPicCode/code/' + nums;
        this.picCode = nums;
    }

    ngOnInit() {

    }

    changeCode() {
        let nums = this.http.getMathFour();
        this.codeImg = ENV.host + 'user/login/getPicCode/code/' + nums;
        this.picCode = nums;
        this.dataObj['picCode'] = '';
    }

    getCode() {
        if (this.isGetCode) {
            let reg = /1[0-9]{10}/;
            if (!reg.test(this.dataObj['tel'])) {
                this.comm.showToast('请输入正确的手机号');
            } else if (!this.dataObj['tel']) {
                this.comm.showToast('请输入手机号');
            } else if (this.dataObj['picCode'] !== this.picCode) {
                this.comm.showToast('请输入正确的图形验证码');
            } else {
                this.http.get('user/login/getSmsCode', {
                    picCode: this.dataObj['picCode']
                }).then(res => {
                    if (res['code'] === '1') {
                        this.code = res['data'];
                        let time = 60;
                        let t = setInterval(() => {
                            if (time > 0) {
                                time--;
                                this.text = `${time}s`;
                                this.isGetCode = false;
                            } else {
                                this.text = `重新获取`;
                                this.isGetCode = true;
                                clearInterval(t);
                            }
                        }, 1000);
                    }
                });
            }
        }
    }

    changeTel() {
        let reg = /1[0-9]{10}/;
        if (!this.dataObj['tel']) {
            this.comm.showToast('请输入手机号');
        } else if (!reg.test(this.dataObj['tel'])) {
            this.comm.showToast('请输入正确的手机号');
        } else if (!this.dataObj['picCode']) {
            this.comm.showToast('请输入图片验证码');
        } else if (!this.dataObj['smsCode']) {
            this.comm.showToast('请输入短信验证码');
        } else if (this.code !== this.dataObj['smsCode']) {
            this.comm.showToast('短信验证码不正确');
        } else {
            this.http.get('api/home/index/editMobile', {
                uid: this.http.getUid(),
                tel: this.dataObj['tel'],
                smsCode: this.dataObj['smsCode']
            }).then(res => {
                this.comm.showToast('修改成功', () => {
                    this.nav.goBack();
                });
            }).catch(err => {
                this.comm.showToast(err.msg);
            });
        }
    }

}
