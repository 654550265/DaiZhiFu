import { HttpService } from './../http.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
        //     console.log(count);
        //     return count;
        // }

        this.http.get('api/home/index/getTaskManage', {
            uid: this.http.getUid(),
            type: this.type
        }).then(res => {
            this.orders = res['data'].map(item => {
                // item.count = this.resetTime(item.create_time_s);
                var time = item.create_time_s;
                var count = '';
                var count_time = null;
                function countdown() {
                    var s = time % 60;
                    var m = Math.floor((time / 60)) % 60;
                    var h = Math.floor((time / (1000 * 60 * 60)) % 24);
                    var msg = `${(h < 10 ? '0' : '') + h}:${(m < 10 ? '0' : '') + m}:${(s < 10 ? '0' : '') + s}`;
                    if (--time > 0) {
                        setTimeout(countdown, 1000);
                    } else {
                        // 做结束的事
                        clearTimeout(count_time);
                    }
                    item.count = msg;
                    // return msg;
                }
                countdown();
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
                toid: item.toid
            }
        });
    }
}
