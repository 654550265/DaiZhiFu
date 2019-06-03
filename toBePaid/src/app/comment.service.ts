import {Injectable} from '@angular/core';
import {LoadingController, ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private toast: ToastController, public loadingController: LoadingController) {
    }

    async showToast(msg: string, fn?) {
        const toast = await this.toast.create({
            message: msg,
            duration: 1500,
            position: 'top'
        });
        toast.present();
        setTimeout(() => {
            fn ? fn() : '';
        }, 1500);
    }

    async presentLoadingWithOptions(loadingController: LoadingController, msg: string) {
        const loading = await loadingController.create({
            spinner: 'crescent',
            message: msg,
            translucent: true,
            cssClass: 'custom-class custom-loading'
        });
        return await loading.present();
    }
}
