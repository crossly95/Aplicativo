
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
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
  Loggin(user,pass) {
    var loggin = {
      user : user,
      pass : pass,
      token : 'abc479f4-eb76-494d-9873-5191c3ac5e9d'
    }
    console.log("DATOS SESSION :" + user + pass)
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.api + "loggin.php", JSON.stringify(loggin), {
      headers: headers,
      method: "POST"
    }).map((res: Response) => { return res.json(); });
  }

  validarQR(id, hash){
    var localISOTime = (new Date(Date.now())).toISOString().slice(0, -1);
    localISOTime = localISOTime.replace('T', ' ');
    var cadena = {
      id: id,
      hash: hash,
      fecha: localISOTime,
      token:'abc479f4-eb76-494d-9873-5191c3ac5e9d'
    }
    console.log(localISOTime)
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.api + "validarqr.php", JSON.stringify(cadena), {
      headers: headers,
      method: "POST"
    }).map((res: Response) => { return res.json(); });

  }

  updateQR(id, hash) {
    var localISOTime = (new Date(Date.now())).toISOString().slice(0, -1);
    localISOTime = localISOTime.replace('T', ' ');
    var cadena = {
      id: id,
      hash: hash,
      fecha: localISOTime,
      token:'abc479f4-eb76-494d-9873-5191c3ac5e9d'
    }
    console.log("HORA : "+localISOTime)
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.api + "insertar.php", JSON.stringify(cadena), {
      headers: headers,
      method: "POST"
    }).map((res: Response) => { return res.json(); });
  }

  updateData(id,telefono,email,codigo) {
    var params = {
      id: id,
      telefono: telefono,
      email: email,
      codigo: codigo,
      token : 'abc479f4-eb76-494d-9873-5191c3ac5e9d'
    }
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.post(this.api + "modificar.php",JSON.stringify(params), {
      headers: headers,
      method: "POST"
    }).map((res: Response) => { return res.json(); });
  }

}
