import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Nav, App, Platform, AlertController } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser'
import { StatusBar } from '@ionic-native/status-bar';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  url: string;
  count: number = 0;
  pbUrl: string;
  dismissing: boolean;
  spamming: boolean;
  lastBack: any;
  username: string;

  constructor(
    public nav: Nav,
    public app: App,
    private iab: InAppBrowser,
    public platform: Platform,
    public statusBar: StatusBar,
    private push: Push,
    private alert: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public storage: Storage,
    public toast: ToastController
  ) {

    this.storage.get('name').then((name) => {
      this.pbUrl = name;
    });


    platform.ready().then(() => {
      if (platform.is('android')) {
        statusBar.overlaysWebView(false);
        statusBar.backgroundColorByHexString('#3e497f');
      }
    });


    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
          this.initPush();
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });


    //Back Button Function

    platform.registerBackButtonAction(() => {
      const nav = app.getActiveNavs()[0];
      const active = nav.getActive();

      if (active.name === "HomePage") {

        let closeDelay = 2000;
        let spamDelay = 500;

        if (active.isOverlay) {
          if (!this.dismissing) {
            active.dismiss().then(() => this.dismissing = false);
          }
          this.dismissing = true;
        } else if (((Date.now() - this.lastBack) < closeDelay) &&
          (Date.now() - this.lastBack) > spamDelay) {
          platform.exitApp();
        } else {
          if (!this.spamming) {
            let t = toast.create({
              message: "Press back again to exit",
              duration: closeDelay,
              dismissOnPageChange: true
            });
            t.onDidDismiss(() => this.spamming = false);
            t.present();
          }
          this.spamming = true;
        }
        this.lastBack = Date.now();

      }
      else {
        nav.pop();
      }
    });


  }

  logOut(){
    this.storage.remove('usrname');
    alert("You're logged out!");
    this.navCtrl.setRoot(LoginPage);
  }


  //Push Notifications

  initPush() {
    const options: PushOptions = {
      android: {},
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      const confirm = this.alert.create({
        title: notification.title,
        message: notification.message,
        buttons: [
          {
            text: 'Close',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      confirm.present();

    });

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }

  // Search Webpages



  openWebpage(url) {

    const options: InAppBrowserOptions = {

      hideurlbar: 'no',
      location: 'no',
      hardwareback: 'yes',
      zoom: 'yes'
    }

    let newUrl = 'http://' + url;
    const browser = this.iab.create(newUrl, '_self', options);

    this.storage.ready().then(() => {
      this.storage.set('name', url);
    });


  }



}
