import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {ActivatedRoute, Params} from '@angular/router';
import {CommentService} from '../comment.service';
import {NavController} from '@ionic/angular';
import {ENV} from '../../config/ENV';
import {ImagePicker} from '@ionic-native/image-picker/ngx';

declare var FileUploadOptions;
declare var FileTransfer;

@Component({
    selector: 'app-taobao-task',
    templateUrl: './taobao-task.page.html',
    styleUrls: ['./taobao-task.page.scss'],
})
export class TaobaoTaskPage implements OnInit {
    tasknum: string;
    taskType: string;
    toid: string;
    taskData: Object;
    shopName: string;
    taskOrder: string;
    realMoney: string;
    xiadanPic: string;
    inter: any;
    timeText: string;
    isRight: boolean;

    constructor(public http: HttpService, public activeRoute: ActivatedRoute, public comm: CommentService, public nav: NavController, private imagePicker: ImagePicker) {
        this.taskData = {};
        this.shopName = '';
        this.taskOrder = '';
        this.xiadanPic = '';
        this.realMoney = '';
        this.inter = null;
        this.isRight = false;
    }

    uploadImg() {
        this.imagePicker.getPictures({
            maximumImagesCount: 1
        }).then(res => {
            let src = res[0], self = this;

            var win = function (r) {
                console.log('Code = ' + r.responseCode);
                console.log('Response = ' + r.response);
                console.log('Sent = ' + r.bytesSent);
                let res = JSON.parse(r.response);
                if (res.code === 1) {
                    self.xiadanPic = res.data;
                }
            };

            var fail = function (error) {
                alert('An error has occurred: Code = ' + error.code);
                console.log('upload error source ' + error.source);
                console.log('upload error target ' + error.target);
            };

            var options = new FileUploadOptions();
            options.fileKey = 'file';
            options.fileName = src.substr(src.lastIndexOf('/') + 1);
            options.mimeType = 'image/png';
            options.chunkedMode = false;

            var ft = new FileTransfer();
            ft.upload(src, encodeURI(`${ENV.host}api/home/index/upload`), win, fail, options);
        });
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

    copyOpen() {
        console.log(123);
        this.http.openTaoBao(this.taskData['tb_name']);
    }

    openTb() {
        console.log(123);
        this.http.openTaoBao('');
    }

    subTaskMessage() {
        if (this.shopName === '') {
            this.comm.showToast('请输入店铺名称');
        } else if (this.taskOrder === '') {
            this.comm.showToast('请输入淘宝订单编号');
        } else if (this.realMoney === '') {
            this.comm.showToast('请输入实际付款金额');
        } else if (this.xiadanPic === '') {
            this.comm.showToast('选择需要上传的图片');
        } else if (!this.isRight) {
            this.comm.showToast('请核对店铺名称是否正确');
        } else {
            this.http.get('api/home/index/dianfuUp', {
                toid: this.toid,
                uid: this.http.getUid(),
                tbOrderNum: this.taskOrder,
                tbOrderPrice: this.realMoney,
                xiadanPic: this.xiadanPic,
            }).then(res => {
                this.comm.showToast('提交成功', () => {
                    this.nav.goBack();
                });
            }).catch(err => {
                this.comm.showToast(err.msg);
            });
        }
    }

    checkIsRight() {
        if (this.shopName === this.taskData['tb_name']) {
            this.comm.showToast('核对成功');
            this.isRight = true;
        } else {
            this.comm.showToast('核对失败');
            this.isRight = false;
        }
    }
}
