import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENV} from '../config/ENV';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private httpClient: HttpClient) {
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

    formatSeconds(value: any) {
        let theTime = value;// 秒
        let middle = 0;// 分
        let hour = 0;// 小时

        if (theTime > 60) {
            middle = parseInt(theTime / 60);
            theTime = parseInt(theTime % 60);
            if (middle > 60) {
                hour = parseInt(middle / 60);
                middle = parseInt(middle % 60);
            }
        }
        var result = `${parseInt(theTime)}秒`;
        if (middle > 0) {
            result = '' + parseInt(middle) + '分' + result;
        }
        if (hour > 0) {
            result = '' + parseInt(hour) + '小时' + result;
        }
        return result;
    }
}
