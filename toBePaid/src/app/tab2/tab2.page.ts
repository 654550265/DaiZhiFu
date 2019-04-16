import {HttpService} from './../http.service';
import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    subList: Array<any>;
    orders: Array<object>;
    type: string = '';

    constructor(public http: HttpService, public router: Router) {
        this.subList = [{
            text: '全部订单',
            type: '',
            isAcv: true
        }, {
            text: '待操作',
            type: '1',
            isAcv: false
        }, {
            text: '待返款',
            type: '2',
            isAcv: false
        }, {
            text: '已发货',
            type: '3',
            isAcv: false
        }];
    }

    ionViewWillEnter() {
        this.getOrders();
    }

    getOrders() {
        // function resetTime(time){
        //     var count = '';
        //     var count_time = null;
        //     function countdown() {
        //         var s = time % 60;
        //         var m = Math.floor((time / 60)) % 60;
        //         var h = Math.floor((time / (1000 * 60 * 60)) % 24);
        //         var msg = `${(h < 10 ? '0' : '') + h}:${(m < 10 ? '0' : '') + m}:${(s < 10 ? '0' : '') + s}`;
        //         if (--time > 0) {
        //             setTimeout(countdown, 1000);
        //         } else {
        //             // 做结束的事
        //             clearTimeout(count_time);
        //         }
        //         return msg;
        //     }
        //     count = countdown();
        //     return count;
        // }

        this.http.get('api/home/index/getTaskManage', {
            uid: this.http.getUid(),
            type: this.type
        }).then(res => {
            this.orders = res['data'].map(item => {
                var starttime = item.create_time_s;
                var enddate = new Date(item.create_time_s);
                enddate.setHours(enddate.getHours() + 1);
                var endtime = Date.parse(enddate + '');
                var time = endtime - (Date.parse(new Date() + '') / 1000);
                var count_time = null;

                function countdown() {
                    var s = time % 60;
                    var m = Math.floor((time / 60)) % 60;
                    var msg = `${(m < 10 ? '0' : '') + m}:${(s < 10 ? '0' : '') + s}`;
                    if (--time > 0) {
                        count_time = setTimeout(countdown, 1000);
                    } else {
                        // 做结束的事
                        clearTimeout(count_time);
                    }
                    item.count = msg;
                }

                if (time > 0) {
                    countdown();
                } else {
                    item.count = '00:00';
                }
                return item;
            });
        });
    }

    resetTime(time: number) {

    }

    chooseOne(index) {
        for (let values of this.subList) {
            values.isAcv = false;
        }
        this.subList[index].isAcv = true;
        this.type = this.subList[index].type;
        this.getOrders();
    }

    gotoTaskDetailPage(item) {
        this.router.navigate(['task-order'], {
            queryParams: {
                taskNum: item.tasknum,
                taskType: item.tasktype,
                toid: item.toid,
                count: item.count,
                url: '/tabs/tab2'
            }
        });
    }
}
