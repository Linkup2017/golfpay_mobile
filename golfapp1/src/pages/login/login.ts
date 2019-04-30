import { Component } from '@angular/core';
import { NavController, Events, Platform, App, NavParams, PopoverController, ModalController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { StatusBar } from '@ionic-native/status-bar';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  username: string;
  password: any;
  authForm: FormGroup;
  usrData: any;
  check: boolean = true;
  regId: any;
  public apiData: string;
  dbData: string = 'demo';
  endPoint: string = '/firebase/registeration';
  dismissing: boolean;
  spamming: boolean;
  lastBack: any;
  rememberPass: boolean =false;

  constructor(
    public events: Events,
    private fb: FormBuilder,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HTTP,
    private storage: Storage,
    public modalCtrl: ModalController,
    public push: Push,
    public popoverCtrl: PopoverController,
    public platform: Platform,
    public statusBar: StatusBar,
    public app: App,
    public toast: ToastController
  ) {
    platform.ready().then(() => {
      if (platform.is('android')) {
        statusBar.overlaysWebView(false);
        statusBar.backgroundColorByHexString('#3e497f');
      }
    });
    this.authForm = fb.group({
      'username': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required])]
    });

    this.storage.get('api').then((api) => {
      this.apiData = api;
    });

    this.storage.get('db').then((db) => {
      this.dbData = db;
    });

    //Back Button Function

    platform.registerBackButtonAction(() => {
      const nav = app.getActiveNavs()[0];
      const active = nav.getActive();

      if (active.name === "LoginPage") {

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

  apiChange() {
    const prompt = this.alertCtrl.create({
      title: 'API Settings',
      inputs: [
        {
          name: 'api',
          placeholder: 'API'
        },
        {
          name: 'database',
          placeholder: '데이터베이스'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.apiData = data.api;
            this.dbData = data.database;

            this.storage.ready().then(() => {
              this.storage.set('api', this.apiData);
              this.storage.set('db', this.dbData);
            });
          }
        }
      ]
    });
    prompt.present();
  }


  login(username, password) {
    const options: PushOptions = {
      android: {
        senderID: '964030697866'
      },
      ios: {
        alert: 'true',
        badge: false,
        sound: 'true'
      },
      windows: {}
    };
    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe((data: any) => {
      this.regId = data.registrationId;

      let val = {
        'id': this.regId,
        'username': username,
        'password': password,
        'db': this.dbData
      };
      let headers = {
        'Content-Type': 'application/json'
      };
      this.http.post(`${this.apiData}${this.endPoint}`, val, headers)
        .then(data => {
          if(data.data == 1){
            if(this.rememberPass == true){
              this.storage.ready().then(() => {
                this.storage.set('usrname', username);
                this.storage.set('api', this.apiData);
              });
            }
          this.navCtrl.setRoot(HomePage);

          }
          else if (data.data == 0){
            alert("Invalid Credentials!")
          }
        })
        .catch(error => {
          alert("Please enter valid data in the API Settings.")
        });

    });

    pushObject.on('notification').subscribe((data: any) => {
      console.log('message -> ' + data.message);
      //if user using app and push notification comes
      if (data.additionalData.foreground) {
        // if application open, show popup
        let confirmAlert = this.alertCtrl.create({
          title: 'New Notification',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          }, {
            text: 'View',
            handler: () => {

            }
          }]
        });
        confirmAlert.present();
      } else {
        console.log('Push notification clicked');
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin' + error));
  }
}
