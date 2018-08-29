
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {

  api: string = this.newMethod();
  constructor(public http: Http) {

  }

  private newMethod(): string {
    return 'http://192.168.224.105:8680/api-rest-app/';
  }

  getData() {
    return this.http.get(this.api + 'listado.php').map(res => res.json())
  }
  Loggin(parans) {
    let header = new Headers({ 'Content-type': 'application/x-www-from-urlencoded' });
    return this.http.post(this.api + 'loggin.php', parans, {
      headers: header,
      method: "POST"
    }).map((res:Response)=>{return res.json()});
  }

}
