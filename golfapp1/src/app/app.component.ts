import { Component, ViewChild } from '@angular/core';
import { AlertController, Nav, App, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  public rootPage;
  regId: any;
  saveUrl: string;
  username: string;
  password: string;
  loggedIn = false;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public storage: Storage,
    public app: App,
    public events: Events
    ) {

      this.storage.get('usrname').then(loggedIn => {
        this.rootPage = loggedIn ? HomePage : LoginPage;
      });

    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }



}

