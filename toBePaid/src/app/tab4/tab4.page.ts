import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {HttpService} from '../http.service';
import {CommentService} from '../comment.service';
import {Clipboard} from '@ionic-native/clipboard/ngx';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tab4',
    templateUrl: './tab4.page.html',
    styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
    isShow: boolean;
    kefu: string = '123456';

    constructor(public nav: NavController, public http: HttpService, public comm: CommentService, private clipboard: Clipboard, public router: Router) {
        this.isShow = false;
    }

    ngOnInit() {

    }

    gotoPage(url: string) {
        this.nav.navigateForward(url);
    }

    showPop() {
        this.isShow = true;
    }

    hidePop() {
        this.isShow = false;
    }

    gotoCommission(num) {
        this.router.navigate(['/commission'], {
            queryParams: {
                type: num
            }
        });
    }

    clearData() {
        this.comm.showToast('清除成功');
    }

    copy() {
        this.clipboard.copy(this.kefu);
    }
}
