import { Component } from '@angular/core';
import { VideoPlayer } from '@ionic-native/video-player/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private videoPlayer: VideoPlayer) { }

  ionViewWillEnter() {
    this.videoPlayer.play('http://222app.qnbug.cn/upload/video.mp4').then(() => {
      console.log('video completed');
    }).catch(err => {
      console.log(err);
    });
  }
}
