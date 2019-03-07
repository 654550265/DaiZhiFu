import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {HttpService} from '../http.service';
import {CommentService} from '../comment.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    tel: string;
    pass: string;

    constructor(public nav: NavController, public http: HttpService, public comm: CommentService) {
        this.tel = '';
        this.pass = '';
    }

    ngOnInit() {
    }

    gotoRegisterPage() {
        this.nav.navigateForward('/register');
    }

    gotoForgetPage() {
        this.nav.navigateForward('/forget');
    }

    login() {
        let reg = /1[0-9]{10}/;
        if (this.tel === '') {
            this.comm.showToast('请输入手机号');
        } else if (!reg.test(this.tel)) {
            this.comm.showToast('请输入正确的手机号');
        } else if (this.pass === '') {
            this.comm.showToast('请输入密码');
        } else {
            this.http.post('user/login/loginDo', {
                tel: this.tel,
                pass: this.pass
            }).subscribe(res => {
                if (res.code === "1") {
                    localStorage.setItem("userInfo",JSON.stringify(res.data));
                    this.nav.navigateForward("/tabs/tab1");
                } else {
                    this.comm.showToast(res.msg);
                }
            });
        }
    }
}
