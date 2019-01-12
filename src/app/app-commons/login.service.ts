import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  serviceUrl = environment.service_URL;

  constructor(
    private http:HttpClient
  ) { }

  login(email, password) {
    const url = `${this.serviceUrl}/auth/login`;
    let body =  new FormData();

    body.append('email', email);
    body.append('password', password);
  
    return this.http.post(url, body).toPromise();
  }
}
