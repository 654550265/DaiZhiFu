import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {CommentService} from '../comment.service';
import {NavController} from '@ionic/angular';
import {ENV} from '../../config/ENV';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    dataObj: Object;
    apass: string;
    text: string;
    isGetCode: boolean;
    codeImg: string;
    code: string;

    constructor(public http: HttpService, public comm: CommentService, public nav: NavController) {
        this.dataObj = {};
        this.text = '获取验证码';
        this.isGetCode = true;
        this.codeImg = ENV.host + 'captcha.html';
    }

    ngOnInit() {

    }

    getCode() {
        if (this.isGetCode) {
            let reg = /1[0-9]{10}/;
            if (!reg.test(this.dataObj.tel)) {
                this.comm.showToast('请输入正确的手机号');
            } else if (!this.dataObj.tel) {
                this.comm.showToast('请输入手机号');
            } else {
                this.http.post('user/login/getSmsCode', {}).subscribe(res => {
                    if (res.code === '1') {
                        this.code = res.data;
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

    register() {
        let reg = /1[0-9]{10}/;
        if (!this.dataObj.tel) {
            this.comm.showToast('请输入手机号');
        } else if (!reg.test(this.dataObj.tel)) {
            this.comm.showToast('请输入正确的手机号');
        } else if (!this.dataObj.yqcode) {
            this.comm.showToast('请输入邀请码');
        } else if (!this.dataObj.picCode) {
            this.comm.showToast('请输入图片验证码');
        } else if (!this.dataObj.smsCode) {
            this.comm.showToast('请输入短信验证码');
        } else if (this.code !== this.dataObj.smsCode) {
            this.comm.showToast('短信验证码不正确');
        } else if (!this.dataObj.pass) {
            this.comm.showToast('请输入密码');
        } else if (this.dataObj.pass.length < 6 || this.dataObj.pass.length > 16) {
            this.comm.showToast('请输入正确位数的密码');
        } else if (this.dataObj.pass !== this.apass) {
            this.comm.showToast('两次密码输入不一致');
        } else {
            this.http.post('user/login/regDo', this.dataObj).subscribe(res => {
                if (res.code === '1') {
                    this.comm.showToast('注册成功', () => {
                        this.nav.goBack();
                    });
                } else {
                    this.comm.showToast(res.msg);
                }
            });
        }
    }

}
