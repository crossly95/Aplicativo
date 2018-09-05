import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service-provider';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: any[];

  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams, public serviceProvider: ServiceProvider) {
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
      console.log('HOME JSON: ', this.user);
    });
  }

}
