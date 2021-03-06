import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service-provider';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';
import { LogginPage } from '../loggin/loggin';
import { QrgeneratorPage } from '../qrgenerator/qrgenerator';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: any[];

  constructor(private storage: Storage, public alertController: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public serviceProvider: ServiceProvider) {
    this.storage.get('usercodeqr').then(value => {
      if (value) {
        this.presentLoading();
        this.getDatosUser(true);
      }
      else {
        this.storage.clear();
        this.navCtrl.setRoot(LogginPage);
      }
    });


  }


  showPrompt(update) {
    let prompt = this.alertController.create({
      title: 'Editar informacion',
      message: "",
      inputs: [
        {
          name: 'telefono',
          placeholder: update.number_phone,
          value: update.number_phone,
          type: 'number'
        },
        {
          name: 'codigo',
          placeholder: update.code,
          value: update.code,
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            let email = update.email;
            let telefono = data.telefono;
            let codigo = data.codigo;
            if (telefono.length > 12 || codigo.length > 12) {
              this.showPrompt(update);
              var al2 = this.alerta('ERROR', 'Los datos exceden el limite de 12 caracteres', 'Volver', false);
              al2.present();

            }
            else {
              console.log("VARIABLES : " + update.number_document + email + telefono + codigo)
              if (email.length == 0 || telefono.length == 0 || codigo.length == 0) {
                this.showPrompt(update);
                var al = this.alerta('ERROR', 'Campos vacios', 'Volver', false);
                al.present();

              }
              else {
                if (email.length == 0) {
                  email = update.email;
                }
                if (telefono.length == 0) {
                  telefono = update.number_phone;
                }
                if (codigo.length == 0) {
                  codigo = update.code;
                }
                this.serviceProvider.updateData(update.number_document, telefono, email, codigo).subscribe(
                  data => {
                    console.log(data)
                    this.refrescarData();
                    this.presentLoading();
                  },
                  error => console.log(error)
                );

              }

            }


          }
        }
      ]
    });
    prompt.present();
  }

  getDatosUser(flag) {
    this.storage.get('usercodeqr').then((val) => {
      console.log("AQUI VA EL ERROR" + JSON.parse(val))
      this.user = JSON.parse(val);
      if (flag) {
        var al = this.alerta('Bienvenido', this.user, 'Seguir', true);
        al.present();
      }
      console.log('HOME JSON: ', this.user);
    });
  }

  alerta(title, user, text, flag) {
    if (flag) {
      user = user[0].username + ' ' + user[0].lastname;

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
    this.storage.remove('usercodeqr');
    //this.storage.remove('codeqr');
    this.navCtrl.setRoot(LogginPage);
  }
  pageQR() {
    this.navCtrl.push(QrgeneratorPage);
  }

  refrescarData() {
    this.storage.get('usercodeqr').then((val) => {
      var us = JSON.parse(val);
      console.log("GUARDAR UPDATE :" + us[0].number_document)
      this.serviceProvider.Loggin(us[0].email, us[0].number_document).subscribe(
        data => {
          this.user = JSON.parse(data);
          console.log("TRAEER INFO : " + data)
          this.saveDataStorage(data);

        },
        error => console.log(error)
      );

    });
  }

  saveDataStorage(user) {
    this.storage.clear();
    console.log("STORAGE ACTUALIZAR:" + user)
    this.storage.set('usercodeqr', user);
    //this.storage.set('codeqr', user);
    //this.navCtrl.setRoot(HomePage);
  }

}


