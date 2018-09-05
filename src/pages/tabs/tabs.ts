import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { ListPage } from '../list/list';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = ListPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //console.log('TAG ENVIO' + navParams.data.user)
    //this.navCtrl.push(this.tab1Root,{user : navParams.data.user})
  }
}
