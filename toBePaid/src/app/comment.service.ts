import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(private toast: ToastController) {
    }

    async showToast(msg: string) {
        const toast = await this.toast.create({
            message: msg,
            duration: 1500,
            position: 'bottom'
        });
        toast.present();
    }
}
