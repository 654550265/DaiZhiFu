import {Component, OnInit} from '@angular/core';
import {ENV} from '../../config/ENV';
import {CommentService} from '../comment.service';
import {HttpService} from '../http.service';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-forget',
    templateUrl: './forget.page.html',
    styleUrls: ['./forget.page.scss'],
})
export class ForgetPage implements OnInit {
    dataObj: Object;
    apass: String;
    codeImg: string;
    isGetCode: boolean;
    text: string;
    code: string;

    constructor(public comm: CommentService, public http: HttpService, public nav: NavController) {
        this.dataObj = {
            tel: '',
            picCode: '',
            smsCode: '',
            pass: ''
        };
        this.codeImg = ENV.host + 'captcha.html';
        this.text = '获取验证码';
        this.isGetCode = true;
    }

    ngOnInit() {
    }

    getCode() {
        if (this.isGetCode) {
            let reg = /1[0-9]{10}/;
            if (!reg.test(this.dataObj['tel'])) {
                this.comm.showToast('请输入正确的手机号');
            } else if (!this.dataObj['tel']) {
                this.comm.showToast('请输入手机号');
            } else {
                this.http.post('user/login/getSmsCode', {}).then(res => {
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

    forget() {
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
        } else if (!this.dataObj['pass']) {
            this.comm.showToast('请输入密码');
        } else if (this.dataObj['pass'].length < 6 || this.dataObj['pass'].length > 16) {
            this.comm.showToast('请输入正确位数的密码');
        } else if (this.dataObj['pass'] !== this.apass) {
            this.comm.showToast('两次密码输入不一致');
        } else {
            this.http.post('user/login/redoDo', this.dataObj).then(res => {
                this.comm.showToast('重置成功', () => {
                    this.nav.goBack();
                });
            }).catch(err => {
                this.comm.showToast(err['msg']);
            });
        }
    }
}
