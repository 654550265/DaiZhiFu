import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ENV} from '../config/ENV';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private httpClient: HttpClient) {
    }

    get(url: string, obj: Object) {
        let str = `${ENV.host}${url}?`;
        for (let key in obj) {
            str += `${key}=${obj[key]}&`;
        }
        str = str.substr(0, str.length - 1);
        return this.httpClient.get(str);
    }
}
