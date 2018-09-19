import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LogginPage } from '../pages/loggin/loggin';
import { AboutPage } from '../pages/about/about';
import { QrgeneratorPage } from '../pages/qrgenerator/qrgenerator';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { GenerarqrPage } from '../pages/generarqr/generarqr';
//import { TabsPage } from '../pages/tabs/tabs';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ServiceProvider } from '../providers/service/service-provider';

import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { NgxQRCodeModule } from 'ngx-qrcode2';
//import { ServiceProvider } from '../providers/service/service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    QrgeneratorPage,
    HomePage,
    ListPage,
    GenerarqrPage,
    LogginPage,
    //TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    NgxQRCodeModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    QrgeneratorPage,
    HomePage,
    ListPage,
    GenerarqrPage,
    LogginPage,
    //TabsPage
  ],
  providers: [
    ServiceProvider,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ServiceProvider

  ]
})
export class AppModule {}
