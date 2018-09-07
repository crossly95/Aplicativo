import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service-provider';
import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { HttpClientModule } from '@angular/common/http';
import { Storage } from '@ionic/storage';
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


  users: any[];
  user: string;
  pass: string;

  constructor(private storage: Storage, public http: HttpClientModule, public navCtrl: NavController, public navParams: NavParams, public service: ServiceProvider, public alertController: AlertController) {
  }

  verificar(dat) {
    if (this.user == null || this.pass == null) {
      this.showAlert('Error', 'Compruebe los campos', 'volver', false);
    }
    else {
      this.service.Loggin(dat.value).subscribe(
        data => {
          this.users = data;
          console.log('JSON ANTES:'+ data);
          var obj = JSON.parse(data);
          console.log('JSON QUEDA ASI :'+this.users);
          if (obj.length > 0) {
            this.showAlert('Bienvenido', data, 'Seguir', true);
          }
          else {
            this.showAlert('Error', 'Usuario o contraseña incorrecta', 'volver', false);
          }

        },
        error => console.log(error)
      );
    }
  }

  showAlert(title, user, text, flag) {
    var al;
    al = this.alerta(title, user, text, false);
    //alert.present();
    if (flag) {
      var obj = JSON.parse(user);
      al = this.alerta(title, obj, text, true);
      console.log('antes : ' + user)
      this.saveDataStorage(user);
    }
    //al.present();
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
 //GUARDAR DATOS EN STORAGE
  saveDataStorage(user) {
    this.storage.set('user', user);
  //  this.navCtrl.push(HomePage);
    this.navCtrl.setRoot(TabsPage);
  /*  this.storage.get('user').then((val) => {
      //console.log('Your age is', val);
    });*/

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogginPage');
  }

}
