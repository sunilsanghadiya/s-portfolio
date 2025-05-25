import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Env } from '../../envs/env.dev';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private backendUrl = `${Env.apiUrl}/send-email`
  
  constructor(private http: HttpClient) { }

  sendEmail(name: string, message: string): Observable<any> {
    const data = { name, message };
    return this.http.post(this.backendUrl, data);
  }
}