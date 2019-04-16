import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {CommentService} from '../comment.service';
import {ActivatedRoute, Params} from '@angular/router';
import {NavController} from '@ionic/angular';
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import {ENV} from '../../config/ENV';

declare var FileUploadOptions;
declare var FileTransfer;

@Component({
    selector: 'app-talk',
    templateUrl: './talk.page.html',
    styleUrls: ['./talk.page.scss'],
})
export class TalkPage implements OnInit {
    pic: string = '';
    num: string = '';
    toid: string = '';
    pinPicList: Array<any> = [];
    isSHow1: string = '';
    isSHow2: string = '';

    constructor(public http: HttpService, public comm: CommentService, public activeRoute: ActivatedRoute, public nav: NavController, private imagePicker: ImagePicker) {
    }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            this.pic = params.pic;
            this.toid = params.toid;
            this.num = params.num;
        });
    }

    chooseImg(num) {
        let that = this, nums = 1;
        this.imagePicker.getPictures({
            maximumImagesCount: nums
        }).then(res => {
            let fileURL = res[0];
            var win = function (r) {
                var res = JSON.parse(r.response);
                if (num === 1) {
                    that.isSHow1 = res['data'];
                } else {
                    that.isSHow2 = res['data'];
                }
            };

            var fail = function (error) {
                console.log('An error has occurred: Code = ' + error.code);
            };

            var options = new FileUploadOptions();
            options.fileKey = 'file';
            options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
            options.mimeType = 'image/png';
            options.chunkedMode = false;
            var ft = new FileTransfer();
            ft.upload(fileURL, encodeURI(`${ENV.host}api/home/index/upload`), win, fail, options);
        });
    }

    chooseImgs() {
        let that = this, nums = 2;
        this.imagePicker.getPictures({
            maximumImagesCount: nums
        }).then(res => {
            for (let i = 0; i < res.length; i++) {
                let fileURL = res[i];
                var win = function (r) {
                    var res = JSON.parse(r.response);
                    if (i === 0) {
                        that.isSHow1 = res['data'];
                    } else {
                        that.isSHow2 = res['data'];
                    }
                };

                var fail = function (error) {
                    console.log('An error has occurred: Code = ' + error.code);
                };

                var options = new FileUploadOptions();
                options.fileKey = 'file';
                options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
                options.mimeType = 'image/png';
                options.chunkedMode = false;
                var ft = new FileTransfer();
                ft.upload(fileURL, encodeURI(`${ENV.host}api/home/index/upload`), win, fail, options);
            }
        });
    }

    subMessage() {
        if (this.isSHow1 === '' || this.isSHow2 === '') {
            this.comm.showToast('请将截图上传完整');
        } else {
            this.http.get('api/home/index/pingUp', {
                uid: this.http.getUid(),
                toid: this.toid,
                ping_pic: this.isSHow1 + ',' + this.isSHow2
            }).then(res => {
                this.comm.showToast('评价成功', () => {
                    this.nav.goBack();
                });
            }).catch(err => {
                this.comm.showToast(err.msg);
            });
        }
    }
}
