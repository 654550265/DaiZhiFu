import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Screenshot} from '@ionic-native/screenshot/ngx';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-show-pic',
    templateUrl: './show-pic.page.html',
    styleUrls: ['./show-pic.page.scss'],
})
export class ShowPicPage implements OnInit {
    pics: Array<any> = [];

    constructor(public activeRoute: ActivatedRoute, private screenshot: Screenshot, public alertController: AlertController) {
    }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            this.pics = params.pic.split(',');
            this.screenshot.URI(80).then(res => {
                this.presentAlert();
            });
        });
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: '温馨提示',
            message: '请勿将此截图用于拍立得，否则将处罚',
            buttons: ['确认']
        });
        await alert.present();
    }
}
