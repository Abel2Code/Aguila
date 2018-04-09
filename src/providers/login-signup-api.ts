import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginSignupApi {
  domain : String = " http://localhost:3000/api/";

  constructor(public http: Http) {

  }

  validateCredentials(email, password){
      return new Promise(resolve => {
        let toSend = {email: email, password: password};
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

  sendEmailPin(email){
    return new Promise(resolve => {
    this.http.post(this.domain + 'email_request', email)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      });
    });
  }

  checkValidationPin(data){
    return new Promise(resolve => {
      this.http.post(this.domain + 'validate_pin', data)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      });
    });
  }

  postQuestion(data, token){
    console.log(token);
    return new Promise(resolve => {
      this.http.post(this.domain + 'postQuestion', data)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      });
    });
  }

  getAskerConversations(author){
    return new Promise(resolve => {
      this.http.get(this.domain + 'conversations/' + author)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      });
    });
  }

}
