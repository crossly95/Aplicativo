
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  api:string = this.newMethod();
  constructor(public http: Http) {

  }

  private newMethod(): string {
    return 'http://192.168.224.105:8685/appmarket-api/';
  }

  getData(){
    return this.http.get(this.api+'listado.php').map(res=>res.json())
  }

}
