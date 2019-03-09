import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {ImagePicker} from '@ionic-native/image-picker/ngx';
import {ENV} from '../../config/ENV';
// import {FileTransfer, FileTransferObject, FileUploadOptions} from '@ionic-native/file-transfer/ngx';

declare var FileUploadOptions;
declare var FileTransfer;
@Component({
    selector: 'app-id-card-info-sure',
    templateUrl: './id-card-info-sure.page.html',
    styleUrls: ['./id-card-info-sure.page.scss'],
})
export class IdCardInfoSurePage implements OnInit {
    isHaveIdCard: boolean;
    idPic1: string;
    idPic2: string;
    idPic3: string;
    name: string;
    idnumber: string;
    isIdPic1: boolean;
    isIdPic2: boolean;
    isIdPic3: boolean;
    uname: string;

    constructor(public http: HttpService, private imagePicker: ImagePicker) {
        this.isIdPic1 = false;
        this.isIdPic2 = false;
        this.isIdPic3 = false;
    }


    ngOnInit() {

    }

    chooseOneIdCard(type) {
        this.imagePicker.getPictures({
            maximumImagesCount: 1
        }).then(res => {
            let src = res[0];
            // const fileTransfer: FileTransferObject = this.transfer.create();
            // let options: FileUploadOptions = {
            //     fileKey: 'file',
            //     fileName: 'name.jpg',
            //     mimeType: "text/plain"
            // };
            // fileTransfer.upload(res[0], `${ENV.host}api/home/index/upload`, options)
            //     .then((data) => {
            //         console.log(data);
            //     }, (err) => {
            //         console.log(err);
            //     });

            this.uploadFile(res[0]);
            // switch (type) {
            //     case 1:
            //         this.isIdPic1 = true;
            //         this.idPic1 = src;
            //         break;
            //     case 2:
            //         this.isIdPic2 = true;
            //         this.idPic2 = src;
            //         break;
            //     case 3:
            //         this.isIdPic3 = true;
            //         this.idPic3 = src;
            //         break;
            // }
        });
    }

    uploadFile(fileURL){
        var win = function (r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }
        
        var fail = function (error) {
            alert("An error has occurred: Code = " + error.code);
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
}
