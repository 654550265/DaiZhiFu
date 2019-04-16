import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { CommentService } from '../comment.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { ENV } from '../../config/ENV';

declare var FileUploadOptions;
declare var FileTransfer;
@Component({
    selector: 'app-look-task',
    templateUrl: './look-task.page.html',
    styleUrls: ['./look-task.page.scss'],
})
export class LookTaskPage implements OnInit {
    tasknum: string;
    taskType: string;
    toid: string;
    shopName: string;
    taskData: Object;
    liulan_pic: Array<any>;
    shoucang_pic: Array<any>;
    liulan_pic1: string = '';
    liulan_pic2: string = '';
    liulan_pic3: string = '';
    shoucang_pic1: string = '';
    shoucang_pic2: string = '';
    shoucang_pic3: string = '';

    constructor(public http: HttpService, public comm: CommentService, public activeRoute: ActivatedRoute, public nav: NavController, private imagePicker: ImagePicker) {
        this.liulan_pic = [];
        this.shoucang_pic = [];
    }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            this.tasknum = params.taskNum;
            this.taskType = params.taskType;
            this.toid = params.toid;
            this.http.get('api/home/index/taskOrderDetail', {
                toid: this.toid,
                uid: this.http.getUid()
            }).then(res => {
                res['data'].yaoqiu = JSON.parse(res['data'].yaoqiu);
                this.taskData = res['data'];
            });
        });
    }

    clear() {
        this.shopName = '';
    }

    checkName() {
        if (this.shopName === this.taskData['tb_name']) {
            this.comm.showToast('核对成功');
        } else {
            this.comm.showToast('核对失败');
        }
    }

    chooseImg(type, num) {
        let that = this;
        this.imagePicker.getPictures({
            maximumImagesCount: 1
        }).then(res => {
            let fileURL = res[0];
            var win = function (r) {
                var res = JSON.parse(r.response);
                that[type+'_pic' + num] = res['data'];
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

    chooseImgs(type) {
        let that = this;
        this.imagePicker.getPictures({
            maximumImagesCount: 3
        }).then(res => {
            for (let index = 0; index < res.length; index++) {
                const fileURL = res[index];
                var win = function (r) {
                    var res = JSON.parse(r.response);
                    that[type+'_pic' + (index+1)] = res['data'];
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
            }
        });
    }

    subMessage() {
        if(!this.liulan_pic1 || !this.liulan_pic2 || !this.liulan_pic3){
            this.comm.showToast("请上传图片");
            return false;
        }
        if(!this.shoucang_pic1 || !this.shoucang_pic2 || !this.shoucang_pic3){
            this.comm.showToast("请上传图片");
            return false;
        }
        this.liulan_pic.push(this.liulan_pic1);
        this.liulan_pic.push(this.liulan_pic2);
        this.liulan_pic.push(this.liulan_pic3);
        this.shoucang_pic.push(this.shoucang_pic1);
        this.shoucang_pic.push(this.shoucang_pic2);
        this.shoucang_pic.push(this.shoucang_pic3);
        this.http.get('api/home/index/liulanUp', {
            toid: this.toid,
            uid: this.http.getUid(),
            liulan_pic: this.liulan_pic.join(),
            shoucang_pic: this.shoucang_pic.join()
        }).then(res => {
            this.comm.showToast('提交成功', () => {
                this.nav.goBack();
            });
        }).catch(err => {
            this.comm.showToast(err.msg);
        });
    }

}
