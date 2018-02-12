import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginSignupApi {
  headers: Headers;
  // domain : String = "http://localhost:3000/api/";
  domain : String = "http://82f5f60b.ngrok.io/api/";

  constructor(public http: Http) {
    // this.headers = new Headers();
    // this.headers.append('Content-Type', 'application/json');
  }

  validateCredentials(username, password){
      return new Promise(resolve => {
        console.log("username" + username + "\npassword" + password)
        let toSend = JSON.stringify({"username": username, "password": password});

        this.http.post(this.domain + 'login', toSend)
              .map(res => res.json())
              .subscribe(data => {
                  resolve(data);
              });
     });
  }

  signUp(formData){
    return new Promise(resolve => {
      this.http.post(this.domain + 'signup', formData)
      .map(res => res.json())
      .subscribe(data => {
           resolve(data);
      });
    });
  }

  //upload test
  upload(formData){
    return new Promise(resolve => {
    this.http.post(this.domain + 'test', formData)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      });
    });
  }

  getMajors(){
    return new Promise(resolve => {
      this.http.get(this.domain + 'majors')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
      });
  }

  getSchools(){
    return new Promise(resolve => {
      this.http.get(this.domain + 'schools')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
    });
  }
}
