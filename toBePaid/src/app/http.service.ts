import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ENV} from '../config/ENV';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
//`${key}=${CryptoJS.AES.encrypt(obj[key], 'kkk kkk kkk').toString().replace(/\+/g, '%2B')}&`
    constructor(private httpClient: HttpClient) {
    }

    get(url: string, obj: Object) {
        const promse = new Promise((resolve, reject) => {
            let str = `${ENV.host}${url}?`;
            for (const key in obj) {
                str += `${key}=${obj[key]}&`;
            }
            str = str.substr(0, str.length - 1);
            let headers = new HttpHeaders()
                .append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
            this.httpClient.get(str, {
                headers: headers
            }).subscribe(res => {
                if (res['code'] === '1') {
                    resolve(res);
                } else {
                    reject(res);
                }
            });
        });
        return promse;
    }

    post(url: string, obj: Object) {
        let promse = new Promise((resolve, reject) => {
            // for (let key in obj) {
            //     obj[key] = CryptoJS.AES.encrypt(obj[key], 'kkk kkk kkk').toString();
            // }
            this.httpClient.post(`${ENV.host}${url}`, obj).subscribe(res => {
                if (res['code'] === '1') {
                    resolve(res);
                } else {
                    reject(res);
                }
            });
        });
        return promse;
    }

    getUid() {
        let user = JSON.parse(localStorage.getItem('userInfo'));
        return user.id;
    }
}
