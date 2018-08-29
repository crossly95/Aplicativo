import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service-provider';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the LogginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loggin',
  templateUrl: 'loggin.html',
})
export class LogginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ServiceProvider, public alertController: AlertController) {
  }

  verificar(dat){
    this.service.Loggin(dat.value).subscribe(
      data=>{
        this.showAlert(data.mensaje);
        this.navCtrl.setRoot(TabsPage);
      }
    )
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LogginPage');
  }

}