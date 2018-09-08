import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';


@Injectable()
export class LoginSignupApi {
  domain : String = " http://ec2-52-207-238-155.compute-1.amazonaws.com:80/api/";

  constructor(public http: Http, private storage: Storage) {

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

  postQuestion(data){
    return new Promise(resolve => {
      this.storage.get('token').then((val) => {
        this.http.post(this.domain + 'postQuestion/' + val, data)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
      });
    });
  }

  getAskerConversations(author){
    return new Promise(resolve => {
      this.storage.get('token').then((val) => {
        this.http.get(this.domain + 'conversations_a/' + val)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
      });
    });
  }

  getMentorConversations(author){
    return new Promise(resolve => {
      this.storage.get('token').then((val) => {
        this.http.get(this.domain + 'conversations_m/' + val)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        });
      });
    });
  }

  getUnansweredJobs(){
    return new Promise(resolve => {
      this.storage.get('token').then((val) => {
        this.http.get(this.domain + 'unansweredJobs/' + val)  .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          });
        });
    });
  }

  jobMatch(job_id, mentor_id){
    return new Promise(resolve => {
      let toSend = {id: job_id};
      this.storage.get('token').then((val) => {
        this.http.put(this.domain + 'jobMatch/' + val, toSend)
          .map(res => res.json())
          .subscribe(data => {
              resolve(data);
          });
        });
    });
  }

  startConversation(job_id, m_description, m_response){
    return new Promise(resolve => {
      let toSend = {id: job_id, description: m_description, response: m_response};
      this.storage.get('token').then((val) => {
        this.http.put(this.domain + 'startConversation/' + val, toSend)
          .map(res => res.json())
          .subscribe(data => {
              resolve(data);
          });
      });
    });
  }

  sendMessage(jobId, userId, message){
    return new Promise(resolve => {
      let body = {
        job: jobId,
        message: message
      }
      this.storage.get('token').then((val) => {
        this.http.put(this.domain + 'sendMessage/' + val, body)
        .map(res => res.json())
        .subscribe(data => {
            resolve(data);
        });
      });
    })
  }

  getMessages(jobId){
    return new Promise(resolve => {
      this.storage.get('token').then((val => {
        this.http.get(this.domain + 'getMessages/' + jobId + '/' + val) .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          });
      }))
    })
  }

  getUserInfo(){
    return new Promise(resolve => {
      this.storage.get('token').then((token) => {
        this.http.get(this.domain + 'user/' + token)  .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          });
        });
    });
  }

  getMentorInfo(mentorId: string) {
    return new Promise(resolve => {
      this.storage.get('token').then((token) => {
        this.http.get(this.domain + 'user/' + mentorId + '/' + token)  .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          });
        });
    });
  }

}
