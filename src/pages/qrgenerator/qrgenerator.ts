import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { Md5 } from "md5-typescript";

@Component({
  selector: 'page-qrgenerator',
  templateUrl: 'qrgenerator.html'
})
export class QrgeneratorPage {

  qrData = null;
  createdCode = null;
  user: any[];



  constructor(private storage: Storage, public toastCtrl: ToastController, public navCtrl: NavController) {

  }

  createCode() {

    this.getDatosUser();

  }

  getDatosUser() {
    this.storage.get('user').then((val) => {
      this.user = JSON.parse(val);
      this.qrData = this.user[0].id + '|' + '1' + '|' + '2' + '|' + '2' + '|' + Md5.init(this.user[0].id);
      this.createdCode = this.qrData;
      this.presentToast();
    });
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Codigo generado, acerque el dispositivo al lector QR',
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Ok'
    });
    toast.present();
  }

}
