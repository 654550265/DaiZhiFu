import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENV} from '../config/ENV';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private httpClient: HttpClient) {
    }

    getUrl(url: string, obj: Object) {
        let str = `${ENV.host}${url}?`;
        for (let key in obj) {
            str += `${key}=${obj[key]}&`;
        }
        str = str.substr(0, str.length - 1);
        return str;
    }

    get(url: string, obj: Object) {
        return this.httpClient.get(this.getUrl(url, obj));
    }


}
