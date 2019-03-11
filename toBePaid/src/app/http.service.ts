import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENV} from '../config/ENV';
import {Clipboard} from '@ionic-native/clipboard/ngx';
import {AlertController, Platform} from '@ionic/angular';
import {AppAvailability} from '@ionic-native/app-availability/ngx';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private httpClient: HttpClient, private clipboard: Clipboard, private platform: Platform, private appAvailability: AppAvailability, public alertController: AlertController) {
    }

    public get(url: string, obj: Object) {
        // let iv = 'ZZWBKJ_ZHIHUAWEI';
        // let decrypt_key = "lianghui12345678";
        let promse = new Promise((resolve, reject) => {
            let str = `${ENV.host}${url}?`;
            for (let key in obj) {
                str += `${key}=${obj[key]}&`;
            }
            str = str.substr(0, str.length - 1);
            this.httpClient.get(str, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept': '*/*'
                }
            }).subscribe(res => {
                if (res['code'] == '1') {
                    resolve(res);
                } else {
                    reject(res);
                }
            });
        });
        return promse;
    }

    // public post(url: string, data) {
    //     let promse = new Promise((resolve, reject) => {
    //         // const params = typeof(data) === 'object' && String(data) !== '[object File]' ? this.paramFormat(data) : data;
    //         this.httpClient.post(`${ENV.host}${url}`, null, {
    //             headers: {
    //                 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    //                 'Accept': '*/*'
    //             },
    //             params: data
    //         }).subscribe(res => {
    //             if (res['code'] === '1') {
    //                 resolve(res);
    //             } else {
    //                 reject(res);
    //             }
    //         });
    //     });
    //     return promse;
    // }
    //
    // private paramFormat(data: any): string {
    //     let paramStr = '', name, value, subName, innerObj;
    //     for (name in data) {
    //         value = data[name];
    //         if (value instanceof Array) {
    //             for (let i of value) {
    //                 subName = name;
    //                 innerObj = {};
    //                 innerObj[subName] = i;
    //                 paramStr += this.paramFormat(innerObj) + '&';
    //             }
    //         } else if (value instanceof Object) {
    //             Object.keys(value).forEach(function (key) {
    //                 subName = name + '[' + key + ']';
    //                 innerObj = {};
    //                 innerObj[subName] = value[key];
    //                 paramStr += this.paramFormat(innerObj) + '&';
    //             });
    //         } else if (value !== undefined && value !== null) {
    //             paramStr += encodeURIComponent(name) + '='
    //                 + encodeURIComponent(value) + '&';
    //         }
    //     }
    //     return paramStr.length ? paramStr.substr(0, paramStr.length - 1) : paramStr;
    // }

    getUid() {
        let user = JSON.parse(localStorage.getItem('userInfo'));
        return user.id;
    }

    getMathFour() {
        let str = '';
        for (let i = 0; i < 4; i++) {
            str += (Math.random() * 10).toFixed(0);
        }
        return str;
    }

    formatSeconds(s: any) {
        var t;
        if (s > -1) {
            var hour = Math.floor(s / 3600);
            var min = Math.floor(s / 60) % 60;
            var sec = s % 60;
            if (hour < 10) {
                t = '0' + hour + ':';
            } else {
                t = hour + ':';
            }

            if (min < 10) {
                t += '0';
            }
            t += min + ':';
            if (sec < 10) {
                t += '0';
            }
            t += sec.toFixed(0);
        }
        return t;
    }

    sec_to_time(time) {
        // debugger;
        var s = 0;

        var hour = parseInt(time.split(':')[0]);
        var min = parseInt(time.split(':')[1]);
        // var sec = parseInt(time.split(':')[2]);

        s = (hour * 60) + min;
        return s;
    }

    openTaoBao(str) {
        console.log('http');
        //com.taobao.taobao
        this.clipboard.copy(str);
        let app = '', sApp;
        if (this.platform.is('ios')) {
            app = 'taobao://';
            sApp = (window as any).startApp.set(app);
        } else if (this.platform.is('android')) {
            app = 'com.taobao.taobao';
            sApp = (window as any).startApp.set({
                'application': app
            }, {
                /* extras */
                'EXTRA_STREAM': 'extraValue1',
                'extraKey2': 'extraValue2'
            });
        }
        console.log(app);
        this.appAvailability.check(app).then(res => {
            console.log(res, '成功');
            sApp.start(function (ress) {
                console.log(ress, '成功1');
            }, function (error) {
                console.log(error, '失败1');
            });
        }).catch(err => {
            console.log(err, '失败');
            this.presentAlert();
        });
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            header: '温馨提示',
            message: '客户端未安装',
            buttons: ['确认']
        });
        await alert.present();
    }
}
