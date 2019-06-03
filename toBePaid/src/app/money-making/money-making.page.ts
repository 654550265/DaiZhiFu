import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
// import {Wechat} from '@ionic-native/wechat/ngx';
import {HttpService} from '../http.service';

declare let Wechat: any;

@Component({
    selector: 'app-money-making',
    templateUrl: './money-making.page.html',
    styleUrls: ['./money-making.page.scss'],
})
export class MoneyMakingPage implements OnInit {
    url: string = '';

    constructor(public activeRoute: ActivatedRoute, public route: Router, public http: HttpService) {
    }

    ngOnInit() {
        this.activeRoute.queryParams.subscribe((params: Params) => {
            this.url = params['type'] === '1' ? '/tabs/tab1' : '/tabs/tab4';
        });
    }

    back() {
        this.route.navigate([this.url]);
    }

    shearWeChart() {
        Wechat.isInstalled(res => {
            console.log(res);
            this.http.get('api/home/index/getPromoInfo', {
                uid: JSON.parse(localStorage.getItem('userInfo')).id
            }).then(res => {
                if (res['code'] === 1) {
                    Wechat.share({
                        message: {
                            title: '零钱口袋',
                            description: res['data'].url,
                            thumb: 'www/assets/logo.png',
                            media: {
                                type: Wechat.Type.WEBPAGE,
                                webpageUrl: res['data'].href
                            }
                        },
                        scene: Wechat.Scene.TIMELINE
                    }, function () {
                    }, function (reason) {
                        console.log(reason);
                        if (reason === '未安装微信') {
                            alert(reason);
                        } else {
                            alert('您已取消分享');
                        }
                    });
                }
            });
        }, err => {
            this.http.presentAlert();
        });
    }
}
