import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service-provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user:any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public serviceProvider: ServiceProvider) {
    this.getDatos();
  }

 getDatos(){
   this.serviceProvider.getData().subscribe(
     data => {this.user = data,  console.log(this.user)},
     error => console.log(error)
   );
 }
}
