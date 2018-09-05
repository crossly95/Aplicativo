
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
    return 'http://localhost:8680/api-rest-app/';
  }

  getData() {
    return this.http.get(this.api + 'listado.php').map(res => res.json());
  }
  Loggin(parans) {
    console.log(parans)
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.api + "loggin.php", parans, {
      headers: headers,
      method: "POST"
    }).map((res:Response)=>{return res.json();});
  }

}
