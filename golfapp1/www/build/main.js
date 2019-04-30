webpackJsonp([0],{

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_push__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var LoginPage = /** @class */ (function () {
    function LoginPage(events, fb, alertCtrl, navCtrl, navParams, http, storage, modalCtrl, push, popoverCtrl, platform, statusBar, app, toast) {
        var _this = this;
        this.events = events;
        this.fb = fb;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.push = push;
        this.popoverCtrl = popoverCtrl;
        this.platform = platform;
        this.statusBar = statusBar;
        this.app = app;
        this.toast = toast;
        this.check = true;
        this.dbData = 'demo';
        this.endPoint = '/firebase/registeration';
        this.rememberPass = false;
        platform.ready().then(function () {
            if (platform.is('android')) {
                statusBar.overlaysWebView(false);
                statusBar.backgroundColorByHexString('#3e497f');
            }
        });
        this.authForm = fb.group({
            'username': [null, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required])],
            'password': [null, __WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_5__angular_forms__["f" /* Validators */].required])]
        });
        this.storage.get('api').then(function (api) {
            _this.apiData = api;
        });
        this.storage.get('db').then(function (db) {
            _this.dbData = db;
        });
        //Back Button Function
        platform.registerBackButtonAction(function () {
            var nav = app.getActiveNavs()[0];
            var active = nav.getActive();
            if (active.name === "LoginPage") {
                var closeDelay = 2000;
                var spamDelay = 500;
                if (active.isOverlay) {
                    if (!_this.dismissing) {
                        active.dismiss().then(function () { return _this.dismissing = false; });
                    }
                    _this.dismissing = true;
                }
                else if (((Date.now() - _this.lastBack) < closeDelay) &&
                    (Date.now() - _this.lastBack) > spamDelay) {
                    platform.exitApp();
                }
                else {
                    if (!_this.spamming) {
                        var t = toast.create({
                            message: "Press back again to exit",
                            duration: closeDelay,
                            dismissOnPageChange: true
                        });
                        t.onDidDismiss(function () { return _this.spamming = false; });
                        t.present();
                    }
                    _this.spamming = true;
                }
                _this.lastBack = Date.now();
            }
            else {
                nav.pop();
            }
        });
    }
    LoginPage.prototype.apiChange = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
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
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.apiData = data.api;
                        _this.dbData = data.database;
                        _this.storage.ready().then(function () {
                            _this.storage.set('api', _this.apiData);
                            _this.storage.set('db', _this.dbData);
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    LoginPage.prototype.login = function (username, password) {
        var _this = this;
        var options = {
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
        var pushObject = this.push.init(options);
        pushObject.on('registration').subscribe(function (data) {
            _this.regId = data.registrationId;
            var val = {
                'id': _this.regId,
                'username': username,
                'password': password,
                'db': _this.dbData
            };
            var headers = {
                'Content-Type': 'application/json'
            };
            _this.http.post("" + _this.apiData + _this.endPoint, val, headers)
                .then(function (data) {
                if (data.data == 1) {
                    if (_this.rememberPass == true) {
                        _this.storage.ready().then(function () {
                            _this.storage.set('usrname', username);
                            _this.storage.set('api', _this.apiData);
                        });
                    }
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                }
                else if (data.data == 0) {
                    alert("Invalid Credentials!");
                }
            })
                .catch(function (error) {
                alert("Please enter valid data in the API Settings.");
            });
        });
        pushObject.on('notification').subscribe(function (data) {
            console.log('message -> ' + data.message);
            //if user using app and push notification comes
            if (data.additionalData.foreground) {
                // if application open, show popup
                var confirmAlert = _this.alertCtrl.create({
                    title: 'New Notification',
                    message: data.message,
                    buttons: [{
                            text: 'Ignore',
                            role: 'cancel'
                        }, {
                            text: 'View',
                            handler: function () {
                            }
                        }]
                });
                confirmAlert.present();
            }
            else {
                console.log('Push notification clicked');
            }
        });
        pushObject.on('error').subscribe(function (error) { return console.error('Error with Push plugin' + error); });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/socius/Desktop/golfapp/src/pages/login/login.html"*/'<ion-content padding class="content">\n    <form [formGroup]="authForm" >\n  <ion-list>\n\n      <div class="logo" >\n        <img center src="./assets/icon/logo.png">\n      </div>\n\n    <ion-item>\n      <ion-label floating>계정/이메일</ion-label>\n      <ion-input type="text" [(ngModel)]="username" [formControl]="authForm.controls[\'username\']" [ngClass]="{\'error-border\':!authForm.controls[\'username\'].valid}"></ion-input>\n    </ion-item>\n    <div class="error-box" *ngIf="authForm.controls[\'username\'].hasError(\'required\') && authForm.controls[\'username\'].touched">* 계정을 입력하세요!</div>\n    <ion-item>\n      <ion-label floating>비밀번호</ion-label>\n      <ion-input type="password" [(ngModel)]="password" [formControl]="authForm.controls[\'password\']"></ion-input>\n    </ion-item>\n    <div></div>\n    <div class="error-box" *ngIf="authForm.controls[\'password\'].hasError(\'required\') && authForm.controls[\'password\'].touched">* 비밀번호를 입력하세요!</div>\n\n  </ion-list>\n\n  <div padding>\n    <button ion-button style="background-color: #3e497f;" block (click)=login(username,password) [disabled]="!authForm.valid">로그인</button>\n  </div>\n  </form>\n  <ion-item>\n    <ion-label style="color: #3e497f!important;">R비밀번호 기억?</ion-label>\n    <ion-toggle  color="odoo" [(ngModel)]="rememberPass"></ion-toggle>\n  </ion-item>\n\n  <div padding class="center">\n    <a (click)=apiChange($event)><ion-icon name="logo-buffer"></ion-icon>설정</a>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/socius/Desktop/golfapp/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_push__["a" /* Push */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_push__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login__ = __webpack_require__(104);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var HomePage = /** @class */ (function () {
    function HomePage(nav, app, iab, platform, statusBar, push, alert, navCtrl, navParams, alertCtrl, storage, toast) {
        var _this = this;
        this.nav = nav;
        this.app = app;
        this.iab = iab;
        this.platform = platform;
        this.statusBar = statusBar;
        this.push = push;
        this.alert = alert;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.toast = toast;
        this.count = 0;
        this.url = this.navParams.get("searchUrl");
        this.storage.get('api').then(function (api) {
            _this.pbUrl = api;
        });
        platform.ready().then(function () {
            if (platform.is('android')) {
                statusBar.overlaysWebView(false);
                statusBar.backgroundColorByHexString('#3e497f');
            }
        });
        this.push.hasPermission()
            .then(function (res) {
            if (res.isEnabled) {
                console.log('We have permission to send push notifications');
                _this.initPush();
            }
            else {
                console.log('We do not have permission to send push notifications');
            }
        });
        //Back Button Function
        platform.registerBackButtonAction(function () {
            var nav = app.getActiveNavs()[0];
            var active = nav.getActive();
            if (active.name === "HomePage") {
                var closeDelay = 2000;
                var spamDelay = 500;
                if (active.isOverlay) {
                    if (!_this.dismissing) {
                        active.dismiss().then(function () { return _this.dismissing = false; });
                    }
                    _this.dismissing = true;
                }
                else if (((Date.now() - _this.lastBack) < closeDelay) &&
                    (Date.now() - _this.lastBack) > spamDelay) {
                    platform.exitApp();
                }
                else {
                    if (!_this.spamming) {
                        var t = toast.create({
                            message: "Press back again to exit",
                            duration: closeDelay,
                            dismissOnPageChange: true
                        });
                        t.onDidDismiss(function () { return _this.spamming = false; });
                        t.present();
                    }
                    _this.spamming = true;
                }
                _this.lastBack = Date.now();
            }
            else {
                nav.pop();
            }
        });
    }
    HomePage.prototype.logOut = function () {
        this.storage.remove('usrname');
        alert("You're logged out!");
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__login_login__["a" /* LoginPage */]);
    };
    //Push Notifications
    HomePage.prototype.initPush = function () {
        var _this = this;
        var options = {
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
        var pushObject = this.push.init(options);
        pushObject.on('notification').subscribe(function (notification) {
            var confirm = _this.alert.create({
                title: notification.title,
                message: notification.message,
                buttons: [
                    {
                        text: 'Close',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    }
                ]
            });
            confirm.present();
        });
        pushObject.on('registration').subscribe(function (registration) { return console.log('Device registered', registration); });
        pushObject.on('error').subscribe(function (error) { return console.error('Error with Push plugin', error); });
    };
    // Search Webpages
    HomePage.prototype.openWebpage = function () {
        var options = {
            hideurlbar: 'no',
            location: 'no',
            hardwareback: 'yes',
            zoom: 'yes'
        };
        var newUrl = this.pbUrl;
        var browser = this.iab.create(newUrl, '_self', options);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/socius/Desktop/golfapp/src/pages/home/home.html"*/'<ion-header>\n</ion-header>\n\n<ion-content overflow-scroll="false" no-bounce class="content">\n    <img (click)="logOut()" style="\n    max-width: 7%;\n    margin-top: 11px;\n    right: 0;\n    margin-right: 13px;\n    position: absolute;"\n    src="../../assets/icon/logout.png">\n<img class="logo" src="../assets/icon/logo.png">\n      <!-- <ion-item>\n        <ion-input *ngIf="pbUrl == null"  class="inputBox" type="url" placeholder="URL(Address)" [(ngModel)]="url"></ion-input>\n        <ion-input *ngIf="pbUrl != null"  class="inputBox" type="url" value="{{pbUrl}}" [(ngModel)]="url"></ion-input>\n\n      </ion-item> -->\n      <button class="searchButton" ion-button  color="odoo" (click)="openWebpage()">접속</button>\n\n</ion-content>\n'/*ion-inline-end:"/home/socius/Desktop/golfapp/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_push__["a" /* Push */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 116:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 116;

/***/ }),

/***/ 158:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 158;

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(224);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_push__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_in_app_browser__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_reg_token_reg_token__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_http__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_storage__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_12__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_push__["a" /* Push */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_10__providers_reg_token_reg_token__["a" /* RegTokenProvider */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_http__["a" /* HTTP */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, alertCtrl, storage, app, events) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.app = app;
        this.events = events;
        this.loggedIn = false;
        this.storage.get('usrname').then(function (loggedIn) {
            _this.rootPage = loggedIn ? __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */] : __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
        });
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/socius/Desktop/golfapp/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/socius/Desktop/golfapp/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegTokenProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the RegTokenProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RegTokenProvider = /** @class */ (function () {
    function RegTokenProvider(http) {
        this.http = http;
        console.log('Hello RegTokenProvider Provider');
    }
    RegTokenProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], RegTokenProvider);
    return RegTokenProvider;
}());

//# sourceMappingURL=reg-token.js.map

/***/ })

},[203]);
//# sourceMappingURL=main.js.map