import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginSignupApi {
  headers: Headers;
  domain : String = "http://localhost:3000/api/";

  constructor(public http: Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  validateCredentials(username, password){
      return new Promise(resolve => {
        console.log("username" + username + "\npassword" + password)
        let toSend = JSON.stringify({"username": username, "password": password});

        this.http.post(this.domain + 'login', toSend, {headers: this.headers})
              .map(res => res.json())
              .subscribe(data => {
                  resolve(data);
              });
     });
  }



  
}