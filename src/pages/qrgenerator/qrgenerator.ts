import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import { Md5 } from "md5-typescript";
import { ServiceProvider } from '../../providers/service/service-provider';
import { LogginPage } from '../loggin/loggin';


@Component({
  selector: 'page-qrgenerator',
  templateUrl: 'qrgenerator.html'
})
export class QrgeneratorPage {

  qrData = null;
  createdCode = null;
  user: any[];
  flag;




  constructor(public service: ServiceProvider, private storage: Storage, public toastCtrl: ToastController, public navCtrl: NavController) {


    this.storage.get('usercodeqr').then(value => {
      if (value) {
        this.storage.get('codeqr').then(value => {
          if (value) {
            var us = JSON.parse(value);
            this.validarQR(us.id, us.codigo, us);

          }
          else {
            this.presentToast('Genere su codigo por favor !');
          }

        });
      }
      else {
        this.storage.clear();
        this.navCtrl.setRoot(LogginPage);
      }
    });




  }

  createCode() {
    this.getDatosUser('sin valor', true);

  }

  getDatosUser(code, flag) {
    if (flag) {
      this.storage.get('usercodeqr').then((val) => {
        this.user = JSON.parse(val);
        var hash = Md5.init((new Date(Date.now())).toISOString().slice(0, -1));
        console.log(this.user[0].number_document)
        this.qrData = this.user[0].number_document + '|' + '1' + '|' + '2' + '|' + '2' + '|' + hash;
        this.createdCode = this.qrData;
        this.setData(this.user[0].number_document, hash);
        var codigoqr = {
          codigo: hash,
          id: this.user[0].number_document
        }
        this.saveDataStorage(codigoqr);
        this.presentToast('Codigo generado, acerque el dispositivo al lector QR');
      });
    }
    else {
      this.qrData = code.id + '|' + '1' + '|' + '2' + '|' + '2' + '|' + code.codigo;
      this.createdCode = this.qrData;
      this.presentToast('Su codigo aun es valido, acerque el dispositivo al lector QR');

    }

  }

  validarQR(id, codigo,us) {
    console.log("VERIFICAR : "+id+codigo+us)
    this.service.validarQR(id, codigo).subscribe(
      data => {
        var obj = JSON.parse(data);
        console.log("VERIFICACION QR: "+obj )
        this.flag = obj;
        if (this.flag) {
          // GENERAR DE NUEVO
          this.presentToast('Su codigo ya no es valido, por favor generar de nuevo');
          this.storage.remove('codeqr');
        }
        else {
          // NO GENERAR DE NUEVO
          console.log("NO GENERAR : " + us.id + us.codigo)
          this.getDatosUser(us, this.flag);
        }

      },
      error => console.log(error)
    );

  }

  setData(id, hash) {
    this.service.updateQR(id, hash).subscribe(
      data => {
        this.user = data;
        console.log(this.user);
      },
      error => console.log(error)
    );
  }

  saveDataStorage(codigoqr) {
    console.log("DATOS A GUARDAR QR : "+ JSON.stringify(codigoqr))
    codigoqr = JSON.stringify(codigoqr);
    this.storage.set('codeqr', codigoqr);

  }

  presentToast(mensaje) {
    const toast = this.toastCtrl.create({
      message: mensaje,
      position: 'top',
      duration: 1500

    });
    toast.present();
  }

}
