import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service-provider';
import { Storage } from '@ionic/storage';
import { LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: any[];

  constructor(private storage: Storage, public alertController: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public serviceProvider: ServiceProvider) {
    this.presentLoading();
    this.getDatosUser();

  }

  /* getDatos() {
     this.serviceProvider.getData().subscribe(
       data => { this.user = data, console.log('HOME :' + this.user) },
       error => console.log(error)
     );
   }*/
  getDatosUser() {
    this.storage.get('user').then((val) => {
      this.user = JSON.parse(val);
      var al = this.alerta('Bienvenido', this.user, 'Seguir', true);
      al.present();
      console.log('HOME JSON: ', this.user);
    });
  }

  alerta(title, user, text, flag) {
    if (flag) {
      user = user[0].name + ' '+ user[0].lastname;

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

}
