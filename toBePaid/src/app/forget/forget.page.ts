import {Component, OnInit} from '@angular/core';
import {ENV} from '../../config/ENV';
import {CommentService} from '../comment.service';

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

    constructor(public comm: CommentService) {
        this.dataObj = {};
        this.codeImg = ENV.host + 'captcha.html';
        this.text = '获取验证码';
        this.isGetCode = true;
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
        }
    }

    forget() {

    }

}
