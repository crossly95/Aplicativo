import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GenerarqrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-generarqr',
  templateUrl: 'generarqr.html',
})
export class GenerarqrPage {
  item;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.data.item;
    console.log(this.item)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenerarqrPage');
  }

}
