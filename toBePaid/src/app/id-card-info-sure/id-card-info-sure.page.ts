import { Router } from '@angular/router';
import { CommentService } from './../comment.service';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ENV } from '../../config/ENV';
// import {FileTransfer, FileTransferObject, FileUploadOptions} from '@ionic-native/file-transfer/ngx';

declare var FileUploadOptions;
declare var FileTransfer;
@Component({
    selector: 'app-id-card-info-sure',
    templateUrl: './id-card-info-sure.page.html',
    styleUrls: ['./id-card-info-sure.page.scss'],
})
export class IdCardInfoSurePage implements OnInit {
    status: string = '0';
    isHaveIdCard: boolean;
    idPic1: string = '';
    idPic2: string = '';
    idPic3: string = '';
    name: string = '';
    idnumber: string = '';
    passStatus: number;//0 提交 1 通过 2不通过
    noPsssText: string;

    constructor(public http: HttpService, private imagePicker: ImagePicker, public comm: CommentService, public router: Router) {
    }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.http.get('api/home/index/editIdStatus', {
            uid: this.http.getUid()
        }).then(res => {
            this.status = res['data'];
            if (this.status === '1') {
                this.http.get('api/home/index/editIdInfo', {
                    uid: this.http.getUid()
                }).then(res => {
                    this.passStatus = res['data']['idnumber_status'];
                    // this.passStatus = 0;
                    this.noPsssText = res['data']['idnumber_text'];
                    this.name = res['data']['name'];
                    this.idnumber = res['data']['idnumber'];
                    this.idPic1 = res['data']['idPic1'];
                    this.idPic2 = res['data']['idPic2'];
                    this.idPic3 = res['data']['idPic3'];
                });
            }
        });
    }

    chooseOneIdCard(type) {
        let that = this;
        this.imagePicker.getPictures({
            maximumImagesCount: 1
        }).then(res => {
            let fileURL = res[0];
            var win = function (r) {
                var res = JSON.parse(r.response);
                that['idPic' + type] = res['data'];
            }

            var fail = function (error) {
                console.log("An error has occurred: Code = " + error.code);
                console.log("upload error source " + error.source);
                console.log("upload error target " + error.target);
            }

            var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
            options.mimeType = "image/png";
            options.chunkedMode = false;

            var ft = new FileTransfer();
            ft.upload(fileURL, encodeURI(`${ENV.host}api/home/index/upload`), win, fail, options);
        });
    }
    
    save() {
        var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
        if (this.name === '') {
            this.comm.showToast('请输入姓名');
        } else if (this.idnumber === '') {
            this.comm.showToast('请输入身份证号码');
        } else if (!reg.test(this.idnumber)) {
            this.comm.showToast('请输入正确的身份证号码');
        } else if (!this.idPic1 || !this.idPic2 || !this.idPic3) {
            this.comm.showToast('请上传图片');
        } else {
            this.http.get('api/home/index/editId', {
                uid: this.http.getUid(),
                name: this.name,
                idnumber: this.idnumber,
                idPic1: this.idPic1,
                idPic2: this.idPic2,
                idPic3: this.idPic3
            }).then(res => {
                this.comm.showToast('提交成功');
                // this.nav.navigateForward('/tabs/tab1');
                this.router.navigate(['/userinfo']);
            });
        }
    }
}
