import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CommentService} from './comment.service';
import {HttpService} from './http.service';
import {HttpClientModule} from '@angular/common/http';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import {AppMinimize} from '@ionic-native/app-minimize/ngx';
import {File} from '@ionic-native/file/ngx';
import {Device} from '@ionic-native/device/ngx';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {Wechat} from '@ionic-native/wechat/ngx';
import {CodePush} from '@ionic-native/code-push/ngx';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
    providers: [
        StatusBar,
        SplashScreen,
        CommentService,
        HttpService,
        Keyboard,
        AppMinimize,
        File,
        Device,
        InAppBrowser,
        Wechat,
        CodePush,
        PhotoViewer,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
