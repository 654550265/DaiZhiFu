import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {CommentService} from '../comment.service';
import {Router} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-change-pwd',
    templateUrl: './change-pwd.page.html',
    styleUrls: ['./change-pwd.page.scss'],
})
export class ChangePwdPage implements OnInit {
    newPwd: string;
    oldPwd: string;
    anewPwd: string;

    constructor(public http: HttpService, public comm: CommentService, public router: Router, public nav: NavController) {
    }

    ngOnInit() {
    }

    changePwd() {
        if (!this.oldPwd) {
            this.comm.showToast('请输入旧密码');
        } else if (this.newPwd !== this.anewPwd) {
            this.comm.showToast('两次输入的密码不一致');
        } else {
            this.http.get('user/login/editDo', {
                uid: this.http.getUid(),
                pass: this.newPwd,
                oldPass: this.oldPwd
            }).then(res => {
                this.comm.showToast(res['msg'], () => {
                    this.nav.goBack();
                });
            }).catch(err => {
                this.comm.showToast(err['msg']);
            });
        }
    }

}
