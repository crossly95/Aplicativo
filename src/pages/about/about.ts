import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service-provider';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { Md5 } from "md5-typescript";
import { LoadingController } from 'ionic-angular';
import { LogginPage } from '../loggin/loggin';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  user: any[];
  qrData = null;
  createdCode = null;

  constructor(private storage: Storage, public toastCtrl: ToastController, public alertController: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public serviceProvider: ServiceProvider) {
    this.storage.get('usercodeqr').then(value => {
      if (value) {
        this.presentLoading();
        this.getDatosUser();
        this.storage.get('usercodeqr').then(value => {
          if (value) {
            this.storage.get('codeqr').then(value => {
              if (value) {
                this.storage.get('codeqr').then((val) => {
                  var flag = this.validarQR(val[0].id, val[0].codigo);
                  if (flag) {
                    // GENERAR DE NUEVO
                    this.presentToast('Su codigo ya no es valido, por favor generar de nuevo');
                    this.storage.remove('codeqr');
                  }
                  else {
                    // NO GENERAR DE NUEVO
                    this.getDatosUserQR(val, flag);
                  }

                });
              }
              else {
                this.presentToast('Genere su cofigo por favor !');
              }

            });
          }
          else {
            this.storage.clear();
            this.navCtrl.setRoot(LogginPage);
          }
        });
      }
      else {
        this.storage.clear();
        this.navCtrl.setRoot(LogginPage);
      }
    });


  }
  //DATOS DEL USUARIOS
  getDatosUser() {
    this.storage.get('usercodeqr').then((val) => {
      this.user = JSON.parse(val);
      var al = this.alerta('Bienvenido', this.user, 'Seguir', true);
      al.present();
      console.log('HOME JSON: ', this.user);
    });
  }

  alerta(title, user, text, flag) {
    if (flag) {
      user = user[0].name + ' ' + user[0].lastname;

    }
    const alert = this.alertController.create({
      title: title,
      subTitle: user,
      buttons: [text]
    });
    return alert
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
    });
    loader.present();
  }

  logout() {

    this.storage.clear();
    this.navCtrl.setRoot(LogginPage);

  }

  // DATOS DEL QR

  createCode() {
    this.getDatosUserQR('sin valor', true);

  }

  getDatosUserQR(code, flag) {
    if (flag) {
      this.storage.get('usercodeqr').then((val) => {
        this.user = JSON.parse(val);
        var hash = Md5.init((new Date(Date.now())).toISOString().slice(0, -1));
        this.qrData = this.user[0].id + '|' + '1' + '|' + '2' + '|' + '2' + '|' + hash;
        this.createdCode = this.qrData;
        this.setData(this.user[0].id, hash);
        var codigoqr = {
          codigo: hash,
          id: this.user[0].id
        }
        this.saveDataStorage(codigoqr);
        this.presentToast('Codigo generado, acerque el dispositivo al lector QR');
      });
    }
    else {
      this.qrData = code[0].id + '|' + '1' + '|' + '2' + '|' + '2' + '|' + code[0].codigo;
      this.createdCode = this.qrData;
      this.presentToast('Su codigo aun es valido, acerque el dispositivo al lector QR');

    }

  }

  validarQR(id, codigo) {
    var flag = false;

    return flag;
  }

  setData(id, hash) {
    this.serviceProvider.updateQR(id, hash).subscribe(
      data => {
        this.user = data;
        console.log(this.user);
      },
      error => console.log(error)
    );
  }

  saveDataStorage(codigoqr) {
    codigoqr = JSON.stringify(codigoqr);
    this.storage.set('codeqr', codigoqr);

  }

  presentToast(mensaje) {
    const toast = this.toastCtrl.create({
      message: mensaje,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'Ok'
    });
    toast.present();
  }

}
