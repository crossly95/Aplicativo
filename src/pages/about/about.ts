import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  user: string;
  pass: string;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  Ingreso_loggin() {
    console.log("User: " + this.user);
    console.log("pass: " + this.pass);
    const alert = this.alertCtrl.create({
      title: 'Error !',
      subTitle: 'Compruebe los campos e intentelo de nuevo !',
      buttons: ['Entendido']
    });
    const alert2 = this.alertCtrl.create({
      title: 'Bienvenido !',
      subTitle: 'Te estabamos esperando !',
      buttons: ['Gracias']
    });
    if (this.user == null || this.pass  == null) {
      alert.present();
    }
    else {
      alert2.present();
    }

  }

}
