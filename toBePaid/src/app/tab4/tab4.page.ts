import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {HttpService} from '../http.service';
import {CommentService} from '../comment.service';
import {Clipboard} from '@ionic-native/clipboard/ngx';

@Component({
    selector: 'app-tab4',
    templateUrl: './tab4.page.html',
    styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
    isShow: boolean;
    kefu: string = '123456';

    constructor(public nav: NavController, public http: HttpService, public comm: CommentService, private clipboard: Clipboard) {
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

    gotoCommission() {
        this.nav.navigateForward('commission');
    }

    clearData() {
        this.comm.showToast('清除成功');
    }

    copy() {
        this.clipboard.copy(this.kefu);
    }
}
